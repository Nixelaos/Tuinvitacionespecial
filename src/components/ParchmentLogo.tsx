import React from 'react';

interface ParchmentLogoProps {
  className?: string;
  size?: number;
}

/**
 * Logo de Pergamino con Rollo Tradicional (sin timbre / sin sello de lacre)
 * Estilo editorial de pergamino desenrollado con rollos cilíndricos y texto caligráfico.
 */
export const ParchmentLogo: React.FC<ParchmentLogoProps> = ({
  className = 'w-6 h-6',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scrollPaperGrad" x1="7" y1="6" x2="29" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="100%" stopColor="#F5ECE0" />
        </linearGradient>
      </defs>

      {/* Cuerpo principal del pergamino (hoja desenrollada) */}
      <path
        d="M 7 10 L 29 10 L 29 26 L 7 26 Z"
        fill="url(#scrollPaperGrad)"
      />

      {/* Rollo superior cilíndrico */}
      <path
        d="M 28 5.5 C 30.2 5.5 31.8 6.7 31.8 8.3 C 31.8 9.9 30.2 11.2 28 11.2 L 8 11.2 C 5.8 11.2 4.2 9.9 4.2 8.3 C 4.2 6.7 5.8 5.5 8 5.5 L 28 5.5 Z"
        fill="#FCF7ED"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Detalle interno espiral del rollo superior */}
      <path
        d="M 8 5.5 C 6.5 5.5 5.5 6.6 5.5 8 C 5.5 9.4 6.5 10.2 7.8 10.2"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Bordes laterales del pergamino */}
      <path
        d="M 7 11 V 25"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M 29 11 V 25"
        stroke="currentColor"
        strokeWidth="1.25"
      />

      {/* Rollo inferior cilíndrico */}
      <path
        d="M 28 24.8 C 30.2 24.8 31.8 26.1 31.8 27.7 C 31.8 29.3 30.2 30.5 28 30.5 L 8 30.5 C 5.8 30.5 4.2 29.3 4.2 27.7 C 4.2 26.1 5.8 24.8 8 24.8 L 28 24.8 Z"
        fill="#FCF7ED"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Detalle interno espiral del rollo inferior */}
      <path
        d="M 28 24.8 C 29.5 24.8 30.5 25.8 30.5 27.2 C 30.5 28.5 29.5 29.5 28.2 29.5"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Líneas manuscritas de la carta / invitación (sin timbre) */}
      <path
        d="M 11 15 H 25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M 11 18.2 H 25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 11 21.4 H 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
};
