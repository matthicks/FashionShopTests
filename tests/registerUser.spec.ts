import { test, expect } from '@playwright/test';

test.only('register user', async ({ page }) => {
    await page.goto('/login');
    const registerForm = page.locator('form').filter({ hasText: 'Signup' });
    const usernameField = registerForm.getByPlaceholder('Name');
    const passwordField = registerForm.getByPlaceholder('Email Address');
    await usernameField.fill('testuser');
    await passwordField.fill('testpassword');
});
