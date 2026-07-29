import * as React from "react";

type P = React.SVGProps<SVGSVGElement>;
const S = (p: P) => ({
  width: 18, height: 18, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, ...p,
});

export const Bolt = (p: P) => (<svg {...S(p)}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>);
export const Home = (p: P) => (<svg {...S(p)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>);
export const Sun = (p: P) => (<svg {...S(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></svg>);
export const Moon = (p: P) => (<svg {...S(p)}><path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z" /></svg>);
export const Pipeline = (p: P) => (<svg {...S(p)}><rect x="3" y="4" width="6" height="16" rx="1.5" /><rect x="10" y="4" width="6" height="10" rx="1.5" /><rect x="17" y="4" width="4" height="13" rx="1.5" /></svg>);
export const Inbox = (p: P) => (<svg {...S(p)}><path d="M3 12h5l2 3h4l2-3h5" /><path d="M5 5h14l2 7v7H3v-7l2-7Z" /></svg>);
export const Doc = (p: P) => (<svg {...S(p)}><path d="M14 3H6v18h12V7l-4-4Z" /><path d="M14 3v4h4M8.5 13h7M8.5 17h5" /></svg>);
export const Field = (p: P) => (<svg {...S(p)}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>);
export const Cash = (p: P) => (<svg {...S(p)}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9v6M18 9v6" /></svg>);
export const Vault = (p: P) => (<svg {...S(p)}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="10" cy="12" r="3.2" /><path d="M10 8.8v6.4M6.8 12h6.4M17 9v6" /></svg>);
export const Workforce = (p: P) => (<svg {...S(p)}><circle cx="8" cy="8" r="3" /><path d="M2.5 20a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15 20a4.6 4.6 0 0 1 6.5-4" /></svg>);
export const Brain = (p: P) => (<svg {...S(p)}><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 5 1V4.5A2.5 2.5 0 0 0 9 4Z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-5 1" /></svg>);
export const Search = (p: P) => (<svg {...S(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>);
export const Bell = (p: P) => (<svg {...S(p)}><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>);
export const Menu = (p: P) => (<svg {...S(p)}><path d="M3 6h18M3 12h18M3 18h18" /></svg>);
export const Layers = (p: P) => (<svg {...S(p)}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>);
export const ArrowUp = (p: P) => (<svg {...S(p)}><path d="M12 19V5M6 11l6-6 6 6" /></svg>);
export const ArrowDown = (p: P) => (<svg {...S(p)}><path d="M12 5v14M6 13l6 6 6-6" /></svg>);
export const ArrowRight = (p: P) => (<svg {...S(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Plus = (p: P) => (<svg {...S(p)}><path d="M12 5v14M5 12h14" /></svg>);
export const Check = (p: P) => (<svg {...S(p)}><path d="m5 13 4 4L19 7" /></svg>);
export const Clock = (p: P) => (<svg {...S(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const Phone = (p: P) => (<svg {...S(p)}><path d="M4 5c0 9 6 15 15 15l1.5-3.5-4.5-2-1.8 1.8a11 11 0 0 1-4.3-4.3L11.7 10 9.7 5.5 6.2 4A2 2 0 0 0 4 5Z" /></svg>);
export const Chat = (p: P) => (<svg {...S(p)}><path d="M4 5h16v11H9l-4 3v-3H4V5Z" /></svg>);
export const Calendar = (p: P) => (<svg {...S(p)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>);
export const Truck = (p: P) => (<svg {...S(p)}><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.8" /><circle cx="17.5" cy="18" r="1.8" /></svg>);
export const User = (p: P) => (<svg {...S(p)}><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>);
export const Star = (p: P) => (<svg {...S(p)}><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 17.8 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3Z" /></svg>);
export const Warn = (p: P) => (<svg {...S(p)}><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v5M12 18h.01" /></svg>);
export const Info = (p: P) => (<svg {...S(p)}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>);
export const Route = (p: P) => (<svg {...S(p)}><circle cx="6" cy="18" r="2.4" /><circle cx="18" cy="6" r="2.4" /><path d="M8.4 18H14a3 3 0 0 0 0-6H10a3 3 0 0 1 0-6h5.6" /></svg>);
export const Wrench = (p: P) => (<svg {...S(p)}><path d="M15 6a4 4 0 0 0-5 5L4 17l3 3 6-6a4 4 0 0 0 5-5l-2.5 2.5-2-2L16 7Z" /></svg>);
export const Camera = (p: P) => (<svg {...S(p)}><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.4" /><path d="M8 7 9.5 4h5L16 7" /></svg>);
export const Send = (p: P) => (<svg {...S(p)}><path d="M4 12 20 4l-6 16-3-7-7-1Z" /></svg>);
export const Mic = (p: P) => (<svg {...S(p)}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>);
export const File = (p: P) => (<svg {...S(p)}><path d="M13 3H6v18h12V8l-5-5Z" /><path d="M13 3v5h5" /></svg>);
export const Chart = (p: P) => (<svg {...S(p)}><path d="M4 20V4M4 20h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></svg>);
export const Shield = (p: P) => (<svg {...S(p)}><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>);
export const Package = (p: P) => (<svg {...S(p)}><path d="m12 3 8 4.5v9L12 21 4 16.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>);
export const Map = (p: P) => (<svg {...S(p)}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></svg>);
export const Pin = (p: P) => (<svg {...S(p)}><path d="M12 21s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10Z" /><circle cx="12" cy="11" r="2" /></svg>);
export const Gauge = (p: P) => (<svg {...S(p)}><path d="M4 18a8 8 0 1 1 16 0" /><path d="m12 14 4-4" /><circle cx="12" cy="18" r="1" /></svg>);
export const Mail = (p: P) => (<svg {...S(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
export const Dots = (p: P) => (<svg {...S(p)}><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>);
export const External = (p: P) => (<svg {...S(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" /></svg>);
