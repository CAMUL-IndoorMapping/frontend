import { Button, Center } from "@chakra-ui/react";
import React, { ReactChild } from "react";

type ButtonProps = {
  backgroundColor: string;
  hoverColor: string;
  buttonColor: string;
  borderColor: string;
  buttonVariant?: "solid" | "outline" | "ghost" | "link";
  width?: string;
  height?: string;
  textColor?: string;
  text: ReactChild;
  handleButtonClick: () => void;
};

function CustomButton({
  backgroundColor,
  hoverColor,
  buttonColor,
  borderColor,
  buttonVariant = "solid",
  width = "529px",
  height = "47px",
  textColor,
  text,
  handleButtonClick,
}: ButtonProps) {
  return (
    <Center>
      <Button
        _focus={{ boxShadow: "none" }}
        backgroundColor={backgroundColor}
        borderRadius="200px"
        _hover={{ bg: hoverColor }}
        color={buttonColor}
        borderColor={borderColor}
        variant={buttonVariant}
        width={width}
        height={height}
        textColor={textColor}
        onClick={handleButtonClick}
      >
        {text}
      </Button>
    </Center>
  );
}

export default CustomButton;
