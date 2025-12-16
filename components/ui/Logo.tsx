import React from "react";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 240 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Velocity Script Logo"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="15" y1="12" x2="45" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0d9488" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
      <linearGradient id="text-gradient" x1="130" y1="20" x2="200" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0d9488" />
        <stop offset="1" stopColor="#0891b2" />
      </linearGradient>
    </defs>

    {/* Abstract V Icon */}
    <path
      d="M15 12C15 12 20 38 25 38C30 38 45 12 45 12"
      stroke="url(#logo-gradient)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 22C28 22 32 38 35 38C38 38 48 22 48 22"
      stroke="#84cc16"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    
    {/* Brand Name */}
    <text
      x="62"
      y="34"
      fontFamily="Inter, sans-serif"
      fontWeight="700"
      fontSize="26"
      fill="#0f172a"
      style={{ letterSpacing: '-0.03em' }}
    >
      Velocity
    </text>
    <text
      x="166"
      y="34"
      fontFamily="Inter, sans-serif"
      fontWeight="500"
      fontSize="26"
      fill="url(#text-gradient)"
      style={{ letterSpacing: '-0.02em' }}
    >
      Script
    </text>
  </svg>
);
