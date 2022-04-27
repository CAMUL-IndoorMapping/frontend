import React, { useState, useRef, useEffect } from 'react';
import { Box, Center, Heading, Stack, Square, Circle, Flex } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import AudioRecorder from 'react-audio-recorder';
import { AspectRatio } from '@chakra-ui/react'

import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import { Stream } from 'stream';
import { PhoneIcon, AddIcon, WarningIcon, DownloadIcon, EditIcon, AttachmentIcon } from '@chakra-ui/icons'

//import useRecorder from "./useRecorder";
//import {Recorder} from 'react-voice-recorder'

//import AudioReactRecorder, { RecordState } from 'audio-react-recorder'


function Feedback() {


    //const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

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

    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 360 } })
            .then(stream => {
                let video: any = videoRef.current;
                video.srcObject = stream;
                video.play();
            }).catch(err => {
                console.log("error: " + err);
            })
    }

    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9);

        let video: any = videoRef.current;
        let photo: any = photoRef.current;

        photo.width = width;
        photo.height = height;

        let context = photo.getContext('2d');
        context.drawImage(video, 0, 0, width, height);

        setHasPhoto(true);
    }

    const closePhoto = () => {
        let photo: any = photoRef.current;
        let context = photo.getContext('2d');
        context.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    }


    let [value, setValue] = React.useState('')

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }



    useEffect(() => {
        getVideo();
    }, [videoRef])
    return (
        <>
            <Heading as="h1" size="xl">
                Feedback
            </Heading>


            <p>Upload here your feedback</p>

            <SimpleGrid columns={[1, 2]}>
                <Box>
                    <Center>
                        <ButtonGroup marginTop='20%' marginBottom='10%'>
                            <Button colorScheme='blue' onClick={uploadFile}><AttachmentIcon /></Button>
                            <Button colorScheme='blue' onClick={uploadFeedbackText}><EditIcon /></Button>
                            <Button colorScheme='blue' onClick={uploadAudio}><PhoneIcon /></Button>
                        </ButtonGroup>
                    </Center>

                    <Center>
                        <Button colorScheme='teal' width='40%' marginBottom='2%'>Confirm</Button>
                    </Center>
                    <Center>
                        <Button colorScheme='red' width='40%' onClick={cancelUpload}>Cancel</Button>
                    </Center>

                </Box>

                <Box>
                    <Center>
                        <div style={{ display: selectedUploadFile ? 'inline-block' : 'none' }}>

                            <p>Upload images/videos</p>

                            <Button colorScheme='blue' onClick={uploadFileCamera}>Use camera</Button>
                            <Button colorScheme='blue' onClick={uploadFileGallery}>From gallery</Button>

                            <div style={{ display: selectedUploadFileCamera ? 'inline-block' : 'none' }}>
                                <div className='camera'>
                                    <video ref={videoRef}></video>
                                    <Button colorScheme='blue' onClick={takePhoto}>Take a photo</Button>
                                    <ReactMediaRecorder
                                        video
                                        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                                            <div>
                                                <p>status: {status}</p>
                                                <Button colorScheme='blue' onClick={startRecording}>Start Recording</Button>
                                                <Button colorScheme='blue' onClick={stopRecording}>Stop Recording</Button>

                                                <video src={mediaBlobUrl || undefined} controls autoPlay loop></video>

                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={'result' + (hasPhoto ? 'hasPhoto' : '')} >
                                    <canvas ref={photoRef}></canvas>
                                    <Button colorScheme='blue' onClick={closePhoto}>close</Button>
                                </div>
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
                            <p>Upload audio</p>
                            <Button colorScheme='blue' onClick={uploadAudioMic}>Use mic</Button>
                            <Button colorScheme='blue' onClick={uploadAudioFiles}>From files</Button>

                            <div style={{ display: selectedUploadAudioFiles ? 'inline-block' : 'none' }}>

                                <input type="file" accept="audio/*" onChange={handleImageChange}></input>
                            </div>

                            <div style={{ display: selectedUploadAudioMic ? 'inline-block' : 'none' }}>
                                {/** 
                            <div>
                                <p>{status}</p>
                                <button onClick={startRecording}>Start Recording</button>
                                <button onClick={stopRecording}>Stop Recording</button>
                                <video src={mediaBlobUrl} controls autoPlay loop />

                            </div>
                        */}

                                <ReactMediaRecorder
                                    video
                                    render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                                        <div>
                                            <p>status: {status}</p>
                                            <Button colorScheme='blue' onClick={startRecording}>Start Recording</Button>
                                            <Button colorScheme='blue' onClick={stopRecording}>Stop Recording</Button>

                                            <audio src={mediaBlobUrl || undefined} controls autoPlay loop></audio>

                                        </div>
                                    )}
                                />


                            </div>


                        </div>
                    </Center>
                </Box>

            </SimpleGrid>
        </>
    )
}


export default Feedback


/**
export class Feedback extends React.Component {
   
    
}
 */
