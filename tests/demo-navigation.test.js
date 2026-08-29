import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const demos = [
  'index.html',
  'facturas.html',
  'medicion.html',
  'fitness.html',
  'eventos.html',
  'taller.html',
  'generador.html',
  'reformas.html',
  'clima.html',
];

const demosDirectory = resolve(process.cwd(), '..', 'muro-instagram');

describe('navegación de salida en las demostraciones', () => {
  it.each(demos)('%s carga el control común para volver a Pulso', (demo) => {
    const html = readFileSync(resolve(demosDirectory, demo), 'utf8');

    expect(html).toContain('demo-navigation.css');
    expect(html).toContain('demo-navigation.js');
  });

  it('ofrece accesos a la portada y al listado de demos', () => {
    const script = readFileSync(resolve(demosDirectory, 'demo-navigation.js'), 'utf8');

    expect(script).toContain('https://pulsogestiona.es/');
    expect(script).toContain('https://pulsogestiona.es/herramientas#demos');
  });
});
