/**
 * Las herramientas que Pulso ha construido y tiene en producción, y los
 * sectores con panel demo.
 *
 * Todo lo de aquí es real y está desplegado. Si se añade algo, que sea porque
 * existe y funciona: la credibilidad de un servicio financiero se pierde una
 * sola vez.
 */

export interface Herramienta {
  nombre: string;
  familia: 'Generadores' | 'Operación' | 'Análisis';
  que: string;
  detalle: string;
  destacado?: string;
}

export const herramientas: Herramienta[] = [
  {
    nombre: 'Generador de presupuestos',
    familia: 'Generadores',
    que: 'Presupuestos terminados en minutos, sobre tu catálogo y tus precios de compra.',
    detalle:
      'Eliges las partidas, el generador aplica tu precio de compra actualizado y tu margen, y sale el presupuesto listo para enviar. Sobre la marcha, desde el móvil, sin pasar por el ordenador ni hacer cuentas a mano en el coche.',
    destacado: 'Precios de compra al día',
  },
  {
    nombre: 'Comparador de recambios · taller',
    familia: 'Operación',
    que: 'El precio de cada recambio, en todos tus proveedores a la vez.',
    detalle:
      'Compara al instante y compra siempre al mejor precio. Y como cada compra queda registrada, el cierre del mes deja de tener el agujero negro de «material varios».',
    destacado: 'Compra al mejor precio',
  },
  {
    nombre: 'Paneles de cierre por sector',
    familia: 'Análisis',
    que: 'La radiografía económica del negocio, en solo lectura.',
    detalle:
      'De la facturación al EBITDA, trimestre a trimestre, con punto de equilibrio y alertas de fuga. Un panel por sector, porque el motor de ingresos de un box no se parece en nada al de un grupo de música.',
  },
];

/** Muro público con las demos. Cada una es enlazable directamente. */
export const muroDemos = 'https://pulso-demos.onrender.com';

export interface Demo {
  nombre: string;
  sector: string;
  /** 'panel' = lo que consultas cada mes · 'herramienta' = lo que usas cada día */
  tipo: 'panel' | 'herramienta';
  gancho: string;
  archivo: string;
}

export const demos: Demo[] = [
  {
    nombre: 'Fitness y box',
    sector: 'Gimnasios',
    tipo: 'panel',
    gancho: 'Semáforo de bajas y control de cuotas para detectar socios en riesgo antes de que se vayan.',
    archivo: 'fitness.html',
  },
  {
    nombre: 'Música y eventos',
    sector: 'Grupos y salas',
    tipo: 'panel',
    gancho: 'Rentabilidad por bolo: cachés, gastos y merchandising, con el beneficio real de cada actuación.',
    archivo: 'eventos.html',
  },
  {
    nombre: 'Taller · recambios',
    sector: 'Automoción',
    tipo: 'herramienta',
    gancho: 'Compara al instante el precio de cada recambio entre tus proveedores.',
    archivo: 'taller.html',
  },
  {
    nombre: 'Electricidad',
    sector: 'Instaladores',
    tipo: 'herramienta',
    gancho: 'Presupuestos de instalación en minutos, con catálogo cargado y PDF al momento.',
    archivo: 'generador.html',
  },
  {
    nombre: 'Reformas y obra',
    sector: 'Construcción',
    tipo: 'herramienta',
    gancho: 'Presupuestos por capítulos: albañilería, fontanería, pintura, carpintería…',
    archivo: 'reformas.html',
  },
  {
    nombre: 'Clima y aire acondicionado',
    sector: 'Climatización',
    tipo: 'herramienta',
    gancho: 'Catálogo de equipos e instalación, con PDF y envío directo por WhatsApp.',
    archivo: 'clima.html',
  },
];

export const enlaceDemo = (d: Demo) => `${muroDemos}/${d.archivo}`;
