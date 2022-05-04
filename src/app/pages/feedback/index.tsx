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

    const handleImageChange: any = async (event: any) => {
        const file = event.target.files[0];
        console.log(file);
        const base64 = await convertBase64(file);
        console.log("base 64: " + base64);
    }

    const convertBase64: any = (file: any) => {
        return new Promise((resolve, reject)=> {
            const fileReader: any = new FileReader();
            
            fileReader.readAsDataURL(file);

            fileReader.onload = ()=> {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error: any)=> {
                reject("error: " + error);
            };

        })
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
        navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 200 } })
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

    const handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
        let encodedBase64 = Buffer.from(inputValue).toString('base64');
        console.log("base 64: " + encodedBase64);
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
                            <Button width='67px' height='67px' colorScheme='blue' onClick={uploadFile}><AttachmentIcon /></Button>
                            <Button width='67px' height='67px' colorScheme='blue' onClick={uploadFeedbackText}><EditIcon /></Button>
                            <Button width='67px' height='67px' colorScheme='blue' onClick={uploadAudio}><PhoneIcon /></Button>
                        </ButtonGroup>
                    </Center>

                </Box>

                <Box marginBottom='15%'>

                    <div style={{ display: selectedUploadFile ? 'block' : 'none' }}>
                        <Center>
                            <p>Upload images/videos</p>
                        </Center>
                        <Center>
                            <Button colorScheme='blue' onClick={uploadFileCamera}>Use camera</Button>
                            <Button colorScheme='blue' onClick={uploadFileGallery}>From gallery</Button>
                        </Center>
                        <div style={{ display: selectedUploadFileCamera ? 'block' : 'none' }}>
                            
                                <div className='camera'>
                                    <Center>
                                    <video ref={videoRef}></video>
                                    </Center>
                                    <Center>
                                    <Button colorScheme='blue' onClick={takePhoto}>Take a photo</Button>
                                    </Center>
                                    <Center>
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
                                    </Center>
                                </div>
                           
                            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')} >
                                <Center>
                                    <canvas ref={photoRef}></canvas>
                                </Center>
                                <Center>
                                    <Button colorScheme='blue' onClick={closePhoto}>close</Button>
                                </Center>
                            </div>
                        </div>

                        <div style={{ display: selectedUploadFileGallery ? 'block' : 'none' }}>
                            <Center>
                            <input type="file" accept="image/*,video/*" onChange={handleImageChange}></input>
                            </Center>
                        </div>
                    </div>


                    <div style={{ display: selectedUploadFeedbackTex ? 'inline' : 'none' }}>
                        <Center><p>Upload text</p></Center>

                        <Textarea
                            value={value}
                            onChange={handleInputChange}
                            placeholder='Place your text here...'
                            size='sm'
                        />
                        <Text textAlign='center'>Your text: {value}</Text>
                    </div>


                    <div style={{ display: selectedUploadAudio ? 'block' : 'none' }}>
                        <Center>
                            <p>Upload audio</p>
                        </Center>
                        <Center>
                            <Button colorScheme='blue' onClick={uploadAudioMic}>Use mic</Button>
                            <Button colorScheme='blue' onClick={uploadAudioFiles}>From files</Button>
                        </Center>

                        <div style={{ display: selectedUploadAudioFiles ? 'block' : 'none' }}>
                            <Center>
                                <input type="file" accept="audio/*" onChange={handleImageChange}></input>
                            </Center>
                        </div>

                        <div style={{ display: selectedUploadAudioMic ? 'block' : 'none' }}>
                            <Center>
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
                            </Center>


                        </div>


                    </div>
                </Box>

                <Box>
                    <Center>
                        <Button colorScheme='red' height='47px' width='206px' marginBottom='2%'>Confirm</Button>
                    </Center>
                    <Center>
                        <Button color='rgba(0, 0, 0, 0.25)' height='47px' width='206px' onClick={cancelUpload}>Cancel</Button>
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
