import {test, expect} from '@playwright/test'
import { fillAllFields } from './helpers/fillAllFields'


test('Проверка сортировки по убыванию текущая страница', async ({ page }) => {
    await page.goto('catalog')
    await page.getByTestId('catalog-sort-select').click()
    await page.getByTestId('catalog-sort-option-desc').click()

    const priceLocator = page.locator('[data-testid^="catalog-product-price-prod-"]')
    await page.waitForSelector('[data-testid^="catalog-product-price-prod-"]')

    const priceElemnt = await priceLocator.all()
    const prices: number[] = []

    for (const element of priceElemnt) {
        const price = Number((await element.textContent())?.replace(/[^0-9]/g, '')) 
        prices.push(price)
    }

    for (let i = 0; i<prices.length-1; i++) {
        console.log(`${prices[i]}>${prices[i+1]}`)
        expect.soft(prices[i]).toBeGreaterThanOrEqual(prices[i+1])
    }
})

test('Проверка сортировки по убыванию все страницы', async ({ page }) => {
    await page.goto('catalog')
    await page.getByTestId('catalog-sort-select').click()
    await page.getByTestId('catalog-sort-option-desc').click()

    let lastPrice = 9999
    let curentPage = 1
    let hasNextPage = true

    const priceLocator = page.locator('[data-testid^="catalog-product-price-prod-"]')
    await page.waitForSelector('[data-testid^="catalog-product-price-prod-"]')

    while (hasNextPage) {
        const priceElemnt = await priceLocator.all()
        const prices: number[] = []

        for (const element of priceElemnt) {
            const price = Number((await element.textContent())?.replace(/[^0-9]/g, '')) 
            prices.push(price)
        }

        console.log(`//////////////////${lastPrice}>${prices[0]}`)
        expect.soft(lastPrice).toBeGreaterThanOrEqual(prices[0])
        for (let i = 0; i<prices.length-1; i++) {
            console.log(`${prices[i]}>${prices[i+1]}`)
            expect.soft(prices[i]).toBeGreaterThanOrEqual(prices[i+1])
        }

        const isDisabled = await page.getByTestId('catalog-pagination-next').isDisabled()

        if (isDisabled) {
            hasNextPage = false
        } else {
            await page.getByTestId('catalog-pagination-next').click()
            await page.waitForSelector('[data-testid^="catalog-product-price-prod-"]')
        }
        lastPrice = prices[prices.length-1]
        curentPage++
    }
    console.log(curentPage)
})

//#region Тестирование поля ФИО / Тестовые данные

const positiveFio = [
  // Латиница
  'Saksonov Konstantin Sergeevich',
  'Sidorov Sidr Sidrovich',
  'Volkov Volk Volkovich',
  
  // Кириллица
  'Саксонов Константин Сергеевич',
  'Сидоров Сидр Сидрович',
  'Волков Волк Волкович',
  
  // Кириллица + Латиница
  'Саксонов Konstantin Sergeevich',
  'Волков Volk Volkovich',
  
  // Аперкейс (заглавные)
  'САКСОНОВ КОНСТАНТИН СЕРГЕЕВИЧ',
  'SAKSONOV KONSTANTIN SERGEEVICH',

  //Ловеркейсы (прописные)
  'саксонов константин сергеевич',
  'saksonov konstantin sergeevich',

  // Смешанный регистр
  'СаКсОнОв КоНсТаНтИн СеРгЕеВиЧ',
  'SiDoRoV SiDr SiDrOvIcH',
  
  // Тире
  'Саксонов-Денисов Константин Сергеевич',
  'Sidorov-Volkov Sidr Sidrovich',
  
  // Часть ФИО
  'Константин',
  'Sidor',
  'Волкович',
  
  // Слитно (без пробелов)
  'СаксоновКонстантинСергеевич',
  'SaksonovKonstantinSergeevich',
  
  // Граничные значения длины
  'С', 
  'Сa',
  'Саксоновононов Константин Сергеевич', //35
  'Саксоновононов Константинининининининининининининининининин Сергеевич', //69
  'Саксоновононов Константининининининининининининининининиинин Сергеевич', //70
]

const negativeFio = [
  // Длина
  '',
  'Саксоновононов Константинининининининининининининининининин Сергеевиччч', //71
  
  // Цифры
  'Саксонов09 Константин Сергеевич',
  'Sidorov Sidr7 Sidrovich',
  '123456',
  
  // Спецсимволы
  'Саксонов@ Константин!Сергеевич',
  'Sidorov$ Sidr# Sidrovich',
  'Volkov/ Volk Volkovich',
  'Сидр_Сидрович',
  'Волк.Волков',
  'Волк, Волков',
  'Волк(Волков)',
  
  // Только спецсимволы
  '@#$%^&*()',

  // В строке только пробелы
  '                                                                      ', //70
]

const notFulCorrectFio = [

  // Тут возникает проблема что я не знаю как точно проверить. 
  // Потому что часто система дает пользователю вести с лишними пробелами а потом сама убирает лишние чтобы нормально 
  // в базу запиать

  // Пробелы в неправильных местах 
  ' Саксонов Константин Сергеевич',
  'Саксонов Константин Сергеевич ',
  'Саксонов  Константин  Сергеевич',
  'Саксонов Константин   Сергеевич',
  
  // Тире в неправильных местах
  '-Саксонов Константин Сергеевич',
  'Саксонов- Константин Сергеевич',
  'Саксонов--Константин Сергеевич',
  'Саксонов Константин Сергеевич-',
]

//#endregion 

//#region Тестирование поля ФИО / Тесты

for (const fio of positiveFio) {
  test(`Проверка валидного ФИО: "${fio}"`, async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
      response.url().includes("/api/captcha")
    )
    await page.goto('feedback')
    const captchaResponse = await captchaResponsePromise
    const { id } = await captchaResponse.json()
    const { code } = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    await fillAllFields(page, { fullname: fio, code })
    await expect.soft(page.getByTestId('feedback-error-fullname')).toBeHidden()
    await expect.soft(page.getByTestId('feedback-submit-button')).toBeEnabled()
  })
}

for (const fio of negativeFio) {
  test(`Проверка не валидного ФИО: "${fio}"`, async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
      response.url().includes("/api/captcha")
    )
    await page.goto('feedback')
    const captchaResponse = await captchaResponsePromise
    const { id } = await captchaResponse.json()
    const { code } = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    await fillAllFields(page, { fullname: fio, code })
    await expect.soft(page.getByTestId('feedback-error-fullname')).toBeVisible()
    await expect.soft(page.getByTestId('feedback-submit-button')).toBeDisabled()
  })
}

//Я решил отделить проверки на лишние или не правильные тире, не могу проверить их, поэтому просто проверяю что их можно отправить. 
// В идеале мне кажется надо как-то смотреть, что добавилось в БД
for (const fio of notFulCorrectFio) { 
  test(`Проверка ФИО с лишними тире и пробелами: "${fio}"`, async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
      response.url().includes("/api/captcha")
    )
    await page.goto('feedback')
    const captchaResponse = await captchaResponsePromise
    const { id } = await captchaResponse.json()
    const { code } = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    await fillAllFields(page, { fullname: fio, code })
    await expect.soft(page.getByTestId('feedback-error-fullname')).toBeHidden()
    await expect.soft(page.getByTestId('feedback-submit-button')).toBeEnabled()
  })
}
//#endregion

