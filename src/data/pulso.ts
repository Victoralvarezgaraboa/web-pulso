/**
 * Datos de Pulso que cambian con el tiempo o que todavía están sin decidir.
 * Todo lo que aparezca aquí entre corchetes es un hueco que hay que rellenar
 * antes de publicar: se ve en la web tal cual, a propósito, para que no se cuele.
 */

export const contacto = {
  /**
   * Correo al que llegan las peticiones. Es un alias: entra en el buzon de
   * comercial. Se usa "hola@" y no el buzon directo para poder redirigirlo
   * el dia que conteste otra persona, sin tocar la web ni reimprimir nada.
   */
  email: 'hola@pulsogestiona.es',
  /** Teléfono en formato internacional y sin signos, para el enlace de wa.me */
  whatsapp: '34654103406',
  /** El mismo número, escrito como se lee en España. */
  telefonoVisible: '654 10 34 06',
};

export const precio = {
  /**
   * Precio de entrada mientras se hace cartera. La etiqueta de lanzamiento no
   * es decorativa: es lo que permite subirlo más adelante sin que los primeros
   * clientes se sientan engañados. Si se sube, respetar el precio a quien ya
   * entró (o avisar con margen) y actualizar también `diseno/Main.dc.html`.
   */
  cuota: '49 €',
  periodo: '/ mes',
  etiqueta: 'Precio de lanzamiento',
  /** Condición de la prueba inicial. Es un compromiso real: revísalo antes de publicar. */
  prueba: 'Primer mes de prueba: si el cierre no te dice nada que no supieras, no lo pagas.',
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

/** Mensaje con el que se abre WhatsApp, para que no tengan que pensar qué escribir. */
const saludo = 'Hola, tengo un negocio pequeño y me gustaría saber cómo funciona Pulso.';

/** El enlace de WhatsApp solo es válido cuando hay un número de verdad. */
export const enlaceWhatsapp = /^\d{8,15}$/.test(contacto.whatsapp)
  ? `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(saludo)}`
  : null;

export const enlaceEmail = contacto.email.includes('@')
  ? `mailto:${contacto.email}?subject=${encodeURIComponent('Quiero mi primer cierre de Pulso')}`
  : null;

/**
 * El eslogan de la casa. Cierra el pie de la web y, palabra por palabra, cierra
 * también todos los correos comerciales que salen (rutina de las 09:35, en
 * `agentes/prompts/09-35-redaccion.md`). Va en dos mitades porque se compone en
 * dos líneas: es una promesa doble, el diagnóstico y la herramienta.
 *
 * Si se cambia aquí, hay que cambiarlo también en el prompt del comercial: que
 * la web y el correo digan cosas distintas es peor que no tener eslogan.
 */
export const eslogan = {
  primera: 'Claridad financiera para avanzar.',
  segunda: 'Herramientas a medida para mejorar.',
  /** La versión de una línea, para atributos y metadatos. */
  completo: 'Pulso: claridad financiera para avanzar. Herramientas a medida para mejorar.',
};
