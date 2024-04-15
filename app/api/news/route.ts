// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

type Link = {
    href: string;
    text: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        );

        await page.goto("https://finviz.com/news.ashx", {
            waitUntil: "domcontentloaded",
        });

        await new Promise((resolve) => {
            setTimeout(resolve, 100);
        });

        const newsData = await page.evaluate(() => {
            const timeElements = document.querySelectorAll(".news_date-cell");
            const linkElements = document.querySelectorAll(".news_link-cell a");

            const result = [];

            for (let i = 0; i < timeElements.length; i++) {
                const timeElement = timeElements[i] as HTMLElement;
                const linkElement = linkElements[i] as HTMLAnchorElement;

                const time = timeElement.textContent?.trim() ?? "";
                const href = linkElement.href;
                const text = linkElement.textContent?.trim() ?? "";

                result.push({ time, href, text });
            }

            return result;
        });
        await browser.close();

        return NextResponse.json({ newsData });
    } catch (error) {
        console.error("Error during scraping:", error);
        return NextResponse.json(
            { error: "스크래핑 중 오류 발생" },
            { status: 500 }
        );
    }
}
