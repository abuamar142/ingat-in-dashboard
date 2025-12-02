/**
 * WhatsApp link generation utilities
 */

export interface WhatsAppLinkParams {
  number: string; // Bot number without formatting
  text?: string; // Pre-filled message (optional)
}

/**
 * Generates a WhatsApp link in wa.me format
 * @param params - WhatsApp link parameters
 * @returns Formatted WhatsApp link
 */
export function generateWhatsAppLink(params: WhatsAppLinkParams): string {
  const formattedNumber = params.number.replace(/\D/g, "");
  const baseUrl = `https://wa.me/${formattedNumber}`;
  return params.text ? `${baseUrl}?text=${encodeURIComponent(params.text)}` : baseUrl;
}

/**
 * Bot number constant (from environment variable)
 */
export const BOT_NUMBER = process.env.NEXT_PUBLIC_BOT_WHATSAPP_NUMBER || "";

/**
 * Bot number with country code
 */
export const BOT_NUMBER_WITH_COUNTRY_CODE = `62${BOT_NUMBER.replace(/^0/, "")}`;

/**
 * Generates WhatsApp link for the Ingat-In bot
 * @param text - Optional pre-filled message
 * @returns WhatsApp link for the bot
 */
export function generateBotWhatsAppLink(text?: string): string {
  return generateWhatsAppLink({
    number: BOT_NUMBER_WITH_COUNTRY_CODE,
    text,
  });
}
