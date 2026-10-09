export default function HeroSvg() {
  return (
    <svg
      className="art-svg"
      viewBox="0 0 640 740"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="art-title"
    >
      <title id="art-title">
        Golden mountain-line illustration within a luminous circular halo
      </title>
      <defs>
        <radialGradient id="glow" cx="50%" cy="49%" r="48%">
          <stop offset="0%" stopColor="#ab8b59" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#bd9e6c" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#b89a6d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5e4b30" />
          <stop offset="0.31" stopColor="#f2deb0" />
          <stop offset="0.67" stopColor="#a07a46" />
          <stop offset="1" stopColor="#382a1c" />
        </linearGradient>
        <linearGradient id="mountain" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#614b2f" />
          <stop offset="0.5" stopColor="#e1c699" />
          <stop offset="1" stopColor="#755839" />
        </linearGradient>
      </defs>
      <circle cx="320" cy="350" r="317" fill="url(#glow)" />
      <g fill="none" stroke="url(#ring)" strokeWidth="1.1" className="rings">
        <ellipse cx="322" cy="341" rx="224" ry="284" />
        <ellipse cx="322" cy="341" rx="202" ry="260" opacity="0.63" />
        <ellipse cx="322" cy="341" rx="178" ry="236" opacity="0.43" />
      </g>
      <g
        fill="none"
        stroke="url(#mountain)"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mountain-lines"
      >
        <path d="M42 504 176 421 218 445 322 254 422 401 464 383 601 508" />
        <path
          d="M37 533 176 451 219 476 321 288 421 434 464 412 603 541"
          opacity="0.74"
        />
        <path
          d="M36 561 176 484 221 507 323 325 419 465 467 449 602 565"
          opacity="0.5"
        />
        <path
          d="M50 586 179 517 226 540 320 361 421 502 462 483 597 591"
          opacity="0.28"
        />
        <path d="m263 362 59-108 58 85" strokeWidth="2" />
      </g>
      <g fill="#d8bd8c">
        <circle cx="130" cy="124" r="2" opacity="0.75" />
        <circle cx="504" cy="158" r="1.4" />
        <circle cx="551" cy="294" r="1.8" opacity="0.5" />
        <circle cx="98" cy="330" r="1.6" />
        <circle cx="474" cy="602" r="1" />
      </g>
    </svg>
  );
}
