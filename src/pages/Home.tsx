import {
  AnimatePresence,
  PanInfo,
  Variants,
  motion,
  useDragControls,
} from "framer-motion";
import { styled } from "styled-components";
import {
  MouseEvent,
  MouseEventHandler,
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Layout from "../components/common/Layout";

import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import BigButton from "../components/common/UI/BigButton";
import { useRecoilState } from "recoil";
import { isNewbieAtom, popupAtom, showPopup } from "../atom/atom";
import { CapsuleOpenType, ICapsuleDetail, IJar, IUser } from "../utils/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { capsules, user } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IResponse, isEmpty, isExist, isLogined } from "../utils/functions";
import * as API from "../api/api";
import FlexBox from "../components/common/UI/FlexBox";

import NewbieIntro from "../components/common/NewbieIntro";

const Img = styled.img`
  user-select: none;
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Safari 및 Chrome */
  -ms-user-select: none; /* IE 10+ */
`;

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Machine = styled(motion.div)`
  position: absolute;
  bottom: 300px;
  left: 50.5%;
  transform: translateX(-50%);
  height: 250px;
  aspect-ratio: 1 / 1;
  background-color: #f1f1f1;
  border: 1px solid #333;
  border-radius: 5px;
  z-index: 3;
`;
const Capsule = styled(motion.div)<{ bgcolor: string }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  border: 2px solid #263ca6;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #263ca6;
`;

const CapsuleBox = styled(Img)`
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  object-fit: contain;
  max-width: 80%;
  height: 500px;
  z-index: 2;
  pointer-events: none;
`;
const CapsuleLight = styled(Img)`
  position: absolute;
  left: 10%;
  top: 10%;
  width: 30%;
  pointer-events: none;
`;
const RandomButton = styled(motion(Img))`
  position: absolute;
  left: 50%;
  bottom: 200px;
  width: 70px;
  object-fit: contain;
  z-index: 5;
  cursor: pointer;
`;
const Floor = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  z-index: 1;
  background-color: #132851;
`;

const Message = styled.textarea`
  display: flex;
  width: 100%;
  height: 80%;
  flex-shrink: 0;

  padding: 25px;
  border-radius: 20px;
  border: 1px solid var(--unnamed, #c6c6c6);
  background: var(--unnamed, rgba(255, 255, 255, 0.14));
  margin: 20px 0px;

  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  line-height: 167.023%;
`;
const To = styled.h3`
  color: black;
  font-family: Noto Sans Kr;
  font-weight: 700;
  align-self: flex-start;
  font-size: 20px;
  font-style: normal;
  strong {
    color: #5571ee;
  }
`;
const From = styled.h3`
  font-family: Noto Sans Kr;
  color: black;
  font-weight: 700;
  align-self: flex-end;
  font-size: 20px;
  font-style: normal;
  strong {
    color: #5571ee;
  }
`;

const Letter = styled(motion.div)`
  position: absolute;
  width: 90%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;
  transform: translateX(-50%);
  aspect-ratio: 1 / 1.5;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #030138;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  pointer-events: auto;
  border-radius: 20px;
  z-index: 90;
`;

const Title = styled.h1`
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 615px;
  font-family: "Bitbit";
  color: #fff;
  font-size: 36px;
  font-weight: bold;
`;

const CoinCount = styled.strong`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-family: Noto Sans Kr;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const ToLogin = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-family: "Noto Sans Kr";
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
`;

const MyName = styled.strong`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fff;
  font-family: "Noto Sans Kr";
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
`;

const CopyURL = styled(motion.div)`
  position: absolute;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 30px;
  font-family: Noto Sans Kr;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  transform: translateX(-50%);
  z-index: 50;
  cursor: pointer;
  svg {
    margin-left: 5px;
  }
`;

const DimmedBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 51;
  pointer-events: none;
`;

type DragEventHandlerType = (
  event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo
) => void;

const letterVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

interface CapsuleStatus {
  isOpen: boolean;
  capsuleId: string;
  data: ICapsuleDetail | null;
}

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userType, jarId } = useParams();
  const [popup, setPopup] = useRecoilState(popupAtom);

  const machineRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const isFirst = useRef<boolean>(true);

  const [capsule, setCapsule] = useState<CapsuleStatus>();
  const [isNewbie, setIsNewbie] = useRecoilState(isNewbieAtom);

  const controls = useDragControls();

  const { data: userData, refetch: userRefetch } = useQuery<IUser>({
    queryKey: ["user"],
    queryFn: () => user().then((response) => response.data),
  });
  const { data: jar, refetch: jarRefetch } = useQuery<IJar>({
    queryKey: ["jar"],
    queryFn: () => capsules(jarId ?? "").then((response) => response.data),
  });

  useEffect(() => {
    if (machineRef.current) {
      const machine = machineRef.current;
      const rect = machine.getBoundingClientRect();
      const machineWidth = rect.width;
      const machineHeight = rect.height;

      jar?.capsules?.forEach((item, index) => {
        const itemRef = machine.childNodes[index] as HTMLDivElement;
        const itemWidth = itemRef.offsetWidth;
        const itemHeight = itemRef.offsetHeight;
        const maxX = machineWidth - itemWidth;
        const maxY = machineHeight - itemHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        itemRef.style.left = `${randomX}px`;
        itemRef.style.top = `${randomY}px`;

        itemRef.style.backgroundColor = `${item.color}`;
        if (item.read && userType === "master")
          itemRef.style.backgroundColor = "#D9D9D9";
        if (userType === "guest" && !item.public)
          itemRef.style.backgroundColor = "#D9D9D9";
      });
    }
  }, [jar]);

  useEffect(() => {
    setTimeout(() => {
      if (userData?.nickname && isFirst.current === true) {
        setPopup(
          showPopup({
            content: `${userData?.nickname}님 환영해요!\n 간단하게 서비스 소개해 드릴게요`,
            numberOfButton: 2,
            rejectText: "아니요",
            confirmText: "읽을래요",
            onConfirm: () => {
              setIsNewbie(true);
              isFirst.current = false;
            },
          })
        );
      }
    }, 1500);
  }, [userData?.nickname]);

  const openCapsule = useCallback(async (capsuleId: string) => {
    const response: IResponse = await API.capsule(jarId!, capsuleId);

    if (response.status !== 200)
      return setPopup(showPopup({ content: response.message ?? "" }));

    setCapsule({ isOpen: true, capsuleId, data: response.data as any });
    userRefetch();
    jarRefetch();
  }, []);

  const openRandomCapsule = useCallback(async () => {
    const response: IResponse = await API.randomCapsule(jarId!);

    if (response.status !== 200)
      return setPopup(showPopup({ content: response.message ?? "" }));

    setCapsule({
      isOpen: true,
      capsuleId: response.data?.capsuleId as string,
      data: response.data as any,
    });
    userRefetch();
    jarRefetch();
  }, []);

  const onCapsuleClick = useCallback(
    (capsuleId: string): MouseEventHandler & TouchEventHandler =>
      (event) => {
        if (isDragging.current) return;
        if (isEmpty(jar?.capsules) || jar?.capsules.length === 0)
          return setPopup(
            showPopup({ content: "받은 캡슐이 없습니다.", withDimmed: true })
          );
        if (!capsuleId)
          return setPopup(showPopup({ content: "비정상적인 캡슐입니다." }));
        if (userType === "guest") return openCapsule(capsuleId);

        return setPopup(
          showPopup({
            content: `코인 2개가 소진돼요!\n선택한 편지를 읽어볼까요?`,
            numberOfButton: 2,
            confirmText: "읽을래요",
            rejectText: "아니요",
            onConfirm: () => openCapsule(capsuleId),
          })
        );
      },
    [openCapsule, setPopup, jar?.capsules]
  );

  const onRandomCapsuleClick: MouseEventHandler & TouchEventHandler =
    useCallback(() => {
      if (isDragging.current) return;
      if (isEmpty(jar?.capsules) || jar?.capsules.length === 0)
        return setPopup(
          showPopup({ content: "캡슐이 없습니다.", withDimmed: true })
        );
      if (userType === "guest") return openRandomCapsule();

      return setPopup(
        showPopup({
          content: `코인 1개가 소진돼요!\n선택한 편지를 읽어볼까요?`,
          numberOfButton: 2,
          confirmText: "읽을래요",
          rejectText: "아니요",
          onConfirm: () => openRandomCapsule(),
        })
      );
    }, [setPopup, jar?.capsules, openRandomCapsule]);

  const onDragStart: DragEventHandlerType = useCallback((event, info) => {
    isDragging.current = true;
  }, []);
  const onDragEnd: DragEventHandlerType = useCallback((event, info) => {
    isDragging.current = false;
  }, []);

  const goToReply = useCallback(
    (capsuleId: string): MouseEventHandler =>
      () => {
        navigate(
          `/${userType}/write/${capsule?.data?.jarId}/reply/setting?capsuleId=${capsuleId}&recipient=${capsule?.data?.authorNickname}`
        );
      },
    [navigate, jarId, userType, capsule]
  );

  const copyURL: MouseEventHandler = useCallback(() => {
    navigator?.clipboard
      ?.writeText(document.location.href.replace("master", "guest"))
      .then(() => {
        setPopup(
          showPopup({
            content: `링크가 복사되었습니다.\n친구에게 공유해 편지를 받아보세요.`,
            withDimmed: true,
          })
        );
      })
      .catch((err) => {
        setPopup(
          showPopup({
            content: "링크 복사에 실패하였습니다.",
          })
        );
      });
  }, [setPopup]);

  const goToWriting: MouseEventHandler = useCallback(() => {
    if (isLogined())
      return navigate(`/${userType}/write/${jarId}/send/setting`);
    setPopup(
      showPopup({
        numberOfButton: 2,
        rejectText: "그냥 쓸래요",
        confirmText: "로그인",
        content: `로그인을 하고 편지를 쓰면\n코인 1개를 받을 수 있어요!`,
        onReject: () => navigate(`/${userType}/write/${jarId}/send/setting`),
        onConfirm: () => navigate(`/login?jarId=${jarId}`),
      })
    );
  }, [navigate, userType, jarId]);

  const asyncNav = useCallback(
    (url: string, navigate: NavigateFunction): Promise<any> => {
      navigate(url);
      return new Promise((resolve) => {
        queryClient.removeQueries();
        resolve("good");
      });
    },
    [queryClient]
  );

  const goToMyCapsuleBox = useCallback(() => {
    asyncNav(`/master/capsule-box/${userData?.jarId}`, navigate);
  }, [asyncNav, navigate, userData]);

  return (
    <Layout bgColor="blue">
      <Main>
        {isExist(userData) && (
          <MyName onClick={() => goToMyCapsuleBox()}>
            {userData?.nickname} 님
          </MyName>
        )}
        <Title>{jar?.userNickname}의 뽑기통</Title>

        {isLogined() ? (
          <CoinCount>
            <span>COIN POINT</span>
            <span>{userData?.coin.toString().padStart(4, "0")}</span>
          </CoinCount>
        ) : (
          <ToLogin to="/login">로그인</ToLogin>
        )}

        <CapsuleBox src="/images/capsule-box.png" />
        <RandomButton
          draggable={false}
          initial={{ scale: 1, translateX: "-50%" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, repeatDelay: 0.5, duration: 0.2 }}
          src="/images/capsule-box-button.png"
          onClick={onRandomCapsuleClick}
        />

        <Machine ref={machineRef}>
          {jar?.capsules?.map((item, i) => {
            const capsule = jar?.capsules.find(
              (capsule) => capsule.capsuleId === item.capsuleId
            );

            return (
              <Capsule
                key={i}
                onClick={
                  (capsule && userType === "master" && capsule.read) ||
                  (userType === "guest" && !capsule?.public)
                    ? () => {}
                    : onCapsuleClick(String(item.capsuleId))
                }
                drag
                onDragStart={onDragStart as any}
                onDragEnd={onDragEnd as any}
                dragConstraints={machineRef}
                dragElastic={0}
                bgcolor={item.color}
                whileTap={{ scale: 1.2, zIndex: 2 }}
                whileDrag={{ scale: 1.2, zIndex: 2 }}
                dragControls={controls}
              >
                <Line />
                <CapsuleLight src="/images/capsule-light.png" />
              </Capsule>
            );
          })}
        </Machine>
        <Floor />
        {(capsule?.isOpen || isNewbie) && <DimmedBg />}

        <AnimatePresence>{isNewbie && <NewbieIntro />}</AnimatePresence>
      </Main>

      <CopyURL onClick={userType === "master" ? copyURL : goToWriting}>
        <strong>
          {userType === "master" ? "링크 복사하기" : "편지 작성하기"}
        </strong>
        <FontAwesomeIcon icon={userType === "master" ? faLink : faEnvelope} />
      </CopyURL>

      <AnimatePresence>
        {capsule?.isOpen && (
          <Letter
            variants={letterVariants}
            transition={{ type: "tween", duration: 0.2 }}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FlexBox
              direction="row"
              style={{ justifyContent: "space-between" }}
            >
              <To>
                <strong>To.</strong> {jar?.userNickname}
              </To>
              <FontAwesomeIcon
                icon={faXmark}
                style={{ height: 30 }}
                onClick={() =>
                  setCapsule({ isOpen: false, capsuleId: "", data: null })
                }
              />
            </FlexBox>

            <Message disabled value={capsule?.data?.content}></Message>
            <From>
              <strong>From.</strong>{" "}
              {isExist(capsule?.data?.authorNickname)
                ? capsule?.data?.authorNickname
                : "익명의 누군가"}
            </From>
            {isExist(capsule?.data?.authorNickname!) &&
              userType !== "guest" && (
                <BigButton
                  onClick={goToReply(capsule.capsuleId)}
                  style={{ marginTop: "20px" }}
                >
                  답장하기
                </BigButton>
              )}
          </Letter>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Home;
