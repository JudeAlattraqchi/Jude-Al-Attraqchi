import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type, Blob } from "@google/genai";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Phone, User, Radio, Loader2, Volume2, CalendarCheck, FileSpreadsheet } from "lucide-react";

// --- Audio Helpers ---
function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  const uint8 = new Uint8Array(int16.buffer);
  let binary = '';
  const len = uint8.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const b64 = btoa(binary);
  
  return {
    data: b64,
    mimeType: 'audio/pcm;rate=16000',
  };
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Tool Definitions ---

const openBookingTool: FunctionDeclaration = {
  name: "openBookingCalendar",
  description: "Visually scrolls the screen to the calendar section so the user can see availability.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const saveLeadToSheetTool: FunctionDeclaration = {
  name: "saveLeadToSheet",
  description: "Saves the user's contact details and preferred time to a spreadsheet/database for a callback.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      firstName: { type: Type.STRING, description: "Client's first name" },
      lastName: { type: Type.STRING, description: "Client's last name" },
      email: { type: Type.STRING, description: "Client's email address" },
      phone: { type: Type.STRING, description: "Client's phone number" },
      preferredTime: { type: Type.STRING, description: "When the client said they are free or want to be called" }
    },
    required: ["firstName", "lastName", "email", "phone", "preferredTime"]
  }
};

export default function LiveVoiceAgent() {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [volume, setVolume] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  
  // Audio Refs
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  // Silence Detection Refs
  const lastInteractionTimeRef = useRef<number>(0);
  const isAiSpeakingRef = useRef<boolean>(false);
  const silenceIntervalRef = useRef<number | null>(null);
  const hasWarnedRef = useRef<boolean>(false);

  const startSession = async () => {
    setIsConnecting(true);
    hasWarnedRef.current = false;
    setStatusMessage(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const outputNode = outputContextRef.current.createGain();
      outputNode.connect(outputContextRef.current.destination);

      // Reset silence timer
      lastInteractionTimeRef.current = Date.now();

      // Get current NZ time for context
      const now = new Date();
      const nzTime = now.toLocaleString("en-NZ", { timeZone: "Pacific/Auckland", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: `You are 'Kiri', a friendly and professional AI specialist for 'Velocity Script'.
          
          CONTEXT:
          - Current Date/Time in New Zealand: ${nzTime}
          - You cannot finalize bookings directly yourself.
          
          IDENTITY:
          - Voice: Female, New Zealand accent (Kiwi). 
          - Age: Early 20s.
          - Tone: Natural, clear, professional, friendly. Avoid robotic phrasing. Use occasional Kiwi phrases like "No worries" or "Sweet as" if appropriate, but keep it professional.
          
          OPENING:
          - You MUST start the conversation IMMEDIATELY by saying exactly: "Hi, how can I help you today?"
          
          WORKFLOW:
          1. **Identify Need**: Listen to what the user wants (usually to book a meeting or ask about AI).
          2. **Ask Availability**: Ask: "What time works best for you?" or "When are you usually free?".
          3. **Suggest Calendar**: Say: "You can also check the available times on the calendar on your screen." AND call the tool \`openBookingCalendar\`.
          4. **Collect Details**: Say: "To get this sorted, I just need a few details. What is your First Name and Last Name?"
             - Then ask for: "Phone Number" and "Email Address".
          5. **Save & Close**: 
             - Once you have First Name, Last Name, Phone, Email, and Preferred Time, call the tool \`saveLeadToSheet\`.
             - After saving, Say: "Perfect, I've got that. An AI agent will call you shortly with the details. Have a great day!"

          SILENCE HANDLING:
          - If the user is silent for 5 seconds, ask: "Are you still there?"`,
          tools: [{ functionDeclarations: [saveLeadToSheetTool, openBookingTool] }]
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            
            // Start Silence Checker
            silenceIntervalRef.current = window.setInterval(() => {
                const now = Date.now();
                const timeSinceLast = now - lastInteractionTimeRef.current;
                
                if (!isAiSpeakingRef.current) {
                    if (timeSinceLast > 5000 && !hasWarnedRef.current) {
                        hasWarnedRef.current = true;
                    }
                    if (timeSinceLast > 8000) {
                        stopSession();
                    }
                }
            }, 1000);

            // Input Stream Setup
            if (inputContextRef.current && streamRef.current) {
              const source = inputContextRef.current.createMediaStreamSource(streamRef.current);
              const scriptProcessor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
              scriptProcessorRef.current = scriptProcessor;
              
              scriptProcessor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                
                let sum = 0;
                for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                const rms = Math.sqrt(sum / inputData.length);
                setVolume(rms);

                if (rms > 0.01) {
                    lastInteractionTimeRef.current = Date.now();
                    hasWarnedRef.current = false;
                }

                const pcmBlob = createBlob(inputData);
                sessionPromise.then(session => {
                   session.sendRealtimeInput({ media: pcmBlob });
                });
              };
              
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputContextRef.current.destination);
            }

            // Trigger Start
             sessionPromise.then(session => {
                 // System instruction handles greeting
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'saveLeadToSheet') {
                    // --- SPREADSHEET SAVING LOGIC ---
                    const { firstName, lastName, email, phone, preferredTime } = fc.args as any;
                    
                    console.log("Saving to Sheet:", { firstName, lastName, email, phone, preferredTime });
                    
                    // TODO: To save this to a real Google Sheet:
                    // 1. Create a Zapier or Make.com webhook that adds a row to Google Sheets.
                    // 2. Uncomment and update the fetch call below:
                    /*
                    await fetch('YOUR_ZAPIER_WEBHOOK_URL', {
                        method: 'POST',
                        body: JSON.stringify({ firstName, lastName, email, phone, preferredTime })
                    });
                    */

                    setStatusMessage("Details saved. Expect a call shortly!");
                    
                    sessionPromise.then(session => {
                        session.sendToolResponse({
                            functionResponses: {
                                id: fc.id,
                                name: fc.name,
                                response: { result: "Success. Lead saved." }
                            }
                        });
                    });
                } else if (fc.name === 'openBookingCalendar') {
                   const element = document.getElementById("booking");
                   if (element) element.scrollIntoView({ behavior: "smooth" });
                   
                   sessionPromise.then(session => {
                     session.sendToolResponse({
                       functionResponses: {
                         id: fc.id,
                         name: fc.name,
                         response: { result: "Calendar displayed." }
                       }
                     });
                   });
                }
              }
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputContextRef.current) {
               isAiSpeakingRef.current = true;
               
               const ctx = outputContextRef.current;
               nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
               
               const audioBuffer = await decodeAudioData(
                 decode(base64Audio),
                 ctx,
                 24000,
                 1
               );
               
               const source = ctx.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(ctx.destination);
               source.addEventListener('ended', () => {
                 sourcesRef.current.delete(source);
                 if (sourcesRef.current.size === 0) {
                    isAiSpeakingRef.current = false;
                    lastInteractionTimeRef.current = Date.now();
                 }
               });
               
               source.start(nextStartTimeRef.current);
               nextStartTimeRef.current += audioBuffer.duration;
               sourcesRef.current.add(source);
            }
          },
          onclose: () => {
            setIsActive(false);
          },
          onerror: (err) => {
            console.error(err);
            setIsActive(false);
            setIsConnecting(false);
          }
        }
      });
      sessionRef.current = sessionPromise;

    } catch (e) {
      console.error(e);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (silenceIntervalRef.current) {
        clearInterval(silenceIntervalRef.current);
        silenceIntervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
    }
    if (inputContextRef.current) {
      inputContextRef.current.close();
    }
    
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    if (outputContextRef.current) {
        outputContextRef.current.close();
    }
    
    setIsActive(false);
    setVolume(0);
  };

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-8 mx-4 border border-teal-100">
              <button 
                onClick={stopSession}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-4">
                <div className="relative inline-block">
                    {/* Kiri's Profile Image */}
                    <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-teal-400 to-cyan-400 shadow-xl shadow-teal-200">
                        <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" 
                            alt="Kiri"
                            className="w-full h-full rounded-full object-cover border-4 border-white"
                        />
                    </div>
                    {/* Active Status Indicator */}
                    <div className="absolute bottom-2 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-800">Kiri</h3>
                    <p className="text-teal-600 font-medium text-sm">Velocity AI Assistant • NZ</p>
                </div>
              </div>

              {/* Audio Visualizer */}
              <div className="h-24 flex items-center justify-center gap-1.5 w-full bg-slate-50 rounded-2xl border border-slate-100 p-4 relative">
                 {[...Array(7)].map((_, i) => (
                    <motion.div 
                        key={i}
                        animate={{ 
                            height: Math.max(12, volume * 400 * (Math.random() + 0.3)),
                            opacity: 0.5 + (volume * 10) 
                        }}
                        transition={{ duration: 0.1 }}
                        className="w-2.5 bg-gradient-to-t from-teal-500 to-cyan-400 rounded-full"
                    />
                 ))}
                 {volume < 0.01 && !isAiSpeakingRef.current && (
                     <div className="absolute text-slate-400 text-xs font-medium flex items-center gap-2">
                         <Volume2 className="w-3 h-3" /> Listening...
                     </div>
                 )}
                 {isAiSpeakingRef.current && (
                     <div className="absolute text-teal-600 text-xs font-medium flex items-center gap-2">
                         <Volume2 className="w-3 h-3 animate-pulse" /> Kiri is speaking...
                     </div>
                 )}
              </div>
              
              {statusMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-xl text-sm font-medium border border-green-200"
                  >
                      <FileSpreadsheet className="w-4 h-4" />
                      {statusMessage}
                  </motion.div>
              )}

              <div className="flex gap-4 w-full">
                <button 
                    onClick={stopSession}
                    className="flex-1 bg-red-50 text-red-500 font-medium py-3 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                    <Phone className="w-4 h-4 rotate-135" /> End Call
                </button>
              </div>
              
              <p className="text-xs text-slate-300 text-center px-4">
                Session will auto-close if silence is detected for 8 seconds.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={isActive ? stopSession : startSession}
        disabled={isConnecting}
        className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-2xl shadow-[0_8px_24px_rgba(51,153,153,0.3)] hover:shadow-[0_12px_32px_rgba(51,153,153,0.4)] transition-all duration-300 text-lg font-semibold"
      >
        {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
            <>
                <Radio className="w-5 h-5 mr-1 animate-pulse" />
                Talk to AI
            </>
        )}
      </button>
    </>
  );
}