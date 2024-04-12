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
            setTimeout(resolve, 100); // 10초 대기
        });

        const newsData = await page.evaluate(() => {
            // .news_date-cell 및 .news_link-cell 요소의 쿼리 선택
            const timeElements = document.querySelectorAll(".news_date-cell");
            const linkElements = document.querySelectorAll(".news_link-cell a");

            // 결과를 저장할 배열 초기화
            const result = [];

            // 시간과 링크 요소의 길이가 같다고 가정하고 반복
            for (let i = 0; i < timeElements.length; i++) {
                const timeElement = timeElements[i] as HTMLElement;
                const linkElement = linkElements[i] as HTMLAnchorElement;

                const time = timeElement.textContent?.trim() ?? "";
                const href = linkElement.href;
                const text = linkElement.textContent?.trim() ?? "";

                // 시간 및 링크 데이터 병합
                result.push({ time, href, text });
            }

            // 최종 결과 반환
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
