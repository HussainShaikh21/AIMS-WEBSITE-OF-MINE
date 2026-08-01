import React from 'react';

interface AIMSLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'full' | 'icon-only';
  textColor?: string;
}

export const AIMSLogo: React.FC<AIMSLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'full',
  textColor = 'text-slate-900',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const badgeSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Emblem */}
      <div className={`relative flex-shrink-0 ${badgeSize} drop-shadow-md`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Emerald Green Ring Gradient */}
            <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064e3b" />
            </radialGradient>

            {/* Inner Circle Gradient */}
            <radialGradient id="innerGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </radialGradient>

            {/* Curved Path for Top Text */}
            <path
              id="topTextPath"
              d="M 28,100 A 72,72 0 1,1 172,100"
              fill="none"
            />
            {/* Curved Path for Bottom Text */}
            <path
              id="bottomTextPath"
              d="M 172,100 A 72,72 0 0,1 28,100"
              fill="none"
            />
          </defs>

          {/* Outer Emerald Circle */}
          <circle cx="100" cy="100" r="96" fill="url(#ringGrad)" stroke="#065f46" strokeWidth="3" />

          {/* White Border Separation Line */}
          <circle cx="100" cy="100" r="76" fill="none" stroke="#ffffff" strokeWidth="2.5" />

          {/* Inner Cyan-White Field */}
          <circle cx="100" cy="100" r="74" fill="url(#innerGrad)" />

          {/* Top Curved Text: ASIAN INSTITUTE OF MEDICAL SCIENCES */}
          <text fill="#ffffff" fontSize="11.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.2">
            <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
              ASIAN INSTITUTE OF MEDICAL SCIENCES
            </textPath>
          </text>

          {/* Bottom Curved Text: AIMS */}
          <text fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="3">
            <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
              AIMS
            </textPath>
          </text>

          {/* Center Graphic Figure */}
          <g transform="translate(100, 105) scale(0.9)">
            {/* Red Swirl / Moon Top Motif */}
            <path
              d="M -12,-38 C -4,-46 12,-46 16,-38 C 10,-32 -4,-32 -12,-38 Z"
              fill="#b91c1c"
            />
            <circle cx="4" cy="-38" r="4" fill="#991b1b" />

            {/* Human Arms & Legs Outstretched Outline */}
            <path
              d="M -50,-24 Q -18,-16 0,-2 Q 18,-16 50,-24 Q 24,-12 16,8 Q 28,34 38,50 Q 22,46 12,24 Q 0,16 -12,24 Q -22,46 -38,50 Q -28,34 -16,8 Q -24,-12 -50,-24 Z"
              fill="none"
              stroke="#0f172a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Golden Tree / Spine Trunk Motif */}
            <g fill="#d97706" stroke="#b45309" strokeWidth="0.5">
              <path d="M 0,-14 L 3,-8 L -3,-8 Z" />
              <path d="M 0,-8 L 6,-2 L -6,-2 Z" />
              <path d="M 0,-2 L 9,5 L -9,5 Z" />
              <path d="M 0,5 L 11,13 L -11,13 Z" />
              <rect x="-2.5" y="13" width="5" height="18" rx="1" fill="#b45309" />
            </g>
          </g>
        </svg>
      </div>

      {/* Optional Title Label */}
      {showText && variant === 'full' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <h1 className={`text-lg sm:text-xl font-extrabold tracking-tight ${textColor}`}>
              ASIAN INSTITUTE OF MEDICAL SCIENCES
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-black bg-emerald-700 text-white px-2 py-0.5 rounded tracking-wider uppercase">
              AIMS
            </span>
            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">
              Healthcare Redefined
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
