"use client";

import { FC, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Loading from "./components/Loading";

interface NewsProps {
    href: string;
    text: string;
    time: string;
}

export default function Home() {
    const [isMenu, setIsMenu] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [news, setNews] = useState<NewsProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/news");
            const newsData = await response.json();
            setNews(newsData.newsData);
            setisLoading(false);
        };
        fetchData();
    }, []);

    const showMenuHandler = () => {
        setIsMenu(true);
    };
    const hideMenuHandler = () => {
        setIsMenu(false);
    };

    if (isLoading) return <Loading />;
    if (isMenu) return <MenuBar onDoubleClick={hideMenuHandler}></MenuBar>;
    return (
        <Container onDoubleClick={showMenuHandler}>
            <Wrapper>
                <TopComponent>
                    <Title>NEWS</Title>
                </TopComponent>
                <Bottom>
                    <InputWrap>
                        <SearchBar
                            type="text"
                            placeholder="찾고 싶은 키워들 입력해 주세요."
                        />
                    </InputWrap>
                    <CardWrap>
                        {news.length > 0 &&
                            news.map((data, idx) => (
                                <NewsCard
                                    key={idx}
                                    href={data.href}
                                    text={data.text}
                                    time={data.time}
                                />
                            ))}
                        {/* <AddButton>+</AddButton> */}
                    </CardWrap>
                </Bottom>
            </Wrapper>
        </Container>
    );
}
const NewsCard: FC<NewsProps> = ({ href, text, time }) => {
    return (
        <NoteCard>
            <Anchor href={href} target="blank">
                {text}
            </Anchor>
            <Time>{time}</Time>
        </NoteCard>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #333 0%, #170e28 170px), #170e28;
    margin: 0;
`;

const MenuBar = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 850px;
    height: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
`;

const stripesAnimation = keyframes`
  100% {
    background-position: 250px 0, 250px 0, 100px 0;
  }
`;
const TopComponent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: repeating-radial-gradient(
            circle at 100% 100%,
            rgba(255, 190, 11, 0.5) 4%,
            rgba(255, 190, 11, 0.5) 8%,
            rgba(251, 86, 7, 0.5) 8%,
            rgba(251, 86, 7, 0.5) 12%,
            rgba(255, 0, 110, 0.5) 12%,
            rgba(255, 0, 110, 0.5) 16%,
            rgba(131, 56, 236, 0.5) 16%,
            rgba(131, 56, 236, 0.8) 20%,
            rgba(58, 134, 255, 0.5) 20%,
            rgba(58, 134, 255, 0.5) 24%
        ),
        repeating-radial-gradient(
            circle at 0% 100%,
            rgba(255, 190, 11, 0.7) 4%,
            rgba(255, 190, 11, 0.9) 8%,
            rgba(251, 86, 7, 0.7) 8%,
            rgba(251, 86, 7, 0.9) 12%,
            rgba(255, 0, 110, 0.7) 12%,
            rgba(255, 0, 110, 0.9) 16%,
            rgba(131, 56, 236, 0.8) 16%,
            rgba(131, 56, 236, 0.8) 20%,
            rgba(58, 134, 255, 0.8) 20%,
            rgba(58, 134, 255, 0.8) 24%
        );
    background-size: 250px 250px;
    background-position: 0 0;
    animation: ${stripesAnimation} 3s linear infinite;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    padding: 5rem 0;
    padding-bottom: 3rem;
`;
const Title = styled.h1`
    letter-spacing: 4px;
    font-size: 4rem;
    color: transparent; // 글자 색상을 투명으로 설정
    text-align: center;
    font-weight: 900;
    letter-spacing: 10px;
    width: 100%;
`;

// 하단 컴포넌트
const Bottom = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;
// components/SearchBar.js
const InputWrap = styled.div`
    width: 100%;
`;
const SearchBar = styled.input`
    display: block;
    padding: 1.2rem 1rem;
    border-radius: 20px;
    border: none;
    width: 85%;
    max-width: 450px;
    font-size: 1rem;
    margin: 1rem auto;
`;

const CardWrap = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

// components/NoteCard.js
const NoteCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    background-color: #272045;
    color: white;
    padding: 2rem 2rem;
    padding-right: 1rem;
    border-radius: 20px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        background: #2a2157;
        transform: scaleX(1.02);
    }
`;

// components/AddButton.js
const AddButton = styled.button`
    background: #5e5ce6;
    color: white;
    font-size: 2.5rem;
    border: none;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
`;

const Anchor = styled.a`
    line-height: 1.5rem;
    font-weight: bold;
    color: #fff;
    flex: 8;
`;
const Time = styled.span`
    line-height: 1.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: #ddd;
    flex: 3;
    display: block;
    text-align: center;
`;
