import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const demoUrl = pathToFileURL(
  resolve(process.cwd(), '..', 'muro-instagram', 'generador.html'),
).href;

test('la demo permite volver a Pulso o al catálogo de demos', async ({ page }) => {
  await page.goto(demoUrl);

  const volver = page.getByRole('link', { name: 'Volver a la página principal de Pulso' });
  const catalogo = page.getByRole('link', { name: 'Ver todas las demos' });

  await expect(volver).toBeVisible();
  await expect(volver).toHaveAttribute('href', 'https://pulsogestiona.es/');
  await expect(catalogo).toBeVisible();
  await expect(catalogo).toHaveAttribute(
    'href',
    'https://pulsogestiona.es/herramientas#demos',
  );
});
