import React from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

// Componente SVG do WhatsApp
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Fundo circular verde do WhatsApp */}
    <circle cx="12" cy="12" r="12" fill="#25D366"/>
    
    {/* Logo do WhatsApp em branco */}
    <path 
      d="M17.05 7.05C16.07 6.07 14.78 5.53 13.43 5.53C10.59 5.53 8.27 7.85 8.27 10.69C8.27 11.57 8.5 12.43 8.93 13.18L8.23 15.77L10.9 15.08C11.62 15.47 12.42 15.68 13.23 15.68H13.43C16.27 15.68 18.59 13.36 18.59 10.52C18.59 9.17 18.05 7.88 17.05 7.05ZM13.43 14.8H13.27C12.54 14.8 11.82 14.61 11.19 14.25L11.05 14.17L9.57 14.53L9.94 13.08L9.85 12.93C9.45 12.27 9.23 11.49 9.23 10.69C9.23 8.38 11.12 6.49 13.43 6.49C14.53 6.49 15.57 6.92 16.34 7.69C17.11 8.46 17.54 9.5 17.54 10.6C17.54 12.83 15.65 14.8 13.43 14.8ZM15.64 11.8C15.54 11.75 15.02 11.5 14.93 11.47C14.84 11.44 14.78 11.42 14.71 11.52C14.64 11.62 14.45 11.85 14.39 11.92C14.33 11.99 14.27 12 14.17 11.95C14.07 11.9 13.74 11.79 13.35 11.44C13.05 11.17 12.83 10.84 12.77 10.74C12.71 10.64 12.76 10.58 12.81 10.53C12.85 10.49 12.9 10.42 12.95 10.36C13 10.3 13.02 10.26 13.05 10.19C13.08 10.12 13.06 10.06 13.04 10.01C13.02 9.96 12.8 9.44 12.72 9.24C12.64 9.05 12.56 9.07 12.5 9.07H12.31C12.24 9.07 12.14 9.09 12.05 9.19C11.96 9.29 11.69 9.54 11.69 10.06C11.69 10.58 12.06 11.08 12.11 11.15C12.16 11.22 12.8 12.23 13.8 12.63C14.8 13.03 14.8 12.89 15.02 12.87C15.24 12.85 15.66 12.63 15.74 12.39C15.82 12.15 15.82 11.95 15.78 11.87C15.74 11.83 15.68 11.81 15.64 11.8Z" 
      fill="white"
    />
  </svg>
);

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Olá! Vim através do seu portfólio e gostaria de conversar.",
  className = ""
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <button
        onClick={handleWhatsAppClick}
        className={`
          bg-white hover:bg-gray-50 
          w-14 h-14 md:w-16 md:h-16 
          rounded-full shadow-lg 
          flex items-center justify-center
          transition-all duration-300 
          hover:scale-110 hover:shadow-xl
          active:scale-95
          cursor-pointer
          group
          ${className}
        `}
        title="Fale conosco no WhatsApp"
        aria-label="Abrir conversa no WhatsApp"
      >
        <WhatsAppIcon 
          size={28} 
          className="group-hover:scale-110 transition-transform duration-300" 
        />
        
        {/* Efeito de pulse sutil */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping" />
      </button>
    </div>
  );
};
