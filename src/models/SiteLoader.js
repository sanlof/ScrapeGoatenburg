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
        await this.page.goto(this.url);
    }

    async setViewport(x, y)
    {
        await this.page.setViewport({width: x, height: y});
    }

    async evaluatePage(selector, text)
     {
        await this.page.$$eval(selector, (element) => {
            for (i=0; i > element.length; i++)
            {
            if(element.textContent === text)
            {
                this.page.waitForNetworkIdle()
                break;
            } else {
                throw Error(text + "Button not found");
            }
        }
        
    })
}

    async clickButton(selector, text)
    {

        await this.page.$$eval(selector, (element) => {
            for (i=0; i > element.length; i++)
            {
            if(element.textContent === text)
            {
                element.click();
                this.page.locator('#page-events').wait();
                break;
            } else {
                throw Error(text + "Button not found");
            }
        }
        }, text)

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





