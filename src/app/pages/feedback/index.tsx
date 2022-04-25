import React, { useState } from 'react';
import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'


function Feedback() {

    const handleImageChange: any = (event: any) => {
        console.log(event.target.files[0]);
    }
    const [selectedUploadFile, setSelectedUploadFile] = useState(false);
    const [selectedUploadFileCamera, setSelectedUploadFileCamera] = useState(false);
    const [selectedUploadFileGallery, setSelectedUploadFileGallery] = useState(false);


    const [selectedUploadFeedbackTex, setSelectedUploadFeedbackText] = useState(false);
    const [selectedUploadAudio, setSelectedUploadAudio] = useState(false);
    const [selectedUploadAudioMic, setSelectedUploadAudioMic] = useState(false);
    const [selectedUploadAudioFiles, setSelectedUploadAudioFiles] = useState(false);


    const uploadFile = (event: any) => {
        setSelectedUploadFile(true);
        setSelectedUploadFeedbackText(false);
        setSelectedUploadAudio(false);
    }

    const uploadFileCamera = (event: any) => {
        setSelectedUploadFileCamera(true);
        setSelectedUploadFileGallery(false);
    }
    const uploadFileGallery = (event: any) => {
        setSelectedUploadFileGallery(true);
        setSelectedUploadFileCamera(false);
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

    const uploadAudioMic = (event: any) => {
        setSelectedUploadAudioMic(true);
        setSelectedUploadAudioFiles(false);
    }

    const uploadAudioFiles = (event: any) => {
        setSelectedUploadAudioMic(false);
        setSelectedUploadAudioFiles(true);
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
            <p>Upload here your feedback.</p>

            <SimpleGrid columns={[1, null, 3]} spacing='40px'>
                <Box width='100%'>
                    <Button colorScheme='blue' onClick={uploadFile}>Upload files</Button>
                    <Button colorScheme='blue' onClick={uploadFeedbackText}>Upload feedback text</Button>
                    <Button colorScheme='blue' onClick={uploadAudio}>Upload audio</Button>
                    <br></br>
                    <br></br>
                    <Button colorScheme='blue'>Confirm</Button>
                    <Button colorScheme='blue' onClick={cancelUpload}>Cancel</Button>
                </Box>
                <Box width='200%'>
                    <div style={{ display: selectedUploadFile ? 'inline-block' : 'none' }}>
                        <p>Upload images/videos</p>

                        <Button colorScheme='blue' onClick={uploadFileCamera}>Use camera</Button>
                        <Button colorScheme='blue' onClick={uploadFileGallery}>From gallery</Button>

                        <div style={{ display: selectedUploadFileCamera ? 'inline-block' : 'none' }}>

                            <p>use camera</p>
                        </div>

                        <div style={{ display: selectedUploadFileGallery ? 'inline-block' : 'none' }}>
                            <input type="file" accept="image/*,video/*" onChange={handleImageChange}></input>
                        </div>
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
                    </div>

                    <div style={{ display: selectedUploadAudio ? 'inline-block' : 'none' }}>

                        <Button colorScheme='blue' onClick={uploadAudioMic}>Use mic</Button>
                        <Button colorScheme='blue' onClick={uploadAudioFiles}>From files</Button>

                        <div style={{ display: selectedUploadAudioFiles ? 'inline-block' : 'none' }}>
                            <p>Upload audio</p>
                            <input type="file" accept="audio/*" onChange={handleImageChange}></input>
                        </div>

                        <div style={{ display: selectedUploadAudioMic ? 'inline-block' : 'none' }}>
                            <p>Upload audio ( use mic )</p>
                        </div>
                    </div>
                </Box>
            </SimpleGrid>
        </>
    )
}


export default Feedback

