import React, { ReactNode } from "react";
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
} from "@chakra-ui/react";
import ReactAudioPlayer from "react-audio-player";
import { BrowserView, MobileView } from "react-device-detect";

interface Feedback { 
  date: string;
  feedback: string;
  name: string;
  type: string;
}

const array1: Feedback[] = [ //endpoint Feedback/GET ALL
  {
    date: "qui. 31/03 19:32",
    feedback: "Não tenho nada a dizer a aplicação é incrivel",
    name: "João das Neves",
    type: "text",
  },
  {
    date: "qui. 31/03 20:02",
    feedback: "Os devs são muito fofinhos",
    name: "John",
    type: "text",
  },
  {
    date: "qui. 31/03 23:20",
    feedback: "https://www.w3schools.com/images/w3schools_green.jpg",
    name: "Wanda Maximoff",
    type: "image",
  },
  {
    date: "qui. 31/03 23:45",
    feedback: "my_audio_file.ogg",
    name: "You don't wanna know",
    type: "audio",
  },
];

export class AdminFeedback extends React.Component<{}, {}> {
  state: Feedback = {
    date: "",
    feedback: "",
    name: "",
    type: "",
  };


  private setFeedBackAndName(
    event: string,
    eventName: string,
    eventType: string
  ) {
    this.setState({ feedback: event });
    this.setState({ name: eventName });
    this.setState({ type: eventType });
  }

  private getFeedback(feedback: string, type: string): ReactNode {
    if (type === "image") {
      return <Image src={feedback} alt="" />;
    } else if (type === "audio") {
      return <ReactAudioPlayer src={feedback} autoPlay controls />;
    } else {
      return <Text fontSize="md">{feedback}</Text>;
    }
  }

  private getIcon(type: string): ReactNode {
    if (type === "image") {
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

  render() {
    return (
      <>
        <MobileView>
          {array1.map(({ date, feedback, name, type }) => (
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton
                    bg="isepBrick.300"
                    w="100%"
                    p={4}
                    color="isepGrey.500"
                  >
                    {this.getIcon(type)}
                    <Box flex="1" textAlign="left" textColor="#000000">
                      {date}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {this.getFeedback(feedback, type)}
                  <Text fontSize="xs" as="i">
                    {name}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </MobileView>

        <BrowserView>
          <SimpleGrid columns={[1, 2]}>
            <Box>
              {array1.map(({ date, feedback, name, type }) => (
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
                      onClick={() =>
                        this.setFeedBackAndName(feedback, name, type)
                      }
                    >
                      <Box margin={"2"}>{this.getIcon(type)}</Box>
                      <Text>{date}</Text>
                    </Button>
                  </ButtonGroup>
                </Center>
              ))}
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
                  <Box height={"110px"}></Box>
                  <Box>
                    {this.getFeedback(this.state.feedback, this.state.type)}
                    <Box height={'100px'}></Box>
                    <Text fontSize="xs" as="i" align={"left"}>
                      {this.state.name}
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </SimpleGrid>
        </BrowserView>
      </>
    );
  }
}
