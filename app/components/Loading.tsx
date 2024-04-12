// components/LoadingEllipsis.tsx
import styled, { keyframes } from "styled-components";

const ellipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const Loader = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
`;

const Dot = styled.div`
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
        left: 8px;
        animation: ${ellipsis1} 0.6s infinite;
    }

    &:nth-child(2) {
        left: 8px;
        animation: ${ellipsis2} 0.6s infinite;
    }

    &:nth-child(3) {
        left: 32px;
        animation: ${ellipsis2} 0.6s infinite;
    }

    &:nth-child(4) {
        left: 56px;
        animation: ${ellipsis3} 0.6s infinite;
    }
`;
const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
`;

const LoadingEllipsis = () => (
    <Wrapper>
        <Loader>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
        </Loader>
    </Wrapper>
);

export default LoadingEllipsis;
