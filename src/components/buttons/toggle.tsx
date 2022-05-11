import React from "react";
import { Button, Flex, useColorMode } from "@chakra-ui/react";

const themeModeString = (colorMode: string) => {
    const arr = colorMode.split(" ");

    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    return arr.join(" ");
}

const Toggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div>
            <Flex marginTop={"20px"}>
                <Button size="lg" onClick={() => toggleColorMode()}>
                    {themeModeString(colorMode)} Mode
                </Button>
            </Flex>
        </div>
    );
};

export default Toggle;