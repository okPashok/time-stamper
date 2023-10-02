const { test, chromium } = require('@playwright/test');

test('Stamp', async () => {
    const browser = await chromium.launchPersistentContext(process.env.PROFILE_PATH, {
        executablePath: process.env.PATH_TO_BROWSER,
    });
    const page = await browser.newPage();

    await page.goto('https://app.kenjo.io/signin');
    await page.locator('//button[.//orgos-column[text()="Sign in with Google"]]').click();
    await page.locator(`//div[./div[@data-email="${process.env.YOUR_EMAIL}"]]`).click();
    await page.waitForURL('https://app.kenjo.io/cloud/home');

    await page.locator('//span[text()="Attendance"]').click();
    await page.locator('//kenjo-icon[./mat-icon[text()=" keyboard_arrow_left "]]').click();
    await page.waitForTimeout(3000);

    const workDay = page.locator('//div[contains(@class, "undertime")]//orgos-column/span');
    const workDays = await workDay.evaluateAll((workDays) => {
        return workDays.map((element) => {
            return element.innerText;
        });
    });

    for (const day of workDays) {
        const stampedDay = page.locator(
            `//div[contains(@class, "undertime") and .//orgos-column/span[text()="${day}"]]`,
        );
        const startHours =
            '//orgos-input-simple-time[.//mat-label[contains(text(), "Start")]]//input[@formcontrolname="hour"]';
        const startMinutes =
            '//orgos-input-simple-time[.//mat-label[contains(text(), "Start")]]//input[@formcontrolname="minute"]';
        const endHours =
            '//orgos-input-simple-time[.//mat-label[contains(text(), "End")]]//input[@formcontrolname="hour"]';
        const endMinutes =
            '//orgos-input-simple-time[.//mat-label[contains(text(), "End")]]//input[@formcontrolname="minute"]';

        await page.waitForTimeout(2000);
        await stampedDay.locator(startHours).fill(process.env.START_TIME_H);
        await stampedDay.locator(startMinutes).fill(process.env.START_TIME_M);
        await stampedDay.locator(endHours).fill(process.env.END_TIME_H);
        await stampedDay.locator(endMinutes).last().fill(process.env.END_TIME_M);
        await page.locator('//button[text()=" Save "]').click();
    }

    if (
        (await page.locator('//div[./div[text()=" Tracked "]]/div[2]').innerText()) ==
        (await page.locator('//div[./div[contains(text(), "Expected ")]]/div[2]').innerText())
    ) {
        console.log('Successfully! The stamped time corresponds to the expected');
    } else {
        console.log('Something went wrong! The stamped time does not correspond to the expected');
        await page.pause();
    }
});
