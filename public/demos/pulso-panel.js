/* ============================================================
   PULSO · Panel de cliente · lógica
   Un solo archivo para los dos paneles. La página fija
   window.PANEL_CLIENTE = 'box' | 'banda' antes de cargarlo.

   Los datos son de demostración, pero cuadran entre sí a
   propósito: el cuadrante, "hoy en el box" y el resumen salen
   del MISMO generador, y el punto de equilibrio se deriva del
   puente de EBITDA. Si se cambia una cifra, cambiarla en su
   origen, no en el texto.
   ============================================================ */
(function () {
  'use strict';

  var CLIENTE = window.PANEL_CLIENTE === 'banda' ? 'banda' : 'box';
  var ES_BOX = CLIENTE === 'box';

  var COACH_COLOR = { Nuria: '#5CE3A3', 'Iv\u00e1n': '#62B6FF', Marta: '#F3B64A', '\u00c1lex': '#B8B2C2' };
  var CLASE_COLOR = { Funcional: '#62B6FF', CrossFit: '#5CE3A3', Halterofilia: '#F3B64A' };
  var COACHES = Object.keys(COACH_COLOR);

  var ICONOS = {
    Funcional:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" style="flex-shrink:0"><path d="M9 9a3 3 0 0 1 6 0"/><circle cx="12" cy="15.5" r="5.5"/></svg>',
    CrossFit:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" style="flex-shrink:0"><path d="M8 3v9M16 3v9"/><circle cx="8" cy="16.5" r="4"/><circle cx="16" cy="16.5" r="4"/></svg>',
    Halterofilia:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" style="flex-shrink:0"><path d="M2 12h20"/><path d="M6 6.5v11M9.5 8.5v7M14.5 8.5v7M18 6.5v11"/></svg>'
  };

  var CONTACTO = { whatsapp: '34654103406', email: 'hola@pulsogestiona.es' };
  var PROVEEDOR = 'pedidos@proveedor.es';

  // ---------- estado ----------
  var S = {
    vista: 'op',
    rotaAbierta: false,
    rota: 'semana',
    periodo: 'mes',
    reg: 'venta',
    uds: {},
    ev: { fecha: '2026-08-28', sala: '', cache: '', entradas: '', furgoneta: '', tecnico: '', dietas: '', otros: '' }
  };

  // ---------- utilidades ----------
  function eur(n) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  }
  function eur2(n) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function attr(s) {
    return esc(s);
  }
  function pct1(n) {
    return n.toFixed(1).replace('.', ',') + ' %';
  }
  function estadoStock(stock, min) {
    if (stock < min) return 'reponer';
    if (stock < min * 1.3) return 'justo';
    return 'ok';
  }
  var ETIQUETA_ESTADO = { reponer: 'Reponer', justo: 'Justo', ok: 'OK' };

  function mailto(destino, asunto, cuerpo) {
    return 'mailto:' + destino + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
  }
  function wa(texto) {
    return 'https://wa.me/' + CONTACTO.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  // ---------- datos del box ----------
  var CICLO = [
    'Funcional', 'CrossFit', 'CrossFit', 'Halterofilia', 'Funcional', 'CrossFit', 'Funcional', 'Halterofilia',
    'Funcional', 'CrossFit', 'CrossFit', 'Halterofilia', 'CrossFit', 'Funcional', 'CrossFit'
  ];
  var DIAS = ['Lun 17', 'Mar 18', 'Mi\u00e9 19', 'Jue 20', 'Vie 21', 'S\u00e1b 22'];
  var RESERVAS = { '09:00': 16, '10:00': 11, '11:00': 14, '12:00': 13, '13:00': 7 };
  var AFORO = 16;

  // Clase cada hora de 7:00 a 21:00 de lunes a viernes; s\u00e1bado de 9:00 a 14:00.
  function cuadrante() {
    var horas = {};
    var clases = {};
    var turnos = [];
    for (var i = 0; i < 15; i++) {
      var hora = 7 + i;
      var etiqueta = (hora < 10 ? '0' : '') + hora + ':00';
      var celdas = [];
      for (var d = 0; d < 6; d++) {
        if (d === 5 && (hora < 9 || hora > 13)) {
          celdas.push(null);
          continue;
        }
        var clase = CICLO[(i + d) % CICLO.length];
        var coach = COACHES[(i * 2 + d) % COACHES.length];
        horas[coach] = (horas[coach] || 0) + 1;
        clases[clase] = (clases[clase] || 0) + 1;
        celdas.push({ clase: clase, coach: coach });
      }
      turnos.push({ hora: etiqueta, celdas: celdas });
    }
    return { turnos: turnos, horas: horas, clases: clases };
  }

  var STOCK = [
    ['Camiseta box \u00b7 M', 'Merch', 4, 8, 11],
    ['Camiseta box \u00b7 L', 'Merch', 12, 8, 11],
    ['Comba doble', 'Merch', 2, 4, 9],
    ['Bebida isot\u00f3nica', 'Nevera', 9, 24, 1.1],
    ['Barrita proteica', 'Nevera', 31, 20, 0.9],
    ['Batido listo', 'Nevera', 6, 18, 1.4],
    ['Agua 50 cl', 'Nevera', 48, 24, 0.5]
  ];

  var SEMAFORO = [
    { n: 148, etiqueta: 'Al d\u00eda \u00b7 vienen con ritmo', clase: 'verde', color: '#5CE3A3' },
    { n: 11, etiqueta: '\u00c1mbar \u00b7 bajan el ritmo', clase: 'ambar', color: '#F3B64A' },
    { n: 3, etiqueta: 'Rojo \u00b7 a punto de irse', clase: 'rojo', color: '#FF8169' }
  ];

  var EN_RIESGO = [
    ['Carlos M.', 'Sin reservar 14 d\u00edas', '8 ago', '#FF8169'],
    ['Ana R.', 'Sin reservar 11 d\u00edas', '11 ago', '#FF8169'],
    ['Jorge P.', 'Sin reservar 10 d\u00edas', '12 ago', '#FF8169'],
    ['Luc\u00eda B.', '1 clase/semana \u00b7 3 semanas', '19 ago', '#F3B64A'],
    ['Diego S.', '1 clase/semana \u00b7 3 semanas', '20 ago', '#F3B64A']
  ];

  // ---------- datos del grupo ----------
  var PVP = {
    'Camiseta gira \u00b7 S': 18,
    'Camiseta gira \u00b7 M': 18,
    'Camiseta gira \u00b7 L': 18,
    'Vinilo LP': 21,
    CD: 10,
    'Tote bag': 12
  };

  var CAMPOS_EV = [
    ['fecha', 'Fecha', 'date', ''],
    ['sala', 'Sala y ciudad', 'text', 'Sala Tr\u00e9bol \u00b7 Zaragoza'],
    ['cache', 'Cach\u00e9 (\u20ac)', 'number', '1200'],
    ['entradas', 'Entradas vendidas', 'number', '148'],
    ['furgoneta', 'Furgoneta (\u20ac)', 'number', '210'],
    ['tecnico', 'T\u00e9cnico (\u20ac)', 'number', '250'],
    ['dietas', 'Dietas (\u20ac)', 'number', '100'],
    ['otros', 'Otros gastos (\u20ac)', 'number', '0']
  ];

  var CAJA_NOCHE = [
    { etiqueta: 'Taquilla', valor: 1200, detalle: '148 entradas \u00b7 cach\u00e9 fijo', cuadro: 'verde', color: '#5CE3A3' },
    { etiqueta: 'Merch de la noche', valor: 340, detalle: '31 unidades vendidas', cuadro: '', color: '#62B6FF' },
    { etiqueta: 'Gastos de la noche', valor: 560, detalle: 'furgoneta, t\u00e9cnico y dietas', cuadro: '', color: '#FF8169' },
    { etiqueta: 'Resultado', valor: 980, detalle: '196 \u20ac por cabeza', cuadro: 'verde', color: '#5CE3A3' }
  ];

  var NOCHE = [
    ['Cach\u00e9 de sala', 1200, false],
    ['Camisetas (18 uds)', 216, false],
    ['Vinilos (4 uds)', 84, false],
    ['CD (9 uds)', 40, false],
    ['Furgoneta y gasolina', -210, true],
    ['T\u00e9cnico de sonido', -250, true],
    ['Dietas', -100, true]
  ];

  var MERCH = [
    ['Camiseta gira \u00b7 S', 3, 5, 8],
    ['Camiseta gira \u00b7 M', 9, 2, 8],
    ['Camiseta gira \u00b7 L', 7, 11, 8],
    ['Vinilo LP', 4, 14, 6],
    ['CD', 6, 22, 10],
    ['Tote bag', 2, 3, 6]
  ];

  var BOLOS = [
    ['21 ago \u00b7 Zaragoza', 980],
    ['14 ago \u00b7 Logro\u00f1o', 1240],
    ['02 ago \u00b7 Pamplona', 610],
    ['19 jul \u00b7 Huesca', -180],
    ['05 jul \u00b7 Tudela', 840],
    ['21 jun \u00b7 Soria', 430]
  ];

  var MIX = {
    total: 3900,
    nota: 'El merch ya es un tercio de lo que entra. Cuidar el stock no es un detalle: es la mitad del beneficio de la noche.',
    partes: [
      { nombre: 'Cach\u00e9s', valor: 2600, pct: '67 %', color: '#5CE3A3' },
      { nombre: 'Merchandising', valor: 1150, pct: '29 %', color: '#62B6FF' },
      { nombre: 'Otros', valor: 150, pct: '4 %', color: '#B8B2C2' }
    ]
  };

  // ---------- cierre financiero ----------
  var FIN_BOX = {
    mes: {
      rango: '1 \u2013 31 de agosto de 2026', ing: 8300, oper: 6000, amort: 250, int: 90, imp: 240,
      bajas: 6, notaIng: '184 cuotas + nevera y merch', notaBajas: '3 recuperables seg\u00fan sem\u00e1foro',
      series: [['S31', 1980, 1560], ['S32', 2060, 1620], ['S33', 2130, 1700], ['S34', 2130, 1700]]
    },
    tri: {
      rango: '1 de julio \u2013 30 de septiembre de 2026 (en curso)', ing: 16200, oper: 12180, amort: 500, int: 180, imp: 480,
      bajas: 11, notaIng: 'dos meses cerrados del trimestre', notaBajas: '5 recuperables seg\u00fan sem\u00e1foro',
      series: [['jul', 7900, 6760], ['ago', 8300, 6580]]
    },
    anio: {
      rango: '1 de enero \u2013 31 de agosto de 2026', ing: 67450, oper: 48040, amort: 2000, int: 720, imp: 1920,
      bajas: 34, notaIng: 'ocho meses cerrados', notaBajas: '13 volvieron tras la llamada',
      series: [['ene', 7900, 6500], ['feb', 8500, 6650], ['mar', 8400, 6400], ['abr', 8750, 6550], ['may', 8600, 6700], ['jun', 9100, 6540], ['jul', 7900, 6760], ['ago', 8300, 6580]]
    }
  };

  var BOLOS_MES = {
    ago: [
      ['21 ago \u00b7 Zaragoza', 1200, 340, 560, 980, 'Cobrado'],
      ['14 ago \u00b7 Logro\u00f1o', 1400, 410, 570, 1240, 'Cobrado'],
      ['02 ago \u00b7 Pamplona', 700, 290, 380, 610, 'Pendiente']
    ],
    jul: [
      ['19 jul \u00b7 Huesca', 400, 120, 700, -180, 'Cobrado'],
      ['05 jul \u00b7 Tudela', 900, 360, 420, 840, 'Cobrado']
    ],
    jun: [['21 jun \u00b7 Soria', 600, 180, 350, 430, 'Cobrado']]
  };

  var FIN_BANDA = {
    mes: {
      rango: '1 \u2013 31 de agosto de 2026', ing: 3640, oper: 1750, amort: 120, int: 0, imp: 210,
      bolos: 3, pendiente: 700, notaIng: '3 bolos en el periodo', notaPend: 'el cach\u00e9 de Pamplona sin liquidar',
      series: [['02 ago', 290, 570], ['14 ago', 1810, 760], ['21 ago', 1540, 750]],
      filas: BOLOS_MES.ago
    },
    tri: {
      rango: '1 de julio \u2013 30 de septiembre de 2026 (en curso)', ing: 5420, oper: 3090, amort: 240, int: 0, imp: 320,
      bolos: 5, pendiente: 700, notaIng: '5 bolos en el periodo', notaPend: 'el cach\u00e9 de Pamplona sin liquidar',
      series: [['jul', 1780, 1630], ['ago', 3640, 2020]],
      filas: BOLOS_MES.ago.concat(BOLOS_MES.jul)
    },
    anio: {
      rango: '1 de enero \u2013 31 de agosto de 2026', ing: 6200, oper: 3680, amort: 360, int: 0, imp: 380,
      bolos: 6, pendiente: 700, notaIng: '6 bolos en el periodo', notaPend: 'el cach\u00e9 de Pamplona sin liquidar',
      series: [['jun', 780, 830], ['jul', 1780, 1600], ['ago', 3640, 1990]],
      filas: BOLOS_MES.ago.concat(BOLOS_MES.jul, BOLOS_MES.jun)
    }
  };

  var AVISOS_BOX = [
    ['#C77E63', 'Tres socios llevan m\u00e1s de 10 d\u00edas sin pisar el box', 'Suman 147 \u20ac de cuota al mes. El sem\u00e1foro los marc\u00f3 antes de que pidieran la baja.'],
    ['#C9A86A', 'La nevera se ha quedado corta dos veces este mes', 'Batido listo y bebida isot\u00f3nica bajaron del m\u00ednimo en fin de semana, el d\u00eda de m\u00e1s venta.'],
    ['#C9A86A', 'Suministros sube un 11 % respecto al trimestre anterior', 'Luz y agua. Merece una revisi\u00f3n de tarifa antes del invierno.']
  ];
  var AVISOS_BANDA = [
    ['#C77E63', 'Queda un cach\u00e9 de 700 \u20ac sin cobrar', 'Bolo del 2 de agosto en Pamplona. Cerrado hace tres semanas y todav\u00eda sin transferencia.'],
    ['#C77E63', 'Un bolo cerr\u00f3 en p\u00e9rdidas: Huesca, \u2212180 \u20ac', 'El cach\u00e9 no cubri\u00f3 furgoneta y t\u00e9cnico. Con 250 \u20ac m\u00e1s habr\u00eda salido a cero.'],
    ['#C9A86A', 'La camiseta talla M se agota siempre', 'Se vendieron 9 anoche y quedan 2. Es la talla que m\u00e1s se pierde por falta de stock.']
  ];

  var TABLA_BOX = {
    titulo: 'Trimestre a trimestre',
    sub: 'Socios, EBITDA y resultado neto, para ver la tendencia sin ruido',
    cab: ['Trimestre', 'Socios', 'Ingresos', 'Gastos oper.', 'EBITDA', 'Margen EBITDA', 'Resultado neto'],
    filas: [
      ['T1 2026', '171', eur(24800), eur(17620), eur(7180), '29,0 %', eur(5440)],
      ['T2 2026', '179', eur(26450), eur(18240), eur(8210), '31,0 %', eur(6470)],
      ['T3 2026 (en curso)', '184', eur(16200), eur(12180), eur(4020), '24,8 %', eur(2860)]
    ]
  };

  function datosFin() {
    var d = (ES_BOX ? FIN_BOX : FIN_BANDA)[S.periodo];
    var ebitda = d.ing - d.oper;
    var neto = ebitda - d.amort - d.int - d.imp;
    var kpis = [
      { k: 'Ingresos cobrados', v: eur(d.ing), d: d.notaIng, destaca: true },
      { k: 'Gastos operativos', v: eur(d.oper), d: ES_BOX ? 'n\u00f3minas, alquiler y suministros' : 'furgoneta, t\u00e9cnico, local y producci\u00f3n' },
      { k: 'EBITDA', v: eur(ebitda), d: ES_BOX ? 'lo que genera el box antes de financiaci\u00f3n' : 'lo que deja la gira por s\u00ed sola', destaca: true },
      { k: 'Margen EBITDA', v: pct1((ebitda / d.ing) * 100), d: 'sobre ingresos cobrados' },
      { k: 'Resultado neto', v: eur(neto), d: 'despu\u00e9s de amortizar, intereses e impuestos', destaca: true },
      ES_BOX
        ? { k: 'Bajas del periodo', v: String(d.bajas), d: d.notaBajas, avisa: true }
        : { k: 'Pendiente de cobro', v: eur(d.pendiente), d: d.notaPend, avisa: true }
    ];
    var puente = [
      ['Ingresos cobrados', d.ing, false, true],
      ['Gastos operativos', -d.oper, true, false],
      ['EBITDA', ebitda, false, true],
      [ES_BOX ? 'Amortizaci\u00f3n de equipamiento' : 'Amortizaci\u00f3n de backline', -d.amort, true, false],
      ['Intereses', -d.int, true, false],
      ['Impuestos', -d.imp, true, false],
      ['Resultado neto', neto, false, true]
    ];
    var tabla = ES_BOX
      ? TABLA_BOX
      : {
          titulo: 'Detalle de bolos',
          sub: 'Resultado y estado de cobro de cada actuaci\u00f3n del periodo',
          cab: ['Bolo', 'Cach\u00e9', 'Merch', 'Gastos', 'Resultado', 'Cobro'],
          filas: d.filas.map(function (f) {
            return [f[0], eur(f[1]), eur(f[2]), eur(f[3]), eur(f[4]), f[5]];
          })
        };
    // El punto de equilibrio se DERIVA del puente: nunca a mano.
    var coste = d.oper + d.amort + d.int + d.imp;
    var cobertura = Math.round((d.ing / coste) * 100);
    var equilibrio = ES_BOX
      ? {
          cifra: eur(coste),
          periodo: (S.periodo === 'mes' ? 'al mes \u00b7 ' : 'en el periodo \u00b7 ') + Math.ceil(coste / 45) + ' cuotas medias de 45 \u20ac',
          pct: Math.min(100, cobertura),
          nota: 'Vas al ' + cobertura + ' % del punto de equilibrio. Cada socio por encima de ' + Math.ceil(coste / 45) + ' es margen limpio.'
        }
      : {
          cifra: eur(Math.round(coste / d.bolos)),
          periodo: 'por bolo \u00b7 coste medio de salir a tocar (' + d.bolos + ' bolos)',
          pct: Math.min(100, cobertura),
          nota: 'Un bolo por debajo de ' + eur(Math.round(coste / d.bolos)) + ' entre cach\u00e9 y merch sale a p\u00e9rdidas. La gira va al ' + cobertura + ' % de cobertura.'
        };
    return { kpis: kpis, puente: puente, tabla: tabla, series: d.series, rango: d.rango, equilibrio: equilibrio };
  }

  // ---------- plantillas ----------
  function tSelector(opciones, activa, accion) {
    return (
      '<div class="selector">' +
      opciones
        .map(function (o) {
          return '<button class="pill' + (o.id === activa ? ' on' : '') + '" data-' + accion + '="' + attr(o.id) + '">' + esc(o.nombre) + '</button>';
        })
        .join('') +
      '</div>'
    );
  }

  function tCabecera() {
    var fin = S.vista === 'fin';
    var nombre = ES_BOX ? 'Box' : 'Banda Musical';
    return (
      '<div class="cabecera"><div>' +
      '<p class="kicker mono">' + (fin ? 'Cierre de gesti\u00f3n' : 'D\u00eda a d\u00eda') + '</p>' +
      '<h1>' + nombre + (fin ? ' \u00b7 situaci\u00f3n econ\u00f3mica' : ' \u00b7 operaci\u00f3n') + '</h1>' +
      '</div><p class="sello mono">' +
      (fin ? 'Solo lectura \u00b7 revisado por Pulso' : ES_BOX ? 'Semana 34 \u00b7 2026' : 'Gira de verano 2026') +
      '</p></div>'
    );
  }

  function tTopbar() {
    var acento = S.vista === 'fin' ? '#D8D4CB' : '#5CE3A3';
    return (
      '<header class="topbar"><div class="top">' +
      '<div class="marca">' +
      '<svg viewBox="0 0 26 26" width="26" height="26" aria-hidden="true"><rect width="26" height="26" rx="6" fill="rgba(0,0,0,.35)"/>' +
      '<path d="M2 13 H7 L9.5 5 L13 21 L16 9 L18.5 13 H24" stroke="' + acento + '" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<span class="nombre">Pulso</span></div>' +
      '<div style="margin-left:auto">' +
      tSelector([{ id: 'op', nombre: 'Operaci\u00f3n' }, { id: 'fin', nombre: 'Cierre financiero' }], S.vista, 'vista') +
      '</div>' +
      '<span class="badge">Solo lectura</span>' +
      '</div></header>'
    );
  }

  // ---------- operaci\u00f3n: box ----------
  function tClientes() {
    var cq = cuadrante();
    var sabado = cq.turnos
      .map(function (f) {
        return { hora: f.hora, celda: f.celdas[5] };
      })
      .filter(function (r) {
        return r.celda;
      });
    var total = sabado.reduce(function (s, r) {
      return s + RESERVAS[r.hora];
    }, 0);
    var llena = sabado.reduce(function (a, b) {
      return RESERVAS[b.hora] > RESERVAS[a.hora] ? b : a;
    }, sabado[0]);
    var floja = sabado.reduce(function (a, b) {
      return RESERVAS[b.hora] < RESERVAS[a.hora] ? b : a;
    }, sabado[0]);

    return (
      '<section class="duo">' +
      '<div class="panel"><h2>Control de clientes</h2>' +
      '<p class="sub">Sem\u00e1foro de riesgo. Rojo: 10 d\u00edas sin reservar. \u00c1mbar: por debajo de 2 clases/semana tres semanas seguidas.</p>' +
      '<div class="tercios">' +
      SEMAFORO.map(function (q) {
        return (
          '<div class="cuadro ' + q.clase + '"><p class="cifra" style="color:' + q.color + '">' + q.n + '</p>' +
          '<p class="etiqueta">' + esc(q.etiqueta) + '</p></div>'
        );
      }).join('') +
      '</div>' +
      '<table class="tbl"><tr><th>Socio</th><th>Se\u00f1al</th><th class="r">\u00daltima clase</th><th>Acci\u00f3n</th></tr>' +
      EN_RIESGO.map(function (r) {
        return (
          '<tr><td><span style="display:inline-flex;align-items:center;gap:9px">' +
          '<span class="punto" style="background:' + r[3] + '"></span>' + esc(r[0]) + '</span></td>' +
          '<td class="apagado">' + esc(r[1]) + '</td><td class="r">' + esc(r[2]) + '</td>' +
          '<td><a href="tel:+34600000000">Llamar</a></td></tr>'
        );
      }).join('') +
      '</table></div>' +
      '<div class="panel"><h2>Hoy en el box</h2>' +
      '<p class="sub">Reservas por clase \u00b7 s\u00e1bado 22 de agosto (9:00 a 14:00)</p>' +
      '<p class="total-hoy"><b>' + total + '</b><span>socios distintos han reservado hoy</span></p>' +
      '<div class="filas">' +
      sabado.map(function (r) {
        var n = RESERVAS[r.hora];
        return (
          '<div class="fila-barra"><span class="h">' + r.hora + '</span>' +
          '<span class="c">' + esc(r.celda.clase) + '</span>' +
          '<span class="pista"><i style="width:' + Math.round((n / AFORO) * 100) + '%;background:' + CLASE_COLOR[r.celda.clase] + '"></i></span>' +
          '<span class="v">' + n + '/' + AFORO + '</span></div>'
        );
      }).join('') +
      '</div>' +
      '<p class="nota">La de ' + llena.hora + ' (' + esc(llena.celda.clase) + ') se llena sola los s\u00e1bados; la de ' + floja.hora + ' cierra el d\u00eda con menos de la mitad del aforo.</p>' +
      '</div></section>'
    );
  }

  function tTurnos() {
    var cq = cuadrante();
    var abierta = S.rotaAbierta;
    var sabado = cq.turnos
      .map(function (f) {
        return { hora: f.hora, celda: f.celdas[5] };
      })
      .filter(function (r) {
        return r.celda;
      });
    var ahora = sabado.filter(function (r) { return r.hora === '12:00'; })[0] || sabado[0];
    var sig = sabado.filter(function (r) { return r.hora === '13:00'; })[0] || sabado[sabado.length - 1];
    var totalClases = Object.keys(cq.clases).reduce(function (s, k) { return s + cq.clases[k]; }, 0);
    var cargaTop = COACHES.map(function (n) {
      return { nombre: n, horas: cq.horas[n] || 0 };
    }).sort(function (a, b) { return b.horas - a.horas; })[0];

    var sub = !abierta
      ? 'Semana en curso \u00b7 17 a 22 de agosto. El cuadrante completo se abre aparte para no comerse el panel.'
      : S.rota === 'semana'
        ? 'Semana en curso \u00b7 17 a 22 de agosto. Clase cada hora, de 7:00 a 21:00 de lunes a viernes; s\u00e1bado de 9:00 a 14:00.'
        : 'Horas por coach en el mes completo';

    var cuerpo = '';
    if (!abierta) {
      var tarjetas = [
        ['Clases esta semana', String(totalClases), 'de 7:00 a 21:00 \u00b7 s\u00e1bado 9:00 a 14:00'],
        ['Ahora en pista', ahora.celda.clase + ' \u00b7 ' + ahora.celda.coach, 's\u00e1bado ' + ahora.hora + ' \u00b7 ' + RESERVAS[ahora.hora] + ' de ' + AFORO + ' plazas'],
        ['Siguiente', sig.celda.clase + ' \u00b7 ' + sig.celda.coach, 's\u00e1bado ' + sig.hora + ' \u00b7 \u00faltima del d\u00eda'],
        ['Coach con m\u00e1s carga', cargaTop.nombre + ' \u00b7 ' + cargaTop.horas + ' h', 'tope semanal de 30 h por coach']
      ];
      cuerpo =
        '<div class="resumen">' +
        tarjetas.map(function (t) {
          return '<div class="caja"><p class="rotulo">' + esc(t[0]) + '</p><p class="valor">' + esc(t[1]) + '</p><p class="detalle">' + esc(t[2]) + '</p></div>';
        }).join('') +
        '</div>';
    } else if (S.rota === 'semana') {
      cuerpo =
        '<div class="scroll"><table class="tbl rota"><tr><th>Franja</th>' +
        DIAS.map(function (d) { return '<th>' + esc(d) + '</th>'; }).join('') +
        '</tr>' +
        cq.turnos.map(function (f) {
          return (
            '<tr><td class="hora">' + f.hora + '</td>' +
            f.celdas.map(function (c) {
              if (!c) return '<td><span class="celda vacia">\u2014</span></td>';
              var col = CLASE_COLOR[c.clase];
              return (
                '<td><span class="celda" style="background:' + col + '14;border-left:2px solid ' + col + '">' +
                '<span class="clase" style="color:' + col + '">' + ICONOS[c.clase] + esc(c.clase) + '</span>' +
                '<span class="coach">' + esc(c.coach) + '</span></span></td>'
              );
            }).join('') +
            '</tr>'
          );
        }).join('') +
        '</table></div>' +
        '<div class="leyendas"><div class="leyenda">' +
        Object.keys(CLASE_COLOR).map(function (n) {
          return '<span><span style="display:inline-flex;color:' + CLASE_COLOR[n] + '">' + ICONOS[n] + '</span>' + esc(n) + ' \u00b7 ' + (cq.clases[n] || 0) + ' clases</span>';
        }).join('') +
        '</div><div class="leyenda" style="margin-left:auto">' +
        COACHES.map(function (n) {
          return '<span><span class="punto" style="background:' + COACH_COLOR[n] + '"></span>' + esc(n) + ' \u00b7 ' + (cq.horas[n] || 0) + ' h</span>';
        }).join('') +
        '</div></div>';
    } else {
      cuerpo =
        '<table class="tbl"><tr><th>Coach</th><th class="r">S32</th><th class="r">S33</th><th class="r">S34</th><th class="r">S35</th><th class="r">Total mes</th><th>Carga</th></tr>' +
        COACHES.map(function (n, i) {
          var b = cq.horas[n] || 0;
          var s = [b - 2 + i, b, b + 1 - i, b - 1];
          var total = s.reduce(function (a, c) { return a + c; }, 0);
          var carga = Math.min(100, Math.round((total / 4 / 30) * 100));
          return (
            '<tr><td><span style="display:inline-flex;align-items:center;gap:9px"><span class="punto" style="background:' + COACH_COLOR[n] + '"></span>' + esc(n) + '</span></td>' +
            s.map(function (h) { return '<td class="r">' + h + '</td>'; }).join('') +
            '<td class="r" style="font-weight:600">' + total + ' h</td>' +
            '<td><span class="pista" style="height:7px;display:block"><i style="width:' + carga + '%;background:' + COACH_COLOR[n] + '"></i></span></td></tr>'
          );
        }).join('') +
        '</table><p class="nota">Agosto 2026 \u00b7 4 semanas. La carga compara la media semanal de cada coach contra el tope de 30 h.</p>';
    }

    return (
      '<section class="panel"><div class="cab-panel"><div><h2>Turnos de coaches</h2><p class="sub">' + sub + '</p></div>' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      (abierta ? tSelector([{ id: 'semana', nombre: 'Semana' }, { id: 'mes', nombre: 'Mes completo' }], S.rota, 'rota') : '') +
      '<button class="btn ghost" data-rota-toggle="1">' + (abierta ? 'Cerrar cuadrante' : 'Ver cuadrante completo') + '</button>' +
      '</div></div>' + cuerpo + '</section>'
    );
  }

  function tStock() {
    var bajos = STOCK.filter(function (s) { return s[2] < s[3]; });
    var cuerpo = 'Hola,\n\nOs paso el pedido:\n\n' +
      bajos.map(function (s) {
        return '\u00b7 ' + s[0] + ' \u2014 ' + (s[3] * 2 - s[2]) + ' uds (stock ' + s[2] + ', m\u00ednimo ' + s[3] + ')';
      }).join('\n') + '\n\nGracias.';
    return (
      '<section class="panel"><div class="cab-panel" style="margin-bottom:6px">' +
      '<div><h2>Merchandising y nevera</h2><p class="sub">Stock actual, m\u00ednimo de seguridad y qu\u00e9 hay que reponer</p></div>' +
      '<a class="btn" href="' + attr(mailto(PROVEEDOR, 'Pedido Box \u00b7 ' + bajos.length + ' referencias', cuerpo)) + '">Hacer pedido nuevo \u2192</a>' +
      '</div>' +
      '<p class="nota" style="margin:0 0 14px">El bot\u00f3n abre tu correo con el pedido ya redactado: solo las referencias por debajo del m\u00ednimo, con las unidades que faltan.</p>' +
      '<table class="tbl"><tr><th>Referencia</th><th>Tipo</th><th class="r">Stock</th><th class="r">M\u00ednimo</th><th class="r">Margen ud.</th><th>Estado</th></tr>' +
      STOCK.map(function (s) {
        var e = estadoStock(s[2], s[3]);
        return (
          '<tr><td>' + esc(s[0]) + '</td><td class="apagado">' + esc(s[1]) + '</td>' +
          '<td class="r">' + s[2] + '</td><td class="r apagado">' + s[3] + '</td>' +
          '<td class="r">' + eur2(s[4]) + '</td>' +
          '<td><span class="chip ' + e + '">' + ETIQUETA_ESTADO[e] + '</span></td></tr>'
        );
      }).join('') +
      '</table></section>'
    );
  }

  // ---------- operaci\u00f3n: grupo ----------
  function tDiaVenta() {
    return (
      '<section class="duo par">' +
      '<div class="panel"><h2>El d\u00eda de venta</h2><p class="sub">Sala Tr\u00e9bol \u00b7 Zaragoza \u00b7 viernes 21 de agosto</p>' +
      '<div class="tercios" style="grid-template-columns:1fr 1fr">' +
      CAJA_NOCHE.map(function (k) {
        return (
          '<div class="cuadro ' + k.cuadro + '"><p class="rotulo">' + esc(k.etiqueta) + '</p>' +
          '<p class="cifra" style="font-size:27px;margin-top:9px;color:' + k.color + '">' + eur(k.valor) + '</p>' +
          '<p class="detalle">' + esc(k.detalle) + '</p></div>'
        );
      }).join('') +
      '</div>' +
      '<table class="tbl"><tr><th>Concepto de la noche</th><th class="r">Importe</th></tr>' +
      NOCHE.map(function (n) {
        return '<tr><td>' + esc(n[0]) + '</td><td class="r"' + (n[2] ? ' style="color:var(--coral)"' : '') + '>' + eur(n[1]) + '</td></tr>';
      }).join('') +
      '</table></div>' +
      tMerch() +
      '</section>'
    );
  }

  function tMerch() {
    var bajos = MERCH.filter(function (m) { return m[2] < m[3]; });
    var cuerpo = 'Hola,\n\nOs paso el pedido:\n\n' +
      bajos.map(function (m) {
        return '\u00b7 ' + m[0] + ' \u2014 ' + (m[3] * 2 - m[2]) + ' uds (stock ' + m[2] + ', m\u00ednimo ' + m[3] + ')';
      }).join('\n') + '\n\nGracias.';
    return (
      '<div class="panel"><div class="cab-panel" style="margin-bottom:0">' +
      '<div><h2>Merchandising</h2><p class="sub">Vendido anoche y stock que queda en la furgoneta</p></div>' +
      '<a class="btn" href="' + attr(mailto(PROVEEDOR, 'Pedido merch Banda Musical', cuerpo)) + '">Hacer pedido nuevo \u2192</a></div>' +
      '<table class="tbl" style="margin-top:16px"><tr><th>Producto</th><th class="r">Anoche</th><th class="r">Stock</th><th class="r">M\u00ednimo</th><th>Estado</th></tr>' +
      MERCH.map(function (m) {
        var e = m[2] < m[3] ? 'reponer' : m[2] < m[3] * 1.4 ? 'justo' : 'ok';
        return (
          '<tr><td>' + esc(m[0]) + '</td><td class="r">' + m[1] + '</td><td class="r">' + m[2] + '</td>' +
          '<td class="r apagado">' + m[3] + '</td><td><span class="chip ' + e + '">' + ETIQUETA_ESTADO[e] + '</span></td></tr>'
        );
      }).join('') +
      '</table><p class="nota">El pedido sale a tu correo con las tallas y unidades que faltan para llegar al m\u00ednimo.</p></div>'
    );
  }

  function tRegistro() {
    var esEvento = S.reg === 'evento';
    var nombres = Object.keys(PVP);
    var vendidas = nombres.filter(function (n) { return (S.uds[n] || 0) > 0; });
    var totalMerch = vendidas.reduce(function (s, n) { return s + S.uds[n] * PVP[n]; }, 0);
    var udsTotal = vendidas.reduce(function (s, n) { return s + S.uds[n]; }, 0);
    var num = function (k) { return Number(S.ev[k]) || 0; };
    var gastos = num('furgoneta') + num('tecnico') + num('dietas') + num('otros');
    var resultado = num('cache') + totalMerch - gastos;

    var detalle = vendidas.length
      ? vendidas.map(function (n) { return '\u00b7 ' + n + ' \u2014 ' + S.uds[n] + ' uds (' + eur2(S.uds[n] * PVP[n]) + ')'; }).join('\n')
      : '\u00b7 sin merch vendido';

    var mensaje = esEvento
      ? 'Cierre de evento \u2014 Banda Musical\n\nFecha: ' + (S.ev.fecha || '\u2014') +
        '\nSala: ' + (S.ev.sala || '\u2014') +
        '\nEntradas vendidas: ' + (S.ev.entradas || '\u2014') +
        '\nCach\u00e9: ' + eur2(num('cache')) +
        '\n\nMerch:\n' + detalle + '\nTotal merch: ' + eur2(totalMerch) +
        '\n\nGastos:\n\u00b7 Furgoneta ' + eur2(num('furgoneta')) + '\n\u00b7 T\u00e9cnico ' + eur2(num('tecnico')) +
        '\n\u00b7 Dietas ' + eur2(num('dietas')) + '\n\u00b7 Otros ' + eur2(num('otros')) +
        '\nTotal gastos: ' + eur2(gastos) +
        '\n\nResultado de la noche: ' + eur2(resultado)
      : 'Venta de merch \u2014 Banda Musical\n\n' + detalle + '\n\nTotal: ' + eur2(totalMerch) + ' (' + udsTotal + ' uds)';

    return (
      '<section class="panel"><div class="cab-panel">' +
      '<div><h2>Registrar</h2><p class="sub">Apunta la venta de merch o cierra el evento completo. Al enviarlo nos llega a nosotros y queda registrado en tu cierre del mes.</p></div>' +
      tSelector([{ id: 'venta', nombre: 'Venta de merch' }, { id: 'evento', nombre: 'D\u00eda de evento' }], S.reg, 'reg') +
      '</div>' +
      (esEvento
        ? '<div class="campos">' +
          CAMPOS_EV.map(function (c) {
            return (
              '<label><span class="rotulo">' + esc(c[1]) + '</span>' +
              '<input type="' + c[2] + '" value="' + attr(S.ev[c[0]]) + '" placeholder="' + attr(c[3]) + '" data-campo="' + c[0] + '" /></label>'
            );
          }).join('') +
          '</div>'
        : '') +
      '<p class="rotulo" style="margin-bottom:10px">Unidades vendidas</p>' +
      '<div class="lineas">' +
      nombres.map(function (n) {
        var u = S.uds[n] || 0;
        return (
          '<div class="linea-venta"><span class="qu\u00e9">' + esc(n) +
          '<span class="pvp">' + eur2(PVP[n]) + '/ud \u00b7 ' + eur2(u * PVP[n]) + '</span></span>' +
          '<button class="step" data-menos="' + attr(n) + '">\u2212</button>' +
          '<span class="uds">' + u + '</span>' +
          '<button class="step" data-mas="' + attr(n) + '">+</button></div>'
        );
      }).join('') +
      '</div>' +
      '<div class="cierre-registro"><div>' +
      '<p class="rotulo">' + (esEvento ? 'Resultado del evento' : 'Total de la venta') + '</p>' +
      '<p class="total">' + eur2(esEvento ? resultado : totalMerch) + '</p>' +
      '<p class="detalle" style="color:var(--muted2);font-size:12.5px;margin-top:7px">' +
      (esEvento
        ? 'cach\u00e9 ' + eur(num('cache')) + ' + merch ' + eur(totalMerch) + ' \u2212 gastos ' + eur(gastos)
        : udsTotal + ' unidades') +
      '</p></div>' +
      '<div class="envios">' +
      '<a class="btn" target="_blank" rel="noopener" href="' + attr(wa(mensaje.replace(/\n/g, '\n'))) + '">Enviar por WhatsApp</a>' +
      '<a class="btn ghost" href="' + attr(mailto(CONTACTO.email, esEvento ? 'Cierre de evento \u00b7 Banda Musical' : 'Venta de merch \u00b7 Banda Musical', mensaje.replace(/\n/g, '\n'))) + '">Enviar por correo</a>' +
      '</div></div></section>'
    );
  }

  function tGira() {
    var maxAbs = Math.max.apply(null, BOLOS.map(function (b) { return Math.abs(b[1]); }));
    return (
      '<section class="duo ancho">' +
      '<div class="panel"><h2>C\u00f3mo va la gira</h2><p class="sub">Lo que dej\u00f3 cada bolo, del \u00faltimo al primero</p>' +
      '<div class="filas" style="margin-top:20px">' +
      BOLOS.map(function (b) {
        var col = b[1] >= 0 ? '#5CE3A3' : '#FF8169';
        return (
          '<div class="fila-barra"><span class="c" style="width:132px">' + esc(b[0]) + '</span>' +
          '<span class="pista" style="height:24px"><i style="width:' + Math.round((Math.abs(b[1]) / maxAbs) * 100) + '%;background:' + col + '"></i></span>' +
          '<span class="v" style="width:74px;color:' + col + '">' + eur(b[1]) + '</span></div>'
        );
      }).join('') +
      '</div></div>' +
      '<div class="panel"><h2>De d\u00f3nde viene el dinero</h2><p class="sub">Reparto de lo cobrado en la gira</p>' +
      '<div class="mix"><div class="anillo" style="background:conic-gradient(#5CE3A3 0 67%, #62B6FF 67% 96%, #B8B2C2 96% 100%)">' +
      '<div class="hueco"><span><b>' + eur(MIX.total) + '</b><span>cobrado</span></span></div></div>' +
      '<div class="mix-lista">' +
      MIX.partes.map(function (p) {
        return (
          '<span><span class="punto" style="width:10px;height:10px;background:' + p.color + '"></span>' + esc(p.nombre) +
          '<b style="margin-left:4px">' + eur(p.valor) + '</b><i>' + p.pct + '</i></span>'
        );
      }).join('') +
      '</div></div><p class="nota">' + esc(MIX.nota) + '</p></div></section>'
    );
  }

  // ---------- cierre financiero ----------
  function tFinanciero() {
    var f = datosFin();
    var max = Math.max.apply(null, f.series.reduce(function (a, m) { return a.concat([m[1], m[2]]); }, []));
    var avisos = ES_BOX ? AVISOS_BOX : AVISOS_BANDA;

    return (
      '<div class="pila">' +
      '<div class="barra-filtros"><span class="lbl">Periodo</span>' +
      [{ id: 'mes', nombre: 'Mes' }, { id: 'tri', nombre: 'Trimestre' }, { id: 'anio', nombre: 'A\u00f1o' }]
        .map(function (p) {
          return '<button class="pill' + (p.id === S.periodo ? ' on' : '') + '" data-periodo="' + p.id + '">' + p.nombre + '</button>';
        })
        .join('') +
      '<span class="rango mono">' + esc(f.rango) + '</span></div>' +

      '<div class="kpis">' +
      f.kpis.map(function (k) {
        return (
          '<div class="kpi"><p class="k">' + esc(k.k) + '</p>' +
          '<p class="v' + (k.destaca ? ' destaca' : k.avisa ? ' avisa' : '') + '">' + esc(k.v) + '</p>' +
          '<p class="d">' + esc(k.d) + '</p></div>'
        );
      }).join('') +
      '</div>' +

      '<div class="vigilancia"><h2>Vigilancia del periodo</h2>' +
      '<p class="lead">Lo que Pulso ha revisado en este cierre. Sin adornos: si algo no cuadra, aparece aqu\u00ed.</p>' +
      avisos.map(function (a) {
        return (
          '<div class="aviso"><span class="marca-aviso" style="background:' + a[0] + '"></span>' +
          '<span><b>' + esc(a[1]) + '</b><span>' + esc(a[2]) + '</span></span></div>'
        );
      }).join('') +
      '</div>' +

      '<div class="duo ancho">' +
      '<div class="panel"><h2>Evoluci\u00f3n del periodo</h2>' +
      '<p class="sub" style="margin-bottom:22px">Ingresos cobrados frente al coste total (operativo, amortizaci\u00f3n, intereses e impuestos)</p>' +
      '<div class="grafico">' +
      f.series.map(function (m) {
        return (
          '<div class="col"><div class="par-barras">' +
          '<i class="ing" style="height:' + Math.round((m[1] / max) * 100) + '%"></i>' +
          '<i class="gas" style="height:' + Math.round((m[2] / max) * 100) + '%"></i>' +
          '</div><span class="mes">' + esc(m[0]) + '</span></div>'
        );
      }).join('') +
      '</div>' +
      '<div class="leyenda-graf"><span><i style="background:var(--signal)"></i>Ingresos</span><span><i style="background:var(--coral)"></i>Coste total</span></div>' +
      '</div>' +
      '<div class="panel equilibrio"><h2>Punto de equilibrio</h2>' +
      '<p class="sub" style="margin-bottom:20px">Lo que hay que facturar para no perder dinero</p>' +
      '<p class="cifra">' + esc(f.equilibrio.cifra) + '</p>' +
      '<p class="sub" style="margin-top:9px">' + esc(f.equilibrio.periodo) + '</p>' +
      '<span class="barra"><i style="width:' + f.equilibrio.pct + '%"></i></span>' +
      '<p class="nota">' + esc(f.equilibrio.nota) + '</p></div>' +
      '</div>' +

      '<div class="panel puente"><h2>Del ingreso al beneficio</h2>' +
      '<p class="sub" style="margin-bottom:8px">C\u00f3mo se llega del dinero que entra al que de verdad queda. El EBITDA mide el negocio; el resultado neto, tu bolsillo.</p>' +
      f.puente.map(function (p) {
        var hito = p[0] === 'EBITDA' || p[0] === 'Resultado neto';
        return (
          '<div class="fila' + (hito ? ' hito' : '') + '"><span class="concepto">' + esc(p[0]) + '</span>' +
          '<span class="importe' + (p[2] ? ' resta' : '') + '">' + eur(p[1]) + '</span></div>'
        );
      }).join('') +
      '</div>' +

      '<div class="panel"><h2>' + esc(f.tabla.titulo) + '</h2><p class="sub" style="margin-bottom:12px">' + esc(f.tabla.sub) + '</p>' +
      '<table class="tbl"><tr>' +
      f.tabla.cab.map(function (c, i) {
        var derecha = i > 0 && !(i === f.tabla.cab.length - 1 && !ES_BOX);
        return '<th' + (derecha ? ' class="r"' : '') + '>' + esc(c) + '</th>';
      }).join('') +
      '</tr>' +
      f.tabla.filas.map(function (fila) {
        return (
          '<tr>' +
          fila.map(function (c, i) {
            var ultima = i === fila.length - 1 && !ES_BOX;
            if (i === 0) return '<td>' + esc(c) + '</td>';
            if (ultima) return '<td' + (c === 'Pendiente' ? ' style="color:var(--alert)"' : ' class="apagado"') + '>' + esc(c) + '</td>';
            return '<td class="r"' + (String(c).indexOf('-') === 0 ? ' style="color:var(--coral)"' : '') + '>' + esc(c) + '</td>';
          }).join('') +
          '</tr>'
        );
      }).join('') +
      '</table></div>' +

      '<p class="pie">Datos gestionados por Pulso \u00b7 cierre revisado el 20 de agosto de 2026</p>' +
      '</div>'
    );
  }

  // ---------- render ----------
  function render() {
    document.documentElement.setAttribute('data-vista', S.vista);
    var cuerpo;
    if (S.vista === 'fin') cuerpo = tFinanciero();
    else if (ES_BOX) cuerpo = '<div class="pila">' + tClientes() + tTurnos() + tStock() + '</div>';
    else cuerpo = '<div class="pila">' + tDiaVenta() + tRegistro() + tGira() + '</div>';

    document.getElementById('app').innerHTML = tTopbar() + '<main>' + tCabecera() + cuerpo + '</main>';
  }

  // Un solo oyente delegado: sobrevive a cualquier repintado.
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-vista],[data-rota],[data-rota-toggle],[data-reg],[data-periodo],[data-mas],[data-menos]');
    if (!t) return;
    var d = t.dataset;
    if (d.vista) S.vista = d.vista;
    else if (d.rota) S.rota = d.rota;
    else if (d.rotaToggle) S.rotaAbierta = !S.rotaAbierta;
    else if (d.reg) S.reg = d.reg;
    else if (d.periodo) S.periodo = d.periodo;
    else if (d.mas) S.uds[d.mas] = (S.uds[d.mas] || 0) + 1;
    else if (d.menos) S.uds[d.menos] = Math.max(0, (S.uds[d.menos] || 0) - 1);
    render();
  });

  document.addEventListener('input', function (e) {
    var t = e.target;
    if (!t.dataset || !t.dataset.campo) return;
    S.ev[t.dataset.campo] = t.value;
    // Repintado diferido: no perder el foco mientras se escribe.
    clearTimeout(window.__pulsoT);
    window.__pulsoT = setTimeout(render, 400);
  });

  render();
})();
