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
  familia: 'Automatización' | 'Análisis' | 'Compras' | 'Generadores';
  que: string;
  detalle: string;
  destacado?: string;
}

export const herramientas: Herramienta[] = [
  {
    nombre: 'Generador automático de facturas',
    familia: 'Automatización',
    que: 'El último día del mes las facturas salen solas hacia tus clientes.',
    detalle:
      'Vas cargando los datos a lo largo del mes, o los dejas puestos de una vez. El último día se dispara solo: emite cada factura, la envía al correo de su cliente y te deja en el correo de la empresa el resumen de lo que ha mandado. Tu único trabajo es repasarlo. Y como corre en los servidores de Google, da igual que tu ordenador esté apagado.',
    destacado: 'Se dispara sola cada mes',
  },
  {
    nombre: 'Paneles a medida por sector',
    familia: 'Análisis',
    que: 'El panel de una consulta de nutrición no se parece al de un grupo de música.',
    detalle:
      'Cada oficio se mira con sus propios números. La consulta necesita la ficha del paciente con su evolución y su objetivo; el grupo, lo que deja cada bolo entre caché, gastos y merchandising. Mismo criterio de fondo, pantalla distinta.',
    destacado: 'Uno por sector',
  },
  {
    nombre: 'Compras y cierre del mes',
    familia: 'Compras',
    que: 'El precio real de cada artículo en tus proveedores, alimentado por tus propios albaranes.',
    detalle:
      'Fotografías cada albarán que entra y sus líneas se registran solas. Eso alimenta tu base de precios con lo que pagas de verdad, y cuando vas a comprar el sistema te propone proveedor con tus datos, no con una tarifa de catálogo que nadie ha actualizado. De paso te avisa de las referencias que te han subido sin decírtelo. Y como cada compra queda registrada, el cierre deja de tener el agujero negro de «material varios»: de la facturación al EBITDA, trimestre a trimestre, con punto de equilibrio y alertas de fuga.',
    destacado: 'Compra al mejor precio',
  },
  {
    nombre: 'Generador de presupuestos',
    familia: 'Generadores',
    que: 'Presupuestos terminados en minutos, sobre tu catálogo y tus precios de compra.',
    detalle:
      'Eliges las partidas, el generador aplica tu precio de compra actualizado y tu margen, y sale el presupuesto listo para enviar. Sobre la marcha, desde el móvil, sin pasar por el ordenador ni hacer cuentas a mano en el coche.',
    destacado: 'Precios de compra al día',
  },
];

/** Muro público con las demos. Cada una es enlazable directamente. */
/**
 * Las demos se sirven desde el propio dominio, no desde la direccion tecnica de
 * Render. Un cliente al que le mandas un enlace a onrender.com ve el andamio,
 * no la casa: la direccion es parte de lo que se vende.
 *
 * Los ficheros viven en public/demos y se despliegan con la web.
 */
export const muroDemos = 'https://pulsogestiona.es/demos';

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
    nombre: 'Facturación automática',
    sector: 'Cualquier oficio con cuotas',
    tipo: 'panel',
    gancho:
      'Lee cada día tu hoja de clientes recurrentes y el último día del mes emite y envía las facturas solo. Ahí se ve el proceso entero, incluido el correo de resumen que te llega.',
    archivo: 'facturas.html',
  },
  {
    nombre: 'Nutrición y entreno',
    sector: 'Consultas y entrenadores',
    tipo: 'herramienta',
    gancho:
      'Ficha del paciente con la evolución de cada medición, el progreso hacia el peso objetivo y el plan de dieta y entreno de la semana.',
    archivo: 'medicion.html',
  },
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
    nombre: 'Albaranes · lector',
    sector: 'Talleres, ferreterías y almacenes',
    tipo: 'herramienta',
    gancho:
      'Registras el albarán y sus precios pasan a mandar sobre las tarifas: cuando vayas a comprar esa pieza, el sistema te dirá a quién con lo que pagas tú de verdad.',
    archivo: 'albaranes.html',
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
