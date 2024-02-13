import React, { useEffect, useState } from "react";

import Day from "assets/img/time-day.svg";
import Night from "assets/img/time-night.svg";

import tw from "tailwind-styled-components";

interface Prop {
  mostStudyTime: string | undefined;
}

export const MyStudyTime = ({ mostStudyTime }: Prop) => {
  const [studyTime, setStudyTime] = useState<string[]>();
  const [dayOrNight, setDayOrNight] = useState<string>("");

  useEffect(() => {
    if (mostStudyTime) {
      setStudyTime(mostStudyTime.split("FROM")[1].split("TO"));
      if (studyTime) {
        if (parseInt(studyTime[0]) < 18 && parseInt(studyTime[0]) >= 6) {
          setDayOrNight("낮");
        } else {
          setDayOrNight("밤");
        }
      }
    }
  }, []);

  return (
    <TotalContainer>
      <TitleContainer>공부 시간대</TitleContainer>
      <ImgContainer>
        {dayOrNight === "" ? null : (
          <>
            {dayOrNight === "낮" ? (
              <img src={Day} className="w-36 h-36" />
            ) : (
              <img src={Night} className="w-36 h-36" />
            )}
          </>
        )}
      </ImgContainer>
      <TimeContainer>
        {studyTime?.length ? (
          <>
            <div className="flex">
              <div>
                {parseInt(studyTime[0]) < 12 ? "오전" : "오후"}&nbsp;
                {parseInt(studyTime[0]) <= 12
                  ? parseInt(studyTime[0])
                  : parseInt(studyTime[0]) - 12}
                시
              </div>
              &nbsp;~&nbsp;
              <div>
                {parseInt(studyTime[1]) < 12 ? "오전" : "오후"}&nbsp;
                {parseInt(studyTime[1]) <= 12
                  ? parseInt(studyTime[1])
                  : parseInt(studyTime[1]) - 12}
                시
              </div>
            </div>
          </>
        ) : (
          <div>선호하는 공부시간대가 없습니다.</div>
        )}
      </TimeContainer>
    </TotalContainer>
  );
};

//전체 컨테이너
const TotalContainer = tw.div`
w-full
h-full
flex
flex-col
items-center
`;

//타이틀 컨테이너
const TitleContainer = tw.div`
text-white
text-xl
font-bold
mt-3
`;

//이미지 컨테이너
const ImgContainer = tw.div`
text-white
flex-grow
flex
items-center
justify-center

`;

//시간대 표시 컨테이너
const TimeContainer = tw.div`
text-white
text-xl
font-semibold
mb-4
`;
