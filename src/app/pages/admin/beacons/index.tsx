import React, { ReactNode, useEffect } from "react";
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
  Spinner,
  Select,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
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
import { userData } from "../../../../store/user-reducer";

interface Beacon {
  beaconId: number;
  beaconName: string;
  classroomId: number;
  classroomName: string;
  x: number;
  y: number;
  z: number;
}

interface BeaconData {
  beacons: Beacon[];
}

interface Classroom {
  id: number;
  idDepartment: number;
  image: string;
  name: string;
  occupancy: number;
}

function AdminBeacons() {
  const { t } = useTranslation();

  const toast = useToast();

  const [stateDeviceId, setDeviceId] = useState(t("beacon_device_id"));
  const [stateClassRoom, setClassRoom] = useState(t("beacon_classroom"));
  const [stateBeaconId, setBeaconId] = useState(0);
  const [stateClassroomId, setClassRoomId] = useState(0);
  const [stateX, setX] = useState(0);
  const [stateY, setY] = useState(0);
  const [stateZ, setZ] = useState(0);
  const [state, setState] = useState("start");
  const [buttonState, setButton] = useState("UPDATE");
  const [operationState, setOperation] = useState("UPDATE");
  const [titleState, setTitle] = useState("Beacons");
  const [beaconList, setBeacons] = useState<BeaconData>();
  const [classroomList, setClassrooms] = useState<Classroom[]>([]);
  const currentUser = useStoreSelector(userData);

  function setStates(
    device: string,
    classRoom: string,
    x: number,
    y: number,
    z: number,
    beaconId: number,
    classroomId: number
  ): void {
    setDeviceId(device);
    setClassRoom(classRoom);
    setBeaconId(beaconId);
    setClassRoomId(classroomId);
    setX(x);
    setY(y);
    setZ(z);
  }

  const api = "https://camul2022.pythonanywhere.com";

  const loadBeaconsAsync = async () => {
    await fetch(api + "/map/beacons")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const items = data;
        setBeacons(items);
      });
  };

  const loadClassroomsAsync = async () => {
    await fetch(api + "/map/classrooms")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const items = data;
        setClassrooms(items);
      });
  };

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  function getBeaconUpdateForm(
    deviceId: string,
    classRoom: string,
    x: number,
    y: number,
    z: number,
    beaconId: number,
    classroomId: number
  ): void {
    setDeviceId(deviceId);
    setClassRoom(classRoom);
    setBeaconId(beaconId);
    setClassRoomId(classroomId);
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
    setTitle("Beacons");
  }

  var jsonDataBeacon = {
    idDevice: stateDeviceId,
    IdClassroom: stateClassroomId,
    x: stateX,
    y: stateY,
    z: stateZ,
  };

  var jsonDataUpdateBeacon = {
    beaconId: stateBeaconId,
    beaconName: stateDeviceId,
    classroomId: stateClassroomId,
    x: stateX,
    y: stateY,
    z: stateZ,
  };

  function handleAddOrUpdate(): void {
    console.log(operationState);
    if (operationState === "ADD") {
      console.log(jsonDataBeacon);
      fetch(api + "/map/beacons", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(jsonDataBeacon),
        headers: {
          authToken: currentUser.authToken,
          "Content-Type": "application/json",
        }, //change to actual token
      }).then((response) => {
        if (!response.ok) {
          console.log("ups");
          toast({
            title: t("beacon_add_error_message"),
            status: "error",
            isClosable: true,
          });
          throw new Error("Error" + response.status);
        } else {
          toast({
            title: t("beacon_add_success_message"),
            status: "success",
            isClosable: true,
          });
        }
      });
    }

    if (operationState === "UPDATE") {
      console.log("updating beacon " + stateBeaconId);
      console.log(jsonDataUpdateBeacon);
      fetch(api + "/map/beacons", {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(jsonDataUpdateBeacon),
        headers: {
          authToken: currentUser.authToken,
          "Content-Type": "application/json",
        }, //change to actual token
      }).then((response) => {
        if (!response.ok) {
          console.log("ups");
          toast({
            title: t("beacon_update_error_message"),
            status: "error",
            isClosable: true,
          });
          throw new Error("Error" + response.status);
        } else {
          console.log(response);
          toast({
            title: t("beacon_update_success_message"),
            status: "success",
            isClosable: true,
          });
        }
      });
    }
  }

  function handleDelete(): void {
    //TODO fix with actual endpoint
    console.log("updating beacon " + stateBeaconId);
    console.log(jsonDataUpdateBeacon);
    fetch(api + "/map/beacons", {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(jsonDataUpdateBeacon),
      headers: {
        authToken: currentUser.authToken,
        "Content-Type": "application/json",
      }, //change to actual token
    }).then((response) => {
      if (!response.ok) {
        console.log("ups");
        toast({
          title: t("beacon_update_error_message"),
          status: "error",
          isClosable: true,
        });
        throw new Error("Error" + response.status);
      } else {
        console.log(response);
        toast({
          title: t("beacon_update_success_message"),
          status: "success",
          isClosable: true,
        });
      }
    });
  }

  useEffect(() => {
    loadBeaconsAsync();
    loadClassroomsAsync();
  }, []);

  console.log("Occurs EVERY time the component is invoked.");
  return (
    <>
      <MobileView>
        <div>
          {state === "start" && beaconList !== undefined && (
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
                      {beaconList.beacons.map(
                        ({
                          beaconName: deviceId,
                          beaconId,
                          classroomId,
                          classroomName: classRoom,
                          x,
                          y,
                          z,
                        }) => (
                          <Tr
                            _hover={{ bg: "isepBrick.300" }}
                            onClick={() =>
                              getBeaconUpdateForm(
                                deviceId,
                                classRoom,
                                x,
                                y,
                                z,
                                beaconId,
                                classroomId
                              )
                            }
                          >
                            <Td>{deviceId}</Td>
                            <Td>{classRoom}</Td>
                            <Td>
                              {x}, {y}, {z}
                            </Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Center>
            </div>
          )}
          {state === "updateform" && beaconList !== undefined && (
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
                  <Select
                    placeholder={stateClassRoom}
                    onChange={(e) => setClassRoomId(parseInt(e.target.value))}
                  >
                    {classroomList.map(({ name, id }) => (
                      <option value={id}>{name}</option>
                    ))}
                  </Select>
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
                    <EditableInput />
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
                  <Box height="15px"></Box>
                  <CustomButton
                    backgroundColor="isepBrick.400"
                    borderColor="red"
                    buttonColor="white"
                    hoverColor="red"
                    text={t("beacon_delete")}
                    textColor="#FFFFFF"
                    width="280px"
                    handleButtonClick={() => onOpen()}
                  />
                  <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton />
                      <DrawerHeader>{t("delete_beacon_confirm")}</DrawerHeader>
                      <DrawerBody>
                        <CustomButton
                          backgroundColor="isepBrick.400"
                          borderColor="red"
                          buttonColor="white"
                          hoverColor="red"
                          text={t("beacon_delete")}
                          textColor="#FFFFFF"
                          width="280px"
                          handleButtonClick={() => handleDelete()}
                        />
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                </Box>
              </Center>
            </div>
          )}
          {beaconList === undefined && (
            <div>
              <Center>
                <Box height={"300px"}></Box>
                <Text fontFamily={"Montserrat-SemiBold"}>
                  {t("loading_data")}
                </Text>
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
        </div>
      </MobileView>

      <BrowserView>
        {beaconList !== undefined && state === "start" && (
          <div>
            <HStack spacing="550px">
              <Text
                fontFamily={"Montserrat-SemiBold"}
                fontSize="3xl"
                margin="7"
              >
                {titleState}
              </Text>
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
            </HStack>

            <SimpleGrid columns={[1, 2]}>
              <Box>
                {beaconList.beacons.map(
                  ({
                    beaconName: deviceId,
                    beaconId,
                    classroomId,
                    classroomName: classRoom,
                    x,
                    y,
                    z,
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
                          onClick={() =>
                            setStates(
                              deviceId,
                              classRoom,
                              x,
                              y,
                              z,
                              beaconId,
                              classroomId
                            )
                          }
                        >
                          <Icon
                            as={FaBacon}
                            color={"isepBrick.500"}
                            w={6}
                            h={6}
                          />
                          <Box w={3} h={6}></Box>
                          <Text fontFamily={"Montserrat-SemiBold"}>
                            {deviceId}
                          </Text>
                        </Button>
                      </ButtonGroup>
                    </Center>
                  )
                )}
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
                    <Select
                      placeholder={stateClassRoom}
                      onChange={(e) => setClassRoomId(parseInt(e.target.value))}
                    >
                      {classroomList.map(({ name, id }) => (
                        <option value={id}>{name}</option>
                      ))}
                    </Select>
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
                      <EditableInput />
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
                    <Box height="15px"></Box>

                    <CustomButton
                      backgroundColor="isepBrick.400"
                      borderColor="red"
                      buttonColor="white"
                      hoverColor="red"
                      text={t("beacon_delete")}
                      textColor="#FFFFFF"
                      width="280px"
                      handleButtonClick={() => onOpen()}
                    />
                    <Drawer
                      isOpen={isOpen}
                      placement="bottom"
                      onClose={onClose}
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                          {t("delete_beacon_confirm")}
                        </DrawerHeader>
                        <DrawerBody>
                          <CustomButton
                            backgroundColor="isepBrick.400"
                            borderColor="red"
                            buttonColor="white"
                            hoverColor="red"
                            text={t("beacon_delete")}
                            textColor="#FFFFFF"
                            width="280px"
                            handleButtonClick={() => handleDelete()}
                          />
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                  </GridItem>
                </Grid>
              </Box>
            </SimpleGrid>
          </div>
        )}
        {beaconList !== undefined && state !== "start" && (
          <div>
            <HStack spacing="410px">
              <Text
                fontFamily={"Montserrat-SemiBold"}
                fontSize="3xl"
                margin="7"
              >
                {titleState}
              </Text>
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
            </HStack>

            <SimpleGrid columns={[1, 2]}>
              <Box>
                {beaconList.beacons.map(({ beaconName: deviceId }) => (
                  <Center>
                    <ButtonGroup marginTop="1%" marginBottom="0.5%">
                      <Button
                        width="700px"
                        height="67px"
                        _hover={{ bg: "isepGrey.600" }}
                        variant="outline"
                        isActive={false}
                        _focus={{
                          boxShadow: "none",
                        }}
                      >
                        <Icon
                          as={FaBacon}
                          color={"isepBrick.500"}
                          w={6}
                          h={6}
                        />
                        <Box w={3} h={6}></Box>
                        <Text fontFamily={"Montserrat-SemiBold"}>
                          {deviceId}
                        </Text>
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
                    <Select
                      placeholder={stateClassRoom}
                      onChange={(e) => setClassRoomId(parseInt(e.target.value))}
                    >
                      {classroomList.map(({ name, id }) => (
                        <option value={id}>{name}</option>
                      ))}
                    </Select>
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
                      isDisabled={
                        stateX === 0 && state === "start" ? true : false
                      }
                    >
                      <EditablePreview textAlign={"left"} border={"thin"} />
                      <EditableInput />
                    </Editable>
                    <Divider color={"isepBrick.500"}></Divider>
                    <Editable
                      fontFamily={"Montserrat-Medium"}
                      value={stateY.toString()}
                      onChange={(e) => handleInputY(e)}
                      isDisabled={
                        stateY === 0 && state === "start" ? true : false
                      }
                    >
                      <EditablePreview textAlign={"left"} />
                      <EditableInput />
                    </Editable>
                    <Divider color={"isepBrick.500"}></Divider>
                    <Editable
                      fontFamily={"Montserrat-Medium"}
                      value={stateZ.toString()}
                      onChange={(e) => handleInputZ(e)}
                      isDisabled={
                        stateZ === 0 && state === "start" ? true : false
                      }
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
                      text={t("beacon_add_button")}
                      textColor="#FFFFFF"
                      width="280px"
                      handleButtonClick={() => handleAddOrUpdate()}
                    />
                  </GridItem>
                </Grid>
              </Box>
            </SimpleGrid>
          </div>
        )}
        {beaconList === undefined && (
          <div>
            <Center>
              <Box height={"300px"}></Box>
              <Text fontFamily={"Montserrat-SemiBold"}>
                {t("loading_data")}
              </Text>
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

export default AdminBeacons;
