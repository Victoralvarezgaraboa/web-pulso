/**
 * Datos identificativos y de tratamiento para el aviso legal y la política de
 * privacidad.
 *
 * IMPORTANTE — lo que aparece entre corchetes es un hueco pendiente y se ve en
 * la web tal cual, a propósito, igual que en `pulso.ts`. Queda uno: al
 * domicilio le faltan localidad, código postal y provincia. Una calle y un
 * número sueltos no identifican un sitio, y la LSSI exige domicilio.
 *
 * Y una advertencia que conviene no borrar: estos textos están redactados con
 * lo que se ha comprobado del propio sitio (qué se recoge, dónde se aloja, qué
 * terceros intervienen), pero NO los ha revisado un profesional de protección
 * de datos. Antes de dar el sitio por publicado en serio, que los lea uno.
 */

/** Fecha de revisión que se muestra en las dos páginas. Actualizarla al tocarlas. */
export const actualizado = '27 de agosto de 2026';

export const titular = {
  /** Se opera como persona física, así que aquí van nombre y apellidos. */
  nombre: 'Víctor Álvarez Garaboa',
  /** NIF. Obligatorio: la LSSI lo exige expresamente. Letra comprobada. */
  nif: '74893207D',
  /**
   * Domicilio. INCOMPLETO: falta localidad, código postal y provincia, y sin
   * eso no identifica un sitio. Se muestra el hueco al lado para que se vea.
   */
  domicilio: 'Osario, 7',
  domicilioIncompleto: '[LOCALIDAD, CÓDIGO POSTAL Y PROVINCIA]',
  nombreComercial: 'Pulso',
  web: 'pulsogestiona.es',
};

/**
 * Quién trata datos por cuenta de Pulso. Hay que tenerlos declarados: el
 * visitante tiene derecho a saber por dónde pasan sus datos.
 *
 * La lista es corta a propósito, y es corta porque se ha comprobado: el sitio
 * no lleva analítica, ni cookies, ni píxeles, ni formularios, y desde que las
 * tipografías se sirven desde el propio dominio no hace ni una petición a un
 * tercero al cargar.
 */
export const encargados = [
  {
    nombre: 'Render',
    papel: 'Alojamiento del sitio web y de las demos.',
    detalle:
      'Sirve las páginas. No recibe ningún dato que tú introduzcas, porque el sitio no tiene formularios: lo único que registra son los datos técnicos propios de cualquier servidor web.',
  },
  {
    nombre: 'Hostinger',
    papel: 'Registro del dominio y alojamiento del correo.',
    detalle:
      'Si escribes a una dirección de pulsogestiona.es, tu mensaje se guarda en sus servidores, dentro de la Unión Europea.',
  },
];

/** Lo que el sitio NO hace. Verificado sobre el código, no supuesto. */
export const noHacemos = [
  'No hay cookies de ningún tipo, ni propias ni de terceros.',
  'No hay analítica ni estadísticas de navegación: no sabemos quién entra ni qué mira.',
  'No hay píxeles de seguimiento ni publicidad.',
  'No hay formularios: la web no recoge ni un dato por sí misma.',
  'Las tipografías se sirven desde este mismo dominio, así que al cargar la página tu navegador no habla con nadie más.',
];

/** Autoridad de control ante la que se puede reclamar. */
export const aepd = {
  nombre: 'Agencia Española de Protección de Datos',
  web: 'https://www.aepd.es',
};
