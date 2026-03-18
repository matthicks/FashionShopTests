import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signupPage';
import { faker } from '@faker-js/faker';

test.only('register user', async ({ page }) => {
    await page.goto('/login');

    // handler to close ads
    await page.addLocatorHandler(page.locator('iframe[name="aswift_1"]').contentFrame().getByRole('button', { name: 'Close ad' }), async (button) => {
        await button.click();
    });

    const registerForm = page.locator('form').filter({ hasText: 'Signup' });
    const usernameField = registerForm.getByPlaceholder('Name');
    const passwordField = registerForm.getByPlaceholder('Email Address');
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const emailAddress = faker.internet.email();

    await usernameField.fill(fullName);
    await passwordField.fill(emailAddress);
    // await passwordField.fill(process.env.TEST_EMAILADDRESS || 'test@test.com');
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page).toHaveURL('/signup');
    const signupPage = new SignupPage(page);
    const country = faker.helpers.arrayElement([
        'India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'
    ]);
    console.log('Selected country:', country);
    await signupPage.fillForm({
        title: 'Mr',
        password: process.env.TEST_PASSWORD || 'password',
        day: '14',
        month: 'June',
        year: '1990',
        firstName: firstName,
        lastName: lastName,
        address1: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: country,
        mobilePhone: faker.phone.number({ style: 'national' })
    });
    await signupPage.createAccountButton.click();
    await expect(page).toHaveURL('/account_created');
    await expect(page.locator('.title.text-center')).toContainText('Account Created!');
    await page.getByTestId('continue-button').click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('.shop-menu.pull-right')).
        toContainText(`Logged in as ${fullName}`);
});
