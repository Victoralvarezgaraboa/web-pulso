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
    nombre: 'Generador de presupuestos · reformas',
    familia: 'Generadores',
    que: 'Presupuestos de obra y pintura en minutos, con precios propios.',
    detalle:
      'El industrial elige partidas de su propio catálogo y el presupuesto sale calculado, con su margen ya aplicado. Se acabó el folio con cuentas a mano en el coche.',
  },
  {
    nombre: 'Generador de presupuestos · climatización',
    familia: 'Generadores',
    que: 'Instalaciones de clima presupuestadas sobre catálogo propio.',
    detalle:
      'Mismo motor adaptado al sector: equipos, potencias y montaje. El presupuesto sale terminado y se envía por WhatsApp al cliente sin pasar por el ordenador.',
  },
  {
    nombre: 'Generador de presupuestos · electricidad',
    familia: 'Generadores',
    que: 'Instalaciones eléctricas, partida a partida.',
    detalle:
      'Cuadro, líneas, mecanismos y mano de obra. Cada partida arrastra su coste real, así que el margen deja de ser una corazonada.',
  },
  {
    nombre: 'FichaGenerator · ascensores',
    familia: 'Operación',
    que: 'Ficha técnica ITC AEM1 rellenada desde una foto de la placa.',
    detalle:
      'El técnico fotografía la placa de características y la herramienta lee la imagen y autorrellena los campos. Interfaz tipo kiosco, pensada para usarse con guantes y a pie de máquina.',
    destacado: 'Lectura automática de placas',
  },
  {
    nombre: 'Comparador de recambios · taller',
    familia: 'Operación',
    que: 'El precio de cada recambio, en todos tus proveedores a la vez.',
    detalle:
      'Compara al instante y compra siempre al mejor precio. Y como cada compra queda registrada, el cierre del mes deja de tener el agujero negro de "material varios".',
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
  /** Descripción tomada del propio muro, para que las dos webs no se contradigan. */
  gancho: string;
  /** Lo concreto que se ve al abrirla. Sirve para que nadie entre a ciegas. */
  dentro: string;
  archivo: string;
}

export const demos: Demo[] = [
  {
    nombre: 'Fitness y box',
    sector: 'Gimnasios',
    tipo: 'panel',
    gancho:
      'Semáforo de bajas y control de cuotas para detectar socios en riesgo antes de que se vayan.',
    dentro: 'Radiografía económica del año, trimestres, tarifas, ocupación por turno y nevera.',
    archivo: 'fitness.html',
  },
  {
    nombre: 'Música y eventos',
    sector: 'Grupos y salas',
    tipo: 'panel',
    gancho:
      'Rentabilidad por bolo: cachés, gastos y merchandising, con el beneficio real de cada actuación.',
    dentro: 'Aportación por evento, detalle de cada bolo y stock de merch.',
    archivo: 'eventos.html',
  },
  {
    nombre: 'Taller · recambios',
    sector: 'Automoción',
    tipo: 'herramienta',
    gancho:
      'Compara al instante el precio de cada recambio entre tus proveedores y compra siempre al mejor precio.',
    dentro: 'Lista de compra con el precio de cada proveedor enfrentado.',
    archivo: 'taller.html',
  },
  {
    nombre: 'Electricidad',
    sector: 'Instaladores',
    tipo: 'herramienta',
    gancho:
      'Presupuestos de instalación en minutos: mano de obra y material, con catálogo cargado y PDF al momento.',
    dentro: 'Cabecera, partidas por capítulo y PDF listo para enviar.',
    archivo: 'generador.html',
  },
  {
    nombre: 'Reformas y obra',
    sector: 'Construcción',
    tipo: 'herramienta',
    gancho:
      'Presupuestos por capítulos: albañilería, fontanería, pintura, carpintería… con PDF al momento.',
    dentro: 'Capítulos de obra, mediciones y precios propios.',
    archivo: 'reformas.html',
  },
  {
    nombre: 'Clima y aire acondicionado',
    sector: 'Climatización',
    tipo: 'herramienta',
    gancho:
      'Presupuestos con catálogo de equipos de aire acondicionado e instalación, con PDF al momento.',
    dentro: 'Equipos por potencia, instalación y envío directo por WhatsApp.',
    archivo: 'clima.html',
  },
];

export const enlaceDemo = (d: Demo) => `${muroDemos}/${d.archivo}`;
