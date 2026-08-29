import { expect,test } from '@playwright/test';
test('explica Pulso sin desbordar en móvil',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('forma única');await expect(page.getByRole('link',{name:/Cuéntanos/})).toBeVisible();expect(await page.locator('body').evaluate(b=>b.scrollWidth<=innerWidth)).toBe(true)});
test('ofrece feedback accesible',async({page})=>{await page.goto('/');await page.getByLabel('Nombre').fill('Ana');await page.getByLabel('Email').fill('ana@example.com');await page.getByLabel('Qué quieres mejorar').fill('Presupuestos');await page.getByRole('button',{name:/Preparar consulta/}).click();await expect(page.getByRole('status')).toContainText('Gracias, Ana')});

test('mantiene el cursor vivo y el pulso de marca en la portada', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-cursor]')).toHaveCount(1);
  await expect(page.locator('[data-hero-ecg] [data-trazo]')).toHaveCount(1);
  await expect(page.locator('[data-hero-latido]')).toHaveCount(1);
});

test('muestra el mensaje principal sin esperas y ofrece demos y WhatsApp', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('opacity', '1');
  await expect(page.getByRole('link', { name: /Ver demos/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', /^https:\/\/wa\.me\//);
});
