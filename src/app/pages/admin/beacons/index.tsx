import React, { ReactNode } from "react";
import { useState } from "react";
import {
  Box,
  Editable,
  EditablePreview,
  EditableInput,
  Text,
  Icon,
  Center,
  Button,
  ButtonGroup,
  SimpleGrid,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import CustomButton from "../../../../components/buttons";
import useTranslation from "../../../../i18n/use-translation";
import { FaBacon } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";

interface Beacon {
  deviceId: string;
  classRoom: string;
  x: number;
  y: number;
  z: number;
}

const array1: Beacon[] = [
  //endpoint beacon/GET ALL
  {
    deviceId: "Beacon 1",
    classRoom: "B404",
    x: 1,
    y: 1,
    z: 2,
  },
  {
    deviceId: "Beacon 2",
    classRoom: "B401",
    x: 1,
    y: 1,
    z: 2,
  },
  {
    deviceId: "Beacon 3",
    classRoom: "B405",
    x: 1,
    y: 1,
    z: 2,
  },
  {
    deviceId: "Beacon 4",
    classRoom: "B407",
    x: 1,
    y: 1,
    z: 2,
  },
];

function AdminBeacons() {
  const { t } = useTranslation();

  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModel = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const [stateDeviceId, setDeviceId] = useState("Device Id");
  const [stateClassRoom, setClassRoom] = useState("Classroom");
  const [stateX, setX] = useState(0);
  const [stateY, setY] = useState(0);
  const [stateZ, setZ] = useState(0);

  function setStates(
    device: string,
    classRoom: string,
    x: number,
    y: number,
    z: number
  ): void {
    setDeviceId(device);
    setClassRoom(classRoom);
    setX(x);
    setY(y);
    setZ(z);
  }

  function handleInputChange(event: React.ChangeEvent): void {
    // setX(parseInt(event.target.getAttribute('value')?.));
  }

  return (
    <>
      <MobileView>
        <Box textAlign={"right"} margin={6}>
          {" "}
          <Button width={7} height={7} bg={"#FFFFFF"}>
            <Icon
              as={MdAddBox}
              color="isepBrick.500"
              width={7}
              height={7}
            ></Icon>
          </Button>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>{t("beacon_list")}</TableCaption>
            <Thead>
              <Tr>
                <Th color={"isepBrick.500"}>{t("beacon_device_id")}</Th>
                <Th color={"isepBrick.500"}>{t("beacon_classroom")}</Th>
                <Th color={"isepBrick.500"}>{t("beacon_coordinates")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {array1.map(({ deviceId, classRoom, x, y, z }) => (
                <Tr _hover={{ bg: "isepBrick.300" }}>
                  <Td>{deviceId}</Td>
                  <Td>{classRoom}</Td>
                  <Td>
                    {x}, {y}, {z}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </MobileView>

      <BrowserView>
          <SimpleGrid columns={[1, 2]}>
            <Box>
              {array1.map(({ deviceId, classRoom, x, y, z }) => (
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
                        setStates(deviceId,classRoom,x,y,z)                        
                      }
                    >
                      <Icon as={FaBacon} color={'isepBrick.500'}  w={6} h={6}/>
                      <Box  w={3} h={6}></Box>
                      <Text>{deviceId}</Text>
                    </Button>
                  </ButtonGroup>
                </Center>
              ))}
            </Box>

            <Box marginBottom="1%" borderRadius="3xl" width="500px">
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={1} h="320" w="10">
                  <Divider orientation="vertical" />
                </GridItem>
                <GridItem colStart={2} colEnd={7} h="320">
                  <Text color="isepBrick.500" align="left">
                  {t("beacon_device_id")}
                  </Text>
                  <Editable
                    defaultValue={stateDeviceId}
                    isDisabled={
                      stateDeviceId === "Device Id" ? true : false
                    }
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput />
                  </Editable>
                  <Box height={"9px"}></Box>
                  <Text color="isepBrick.500" align="left">
                  {t("beacon_classroom")}
                  </Text>
                  <Editable
                    defaultValue={stateClassRoom}
                    isDisabled={
                      stateClassRoom === "Classroom" ? true : false
                    }
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput />
                  </Editable>
                  <Box height={"9px"}></Box>
                  <Text color="isepBrick.500" align="left">
                  {t("beacon_coordinates")}
                  </Text>
                  <Editable
                    defaultValue={stateX.toString()}
                    isDisabled={stateX === 0 ? true : false}
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput onChange={e => handleInputChange(e)}/>
                  </Editable>
                  <Editable
                    defaultValue={stateY.toString()}
                    isDisabled={stateY === 0 ? true : false}
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput />
                  </Editable>
                  <Editable
                    defaultValue={stateZ.toString()}
                    isDisabled={stateZ === 0 ? true : false}
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput />
                  </Editable>
                  <Box height="15px"></Box>
                  <CustomButton
                    backgroundColor="isepBrick.500"
                    borderColor="isepGreen.500"
                    buttonColor="isepGrey.600"
                    hoverColor="isepBrick.400"
                    text="UPDATE"
                    textColor="#FFFFFF"
                    width="280px"
                    handleButtonClick={() =>
                      toast({
                        title: `Beacon successfully updated!`,
                        status: 'success',
                        isClosable: true,
                      })
                    }
                  />
                </GridItem>
              </Grid>
            </Box>
          </SimpleGrid>
        </BrowserView>
    </>
  );
}

export default AdminBeacons;
