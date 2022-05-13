import React, { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Image,
  Center,
  Button,
  ButtonGroup,
  SimpleGrid,
  Grid,
  GridItem,
  Divider,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import ReactAudioPlayer from "react-audio-player";
import { BrowserView, MobileView } from "react-device-detect";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useTranslation from "../../../../i18n/use-translation";
import ReactPlayer from "react-player";

const array1: Feedback[] = [
  //endpoint Feedback/GET ALL
  {
    // date: "qui. 31/03 19:32",
    content: "Não tenho nada a dizer a aplicação é incrivel",
    // name: "João das Neves",
    type: "text",
    id: 12,
    idBeacon: 1,
    idUser: 2,
  },
  {
    // date: "qui. 31/03 20:02",
    content: "Os devs são muito fofinhos",
    // name: "John",
    type: "text",
    id: 12,
    idBeacon: 1,
    idUser: 2,
  },
  {
    // date: "qui. 31/03 23:20",
    content: "https://www.w3schools.com/images/w3schools_green.jpg",
    // name: "Wanda Maximoff",
    type: "image",
    id: 12,
    idBeacon: 1,
    idUser: 2,
  },
  {
    // date: "qui. 31/03 23:45",
    content: "my_audio_file.ogg",
    // name: "You don't wanna know",
    type: "audio",
    id: 12,
    idBeacon: 1,
    idUser: 2,
  },
  {
    // date: "qui. 31/03 23:46",
    content: "https://www.youtube.com/watch?v=QMoX6oPSnws",
    // name: "Czech Republic",
    type: "video",
    id: 12,
    idBeacon: 1,
    idUser: 2,
  },
];

interface Feedback {
  date?: string;
  content: string;
  name?: string;
  type: string;
  id: number;
  idBeacon: number;
  idUser: number;
}

interface Feedbacks {
  feedback: Feedback[];
}

function AdminFeedback() {
  const { t } = useTranslation();

  const [stateFeedback, setFeedback] = useState("");
  const [stateName, setName] = useState("");
  const [stateType, setType] = useState("text");
  const [stateFeedbacks, setFeedbacks] = useState<Feedbacks>();

  function setFeedBackAndName(
    event: string,
    eventName: string,
    eventType: string
  ) {
    setFeedback(event);
    setName(eventName);
    setType(eventType);
  }

  function getFeedback(feedback: string, type: string): ReactNode {
    if (type === "image") {
      return (
        <div>
          {" "}
          <Box height={"50px"}></Box>
          <Image src={feedback} alt="" />;
        </div>
      );
    } else if (type === "audio") {
      return (
        <div>
          <Box height={"110px"}></Box>
          <ReactAudioPlayer src={feedback} autoPlay controls />
        </div>
      );
    } else if (type === "video") {
      return (
        <div>
          <ReactPlayer url={feedback}></ReactPlayer>
        </div>
      );
    } else {
      return (
        <div>
          <Box height={"10px"}></Box>
          <Text fontSize="md" fontFamily={"Montserrat-Medium"}>
            {feedback}
          </Text>
        </div>
      );
    }
  }

  const api = "https://camul2022.pythonanywhere.com";

  const loadFeedbacksAsync = async () => {
    await fetch(api + "/account/feedback")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const items = data;
        setFeedbacks(items);
      });
  };

  useEffect(() => {
    loadFeedbacksAsync();
  }, []);

  function getIcon(type: string): ReactNode {
    if (type === "image" || type==="video") {
      return (
        <img
          src="https://s3-alpha-sig.figma.com/img/e61d/d2cb/0a63e30674435607b06b4d6b466384f5?Expires=1653264000&Signature=DO-5QTTdSrt52S62TeXnUDv5kGF7x-H~XS2i9F7U4guJhpn1vX8oK4P5pZatIZw9UbnpJxN~D5MbvX~cCsnaNlIP5lVq3oTujy~hOUNMhwcbFpLrhhUXd0ZxLO1a1Ru-hQrrdOuskQoi55G4NjJFPm6rO9TynhaQzLlGiM~wdNb8xYA34f6a5N1TvtEp6GR~Z5vELnqHpZvfcMVCEALJwy8PsxbzyzA5-myfIIBa53xL9fixwJg~u2u5pEEeElhiRS7FyvZMeWQyb7jb3A7nyH8bbWbdXROqHDV1FozpluMmrmWMGG-8mT1DRBRRrBmPxF46tOa9n6ouvj13SUNxLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt="uploadImage"
          width="30"
          height="30"
        />
      );
    } else if (type === "audio") {
      return (
        <img
          src="https://s3-alpha-sig.figma.com/img/abbf/e27e/6f1500175f3a3d76ec9c1a7059e54f25?Expires=1653264000&Signature=FmMKd065R0gy0I8PEdz1QnFwru-2n1nMgBNpuORPuMcAD~QWvpFeqU1Y1393eeqEf9LVLsCbRmiW5BGBEw3RInKlfdIhCUl0tSc8We7gPz1X~coLje3JfIiAl3GCCQplfXD6aZsBJemgyP0TB7L~Y1zbOX2PVhw0xtfTgg1YEUTKuVK2s1HY81BKVl1qTgpSus4hkHJeTXPgRjNFE~vVS~PQCGkLaqunTxqGd3ElIVyO6Q0gEQZIKvE7qTrz77tAYTydVQy9ktpGymUVlwd16d1O704jJSDnIBncOICFAMP6I7FxA9UI55t9RVjeh~o49-PlmZnhWogwZYdPxPGgww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt="uploadAudio"
          width="20"
          height="20"
        />
      );
    } else {
      return (
        <img
          src="https://s3-alpha-sig.figma.com/img/cda8/3877/709be7a41235698ee4017e8255d3e63d?Expires=1653264000&Signature=Q0rrwhrxp~41XJkU4VvKE0Pwd~k5yKs4RW72p7m0UJlrwUPZoG7JEmUO8ZqeUbT0I~DV67Wp5Lyo0ckSNBG2MjTboTLhzAT0g6WZavD8EnfktxHl7C6UfplQUt39fhzZEYVS4eKBC~cGOaFsuCAQsdsmvi-zB2YgvdITpeBDQzf~iBE5DKc1LjE~ocuSEXSkMx-X9b~v3ErpJN90jIJ1FAKfTni6eq3MqX1pmFIsXP0dhBF534S-4IlfamH-QOGP4Bh5b7ZpkQ-Rwgly4ZywFgOIzD4Js2DCA2xb664QXCVOUBjPE1wWEh0UcjAgeeCQmdpOBR4kWKPMyHUIr4SiMA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt="uploadText"
          width="30"
          height="30"
        />
      );
    }
  }

  return (
    <>
      <MobileView>
        {stateFeedbacks !== undefined && (
          <div>
            <Text fontSize="3xl" margin="7" fontFamily={"Montserrat-Medium"}>
              {t("feedback_admin_page")}
            </Text>
            {stateFeedbacks.feedback.map(
              ({ date, content: feedback, name, type }) => (
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        bg="isepBrick.300"
                        w="100%"
                        p={4}
                        fontFamily={"Montserrat-Medium"}
                      >
                        <Center>
                          <Box margin={"2"}>{getIcon(type)}</Box>
                          <Text>{date}</Text>
                          <AccordionIcon />
                        </Center>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} fontFamily={"Montserrat-Medium"}>
                      {getFeedback(feedback, type)}
                      <Text
                        fontSize="xs"
                        as="i"
                        fontFamily={"Montserrat-Medium"}
                      >
                        {name}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )
            )}
          </div>
        )}
        {stateFeedbacks === undefined && (
          <div>
            <Center>
              <Box height={"300px"}></Box>
              <Text fontFamily={"Montserrat-SemiBold"}>Loading data...</Text>
              <Box width={"75px"}></Box>

              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          </div>
        )}
      </MobileView>

      <BrowserView>
        {stateFeedbacks !== undefined && (
          <div>
            <Text fontSize="3xl" margin="7" fontFamily={"Montserrat-Medium"}>
              {t("feedback_admin_page")}
            </Text>
            <SimpleGrid columns={[1, 2]}>
              <Box>
                {stateFeedbacks?.feedback.map(
                  ({
                    date,
                    content: feedback,
                    name,
                    type,
                    id,
                    idBeacon,
                    idUser,
                  }) => (
                    <Center>
                      <ButtonGroup marginTop="1%" marginBottom="0.5%">
                        <Button
                          width="700px"
                          height="67px"
                          _hover={{ bg: "isepBrick.300" }}
                          variant="outline"
                          _focus={{
                            boxShadow: "none",
                          }}
                          fontFamily={"Montserrat-Medium"}
                          //  Change This to name variable when backend updates API
                          onClick={() =>
                            setFeedBackAndName(feedback, "name", type)
                          }
                        >
                          <Box margin={"2"}>{getIcon(type)}</Box>
                          {/* Change This to Date when backend updates API */}
                          <Text fontFamily={"Montserrat-Medium"}>{type}</Text>
                        </Button>
                      </ButtonGroup>
                    </Center>
                  )
                )}
              </Box>

              <Box
                marginBottom="1%"
                textAlign={"center"}
                borderRadius="3xl"
                width="500px"
              >
                <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                  <GridItem colSpan={1} h="320" w="10">
                    <Divider orientation="vertical" />
                  </GridItem>
                  <GridItem colStart={2} colEnd={7} h="320">
                    <Box>
                      {getFeedback(stateFeedback, stateType)}
                      <Box height={"100px"}></Box>
                      <Text
                        fontSize="xs"
                        as="i"
                        align={"left"}
                        fontFamily={"Montserrat-Medium"}
                      >
                        {stateName}
                      </Text>
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            </SimpleGrid>
          </div>
        )}
        {stateFeedbacks === undefined && (
          <div>
            <Center>
              <Box height={"300px"}></Box>
              <Text fontFamily={"Montserrat-SemiBold"}>Loading data...</Text>
              <Box width={"75px"}></Box>

              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          </div>
        )}
      </BrowserView>
    </>
  );
}

export default AdminFeedback;
