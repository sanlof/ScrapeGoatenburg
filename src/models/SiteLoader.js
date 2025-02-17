import puppeteer from "puppeteer";

export class SiteLoader {
    constructor(url) {
      this.url = url
    }

    async startPuppeteer()
    {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    async goToPage()
    {
        await this.page.goto(this.url, { waitUntil: 'networkidle2'});
    }

    async setViewport(x, y)
    {
        await this.page.setViewport({width: x, height: y});
    }

    async evaluatePage(selector, text)
     {
        await this.page.evaluate((selector, text) => {
        const buttons = Array.from(document.querySelectorAll(selector));
           const button = buttons.find(button => button.textContent.trim() === text);
        })
        
    }

    async clickButton(selector, text)
    {
        await this.page.evaluate((selector, text) => {
            const buttons = Array.from(document.querySelectorAll(selector)); 
            const button = buttons.find(button => button.textContent.trim() === text); 
            if (button) {
                button.click();
              } 
            })

   }

    async getContent() 
    {
        return this.htmlContent = await this.page.content();
    }

    async closeBrowser()
    {
        this.browser.close();
    }
}





