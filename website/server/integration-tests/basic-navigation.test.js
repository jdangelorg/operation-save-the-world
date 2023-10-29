const portfinder = require('portfinder') 
const puppeteer = require('puppeteer')

const app = require('../ao_site.js')

let server = null
let port = null

beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

test('home page links to links page', async () => { 
    const browser = await puppeteer.launch({headless:"new"})
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="links"]'),
    ])
    expect(page.url()).toBe(`http://localhost:${port}/links`)
    await browser.close()
})