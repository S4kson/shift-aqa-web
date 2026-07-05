import {test, expect} from '@playwright/test'

test('FAQ с раскрытым бургером ответа на вопрос', async ({page}) =>{

    await page.goto('faq') 
    await page.getByTestId('faq-question-1').click()
    //Убирание плашки Кук
    await page.getByTestId('cookie-accept-button').click()

    await expect.soft(page).toHaveScreenshot({
            fullPage: true,
    })
})

