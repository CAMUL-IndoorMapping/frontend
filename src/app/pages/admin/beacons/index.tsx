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
  HStack,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
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
import { IoIosArrowDropleft } from "react-icons/io";
import { useStoreSelector } from "../../../../store";
import { selectedPage } from "../../../../store/navigation-reducer";

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

  const [stateDeviceId, setDeviceId] = useState(t("beacon_device_id"));
  const [stateClassRoom, setClassRoom] = useState(t("beacon_classroom"));
  const [stateX, setX] = useState(0);
  const [stateY, setY] = useState(0);
  const [stateZ, setZ] = useState(0);
  const [state, setState] = useState("start");
  const [buttonState, setButton] = useState("UPDATE");
  const [operationState, setOperation] = useState("UPDATE");
  const [titleState, setTitle] = useState("Beacons");

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
    console.log(event.target.getAttribute("value"));
    // setX(parseInt(event.target.getAttribute('value')?.));
  }

  function handleInputDeviceId(device: string): void {
    setDeviceId(device);
  }

  function handleInputClassroom(classRoom: string): void {
    setClassRoom(classRoom);
  }

  function handleInputX(x: string): void {
    setX(parseInt(x));
  }

  function handleInputY(y: string): void {
    setY(parseInt(y));
  }

  function handleInputZ(z: string): void {
    setZ(parseInt(z));
  }

  function getBeaconUpdateForm(deviceId: string, classRoom: string, x: number, y: number, z:number): void {
    setDeviceId(deviceId);
    setClassRoom(classRoom);
    setX(x);
    setY(y);
    setZ(z);
    setState("updateform");
    setButton(t("beacon_update_button"));
    setTitle(t("beacon_update"));
    setOperation("UPDATE");
  }

  function getBeaconAddForm(): void {
    setState("updateform");
    setButton(t("beacon_add_button"));
    setTitle(t("beacon_add"));
    setOperation("ADD");
  }
  function getStartPage(): void {
    setState("start");
  }

  function handleAddOrUpdate(): void {
    //chamar o endpoint de ADD de device

    // if state === ADD -> chamar endpoint de POST
    if (operationState === "ADD") {
      //if 200
      toast({
        title: t("beacon_add_success_message"),
        status: "success",
        isClosable: true,
      });
    }
    //else
    // toast({
    //   title: t("beacon_add_error_message"),
    //   status: "error",
    //   isClosable: true,
    // })

    // if state === UPDATE -> chamar enpoint de PUT
    if (operationState === "UPDATE") {
      //if 200
      toast({
        title: t("beacon_update_success_message"),
        status: "success",
        isClosable: true,
      });
      //else
      // toast({
      //   title: t("beacon_update_error_message"),
      //   status: "error",
      //   isClosable: true,
      // })
    }
  }

  return (
    <>
      <MobileView>
        <div>
          {state === "start" && (
            <div>
              <Text
                fontFamily={"Montserrat-SemiBold"}
                fontSize="3xl"
                margin="7"
              >
                {t("admin_beacons")}
              </Text>
              <Box textAlign={"right"} margin={6}>
                <Button
                  width={7}
                  height={7}
                  bg={"#FFFFFF"}
                  onClick={() => getBeaconAddForm()}
                >
                  <Icon
                    as={MdAddBox}
                    color="isepBrick.500"
                    width={7}
                    height={7}
                  ></Icon>
                </Button>
              </Box>
              <Center>
                <TableContainer>
                  <Table variant="simple">
                    <TableCaption fontFamily={"Montserrat-SemiBold"}>
                      {t("beacon_list")}
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th
                          fontFamily={"Montserrat-Medium"}
                          color={"isepBrick.500"}
                        >
                          {t("beacon_device_id")}
                        </Th>
                        <Th
                          fontFamily={"Montserrat-Medium"}
                          color={"isepBrick.500"}
                        >
                          {t("beacon_classroom")}
                        </Th>
                        <Th
                          fontFamily={"Montserrat-Medium"}
                          color={"isepBrick.500"}
                        >
                          {t("beacon_coordinates")}
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {array1.map(({ deviceId, classRoom, x, y, z }) => (
                        <Tr
                          _hover={{ bg: "isepBrick.300" }}
                          onClick={() => getBeaconUpdateForm(deviceId, classRoom, x, y, z)}
                        >
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
              </Center>
            </div>
          )}
          {state === "updateform" && (
            <div>
              {" "}
              <Box>
                <HStack spacing="24px">
                  <Button
                    width={7}
                    height={7}
                    bg={"#FFFFFF"}
                    onClick={() => getStartPage()}
                  >
                    <Icon
                      as={IoIosArrowDropleft}
                      color="isepBrick.500"
                      width={7}
                      height={7}
                    ></Icon>
                  </Button>
                  <Text
                    fontFamily={"Montserrat-SemiBold"}
                    fontSize="3xl"
                    margin="7"
                  >
                    {titleState}
                  </Text>
                </HStack>
              </Box>
              <Box width={"50px"} height={"50px"}></Box>
              <Center>
                <Box width={"500px"}>
                  <Text
                    fontFamily={"Montserrat-SemiBold"}
                    color="isepBrick.500"
                    align="left"
                  >
                    {t("beacon_device_id")}
                  </Text>

                  <Editable
                    fontFamily={"Montserrat-Medium"}
                    value={stateDeviceId}
                    isDisabled={false}
                    onChange={(e) => handleInputDeviceId(e)}
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput />
                  </Editable>
                  <Divider color={"isepBrick.500"}></Divider>
                  <Box height={"11px"}></Box>
                  <Text
                    fontFamily={"Montserrat-SemiBold"}
                    color="isepBrick.500"
                    align="left"
                  >
                    {t("beacon_classroom")}
                  </Text>
                  <Editable
                    fontFamily={"Montserrat-Medium"}
                    value={stateClassRoom}
                    isDisabled={false}
                    onChange={(e) => handleInputClassroom(e)}
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput />
                  </Editable>
                  <Divider style={{ background: "isepBrick.500" }}></Divider>
                  <Box height={"11px"}></Box>
                  <Text
                    fontFamily={"Montserrat-SemiBold"}
                    color="isepBrick.500"
                    align="left"
                  >
                    {t("beacon_coordinates")}
                  </Text>
                  <Editable
                    fontFamily={"Montserrat-Medium"}
                    border={"thin"}
                    value={stateX.toString()}
                    isDisabled={false}
                    onChange={(e) => handleInputX(e)}
                  >
                    <EditablePreview textAlign={"left"} border={"thin"} />
                    <EditableInput onChange={(e) => handleInputChange(e)} />
                  </Editable>
                  <Divider color={"isepBrick.500"}></Divider>
                  <Editable
                    fontFamily={"Montserrat-Medium"}
                    value={stateY.toString()}
                    isDisabled={false}
                    onChange={(e) => handleInputY(e)}
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput />
                  </Editable>
                  <Divider color={"isepBrick.500"}></Divider>
                  <Editable
                    fontFamily={"Montserrat-Medium"}
                    value={stateZ.toString()}
                    isDisabled={false}
                    onChange={(e) => handleInputZ(e)}
                  >
                    <EditablePreview textAlign={"left"} />
                    <EditableInput />
                  </Editable>

                  <Divider color={"isepBrick.500"}></Divider>
                  <Box height="15px"></Box>
                  <CustomButton
                    backgroundColor="isepBrick.500"
                    borderColor="isepGreen.500"
                    buttonColor="isepGrey.600"
                    hoverColor="isepBrick.400"
                    text={buttonState}
                    textColor="#FFFFFF"
                    width="280px"
                    handleButtonClick={() => handleAddOrUpdate()}
                  />
                </Box>
              </Center>
            </div>
          )}
        </div>
      </MobileView>

      <BrowserView>
        <Text fontFamily={"Montserrat-SemiBold"} fontSize="3xl" margin="7">
          {t("admin_beacons")}
        </Text>
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
                    onClick={() => setStates(deviceId, classRoom, x, y, z)}
                  >
                    <Icon as={FaBacon} color={"isepBrick.500"} w={6} h={6} />
                    <Box w={3} h={6}></Box>
                    <Text fontFamily={"Montserrat-SemiBold"}>{deviceId}</Text>
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
                <Text
                  fontFamily={"Montserrat-SemiBold"}
                  color="isepBrick.500"
                  align="left"
                >
                  {t("beacon_device_id")}
                </Text>

                <Editable
                  fontFamily={"Montserrat-Medium"}
                  value={stateDeviceId}
                  onChange={(e) => handleInputDeviceId(e)}
                  isDisabled={stateDeviceId === "Device Id" ? true : false}
                >
                  <EditablePreview textAlign={"left"} />
                  <EditableInput />
                </Editable>
                <Divider color={"isepBrick.500"}></Divider>
                <Box height={"11px"}></Box>
                <Text
                  fontFamily={"Montserrat-SemiBold"}
                  color="isepBrick.500"
                  align="left"
                >
                  {t("beacon_classroom")}
                </Text>
                <Editable
                  fontFamily={"Montserrat-Medium"}
                  value={stateClassRoom}
                  onChange={(e) => handleInputClassroom(e)}
                  isDisabled={stateClassRoom === "Classroom" ? true : false}
                >
                  <EditablePreview textAlign={"left"} />
                  <EditableInput />
                </Editable>
                <Divider style={{ background: "isepBrick.500" }}></Divider>
                <Box height={"11px"}></Box>
                <Text
                  fontFamily={"Montserrat-SemiBold"}
                  color="isepBrick.500"
                  align="left"
                >
                  {t("beacon_coordinates")}
                </Text>
                <Editable
                  fontFamily={"Montserrat-Medium"}
                  border={"thin"}
                  value={stateX.toString()}
                  onChange={(e) => handleInputX(e)}
                  isDisabled={stateX === 0 ? true : false}
                >
                  <EditablePreview textAlign={"left"} border={"thin"} />
                  <EditableInput onChange={(e) => handleInputChange(e)} />
                </Editable>
                <Divider color={"isepBrick.500"}></Divider>
                <Editable
                  fontFamily={"Montserrat-Medium"}
                  value={stateY.toString()}
                  onChange={(e) => handleInputY(e)}
                  isDisabled={stateY === 0 ? true : false}
                >
                  <EditablePreview textAlign={"left"} />
                  <EditableInput />
                </Editable>
                <Divider color={"isepBrick.500"}></Divider>
                <Editable
                  fontFamily={"Montserrat-Medium"}
                  value={stateZ.toString()}
                  onChange={(e) => handleInputZ(e)}
                  isDisabled={stateZ === 0 ? true : false}
                >
                  <EditablePreview textAlign={"left"} />
                  <EditableInput />
                </Editable>

                <Divider color={"isepBrick.500"}></Divider>
                <Box height="15px"></Box>
                <CustomButton
                  backgroundColor="isepBrick.500"
                  borderColor="isepGreen.500"
                  buttonColor="isepGrey.600"
                  hoverColor="isepBrick.400"
                  text={t("beacon_update_button")}
                  textColor="#FFFFFF"
                  width="280px"
                  handleButtonClick={() => handleAddOrUpdate()}
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
