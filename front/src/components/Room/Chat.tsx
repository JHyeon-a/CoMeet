import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import TextareaAutosize from "react-textarea-autosize";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import usePressEnterFetch from "../../hooks/usePressEnterFetch";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ChatRow from "./ChatRow";
import { formatDate } from "utils/FormatDate";
import BasicProfile from "assets/img/basic-profile.svg";
import { useSelector } from "react-redux";

interface IProps {
  chatDomain: string;
  id: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  title: string;
}

export default function Chat({
  chatDomain,
  id,
  setMessage,
  message,
  title,
}: IProps) {
  const userInfo = useSelector((state: any) => state.user);

  const [rows, setRows] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const chatStompClient = useRef<any>(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_WEBSOCKET_SERVER_URL}chat/${chatDomain}/messages?${chatDomain}Id=${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        setRows(response.data);

        if (chatStompClient.current === null) {
          chatStompClient.current = Stomp.over(() => {
            const sock = new SockJS(
              `${process.env.REACT_APP_WEBSOCKET_SERVER_URL}stomp`
            );
            return sock;
          });

          chatStompClient.current.connect(
            {},
            () => {
              chatStompClient.current.subscribe(
                `/chat/${chatDomain}/${id}`,
                (e: any) => showMessage(JSON.parse(e.body)),
                { id: chatDomain }
              );
            },
            (e: any) => alert("에러발생!!!!!!")
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      if (chatStompClient.current) {
        chatStompClient.current.disconnect(() =>
          console.log("방 웹소켓 연결 끊김!")
        );
        chatStompClient.current = null;
      }
    };
  }, [id]);

  //화면에 메시지를 표시하는 함수
  function showMessage(data: any) {
    console.log(data);
    setRows((prev) => [...prev, data]);
  }

  //메시지 브로커로 메시지 전송
  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (message === "") return;

    const data = {
      [`${chatDomain}Id`]: id,
      memberId: userInfo.user.memberId,
      nickname: userInfo.user.nickname,
      message,
      imageUrl: "",
      profileImage: `${userInfo.user.profileImage ? userInfo.user.profileImage : BasicProfile}`,
      createdAt: formatDate(
        new Date(new Date().toLocaleString("en", { timeZone: "Asia/Seoul" }))
      ),
    };
    // send(destination,헤더,페이로드)
    chatStompClient.current.send(
      `/app/chat/${chatDomain}/send`,
      {},
      JSON.stringify(data)
    );
    setMessage("");
  };
  const { handlePressEnterFetch } = usePressEnterFetch({
    handleSubmit,
    isSubmitting,
  });

  useEffect(() => {
    const chatcontent = document.getElementById("chatcontent");
    if (chatcontent) {
      const position = chatcontent.scrollHeight;
      chatcontent.scrollTop = position;
    }
  }, [rows]);

  const onChangeMessage: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setMessage(e.target.value);
  };

  return (
    <ChatContainer>
      <ChatInputContainer onSubmit={handleSubmit}>
        <ChatInput
          minRows={2}
          maxRows={6}
          onChange={onChangeMessage}
          value={message}
          onKeyDown={handlePressEnterFetch}
        />
        <ChatSubmitButton type="submit">
          <PaperAirplaneIcon className="w-3 h-3" />
        </ChatSubmitButton>
      </ChatInputContainer>
      <ChatContentContainer id="chatcontent">
        <ChatContent>
          <IntroRow $chatDomain={chatDomain}>
            <IntroTitle $chatDomain={chatDomain}>
              {`'${title}'에 오신 것을 환영합니다!`}
            </IntroTitle>
            <IntroDescription $chatDomain={chatDomain}>
              {chatDomain === "lounge"
                ? `라운지의 시작입니다. 라운지는 자유롭게 채팅을 할 수 있는
              공간이에요.`
                : `채널 채팅의 시작입니다.`}
            </IntroDescription>
          </IntroRow>
          {rows.map((r) => (
            <ChatRow key={r.id} chat={r} />
          ))}
        </ChatContent>
      </ChatContentContainer>
    </ChatContainer>
  );
}

const ChatContainer = tw.div`
w-full
h-full
flex
flex-col-reverse
text-white
`;

const ChatInputContainer = tw.form`
rounded-full
relative
p-2
`;

const ChatInput = tw(TextareaAutosize)`
w-full
h-full
text-slate-800
rounded-lg
p-3
resize-none
outline-none
`;

const ChatContentContainer = tw.div`
overflow-y-scroll
h-20
flex-grow-[1]
`;

const ChatContent = tw.div`
px-4
flex
flex-col
space-y-10
`;

const ChatSubmitButton = tw.button`
absolute
right-3
bottom-4
flex
justify-center
items-center
bg-red-800
h-6
w-10
rounded-lg
`;

const IntroRow = tw.div<{ $chatDomain: string }>`
w-full
h-28
flex
flex-col
items-center
py-6
${(p) => (p.$chatDomain === "lounge" ? "px-4" : "px-2")}
space-y-2
border-slate-200/30
border-b
`;

const IntroTitle = tw.h1<{ $chatDomain: string }>`
w-full
${(p) => (p.$chatDomain === "lounge" ? "text-3xl" : "text-xl")}
`;

const IntroDescription = tw.p<{ $chatDomain: string }>`
w-full
${(p) => (p.$chatDomain === "lounge" ? "text-sm" : "text-sm")}
`;
