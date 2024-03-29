import { enterNote } from "api/Note";
import { EnterNoteResponse } from "models/Note.interface";
import tw from "tailwind-styled-components";
import React, { useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { set } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import { permitJoinRoom } from "api/Room";

function MessageRead(params: {
  noteNo: number;
  swapState: (state: string, no: number) => void;
  setWriter: (writerId: string) => void;
}) {
  const { noteNo, swapState, setWriter } = params;
  const [noteInfo, setNoteInfo] = React.useState<EnterNoteResponse>();
  const [dateInfo, setDateInfo] = React.useState<string>("");
  const [permission, setPermission] = React.useState<boolean>(false);
  const [roomId, setRoomId] = React.useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await enterNote({ noteId: params.noteNo });
      setNoteInfo(data);
      if (data.context.slice(0, 12) === "$*&SYSTEM&*$") {
        setPermission(true);
        const text = data.context.slice(12);
        const result = text.split(" ");
        setRoomId(Number(result.pop()));
        const restOfString = result.join(" ");
        setNoteInfo((prev: any) => ({
          ...prev,
          context: restOfString,
        }));
      } else {
        setNoteInfo(data);
      }
      return data;
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (noteInfo?.createdAt && typeof noteInfo.createdAt === "string") {
      const time = noteInfo.createdAt.split(" ");
      const detail = time[1].replaceAll("-", ":");
      setDateInfo(`${time[0]} ${detail}`);
    }
  }, [noteInfo]);

  const setStateHandler = () => {
    swapState("write", noteNo);
    setWriter(noteInfo?.writerId!);
  };

  const permitHandler = async () => {
    try {
      await permitJoinRoom({
        memberId: noteInfo?.writerId || "",
        roomId: roomId,
      });
      toast.success("승인되었습니다.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <LeaveButton onClick={() => swapState("list", 0)}>
        <ArrowLeftIcon className="w-6 h-6"></ArrowLeftIcon>
      </LeaveButton>
      <TitleContainer>
        <Title>
          <WriterId>{noteInfo?.writerNickname}</WriterId>
          <div>님의 쪽지</div>
        </Title>
        <Date>{dateInfo}</Date>
      </TitleContainer>

      <Content>{noteInfo?.context}</Content>
      <Footer>
        {permission && (
          <AcceptButton onClick={permitHandler}>승인하기</AcceptButton>
        )}
        <ReplyButton onClick={setStateHandler}>답장하기</ReplyButton>
      </Footer>
      <ToastContainer />
    </Wrapper>
  );
}

const Wrapper = tw.div`
min-h-96
min-w-96
bg-gradient-to-b
from-sky-950
to-indigo-950
rounded-md
p-5
text-indigo-50
flex
flex-col
space-y-1
`;

const LeaveButton = tw.button`
w-6
h-6
`;

const TitleContainer = tw.div`
pb-4
flex
justify-between
items-end
`;
const Title = tw.div`
flex
space-x-2
items-end
`;
const Content = tw.div`
bg-white
bg-opacity-10
shadow-lg
rounded-md
p-3
min-h-52
mb-3
`;
const WriterId = tw.h1`
text-4xl
font-bold
text-indigo-400
break-words
`;
const Date = tw.div`
text-sm
text-gray-400
`;
const Footer = tw.div`
w-full
h-12
flex
justify-end
items-end
space-x-5
`;
const ReplyButton = tw.button`
w-20
h-10
bg-gradient-to-r
from-indigo-400
to-indigo-500
rounded-md
p-2
self-end
font-bold
hover:from-indigo-500
hover:to-indigo-600
transition
shadow-lg
text-cyan-50
`;

const AcceptButton = tw.button`
w-20
h-10
bg-gradient-to-r
from-green-400
to-lime-500
rounded-md
p-2
self-end
font-bold
hover:from-green-500
hover:to-lime-600
transition
shadow-lg
text-emerald-900
`;

export default MessageRead;
