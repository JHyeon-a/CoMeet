import React from "react";

import tw from "tailwind-styled-components";

const NoticeContainer = tw.div`
bg-[#161616]
text-white
absolute
mt-1
py-2
shadow-lg
z-50
rounded-md
px-2
w-[20%]

`;

const Title = tw.h1`
text-center
font-bold
p-2
border-b
`;

const Contents = tw.p`
p-2
`;

interface IProps {
  text: string | undefined;
}

export const RoomNotice = ({ text }: IProps) => {
  return (
    <NoticeContainer>
      <Title>모두 필독해주세요!</Title>
      <Contents>{text}</Contents>
    </NoticeContainer>
  );
};
