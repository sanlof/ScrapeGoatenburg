import * as cheerio from 'cheerio';

export class ContentScraper
{
    constructor(htmlContent) {
        this.htmlContent = htmlContent
        this.eventResults = []
      }

      loadCheerio()
      {
        this.$ = cheerio.load(this.htmlContent);
      }

      setBodyClass(parameter)
      {
        this.bodyClass = parameter
      }

      setTitleClass(parameter)
      {
        this.titleClass = parameter
      }

      setLinkClass(parameter)
      {
        this.linkClass = parameter
      }

      setDateClass(parameter)
      {
        this.dateClass = parameter
      }

      setLocationClass(parameter)
      {
        this.LocationClass = parameter
      }

        setBaseUrl(parameter)
      {
        this.baseUrl = parameter
      }

      async scrapeLoop()
      {
        this.$(this.bodyClass).each((index, element) => {
            const title = this.$(element).find(this.titleClass).text().trim()
            let link = this.$(element).find(this.linkClass).attr('href');
            link = this.baseUrl + link;
            //Den här koden funkar bara på Göteborg & co. Om vi vill scrapea annat, behöver vi ändrar
            const date = this.$(element).find(this.dateClass).eq(0).text();
            const location = this.$(element).find(this.LocationClass).eq(1).text();
            
            const eventData = { 
                    'title': title,
                    'date': date,
                    'location': location,
                    'link': link
                }
          
            this.eventResults.push(eventData);
            
            })
      }
}

            
// $('.event-card__body').each((index, element) => {
//     const title = $(element).find('.heading').text().trim()
//     let link = $(element).find('a.stretched-link').attr('href');
//     link = 'https://www.goteborg.com' + link;
//     const date = $(element).find('.c-icon__title').eq(0).text();
//     const location = $(element).find('.c-icon__title').eq(1).text();
    
//     const eventData = { 
//             'title': title,
//             'date': date,
//             'location': location,
//             'link': link
//         }
  
//     eventResults.push(eventData);
    
//     })
   
  
