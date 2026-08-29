import { muroDemos } from './herramientas';

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

export const siteMeta = { title: 'Pulso | Sistemas a medida para tu negocio', description: 'Diseñamos soluciones a medida para automatizar tareas, ordenar la información y dar control real a tu negocio.' } as const;
export const navigation = [{ href:'#soluciones',label:'Soluciones'},{ href:'#casos',label:'Casos'},{ href:'/herramientas#demos',label:'Demos'},{ href:'#metodo',label:'Cómo trabajamos'}] as const;
export const problems = [
  { number:'01',title:'Presupuestos lentos o repetitivos',text:'Creamos una herramienta para generarlos con rapidez, coherencia y tu forma real de trabajar.' },
  { number:'02',title:'Compras, albaranes y facturas dispersos',text:'Centralizamos documentos y preparamos su lectura, clasificación y control.' },
  { number:'03',title:'Correos que se acumulan sin criterio',text:'Separamos lo importante y llevamos cada dato al lugar donde realmente sirve.' },
  { number:'04',title:'Un catálogo que no vende porque no está conectado',text:'Conectamos producto, web y procesos para convertir el catálogo en una herramienta comercial.' },
  { number:'05',title:'Datos que existen, pero no ayudan a decidir',text:'Transformamos la actividad diaria en una lectura útil de ventas, compras, facturación y márgenes.' },
] as const;
export const useCases = [
  { sector:'Oficio · Electricista',title:'Del aviso al presupuesto, sin volver a escribirlo todo.',problem:'Notas, mediciones y precios viven en sitios distintos.',solution:'Un generador adaptado a sus partidas crea presupuestos claros y reutilizables.',result:'Menos administración entre trabajos y respuestas más rápidas.',demoHref:`${muroDemos}/generador.html`,demoLabel:'Probar generador' },
  { sector:'Administración',title:'Facturas y correos que llegan ya ordenados.',problem:'El equipo abre, renombra y clasifica cada documento a mano.',solution:'Un flujo identifica la información útil y prepara su revisión.',result:'Menos tareas repetitivas y más control sobre lo pendiente.',demoHref:`${muroDemos}/facturas.html`,demoLabel:'Ver facturación automática' },
  { sector:'Comercio · Catálogo',title:'La web y la operación hablan el mismo idioma.',problem:'El catálogo online queda separado del producto y la gestión diaria.',solution:'Diseñamos la presencia digital alrededor del catálogo y su flujo real.',result:'Una herramienta comercial conectada, no un escaparate aislado.',demoHref:'/herramientas#demos',demoLabel:'Explorar demos' },
] as const;
export const methodSteps = [
  {number:'01',title:'Entendemos el flujo',text:'Vemos cómo trabaja hoy tu equipo, dónde repite tareas y qué información se pierde.'},
  {number:'02',title:'Diseñamos el sistema',text:'Convertimos ese recorrido en una herramienta concreta, simple y reconocible.'},
  {number:'03',title:'Lo conectamos',text:'Unimos documentos, canales y datos sin obligarte a empezar de cero.'},
  {number:'04',title:'Te acompañamos',text:'Ajustamos la herramienta con el uso real para que el equipo la haga suya.'},
] as const;

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
  primera: 'Claridad financiera para avanzar,',
  segunda: 'herramientas a medida para mejorar.',
  /** La versión de una línea, para atributos y metadatos. */
  completo: 'Pulso: claridad financiera para avanzar, herramientas a medida para mejorar.',
};
