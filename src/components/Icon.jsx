const P = {
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  cube: 'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
  cart: 'M3 4h2l2.5 11h10L20 7H6M9 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  bug: 'M9 7a3 3 0 016 0M7 10h10v4a5 5 0 01-10 0zM3 12h4M17 12h4M4 19l3-2M20 19l-3-2M12 10v9',
  radar: 'M12 12L18 6M12 21a9 9 0 119-9M12 17a5 5 0 115-5M12 12h.01',
  face: 'M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M9 10v1M15 10v1M9 15c1.5 1.5 4.5 1.5 6 0',
  server: 'M3 5h18v6H3zM3 13h18v6H3zM7 8h.01M7 16h.01',
  plug: 'M9 2v6M15 2v6M6 8h12v3a6 6 0 01-12 0zM12 17v5',
  cloud: 'M7 18a5 5 0 01-.5-9.97A6 6 0 0118 9.5a4.25 4.25 0 01-1 8.5z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  target: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 17a5 5 0 100-10 5 5 0 000 10zM12 12h.01',
  bot: 'M5 9h14v10H5zM12 9V5M12 5h.01M9 14h.01M15 14h.01M2 13v3M22 13v3',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 018 0v4',
  sun: 'M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M21 13A9 9 0 1111 3a7 7 0 0010 10z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12l5 5 9-10',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  pin: 'M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 12a2 2 0 100-4 2 2 0 000 4z',
  left: 'M15 6l-6 6 6 6',
  right: 'M9 6l6 6-6 6',
  play: 'M7 4l13 8-13 8z',
}

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={P[name]} />
    </svg>
  )
}
