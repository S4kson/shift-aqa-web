import {test, expect} from '@playwright/test'

test('Корзина с товаром', async ({page}) =>{

    await page.goto('catalog') 
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click()
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click()
    await page.getByTestId('header-cart-button').click()
    //Убирание плашки Кук
    await page.getByTestId('cookie-accept-button').click()


    await expect.soft(page).toHaveScreenshot({
            fullPage: true,
            mask: [ //Маскировка капчи и тотал прайс
                page.getByTestId('cart-captcha-image'),
                page.getByTestId('cart-total-price'),
                page.locator('[class="text-sm font-semibold text-primary"]')
            ]
    })
})

