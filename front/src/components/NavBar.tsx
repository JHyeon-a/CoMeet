import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import BasicProfile from "../assets/img/basic-profile.svg";
import IMac from "../assets/img/iMac.svg";
import MicMute from "../assets/img/mic-mute.svg";
import VideoWhite from "../assets/img/video-white.svg";
import RoomDefault from "../assets/img/room-default.svg";

import { ServerDropDownList } from "./ServerDropDownList";
import useOutsideClick from "../hooks/useOutsideClick";

//NavBarContainer: 네비게이션바 전체 틀
const NavBarContainer = tw.div`
    bg-[#282828]
    h-12
    text-white
    flex
    items-center

    `;

//Logo: 로고 메뉴
const Logo = tw.div`
    text-[20px]
    ml-5
    `;

//Menu: 방 찾기, 커뮤니티 메뉴 그룹
const Menu = tw.div`
    flex
    ml-12
    `;

//EachMenu: 방찾기, 커뮤니티 메뉴
const EachMenu = tw.div`
    mr-5
    `;

//Menu2: 서버, 프로필 사진 메뉴
const Menu2 = tw.div`
    ml-auto
    mr-5
    flex
    `;

//LoginSignup: 로그인, 회원가입 메뉴
const LoginSignup = tw.div`
    ml-2
    mr-3
    `;

//InServer: 서버 표시하는 상태바
const InServer = tw.div`
    flex
    mr-4
    p-1
    border-purple-400
    border-2
    rounded-md
    text-[14px]
`;

//ServerImg: 서버 이미지
const ServerImg = tw.img`
    bg-white
    rounded-full
    w-5
    mr-2
    ml-1
`;

//ServerText: 서버 이름
const ServerText = tw.p`
    mr-3
`;

//MicVideoImg: 마이크, 비디오 이미지 크기
const MicVideoImg = tw.img`
    w-5
    ml-1
    mr-1
`;

export const NavBar = () => {
  //임시
  const isLogin = true;

  //임시
  const isChannelIn = true;

  const [isServerOpen, setIsServerOpen] = useState(false);

  const showServerList = () => {
    setIsServerOpen(!isServerOpen);
  };

  //외부 클릭시 서버 드롭다운 닫힘
  const serverRef = useRef(null);
  useOutsideClick<HTMLDivElement>(serverRef, () => {
    if (isServerOpen) {
      setIsServerOpen(false);
    }
  });

  return (
    <NavBarContainer>
      <Logo>
        <Link to="/">[코밋]</Link>
      </Logo>
      {/*로그인 하면 서버, 프로필 메뉴 나오고 로그인 안 하면 회원가입, 로그인 메뉴 나옴*/}
      {isLogin ? (
        <>
          <Menu>
            <EachMenu>
              <Link to="/roomlist">방 찾기</Link>
            </EachMenu>
            <EachMenu>
              <Link to="/community">커뮤니티</Link>
            </EachMenu>
          </Menu>
        </>
      ) : null}
      <Menu2>
        {isLogin ? (
          <>
            {isChannelIn ? (
              <InServer>
                <ServerImg src={RoomDefault} alt="room" />
                <ServerText>싸피 10기</ServerText>
                {/* 마이크 상태, 비디오 상태에 따라 화면에 표시되는 이미지 다르게 해야 함 */}
                <MicVideoImg src={VideoWhite} alt="video" />
                <MicVideoImg src={MicMute} alt="mic" />
              </InServer>
            ) : null}

            <Menu2>
              <ul ref={serverRef}>
                <button onClick={showServerList}>
                  <img src={IMac} width={30} alt="server" />
                </button>
                {isServerOpen && <ServerDropDownList />}
              </ul>
            </Menu2>
            <Menu2>
              <Link to="/Mypage">
                <img src={BasicProfile} width={30} alt="profile" />
              </Link>
            </Menu2>
          </>
        ) : (
          <>
            <LoginSignup>
              <Link to="/signup">회원가입</Link>
            </LoginSignup>
            |
            <LoginSignup>
              <Link to="/login">로그인</Link>
            </LoginSignup>
          </>
        )}
      </Menu2>
    </NavBarContainer>
  );
};
