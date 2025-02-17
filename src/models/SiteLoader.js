import axios from "axios";
import express from "express";
import * as cheerio from 'cheerio';
import fs from "node:fs/promises";
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
        const button = await this.page.evaluate((selector, text) => {
            const buttons = Array.from(document.querySelectorAll(selector));
           const button = buttons.find(button => button.textContent.trim() === text);
            return button;
     })
     return button;
    }
    async clickButton(button)
    {
        if(button)
            {
                button.click();
                console.log('Button found: ' + text)
            } else {
                console.log('Button not found: ' + text)
            }
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





