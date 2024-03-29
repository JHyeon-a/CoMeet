import React from "react";
import ReactWordcloud from "react-wordcloud";

import tw from "tailwind-styled-components";

interface Keyword {
  name: string;
  weight: number;
}

interface Props {
  keywords: Keyword[] | undefined;
}

export default function MyKeyword({ keywords }: Props) {
  const words =
    keywords?.map(({ name, weight }) => ({ text: name, value: weight })) ?? [];

  //키워드 가장 큰 비율인 애 찾기
  const maxWeight = keywords?.reduce(
    (max, current) => {
      return max.weight > current.weight ? max : current;
    },
    { weight: -Infinity } as Keyword
  ).weight;

  // const maxWeightKeywords =
  //   keywords?.filter((keyword) => keyword.weight === maxWeight) || [];
  const sortedKeywords = keywords?.sort((a, b) => b.weight - a.weight) || [];
  const topThreeKeywords = sortedKeywords.slice(0, 3);

  const options = {
    fontSizes: [10, 60] as [number, number], // 글씨 크기 범위 설정 (최소 크기: 20, 최대 크기: 100)
    fontWeight: "600",
    padding: 3 as number,
    enableTooltip: false,
  };

  const maxWords: number = 20;
  const minSize: [number, number] = [200, 200];

  const size = [200, 200] as [number, number];
  return (
    <TotalContainer>
      {/* 이유를 알 수 없으나 아래를 스타일컴포넌트로 빼면 제대로 작동이 안 됨...! */}
      <div className="flex flex-col items-center items-start w-full h-full gap-y-3">
        <Title>키워드</Title>
        <Wrapper>
          {keywords?.length === 0 ? (
            <NoneKeywords>
              {/* 여기에 이미지 하나 넣으면 괜찮을 듯 */}
              <NoneTitle>대표하는 키워드가 없습니다.</NoneTitle>
              <Nonedescription>방에 들어가서 공부를 해 보세요!</Nonedescription>
            </NoneKeywords>
          ) : (
            <>
              <WordCloudContainer>
                <ReactWordcloud
                  words={words}
                  options={options}
                  size={size}
                  maxWords={maxWords}
                  minSize={minSize}
                />
              </WordCloudContainer>
              <TextContainer>
                <RankContainer>
                  <First>1위</First>
                  {topThreeKeywords.length >= 1 ? (
                    <Keyword>{topThreeKeywords[0].name}</Keyword>
                  ) : (
                    "없음"
                  )}
                </RankContainer>
                <RankContainer>
                  <First>2위</First>
                  {topThreeKeywords.length >= 2 ? (
                    <Keyword>{topThreeKeywords[1].name}</Keyword>
                  ) : (
                    "없음"
                  )}
                </RankContainer>
                <RankContainer>
                  <First>3위</First>
                  {topThreeKeywords.length >= 3 ? (
                    <Keyword>{topThreeKeywords[2].name}</Keyword>
                  ) : (
                    "없음"
                  )}
                </RankContainer>
              </TextContainer>
            </>
          )}
        </Wrapper>
      </div>
    </TotalContainer>
  );
}

//전체 컨테이너
const TotalContainer = tw.div`
w-full
h-full
text-white
`;

const Title = tw.div`
text-xl font-bold my-5
`;

const Wrapper = tw.div`
flex flex-col w-full h-full items-center gap-y-3 justify-around
`;

const NoneKeywords = tw.div`
flex
flex-col
justify-center
items-center
flex-grow
`;

const NoneTitle = tw.div`
text-xl font-bold pb-3
`;

const Nonedescription = tw.div`
text-gray-300 border-gray-300 border-b mb-7`;

const WordCloudContainer = tw.div`
flex items-center p-5 rounded-full bg-white overflow-hidden ring-[5px] outline-none ring-purple-500
`;

const TextContainer = tw.div`
flex flex-col justify-center items-start mb-[15%]
`;

const RankContainer = tw.div`
flex items-center
`;

const First = tw.div`
mr-7 font-bold text-xl my-1
`;

const Keyword = tw.div`
mr-3 font-bold text-lg text-purple-300
`;

const MultipleKeywordText = tw.div`
text-sm text-gray-300
`;
