import React, { useState, useEffect, useId } from 'react';

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
  const uid = useId().replace(/:/g, '_');
  const [imgFailed, setImgFailed] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('aims_custom_logo');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleLogoUpdate = () => {
      try {
        const logo = localStorage.getItem('aims_custom_logo');
        setCustomLogo(logo);
        setImgFailed(false);
      } catch {
        // ignore
      }
    };

    window.addEventListener('aims_logo_updated', handleLogoUpdate);
    return () => window.removeEventListener('aims_logo_updated', handleLogoUpdate);
  }, []);

  const sizeMap = {
    sm: 'w-14 h-14',
    md: 'w-20 h-20 sm:w-26 sm:h-26',
    lg: 'w-28 h-28 sm:w-36 sm:h-36',
    xl: 'w-40 h-40 sm:w-56 sm:h-56',
  };

  const badgeSize = sizeMap[size] || sizeMap.md;

  const imageSource = customLogo || '/aims_logo.png';
  const conicGradient = 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #f43f5e, #f97316, #eab308, #10b981, #06b6d4)';

  return (
    <div className={`flex items-center gap-4 group ${className}`}>
      {/* Official AIMS Logo Display with Advanced Moving Colorful Light Ring & Glow */}
      <div className={`relative flex-shrink-0 ${badgeSize} flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300`}>
        {/* Outer Animated Glowing Aura (Soft Blur) */}
        <div
          className="absolute -inset-2 rounded-full blur-md opacity-75 group-hover:opacity-100 animate-rainbow-ring pointer-events-none transition-opacity"
          style={{ background: conicGradient }}
        />

        {/* Crisp Moving Rainbow Light Beam Border */}
        <div
          className="absolute -inset-1 rounded-full animate-rainbow-ring pointer-events-none shadow-lg"
          style={{ background: conicGradient }}
        />

        {/* Inner White Badge Container */}
        <div className="relative w-full h-full p-1.5 bg-gradient-to-br from-white via-slate-50 to-emerald-50/60 rounded-full shadow-xl flex items-center justify-center border border-white/80 overflow-hidden z-10">
          {!imgFailed ? (
          <img
            src={imageSource}
            alt="Asian Institute of Medical Sciences (AIMS) Official Logo"
            className="w-full h-full object-contain rounded-full"
            onError={() => {
              if (customLogo) {
                // If custom logo image fails, fallback to default aims_logo.png
                setCustomLogo(null);
              } else {
                setImgFailed(true);
              }
            }}
          />
        ) : (
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full select-none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
          >
            <defs>
              {/* Emerald Green Ring Gradient */}
              <linearGradient id={`${uid}-ringGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="45%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>

              {/* Inner Circle Radial Gradient */}
              <radialGradient id={`${uid}-innerGrad`} cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#f0fdf4" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </radialGradient>

              {/* Curved Path for Top Text */}
              <path
                id={`${uid}-topTextPath`}
                d="M 27,100 A 73,73 0 1,1 173,100"
                fill="none"
              />
              {/* Curved Path for Bottom Text */}
              <path
                id={`${uid}-bottomTextPath`}
                d="M 173,100 A 73,73 0 0,1 27,100"
                fill="none"
              />
            </defs>

            {/* Outer Emerald Circle Ring */}
            <circle cx="100" cy="100" r="96" fill={`url(#${uid}-ringGrad)`} />

            {/* White Border Inner Separation Line */}
            <circle cx="100" cy="100" r="72" fill="none" stroke="#ffffff" strokeWidth="2.5" />

            {/* Inner Light Field */}
            <circle cx="100" cy="100" r="70" fill={`url(#${uid}-innerGrad)`} />

            {/* Top Curved Text: ASIAN INSTITUTE OF MEDICAL SCIENCES */}
            <text
              fill="#ffffff"
              fontSize="10.8"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.8"
            >
              <textPath href={`#${uid}-topTextPath`} startOffset="50%" textAnchor="middle">
                ASIAN INSTITUTE OF MEDICAL SCIENCES
              </textPath>
            </text>

            {/* Bottom Curved Text: AIMS */}
            <text
              fill="#ffffff"
              fontSize="15"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="3"
            >
              <textPath href={`#${uid}-bottomTextPath`} startOffset="50%" textAnchor="middle">
                AIMS
              </textPath>
            </text>

            {/* CENTER EMBLEM ARTWORK */}
            <g transform="translate(100, 106) scale(0.92)">
              {/* Top Red Swirl Symbol (Interlocking C-curves) */}
              <g transform="translate(0, -38)">
                <path
                  d="M -9,-4 C -2,-10 10,-8 13,-2 C 7,2 -4,2 -9,-4 Z"
                  fill="#991b1b"
                />
                <path
                  d="M 9,4 C 2,10 -10,8 -13,2 C -7,-2 4,-2 9,4 Z"
                  fill="#b91c1c"
                />
              </g>

              {/* Human Outstretched Arms (Upper & Lower Contour Lines) */}
              <circle cx="-50" cy="-24" r="3.5" fill="#0f172a" />
              <circle cx="50" cy="-24" r="3.5" fill="#0f172a" />

              {/* Upper Arm Swoop Line */}
              <path
                d="M -50,-24 Q -16,-10 0,-2 Q 16,-10 50,-24"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* Lower Arm & Side Body Contour */}
              <path
                d="M -48,-18 Q -18,-2 -12,12 Q -24,34 -36,52"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M 48,-18 Q 18,-2 12,12 Q 24,34 36,52"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* Inner Leg Contour lines */}
              <path
                d="M -10,20 Q -18,36 -26,52"
                fill="none"
                stroke="#0f172a"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M 10,20 Q 18,36 26,52"
                fill="none"
                stroke="#0f172a"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Center Golden/Amber Tree Spine Motif */}
              <g fill="#d97706" stroke="#b45309" strokeWidth="0.4">
                <rect x="-1.5" y="-12" width="3" height="34" rx="1" fill="#b45309" />
                <path d="M 0,-14 L 4,-8 L -4,-8 Z" />
                <path d="M 0,-7 L 7,-1 L -7,-1 Z" />
                <path d="M 0,0 L 9,6 L -9,6 Z" />
                <path d="M 0,7 L 11,14 L -11,14 Z" />
              </g>
            </g>
          </svg>
        )}
        </div>
      </div>

      {/* Title & Subtitle */}
      {showText && variant === 'full' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-tight">
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${textColor} group-hover:text-emerald-700 transition-colors`}>
              ASIAN INSTITUTE OF MEDICAL SCIENCES
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-black bg-emerald-700 group-hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded shadow-sm tracking-wider uppercase transition-colors">
              AIMS
            </span>
            <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-widest">
              Healthcare Redefined
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

