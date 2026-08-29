import { describe, expect, it } from 'vitest';
import { methodSteps, problems, siteMeta, useCases } from '../src/data/pulso';
describe('contenido aprobado',()=>{it('mantiene el posicionamiento',()=>{expect(siteMeta.title).toBe('Pulso | Sistemas a medida para tu negocio');expect(siteMeta.description).toContain('automatizar tareas')});it('incluye pilares y casos',()=>{expect(problems).toHaveLength(5);expect(useCases).toHaveLength(3);expect(methodSteps).toHaveLength(4)})});

it('ofrece demos desde la cabecera y desde cada caso sin añadir otra sección', async () => {
  const { navigation, useCases } = await import('../src/data/pulso');
  expect(navigation).toContainEqual({ href: '/herramientas#demos', label: 'Demos' });
  expect(useCases.every((item) => 'demoHref' in item && 'demoLabel' in item)).toBe(true);
  expect(useCases[0].demoHref).toContain('generador.html');
  expect(useCases[1].demoHref).toContain('facturas.html');
  expect(useCases[2].demoHref).toBe('/herramientas#demos');
});
