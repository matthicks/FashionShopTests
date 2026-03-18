import { Locator, Page, expect } from '@playwright/test';

export class SignupPage {
    readonly page: Page;
    readonly titleMrLabel: Locator;
    readonly titleMrsLabel: Locator;
    readonly passwordField: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly companyField: Locator;
    readonly address1Field: Locator;
    readonly address2Field: Locator;
    readonly cityField: Locator;
    readonly stateField: Locator;
    readonly zipCodeField: Locator;
    readonly countryField: Locator;
    readonly mobilePhoneField: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleMrLabel = page.locator('label[for="id_gender1"]');
        this.titleMrsLabel = page.locator('label[for="id_gender2"]');
        this.passwordField = page.getByLabel("Password");
        this.daySelect = page.getByTestId("days");
        this.monthSelect = page.getByTestId("months");
        this.yearSelect = page.getByTestId("years");
        this.firstNameField = page.getByTestId("first_name");
        this.lastNameField = page.getByTestId("last_name");
        this.companyField = page.getByTestId("company");
        this.address1Field = page.getByTestId("address");
        this.address2Field = page.getByTestId("address2");
        this.cityField = page.getByTestId("city");
        this.stateField = page.getByTestId("state");
        this.zipCodeField = page.getByTestId("zipcode");
        this.countryField = page.getByTestId("country");
        this.mobilePhoneField = page.getByTestId("mobile_number");
        this.createAccountButton = page.getByTestId("create-account");
    }

    async fillForm(data: {
        password: string,
        firstName: string,
        lastName: string,
        address1: string,
        city: string,
        state: string,
        zipCode: string,
        country: string,
        mobilePhone: string,
        title?: 'Mr' | 'Mrs',
        day?: string,
        month?: 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December',
        year?: string,
        company?: string,
        address2?: string
    }) {
        if (data.title === 'Mr') {
            await this.titleMrLabel.click({ force: true });
        } else if (data.title === 'Mrs') {
            await this.titleMrsLabel.click({ force: true });
        }
        await this.passwordField.fill(data.password);
        if (data.day) await this.daySelect.selectOption(data.day);
        if (data.month) await this.monthSelect.selectOption(data.month);
        if (data.year) await this.yearSelect.selectOption(data.year);
        await this.firstNameField.fill(data.firstName);
        await this.lastNameField.fill(data.lastName);
        if (data.company) await this.companyField.fill(data.company);
        await this.address1Field.fill(data.address1);
        if (data.address2) await this.address2Field.fill(data.address2);
        await this.cityField.fill(data.city);
        await this.stateField.fill(data.state);
        await this.zipCodeField.fill(data.zipCode);
        // await this.countryField.evaluate((select: HTMLSelectElement, value: string) => {
        //     select.value = value;
        //     select.dispatchEvent(new Event('change', { bubbles: true }));
        // }, data.country);

        await this.countryField.selectOption(data.country);
        await this.mobilePhoneField.fill(data.mobilePhone);
    }
};