/**
 * Datos identificativos y de tratamiento para el aviso legal y la política de
 * privacidad.
 *
 * Los datos identificativos están completos. Si alguno cambia -domicilio,
 * forma jurídica- hay que tocarlo aquí y en ningún sitio más: las dos páginas
 * legales leen de este archivo.
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
  /** Domicilio completo, como pide la LSSI: vía, número, CP, localidad y provincia. */
  domicilio: 'Calle Osario, 7 · 29738 Rincón de la Victoria (Málaga)',
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
