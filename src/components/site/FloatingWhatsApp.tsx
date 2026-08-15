export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923498636573"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp — 0349-8636573"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 sm:h-16 sm:w-16"
      style={{ background: "#25D366" }}
    >
      {/* Pulse ring */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full animate-ping"
        style={{ background: "rgba(37,211,102,0.35)" }}
      />
      {/* WhatsApp SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="relative z-10 h-8 w-8"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.68 4.61 1.857 6.5L4 29l7.75-1.836A11.946 11.946 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Zm6.406 16.281c-.27.756-1.576 1.445-2.156 1.504-.553.056-1.074.26-3.617-.754-3.039-1.213-4.992-4.32-5.143-4.518-.152-.2-1.234-1.641-1.234-3.133 0-1.494.783-2.23 1.063-2.531.281-.301.611-.377.816-.377.203 0 .406.002.584.01.188.01.438-.07.686.523.256.609.867 2.102.943 2.254.076.152.127.328.027.527-.1.2-.152.324-.301.5-.152.178-.318.396-.453.531-.152.152-.309.317-.133.623.176.305.783 1.289 1.68 2.088 1.153 1.027 2.125 1.344 2.43 1.494.306.152.48.127.658-.076.177-.203.756-.881 1.058-1.184.203-.203.38-.152.641-.051.261.1 1.645.775 1.926.916.281.14.469.211.539.328.068.116.068.674-.203 1.326Z" />
      </svg>
    </a>
  );
}
