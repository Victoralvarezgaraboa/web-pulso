import { describe, expect, it } from 'vitest';
import { methodSteps, problems, siteMeta, useCases } from '../src/data/pulso';
describe('contenido aprobado',()=>{it('mantiene el posicionamiento',()=>{expect(siteMeta.title).toBe('Pulso | Sistemas a medida para tu negocio');expect(siteMeta.description).toContain('automatizar tareas')});it('incluye pilares y casos',()=>{expect(problems).toHaveLength(5);expect(useCases).toHaveLength(3);expect(methodSteps).toHaveLength(4)})});
