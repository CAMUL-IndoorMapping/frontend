import React from "react";
import { Button, Flex, useColorMode } from "@chakra-ui/react";
import CustomButton from ".";

const themeModeString = (colorMode: string) => {
    const arr = colorMode.split(" ");

    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    return arr.join(" ");
}

const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div>
            <Flex marginTop={"20px"}>
                <CustomButton
                    backgroundColor="isepBrick.500"
                    borderColor="isepGreen.500"
                    buttonColor="isepGrey.600"
                    hoverColor="isepBrick.400"
                    text={themeModeString(colorMode)}
                    textColor="#FFFFFF"
                    width="280px"
                    handleButtonClick={() => toggleColorMode()}
                />
            </Flex>
        </div>
    );
};

export default ThemeToggle;