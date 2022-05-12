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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../../../components/buttons";

type BeaconUpdateAddFormProps = {
  beaconId?: number;
  deviceId: string;
  classRoom: string;
  x: number;
  y: number;
  z: number;
  type: string;
};

function AddUpdateBeaconsForm({
  deviceId,
  classRoom,
  x,
  y,
  z,
  type, //could be UPDATE or ADD
  beaconId,
}: BeaconUpdateAddFormProps) {

//   handleInputDeviceId(deviceId);
//   handleInputClassroom(classRoom);
//   handleInputX(x.toString());
//   handleInputY(y.toString());
//   handleInputZ(z.toString());

  const toast = useToast();

  function handleSave(type: string, beaconId?: number): void {
    //if type === UPDATE -> chamar o endpoint de PUT de device
    //if type === ADD -> chamar o endpoint de ADD de device
    //if 200
    toast({
      title: `Beacon successfully updated!`,
      status: "success",
      isClosable: true,
    });
    //else
    // toast({
    //   title: `Beacon couldn't be updated 😓`,
    //   status: "error",
    //   isClosable: true,
    // })
  }
  const [stateDeviceId, setDeviceId] = useState("Device Id");
  const [stateClassRoom, setClassRoom] = useState("Classroom");
  const [stateX, setX] = useState(0);
  const [stateY, setY] = useState(0);
  const [stateZ, setZ] = useState(0);

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

  const { t } = useTranslation();

  return (
    <Box>
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
        text={type}
        textColor="#FFFFFF"
        width="280px"
        handleButtonClick={() => handleSave(type, beaconId)}
      />
    </Box>
  );
}

export default AddUpdateBeaconsForm;
