import React from "react";

import tw from "tailwind-styled-components";

export const MySumTime = () => {
  //예시
  const todaySumTime = 5.3;
  const weekSumTime = 21;
  const monthSumTime = 100;

  return (
    <TotalContainer>
      <TodaySum>
        <TitleTWM>오늘</TitleTWM>
        <TimeTWM>{todaySumTime}</TimeTWM>
        <TimeTime>시간</TimeTime>
      </TodaySum>
      <WeekSum>
        <TitleTWM>이번주</TitleTWM>
        <TimeTWM>{weekSumTime}</TimeTWM>
        <TimeTime>시간</TimeTime>
      </WeekSum>
      <MonthSum>
        <TitleTWM>이번달</TitleTWM>
        <TimeTWM>{monthSumTime}</TimeTWM>
        <TimeTime>시간</TimeTime>
      </MonthSum>
    </TotalContainer>
  );
};

//전체 컨테이너
const TotalContainer = tw.div`
text-white
w-full
h-full
flex
`;

//오늘
const TodaySum = tw.div`
flex-1
flex
flex-col
my-5
ml-4
`;

//이번주
const WeekSum = tw.div`
flex-1
flex
flex-col
my-5
border-r
border-l
`;

//이번달
const MonthSum = tw.div`
flex-1
flex
flex-col
my-5
mr-4
`;

//오늘, 이번주, 이번달 타이틀
const TitleTWM = tw.div`
text-base
font-bold
self-center
py-2
`;

//평균 시간
const TimeTWM = tw.div`
flex-grow
flex
items-center
justify-center
text-6xl
font-black
`;

//글자 `시간`
const TimeTime = tw.div`
pb-2
pr-5
font-semibold
self-end`;