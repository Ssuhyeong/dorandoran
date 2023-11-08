import styled from "styled-components";
import background from "@/assets/img/bookview.png";
import arrowLeft from "@/assets/img/fairytale/arrowLeft.png";
import arrowRight from "@/assets/img/fairytale/arrowRight.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fairytaleContentListState,
  fairytaleReadState,
} from "@/states/children/info";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 5vh;
  text-align: center;
`;

const TextBox = styled.div`
  font-size: 7.5vh;
  color: white;
  -webkit-text-stroke: 0.02em black;
  text-shadow: 0.04em 0.04em 0.04em rgba(0, 0, 0, 0.4);
`;

const ArrowBox = styled.div`
  position: absolute;
  top: 42%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3%;
`;

const ArrowLeft = styled.img`
  width: 20vh;
`;

const ArrowRight = styled.img`
  width: 20vh;
`;

const FairytaleReadPage = () => {
  const navigate = useNavigate();
  // 동화 인덱스 리스트
  const fairytaleRead = useRecoilValue(fairytaleReadState);
  const [infoFairytaleRead, setInfoFairytaleRead] = useRecoilState(
    fairytaleContentListState
  );
  // 동화 세부 정보 리스트
  const fairytaleContentList = useRecoilValue(fairytaleContentListState);
  // 현재 페이지 (이미지 단위)
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // 컨텐츠 (스크립트 변화)
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  setInfoFairytaleRead(fairytaleContentList);
  const goLike = () => {
    // navigate("/children/like");
  };

  const handleArrowRight = () => {
    if (currentContentIndex < fairytaleContentList.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    } else if (
      currentContentIndex === fairytaleContentList.length - 1 &&
      currentPageIndex < fairytaleRead.length - 1
    ) {
      setCurrentPageIndex(currentPageIndex + 1);
      setCurrentContentIndex(0);
    } else if (
      currentContentIndex === fairytaleContentList.length - 1 &&
      currentPageIndex === fairytaleRead.length - 1
    ) {
      alert("동화끗");
      navigate("/children/like");
    }
  };

  const handleArrowLeft = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    } else if (currentContentIndex === 0 && currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setCurrentContentIndex(fairytaleContentList.length - 1);
    } else if (currentContentIndex === 0 && currentPageIndex === 0) {
      alert("처음이에여");
    }
  };

  const voice: string =
    fairytaleContentList[currentContentIndex]?.voiceUrl || "";
  const backgroundImage = fairytaleRead[currentPageIndex]?.imgUrl;
  const script = fairytaleContentList[currentContentIndex]?.script;
  setInfoFairytaleRead(fairytaleRead[currentPageIndex].contentResDto);

  useEffect(() => {
    const audioPlayer = new Audio(voice);

    audioPlayer.addEventListener("canplaythrough", () => {
      audioPlayer.play();
    });

    return () => {
      audioPlayer.pause();
      audioPlayer.removeEventListener("canplaythrough", () => {});
      audioPlayer.remove();
    };
  }, [voice]);

  return (
    <Background style={{ backgroundImage: `url(${backgroundImage})` }}>
      <ContentContainer>
        <ArrowBox>
          <ArrowLeft src={arrowLeft} onClick={handleArrowLeft} />
          <ArrowRight src={arrowRight} onClick={handleArrowRight} />
        </ArrowBox>
        <TextContainer>
          <TextBox>{script}</TextBox>
        </TextContainer>
      </ContentContainer>
    </Background>
  );
};

export default FairytaleReadPage;
