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
  Textarea,
  Container,
} from "@chakra-ui/react";
import ReactAudioPlayer from "react-audio-player";
import { BrowserView, MobileView } from "react-device-detect";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useTranslation from "../../../../i18n/use-translation";
import ReactPlayer from "react-player";
import { useStoreSelector } from "../../../../store";
import { userData } from "../../../../store/user-reducer";
import CustomButton from "../../../../components/buttons";

interface Feedback {
  dateTime: string;
  content: string;
  username: string;
  type: string;
  id: number;
  idBeacon: number;
  idUser: number;
  adminResponse: string[];
}

interface Feedbacks {
  feedback: Feedback[];
}

interface Review{
  feedbackId: number;
  contente: string
}

function AdminFeedback() {
  const { t } = useTranslation();
  const currentUser = useStoreSelector(userData);
  const [stateFeedback, setFeedback] = useState("");
  const [stateFeedbackId, setFeedbackId] = useState(0);
  const [stateIsSelected, setSelected] = useState(false);
  const [stateName, setName] = useState("");
  const [stateType, setType] = useState("text");
  const [stateReview, setReview] = useState("");
  const [stateFeedbacks, setFeedbacks] = useState<Feedbacks>();

  function setFeedBackAndName(
    event: string,
    eventName: string,
    eventType: string,
    eventId: number
  ) {
    setSelected(true);
    setFeedback(event);
    setName(eventName);
    setType(eventType);
    setFeedbackId(eventId);
  }

  function getFeedback(feedback: string, type: string): ReactNode {
    if (type !== "text") {
      var encode = feedback.split("/")[1].split(".");
      var stringEncoded = encode[0];
      var result = api + "/uploads/" + stringEncoded + "." + encode[1];
      console.log(result);

      if (type === "image") {
        return (
          <div>
            <Box height={"50px"}></Box>
            <Image src={result} alt="" />;
          </div>
        );
      } else if (type === "audio") {
        return (
          <div>
            <Box height={"80px"}></Box>
            <ReactAudioPlayer src={result} controls />
          </div>
        );
      } else if (type === "video") {
        return (
          <div>
            <ReactPlayer url={result}></ReactPlayer>
          </div>
        );
      }
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

  function getFeedbackById(id: number): Feedback|undefined{
    return stateFeedbacks?.feedback.find(f=>f.id ===id);
  }

  const api = "https://camul2022.pythonanywhere.com";

  const loadFeedbacksAsync = async () => {
    if (currentUser.isAdmin) {
      console.log("fetch feedback list admin")
      await fetch(api + "/account/feedback")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const items = data;
          console.log(items);
          setFeedbacks(items);
        });
    }
    else {
      console.log("fetch feedback list user")
      await fetch(api + "/account/feedback?idUser="+ currentUser.userID)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const items = data;
          setFeedbacks(items);
        });
    }
  };

  function handleInputChange(inputValue:string): void {
    setReview(inputValue)
    console.log(inputValue)
  }

  useEffect(() => {
    loadFeedbacksAsync();
  }, []);

  function getIcon(type: string): ReactNode {
    if (type === "image" || type === "video") {
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
              ({ dateTime: date, content: feedback, username, type }) => (
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
                        {username}
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
              <Text fontFamily={"Montserrat-SemiBold"}>{t("loading_data")}</Text>
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
          {/* <iframe width="90%" height="500px" allowFullScreen={true} allow="accelerometer; magnetometer; gyroscope" src="https://panoraven.com/en/embed/jqmyMkOdN3"></iframe> */}
            <Text fontSize="3xl" margin="7" fontFamily={"Montserrat-Medium"}>
              {t("feedback_admin_page")}
            </Text>
            <SimpleGrid columns={[1, 2]}>
              <Box>
                {stateFeedbacks?.feedback.map(
                  ({ dateTime: date, content: feedback, username, type, id }) => (
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
                          onClick={() =>
                            setFeedBackAndName(feedback, username, type, id)
                          }
                        >
                          <Box margin={"2"}>{getIcon(type)}</Box>
                          <Text fontFamily={"Montserrat-Medium"}>{date}</Text>
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
                    {stateIsSelected && (
                      <Box marginTop={"50px"} width="350px">
                        {getFeedbackById(stateFeedbackId)?.adminResponse === undefined || getFeedbackById(stateFeedbackId)?.adminResponse?.length === 0 ? 
                        <Container color="#575757" mt="1rem" mb="1rem"><Text fontSize={"10px"} align="left">{t("no_notes")}</Text></Container>
                         :
                        getFeedbackById(stateFeedbackId)?.adminResponse?.map(r=>
                          <Text>{r}</Text>
                          )}
                      <Text textAlign={"left"}>{t("notes")}</Text>
                    <Textarea value={stateReview} onChange={(e) => handleInputChange(e.target.value)} placeholder={t("write_notes")}/>
                    <Box height={"10px"}></Box>
                    <CustomButton
                      backgroundColor="isepBrick.500"
                      borderColor="isepGreen.500"
                      buttonColor="isepGrey.600"
                      hoverColor="isepBrick.400"
                      text={t("send_feedback_review")}
                      textColor="#FFFFFF"
                      width="280px"
                      handleButtonClick={() => console.log(stateReview)}
                    />
                    </Box>
                    )}
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
              <Text fontFamily={"Montserrat-SemiBold"}>{t("loading_data")}</Text>
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
