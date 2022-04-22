import React, { useState } from 'react';
import { Box, Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'


function Feedback() {

    const handleImageChange: any = (event: any) => {
        console.log(event.target.files[0]);
    }
    const [selectedUploadFile, setSelectedUploadFile] = useState(false);
    const [selectedUploadFeedbackTex, setSelectedUploadFeedbackText] = useState(false);
    const [selectedUploadAudio, setSelectedUploadAudio] = useState(false);


    const uploadFile = (event: any) => {
        setSelectedUploadFile(true);
        setSelectedUploadFeedbackText(false);
        setSelectedUploadAudio(false);
    }

    const uploadFeedbackText = (event: any) => {
        setSelectedUploadFile(false);
        setSelectedUploadFeedbackText(true);
        setSelectedUploadAudio(false);
    }

    const uploadAudio = (event: any) => {
        setSelectedUploadAudio(true);
        setSelectedUploadFile(false);
        setSelectedUploadFeedbackText(false);
    }

    const cancelUpload = (event: any) => {
        setSelectedUploadAudio(false);
        setSelectedUploadFile(false);
        setSelectedUploadFeedbackText(false);
    }

    let [value, setValue] = React.useState('')

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    return (
        <>
            <Heading as="h1" size="xl">
                Feedback
            </Heading>

            <Heading as="h6" size="xs">
                Upload here your feedback
            </Heading>


            <div style={{ display: selectedUploadFile ? 'inline-block' : 'none' }}>
            <p>Upload images/videos</p>

            <input type="file" accept="image/*,video/*" onChange={handleImageChange}></input>
            <p>Upload images/videos ( use camera )</p>
            <Button colorScheme='blue'>Confirm</Button>
            <Button colorScheme='blue' onClick={cancelUpload}>Cancel</Button>
            </div>


            <div style={{ display: selectedUploadFeedbackTex ? 'inline-block' : 'none' }}>

            <p>Upload text</p>
            <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder='Place your text here...'
                size='sm'
            />
            <Text mb='8px'>Your text: {value}</Text>

            <Button colorScheme='blue'>Confirm</Button>
            <Button colorScheme='blue' onClick={cancelUpload}>Cancel</Button>
            </div>

            <div style={{ display: selectedUploadAudio ? 'inline-block' : 'none' }}>
            <p>Upload audio</p>
            <input type="file" accept="audio/*" onChange={handleImageChange}></input>
            <Button colorScheme='blue'>Confirm</Button>
            <Button colorScheme='blue' onClick={cancelUpload}>Cancel</Button>

            <p>Upload audio ( use mic )</p>
            </div>

            <br></br>
            <br></br>
            <br></br>


            <Button colorScheme='blue' onClick={uploadFile}>Upload files</Button>
            <Button colorScheme='blue'onClick={uploadFeedbackText}>Upload feedback text</Button>
            <Button colorScheme='blue'onClick={uploadAudio}>Upload audio</Button>



        </>


    )
}



/**
const handleImageChange: any = (event: any) => {
    console.log(event.target.files[0]);
}
 */
export default Feedback


/**
    render() {
        return (
            <div>
                <Heading as="h1" size="xl">
                    Feedback
                </Heading>

                <Heading as="h6" size="xs">
                    Upload here your feedback
                </Heading>


                 

                <div style={{ display: selectedUploadFile ? 'inline-block' : 'none' }}>
                <p>Upload images/videos</p>

                <input type="file" accept="image/*,video/*" onChange={handleImageChange}></input>
                <Button colorScheme='blue'>Confirm</Button>
                <p>Upload images/videos ( use camera )</p>

                </div>

                <p>Upload text</p>
                <Textarea placeholder='Here is a sample placeholder' />

                <p>Upload audio</p>
                <input type="file" accept="audio/*" onChange={handleImageChange}></input>
                <Button colorScheme='blue'>Confirm</Button>


                <p>Upload audio ( use mic )</p>

                <Button colorScheme='blue'>Upload files</Button>
                <Button colorScheme='blue'>Upload feedback text</Button>
                <Button colorScheme='blue'>Upload audio</Button>


            </div>
        );
    }

}
 */
