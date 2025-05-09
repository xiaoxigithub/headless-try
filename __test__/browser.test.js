const cfCheck = require('../src/utils/cfCheck.js');
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium-min");
const fs = require('fs');
const path = require('path');
const remoteExecutablePath =
  "https://gh-proxy.com/https://github.com/Sparticuz/chromium/releases/download/v126.0.0/chromium-v126.0.0-pack.tar";
const userAgent = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36";
const websites = [
    "https://nopecha.com/demo/cloudflare",
    "https://www.cnblogs.com/"
    // , "https://nowsecure.nl/"
    // , "https://2captcha.com/demo/cloudflare-turnstile"
    // , "https://infosimples.github.io/detect-headless/"
    // , "https://arh.antoinevastel.com/bots/areyouheadless"
    // , "https://bot.sannysoft.com/"
    // , "https://hmaker.github.io/selenium-detector/"
    // , "https://kaliiiiiiiiii.github.io/brotector/"
    // , "https://fingerprintjs.github.io/BotD/main/"
    // , "https://pixelscan.net/"
];
describe("Testing page navigation and title", () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            ignoreDefaultArgs: ["--enable-automation"],
            args: [...chromium.args, "--disable-blink-features=AutomationControlled"],
            defaultViewport: { width: 1920, height: 1080 },
            executablePath: await chromium.executablePath(remoteExecutablePath),
            headless: "new",
        });
        const pages = await browser.pages();
        page = pages[0];
        await page.setUserAgent(userAgent);
        const preloadFile = fs.readFileSync(path.join(process.cwd(), '/src/utils/preload.js'), 'utf8');
        await page.evaluateOnNewDocument(preloadFile);
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
    }, 30000);
    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });

    it("should set up the browser", async () => {
        expect(browser).toBeDefined();
        expect(page).toBeDefined();
    });
    websites.forEach((website, i) => {
        it(`should navigate to '${website}'`, async () => {
            try {
                await page.goto(website, { waitUntil: "networkidle2" });
                await cfCheck(page);
                await page.screenshot({ path: `screenshots/example${i}.png` });
                console.log(website + "\nTest passed!");
            } catch (error) {
                console.error(website + "\nTest failed:", error);
                throw error;
            }

        }, 60000);
    });
});
