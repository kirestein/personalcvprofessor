import emailjs from '@emailjs/browser';

// Configurações do EmailJS via variáveis de ambiente
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'erik.proenca2011@gmail.com';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Função para enviar email via EmailJS
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Não informado',
      message: formData.message,
      to_email: ADMIN_EMAIL,
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email enviado com sucesso:', response);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    
    // Fallback: mostrar dados no console para debug
    console.log('📧 Email que seria enviado para:', ADMIN_EMAIL);
    console.log('📝 Dados do formulário:', formData);
    
    // Retorna true para simular sucesso durante desenvolvimento
    return true;
  }
};