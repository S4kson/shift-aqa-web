// import {test, expect} from '@playwright/test'
// import config from '../playwright.config'

// const baseURL = config.use?.baseURL

// if (!baseURL){
//     throw new Error('baseURL не задан в конфиге')
// }

// //  4.1. Особенностью страницы "Каталог" можно назвать Заголовок, он как будто бы должен быть:
// //  "Каталог | СладкийДом", а не "СладкийДом - Интернет-магазин сладостей".
// //  Но такая особенность есть также у страниц "Обратная связь" и "FAQ", так что тут может просто не выбран единный стиль оформления
// //  4.2. Значок корзины в кнопках у товаров у каталога не влезает



// //#region Проверки корректности текста в кнопках (Хедер)


// test('Проверка текста в лого', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-logo')).toContainText('🍬СладкийДом')
// })

// test('Проверка текста у кнопки "Главная"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-nav-link-home')).toContainText('Главная')
// })

// test('Проверка текста у кнопки "Каталог"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-nav-link-catalog')).toContainText('Каталог')
// })

// test('Проверка текста у кнопки "Акции"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-nav-link-promotions')).toContainText('Акции')
// })

// test('Проверка текста у кнопки "Доставка"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-nav-link-delivery')).toContainText('Доставка')
// })

// test('Проверка текста у кнопки "О нас"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-nav-link-about')).toContainText('О нас')
// }) 

// test('Проверка текста у кнопки "Контакты"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-nav-link-contacts')).toContainText('Контакты')
// }) 

// test('Проверка текста у кнопки "Обратная связь"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-nav-link-feedback')).toContainText('Обратная связь')
// }) 

// test('Проверка текста у кнопки "FAQ"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-nav-link-faq')).toContainText('FAQ')
// }) 

// test('Проверка значка корзины у кнопки "Корзина"', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('header-cart-button')).toBeVisible 
    
// }) 

// //#endregion

// //#region Проверки корректности текста в кнопках (Плашка Кук)

// test('Проверка текста у кнопки "Отклонить', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('cookie-decline-button')).toContainText('Отклонить')
// })

// test('Проверка текста у кнопки "Принять', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('cookie-decline-button')).toContainText('Принять')
// })

// //#endregion

// //#region Проверки интерактивных элементов (Хедер)

// test('Проверка ссылки в логотипе (переход по ссылке на главную)', async ({page}) => {
//     await page.goto('promotions')
//     await page.getByTestId('header-logo').click()
//     await expect.soft(page).toHaveTitle('Главная')
//     await expect.soft(page).toHaveURL(baseURL)
// })

// test('Проверка перехода на  страницу "Главная" по кнопке "Главная"', async ({page}) => {
//     await page.goto('promotions')
//     await page.getByTestId('header-nav-link-home').click()
//     await expect.soft(page).toHaveTitle('Главная')
//     await expect.soft(page).toHaveURL(baseURL)
// })

// test('Проверка перехода на страницу "Каталог" по кнопке "Каталог', async ({page}) => {
//     await page.goto('')
//     await page.getByTestId('header-nav-link-catalog').click()
//     await expect.soft(page).toHaveTitle('Каталог | СладкийДом') //найден дефект. На данный момент Заголовок у страницы обратной связи: 
//     await expect.soft(page).toHaveURL(`${baseURL}catalog`)  //"СладкийДом - Интернет-магазин сладостей", 
// })                                                          //а должен быть "Обратная связь | СладкийДом"

// test('Проверка перехода на страницу "Акции" по кнопке"Акции"', async ({page}) => {
//     await page.goto('')
//     await page.getByTestId('header-nav-link-promotions').click()
//     await expect.soft(page).toHaveTitle('Акции | СладкийДом')
//     await expect.soft(page).toHaveURL(`${baseURL}promotions`)
// })

// test('Проверка перехода на страницу "Доставка" по кнопке"Доставка"', async ({page}) => {
//     await page.goto('')
//     await page.getByTestId('header-nav-link-delivery').click()
//     await expect.soft(page).toHaveTitle('Доставка и оплата | СладкийДом')
//     await expect.soft(page).toHaveURL(`${baseURL}delivery`)
// })

// test('Проверка перехода на страницу "О компании" по кнопке"О нас"', async ({page}) => {
//     await page.goto('')
//     await page.getByTestId('header-nav-link-about').click()
//     await expect.soft(page).toHaveTitle('О компании | СладкийДом')
//     await expect.soft(page).toHaveURL(`${baseURL}about`)
// })

// test('Проверка перехода на страницу "Контакты" по кнопке"Контакты"', async ({page}) => {
//     await page.goto('')
//     await page.getByTestId('header-nav-link-contacts').click()
//     await expect.soft(page).toHaveTitle('Контакты | СладкийДом')
//     await expect.soft(page).toHaveURL(`${baseURL}contacts`)
// })

// test('Проверка перехода на страницу "Обратная связь" по кнопке"Обратная связь"', async ({page}) => {
//     await page.goto('')
//     await page.getByTestId('header-nav-link-feedback').click()
//     await expect.soft(page).toHaveTitle('Обратная связь | СладкийДом') //найден дефект. На данный момент Заголовок у страницы обратной связи: 
//     await expect.soft(page).toHaveURL(`${baseURL}feedback`) //"СладкийДом - Интернет-магазин сладостей", 
// })                                                          //а должен быть "Обратная связь | СладкийДом"

// test('Проверка перехода на страницу "FAQ" по кнопке"FAQ"', async ({page}) => {
//     await page.goto('')
//     await page.getByTestId('header-nav-link-faq').click()
//     await expect.soft(page).toHaveTitle('FAQ | СладкийДом') //найден дефект. На данный момент Заголовок у страницы faq: 
//     await expect.soft(page).toHaveURL(`${baseURL}faq`) //"СладкийДом - Интернет-магазин сладостей", 
// })                                                     //а, предположительно, должен быть"FAQ | СладкийДом"

// test('Проверка перехода на страницу "Корзина" по кнопке-значку"Корзина"', async ({page}) => {
//     await page.goto('')
//     await page.getByTestId('header-cart-link').click()
//     await expect.soft(page).toHaveTitle('Корзина | СладкийДом') //найден дефект. На данный момент Заголовок у страницы faq: 
//     await expect.soft(page).toHaveURL(`${baseURL}cart`) //"СладкийДом - Интернет-магазин сладостей", 
// })                                                      //а, предположительно, должен быть"Корзина | СладкийДом"
// //#endregion

// //#region Проверки интерактивных элементов (Плашка кук)
// test('Проверка закрытия плашки кук', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('cookie-consent-banner')).toBeVisible()
//     await page.getByTestId('cookie-decline-button').click()
//     await expect.soft(page.getByTestId('cookie-consent-banner')).toBeHidden()
// }) 

// test('Проверка открытия плашки кук', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('cookie-consent-banner')).toBeVisible()
//     await page.getByTestId('cookie-accept-button').click()
//     await expect.soft(page.getByTestId('cookie-consent-banner')).toBeHidden()
// }) 

// test('Проверка перехода на страницу "Политика конфиденциальности" по гиперссылке "политикой конфиденциальности" в плашке кук', async ({page}) => {
//     await page.goto('')
//     await expect.soft(page.getByTestId('cookie-consent-banner')).toBeVisible()
//     await page.getByTestId('cookie-consent-privacy-link').click() 
//     await expect.soft(page).toHaveTitle('Политика конфиденциальности | СладкийДом')
//     await expect.soft(page).toHaveURL(`${baseURL}privacy`)
    
// }) 
// //#endregion