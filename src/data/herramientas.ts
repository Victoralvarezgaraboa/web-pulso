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
    nombre: 'Control de compras · taller',
    familia: 'Operación',
    que: 'La lista de la compra del taller, con su coste al día.',
    detalle:
      'Qué hay que reponer, a qué proveedor y a qué precio. Alimenta directamente el cierre mensual: cada compra registrada es una fuga menos que se escapa sin verse.',
  },
  {
    nombre: 'Paneles de cierre por sector',
    familia: 'Análisis',
    que: 'La radiografía económica del negocio, en solo lectura.',
    detalle:
      'De la facturación al EBITDA, trimestre a trimestre, con punto de equilibrio y alertas de fuga. Un panel por sector, porque el motor de ingresos de un box no se parece en nada al de un grupo de música.',
  },
];

export interface Sector {
  nombre: string;
  motor: string;
  vigila: string;
}

/** Los sectores con panel demo funcionando. */
export const sectores: Sector[] = [
  {
    nombre: 'Gimnasios y boxes',
    motor: 'Cuotas de socios, bonos y nevera',
    vigila: 'Socios en riesgo de baja, ocupación por turno, margen de la nevera',
  },
  {
    nombre: 'Música y eventos',
    motor: 'Cachés por bolo y merchandising',
    vigila: 'Aportación por evento, cuadre de caja, stock de merch',
  },
  {
    nombre: 'Talleres',
    motor: 'Reparaciones y recambios',
    vigila: 'Compras por proveedor, precio de reposición, material a reponer',
  },
  {
    nombre: 'Reformas y pintura',
    motor: 'Obra presupuestada',
    vigila: 'Desviación entre presupuesto y coste real, margen por obra',
  },
  {
    nombre: 'Climatización',
    motor: 'Instalaciones y mantenimientos',
    vigila: 'Margen por instalación, recurrencia de mantenimientos',
  },
  {
    nombre: 'Electricidad',
    motor: 'Instalaciones y averías',
    vigila: 'Coste de partida, rentabilidad por tipo de trabajo',
  },
];

/** Muro público con los paneles de demostración. */
export const muroDemos = 'https://pulso-demos.onrender.com';
