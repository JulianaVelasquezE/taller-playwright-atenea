import { test, expect } from '@playwright/test';

test('TC-1 Verify visual elements on the registration page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
  await expect(page.getByTestId('boton-login-header-signup')).toBeVisible();
  //await expect(page.getByTestId('boton-login-header-signup')).toBeEnabled();
});

test('TC-2 Verify that the Register button is disabled by default', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-3 Verify that the Register button becomes enabled when all required fields are filled in', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('input[name="firstName"]').fill('Julia');
  await page.locator('input[name="lastName"]').fill('Estrada');
  await page.locator('input[name="email"]').fill('julia.estrada@email.com');
  await page.locator('input[name="password"]').fill('Juli1234*');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
});

test('TC-4 Verify that clicking the Login button redirects the user to login page', async ({ page }) => {
  //Verify that the user is redirected to the login page when they click the Login button.
  //Verify redirection to the login page after clicking the Login button.
  await page.goto('http://localhost:5173/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:5173/login');
  await page.waitForTimeout(5000);
});

test('TC-5 Verify successful registration with valid data', async ({ page }) => {
  //Verify that a user can successfully register with valid data.
  await page.goto('http://localhost:5173/');
  await page.locator('input[name="firstName"]').fill('Julia');
  await page.locator('input[name="lastName"]').fill('Estrada');
  await page.locator('input[name="email"]').fill('julia.estrada'+Date.now().toString()+'@email.com');
  await page.locator('input[name="password"]').fill('Juli1234*');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verify that a user cannot register with an existing email address', async ({ page }) => {
  //Verify that a user cannot register with an email address that is already registered.
  const email = 'julia.estrada'+Date.now().toString()+'@email.com';
  await page.goto('http://localhost:5173/');
  await page.locator('input[name="firstName"]').fill('Julia');
  await page.locator('input[name="lastName"]').fill('Estrada');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('Juli1234*');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await page.goto('http://localhost:5173/');
  await page.locator('input[name="firstName"]').fill('Julia');
  await page.locator('input[name="lastName"]').fill('Estrada');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('Juli1234*');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});

