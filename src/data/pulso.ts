/**
 * Datos de Pulso que cambian con el tiempo o que todavía están sin decidir.
 * Todo lo que aparezca aquí entre corchetes es un hueco que hay que rellenar
 * antes de publicar: se ve en la web tal cual, a propósito, para que no se cuele.
 */

export const contacto = {
  /** Correo al que llegan las peticiones de primer cierre. */
  email: '[TU EMAIL]',
  /** Teléfono en formato internacional y sin signos, p. ej. 34600111222 */
  whatsapp: '[TU NÚMERO]',
};

export const precio = {
  /** Cuota mensual, con moneda. p. ej. '120 €' */
  cuota: '[TU PRECIO]',
  periodo: '/ mes',
  /** Condición de la prueba inicial. Revísala antes de publicar. */
  prueba:
    'Primer mes de prueba: si el cierre no te dice nada que no supieras, no lo pagas. [confirmar condiciones]',
};

export const incluye = [
  'Cierre de gestión cada mes',
  'Panel privado de solo lectura',
  'Alertas de fuga y de oportunidad',
  'Excel de control montado a tu medida',
  'Una persona al otro lado, no un chatbot',
];

/** Del manual de marca: qué es y qué no es Pulso. */
export const noEs = [
  'Una gestoría ni tu contable oficial',
  'Otro software más que rellenas tú',
  'Un gasto fijo sin retorno',
  'Humo, jerga y promesas vacías',
];

export const siEs = [
  'Analistas que traducen tus números',
  'El monitor que avisa de fugas y oportunidades',
  'Saber dónde estás, cada mes, sin sustos',
];

/** El enlace de WhatsApp solo es válido cuando hay un número de verdad. */
export const enlaceWhatsapp = /^\d{8,15}$/.test(contacto.whatsapp)
  ? `https://wa.me/${contacto.whatsapp}`
  : null;

export const enlaceEmail = contacto.email.includes('@') ? `mailto:${contacto.email}` : null;
