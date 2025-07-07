# 📧 Configuração do EmailJS para Envio Real de Emails

## Passo 1: Criar Conta no EmailJS (GRATUITO)

1. Acesse: https://www.emailjs.com/
2. Clique em "Sign Up" e crie uma conta gratuita
3. Confirme seu email

## Passo 2: Configurar Serviço de Email

1. No painel do EmailJS, clique em "Email Services"
2. Clique em "Add New Service"
3. Escolha "Gmail" (recomendado)
4. Conecte sua conta Gmail: erik.proenca2011@gmail.com
5. O Service ID será algo como: `service_xxxxxxx`

## Passo 3: Criar Template de Email

1. Clique em "Email Templates"
2. Clique em "Create New Template"
3. Use este conteúdo:

**Subject:** Nova mensagem do portfólio - {{from_name}}

**Content:**

```
🔥 Nova mensagem do seu portfólio!

👤 Nome: {{from_name}}
📧 Email: {{from_email}}
📱 Telefone: {{phone}}

💬 Mensagem:
{{message}}

---
Este email foi enviado automaticamente do seu portfólio.
Responda diretamente para: {{reply_to}}
```

4. Salve o template. O Template ID será algo como: `template_xxxxxxx`

## Passo 4: Obter Chave Pública

1. Vá em "Account" → "General"
2. Copie a "Public Key"

## Passo 5: Atualizar o Código

✅ **TODAS AS CONFIGURAÇÕES JÁ FORAM APLICADAS!**

As seguintes configurações foram adicionadas ao arquivo `.env`:
- ✅ Service ID: `service_kb0vmaqc`
- ✅ Template ID: `template_eoe4b8v`
- ✅ Public Key: `lnJGnnt5QIqZ800Ck`

O arquivo `.env` foi adicionado ao `.gitignore` para manter suas credenciais seguras.

**Configuração atual no código:**
```typescript
// src/services/contactService.ts
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

## ✅ Depois de Configurar

1. Reinicie o servidor: `npm run dev`
2. Teste o formulário
3. Você receberá emails reais em: erik.proenca2011@gmail.com
4. O WhatsApp abrirá automaticamente para confirmação

## 🚀 Benefícios

- ✅ **100% Gratuito** (até 200 emails/mês)
- ✅ **Emails reais** direto para sua Gmail
- ✅ **WhatsApp automático** para backup
- ✅ **Sem servidor** necessário
- ✅ **Funciona em qualquer hospedagem**

## 📱 WhatsApp

O WhatsApp já está configurado para abrir automaticamente com sua mensagem formatada quando alguém envia pelo formulário!

Seu número: (11) 98616-5932 ✅
