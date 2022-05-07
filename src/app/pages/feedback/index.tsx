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
import Webcam from 'react-webcam';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


//import useRecorder from "./useRecorder";
//import {Recorder} from 'react-voice-recorder'

//import AudioReactRecorder, { RecordState } from 'audio-react-recorder'



function Feedback() {


    //web react cam
    const webRef: any = React.createRef();
    const [img, setImage] = useState(null);
    const showImage = () => {
        setSelectedPhoto(true);
        setImage(webRef.current.getScreenshot());
        console.log(webRef.current.getScreenshot());
    }


    //submit file
    const handleImageChange: any = async (event: any) => {
        const file = event.target.files[0];
        console.log(file);
        const base64 = await convertBase64(file);
        console.log(base64);
    }

    //convert file base64 
    const convertBase64: any = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader: any = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error: any) => {
                reject("error: " + error);
            };

        })
    }

    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);

    const handleDevices: any = React.useCallback(
        (mediaDevices: { filter: (arg0: ({ kind }: { kind: any; }) => boolean) => React.SetStateAction<never[]>; }) =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    const [selectedUploadFile, setSelectedUploadFile] = useState(false);
    const [selectedUploadFileCamera, setSelectedUploadFileCamera] = useState(false);
    const [selectedUploadFileGallery, setSelectedUploadFileGallery] = useState(false);


    const [selectedUploadFeedbackTex, setSelectedUploadFeedbackText] = useState(false);

    const [selectedUploadAudio, setSelectedUploadAudio] = useState(false);
    const [selectedUploadAudioMic, setSelectedUploadAudioMic] = useState(false);
    const [selectedUploadAudioFiles, setSelectedUploadAudioFiles] = useState(false);

    const [selectedStartRecordAudio, setSelectedStartRecordAudio] = useState(true);
    const [selectedStopRecordAudio, setSelectedStopRecordAudio] = useState(false);
    const [selectedSubmitRecordAudio, setSelectedSubmitRecordAudio] = useState(false);

    const [selectedStartRecordVideo, setSelectedStartRecordVideo] = useState(true);
    const [selectedStopRecordVideo, setSelectedStopRecordVideo] = useState(false);
    const [selectedSubmitRecordVideo, setSelectedSubmitRecordVideo] = useState(false);

    const [selectedAudioOption, setSelectedAudioOption] = useState(false);

    const [selectedPhoto, setSelectedPhoto] = useState(false);

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
        setSelectedAudioOption(true);
        setSelectedUploadAudioMic(true);
        setSelectedUploadAudioFiles(false);
    }

    const uploadAudioFiles = (event: any) => {
        setSelectedAudioOption(true);
        setSelectedUploadAudioMic(false);
        setSelectedUploadAudioFiles(true);
    }

    const cancelUpload = (event: any) => {
        setSelectedUploadAudio(false);
        setSelectedUploadFile(false);
        setSelectedUploadFeedbackText(false);
    }

    const startRecordAudio = () => {
        setSelectedStartRecordAudio(false);
        setSelectedSubmitRecordAudio(false);
        setSelectedStopRecordAudio(true);
    }

    const stopRecordAudio = () => {
        setSelectedStartRecordAudio(false);
        setSelectedStopRecordAudio(false);
        setSelectedSubmitRecordAudio(true);
    }

    const submitRecordAudio = () => {
        setSelectedStartRecordAudio(true);
        setSelectedStopRecordAudio(false);
        setSelectedSubmitRecordAudio(false);
    }

    const startRecordVideo = () => {
        setSelectedStartRecordVideo(false);
        setSelectedSubmitRecordVideo(false);
        setSelectedStopRecordVideo(true);
    }

    const stopRecordVideo = () => {
        setSelectedStartRecordVideo(false);
        setSelectedStopRecordVideo(false);
        setSelectedSubmitRecordVideo(true);
    }

    const submitRecordVideo = () => {
        setSelectedStartRecordVideo(true);
        setSelectedStopRecordVideo(false);
        setSelectedSubmitRecordVideo(false);
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
        setImage(null);
        setSelectedPhoto(false);
    }


    const [value, setValue] = React.useState('')

    const handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
        console.log(inputValue)
        //let encodedBase64 = Buffer.from(inputValue).toString('base64');
        //console.log("base 64: " + encodedBase64);
    }

    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ audio: true });

    const video = useReactMediaRecorder({ video: true });


    const recordAudio = () => {
        console.log(mediaBlobUrl);
    }

    const recordVideo = () => {
        console.log(video.mediaBlobUrl);
    }

    useEffect(() => {
        { getVideo(); navigator.mediaDevices.enumerateDevices().then(handleDevices); }
    }, [videoRef, handleDevices])
    return (
        <>
            <Heading as="h1" size="xl">
                Feedback
            </Heading>
            <p>Upload here your feedback</p>

            <MobileView>
                <SimpleGrid columns={[1]}>

                    {/**Main buttons */}
                    <Box>
                        <Center>
                            <ButtonGroup marginTop='20%' marginBottom='10%' spacing='12'>
                                <Button _focus={{ boxShadow: "none" }} width='67px' height='67px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadFeedbackText}>
                                    <img src="https://s3-alpha-sig.figma.com/img/5c37/7770/eced2bac8d7213431dc4807a6e524329?Expires=1652659200&Signature=UfMtDJqYCdsp1JugqHNKOyyH35cL7EbQ05e8uwmf-k4K3ShQwqXn676qqLZs7ma0xQUg7RZiz2-vu04xKFca8btN8AhHxl5U83dd3zYjyOtOl2rIzQKnBmfPFtCodlUlyBUwHb2ul7Qniji08dJts7Sh81p7JSWWtP3CeZMiFl9kg~Wb8nXhWhYg9dJyaUZUd0YuAhSwt8~DYH02fQd9JUbaB84neQplwy0LT9zIwTBHaBR5dyawTeM03J5MG3y-uAz1-p1bhpaByil2I35RlfgjpoC72HttNyajOMb3amfvr2AIUqrnu9zjkaraUHkHtGrzoZMMc40PMBskJoMjIw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" /></Button>

                                <Button _focus={{ boxShadow: "none" }} width='67px' height='67px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadFile}>
                                    <img src='https://s3-alpha-sig.figma.com/img/2f03/7f76/ea4b824d46259756ee696c6311a3e9c2?Expires=1652659200&Signature=M78iAFpzCO4GFcvhqolOfU9obPGhP2mtJZxVIwPgAleeHuQz1Ka7pCT92McBPr-yxkhFupd~RjHYjtStFlsQotJyLD9WWVDJUFBxekzDDV9YTl70vsbtB8YdOxI3xGs-Ui0cKqCbtNECDtvgHd6AoPGSmULb-WsWE669lnH8ZCba7CSRqh3qYCHCMxaf6qcAPhg07jDXGKVWzkTkKCW6qYRxG69060oFzu-R4a3u9K4SQvqa2AEU1NlWT2Mr4d7ImbagetBQBQSTQdoYhX4gatI7EZMqix3qt5UZkX3048OgYsU0OO0oMceGqdiHjWAYkvnF~ztPUTzdbX7xQp52lQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></Button>

                                <Button _focus={{ boxShadow: "none" }} width='67px' height='67px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadAudio}>
                                    <img src='https://s3-alpha-sig.figma.com/img/9570/6275/02fe629724c6451bfc58e8b408959b7f?Expires=1652659200&Signature=ersh~djo0M0azAQXkkTt4atepCPDgD7pfkNhGnpDDINizApqLzAFk8SMm-PpkHFaMqzOW-xSqAfeDd8V8mXslKQY7g97M6zXewSuftfpQkewSOmHfT8s3OINRHV3iqDEW4z8f0j~8q5D9Q7iEhCOVXWWiklU9PYEpJOrXNpTib75MigEcus2~vkeBGPNvtWLUxXlbKELRs1lJ4Bi~qr2hxGiRdeGELKk~WBl0qchXBivzZEevHwInxe7Huusa1Ug1QE3CFctUOk2xxDU569K4PKG7siFbZQ4gNZUlUXsZa9w6bFmzwBZHuu7c8gph3ooZQXf3c65Ew99zAjkdd5CxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></Button>
                            </ButtonGroup>
                        </Center>

                    </Box>

                    <Box marginBottom='15%'>

                        {/**Upload photo/video */}
                        <div style={{ display: selectedUploadFile ? 'block' : 'none' }}>
                            <Center>
                                <Button _focus={{ boxShadow: "none" }} backgroundColor='#CE7E5C' color='#FFFFFF' borderRadius='200px' _hover={{ bg: '#A2543D' }}
                                    borderColor='#A2543D' width='206px' height='47px' marginBottom='2%' onClick={uploadFileCamera}>Use camera</Button>
                            </Center>
                            <Center>
                                <Button _focus={{ boxShadow: "none" }} backgroundColor='#CE7E5C' color='#FFFFFF' borderRadius='200px' _hover={{ bg: '#A2543D' }}
                                    borderColor='#A2543D' width='206px' height='47px' marginBottom='5%' onClick={uploadFileGallery}>From gallery</Button>
                            </Center>
                            <div style={{ display: selectedUploadFileCamera ? 'block' : 'none' }}>

                                <div className='camera'>
                                    <div>
                                        <Center>
                                            {devices.map((device: any, key: any) => (
                                                <Button _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                                    variant='outline' height='47px' width='206px'
                                                    key={device.deviceId}
                                                    onClick={() => setDeviceId(device.deviceId)}>
                                                    {device.label || `Device ${key + 1}`}
                                                </Button>
                                            ))}
                                        </Center>
                                    </div>
                                    <Center>
                                        <Webcam width='70%' ref={webRef} videoConstraints={{ deviceId }} ></Webcam>
                                    </Center>

                                    <Center>
                                        <Button _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                            variant='outline' height='47px' width='206px' onClick={() => {
                                                showImage();
                                            }}>Take a photo</Button>
                                    </Center>
                                    <Center>
                                        {/**record video */}
                                        <div>
                                            <Button style={{ display: selectedStartRecordVideo ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                                variant='outline' height='47px' width='206px' onClick={() => { video.startRecording(); startRecordVideo() }}>Start Recording</Button>

                                            <Button style={{ display: selectedStopRecordVideo ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                                variant='outline' height='47px' width='206px' onClick={() => { video.stopRecording(); stopRecordVideo(); }}>Stop Recording</Button>

                                            <Center>
                                                <video width='30%' style={{ display: selectedSubmitRecordVideo ? 'block' : 'none' }} src={video.mediaBlobUrl || undefined} controls autoPlay loop></video>
                                            </Center>

                                            <Center>
                                                <Button style={{ display: selectedSubmitRecordVideo ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                                    variant='outline' height='47px' width='206px' onClick={() => { recordVideo(); submitRecordVideo() }}>submit</Button>
                                            </Center>
                                        </div>

                                    </Center>
                                </div>

                                {/**Photo*/}
                                <div className={'result' + (hasPhoto ? 'hasPhoto' : '')} >
                                    <Center>
                                        <img src={img || undefined}></img>
                                    </Center>
                                    <Center>
                                        <Button style={{ display: selectedPhoto ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                            variant='outline' height='47px' width='206px' onClick={closePhoto}>close</Button>
                                    </Center>
                                </div>
                            </div>

                            {/**upload image/video */}
                            <div style={{ display: selectedUploadFileGallery ? 'block' : 'none' }}>
                                <Center>
                                    <input type="file" accept="image/*,video/*" onChange={handleImageChange}></input>
                                </Center>
                            </div>
                        </div>

                        {/**Text feedback */}
                        <div style={{ display: selectedUploadFeedbackTex ? 'inline' : 'none' }}>
                            <Center>
                                <Textarea borderColor='#A2543D' width='50%' height='200px' _hover={{ boxShadow: 'none' }} _focus={{ boxShadow: "none" }}
                                    value={value}
                                    onChange={handleInputChange}
                                    placeholder='Place your text here...'
                                    _placeholder={{ textColor: '#CE7E5C' }}
                                    color='#CE7E5C'
                                />
                            </Center>
                        </div>

                        {/**Audio feedback */}
                        <div style={{ display: selectedUploadAudio ? 'block' : 'none' }}>
                            <Center>
                                <Button _focus={{ boxShadow: "none" }} backgroundColor='#CE7E5C' color='#FFFFFF' borderRadius='200px' _hover={{ bg: '#A2543D' }}
                                    borderColor='#A2543D' width='206px' height='47px' marginBottom='2%' onClick={uploadAudioMic}>Use mic</Button>
                            </Center>
                            <Center>
                                <Button _focus={{ boxShadow: "none" }} backgroundColor='#CE7E5C' color='#FFFFFF' borderRadius='200px' _hover={{ bg: '#A2543D' }}
                                    borderColor='#A2543D' width='206px' height='47px' marginBottom='5%' onClick={uploadAudioFiles}>From files</Button>
                            </Center>

                            {/**Upload audio */}
                            <div style={{ display: selectedUploadAudioFiles ? 'block' : 'none' }}>
                                <Center>
                                    <input type="file" accept="audio/*" onChange={handleImageChange}></input>
                                </Center>
                            </div>

                            {/**Record audio */}
                            <div style={{ display: selectedUploadAudioMic ? 'block' : 'none' }}>
                                <Center>
                                    <div>
                                        <p>status: {status}</p>

                                        <Center>
                                            <Button style={{ display: selectedStartRecordAudio ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                                variant='outline' height='47px' width='220px' onClick={() => { startRecording(); startRecordAudio() }}>Start Recording</Button>
                                        </Center>

                                        <Center>
                                            <Button style={{ display: selectedStopRecordAudio ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                                variant='outline' height='47px' width='220px' onClick={() => { stopRecording(); stopRecordAudio(); }}>Stop Recording</Button>
                                        </Center>

                                        <Center>
                                            <audio style={{ display: selectedSubmitRecordAudio ? 'block' : 'none' }} src={mediaBlobUrl || undefined} controls></audio>
                                        </Center>

                                        <Center>
                                            <Button style={{ display: selectedSubmitRecordAudio ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                                variant='outline' height='47px' width='220px' onClick={() => { recordAudio(); submitRecordAudio() }}>Submit</Button>
                                        </Center>
                                    </div>
                                </Center>
                            </div>
                        </div>
                    </Box>

                    <Box>
                        <Center>
                            <Button _focus={{ boxShadow: "none" }} backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }} color='#FFFFFF'
                                borderColor='#CE7E5C' height='47px' width='220px' marginBottom='5%'>CONFIRM</Button>
                        </Center>
                        <Center>
                            <Button _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                variant='outline' height='47px' width='220px' marginBottom='15%' onClick={cancelUpload}>CANCEL</Button>
                        </Center>
                        <Center>
                            <Button _focus={{ boxShadow: "none" }} _hover={{ bg: '#A2543D' }} borderColor='#DA8E71' borderRadius='200px' color='#DA8E71'
                                variant='outline' height='47px' width='220px'>SENT FEEDBACK</Button>
                        </Center>
                    </Box>

                </SimpleGrid>
            </MobileView>


            <BrowserView>

                <SimpleGrid columns={[3]}>
                    {/**main buttons */}
                    <Box marginLeft='100px'>
                        <Center>
                            <ButtonGroup marginTop='20%' marginBottom='10%' spacing='12'>
                                <Button _focus={{ boxShadow: "none" }} width='93px' height='93px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadFeedbackText}>
                                    <img src="https://s3-alpha-sig.figma.com/img/5c37/7770/eced2bac8d7213431dc4807a6e524329?Expires=1652659200&Signature=UfMtDJqYCdsp1JugqHNKOyyH35cL7EbQ05e8uwmf-k4K3ShQwqXn676qqLZs7ma0xQUg7RZiz2-vu04xKFca8btN8AhHxl5U83dd3zYjyOtOl2rIzQKnBmfPFtCodlUlyBUwHb2ul7Qniji08dJts7Sh81p7JSWWtP3CeZMiFl9kg~Wb8nXhWhYg9dJyaUZUd0YuAhSwt8~DYH02fQd9JUbaB84neQplwy0LT9zIwTBHaBR5dyawTeM03J5MG3y-uAz1-p1bhpaByil2I35RlfgjpoC72HttNyajOMb3amfvr2AIUqrnu9zjkaraUHkHtGrzoZMMc40PMBskJoMjIw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" /></Button>

                                <Button _focus={{ boxShadow: "none" }} width='93px' height='93px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadFile}>
                                    <img src='https://s3-alpha-sig.figma.com/img/2f03/7f76/ea4b824d46259756ee696c6311a3e9c2?Expires=1652659200&Signature=M78iAFpzCO4GFcvhqolOfU9obPGhP2mtJZxVIwPgAleeHuQz1Ka7pCT92McBPr-yxkhFupd~RjHYjtStFlsQotJyLD9WWVDJUFBxekzDDV9YTl70vsbtB8YdOxI3xGs-Ui0cKqCbtNECDtvgHd6AoPGSmULb-WsWE669lnH8ZCba7CSRqh3qYCHCMxaf6qcAPhg07jDXGKVWzkTkKCW6qYRxG69060oFzu-R4a3u9K4SQvqa2AEU1NlWT2Mr4d7ImbagetBQBQSTQdoYhX4gatI7EZMqix3qt5UZkX3048OgYsU0OO0oMceGqdiHjWAYkvnF~ztPUTzdbX7xQp52lQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></Button>

                                <Button _focus={{ boxShadow: "none" }} width='93px' height='93px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadAudio}>
                                    <img src='https://s3-alpha-sig.figma.com/img/9570/6275/02fe629724c6451bfc58e8b408959b7f?Expires=1652659200&Signature=ersh~djo0M0azAQXkkTt4atepCPDgD7pfkNhGnpDDINizApqLzAFk8SMm-PpkHFaMqzOW-xSqAfeDd8V8mXslKQY7g97M6zXewSuftfpQkewSOmHfT8s3OINRHV3iqDEW4z8f0j~8q5D9Q7iEhCOVXWWiklU9PYEpJOrXNpTib75MigEcus2~vkeBGPNvtWLUxXlbKELRs1lJ4Bi~qr2hxGiRdeGELKk~WBl0qchXBivzZEevHwInxe7Huusa1Ug1QE3CFctUOk2xxDU569K4PKG7siFbZQ4gNZUlUXsZa9w6bFmzwBZHuu7c8gph3ooZQXf3c65Ew99zAjkdd5CxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></Button>
                            </ButtonGroup>
                        </Center>

                        <Center>
                            <Button _focus={{ boxShadow: "none" }} backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }} color='#FFFFFF'
                                borderColor='#CE7E5C' height='47px' width='529px' marginBottom='5%'>CONFIRM</Button>
                        </Center>
                        <Center>
                            <Button _focus={{ boxShadow: "none" }} _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                variant='outline' height='47px' width='529px' marginBottom='10%' onClick={cancelUpload}>CANCEL</Button>
                        </Center>
                        <Center>
                            <Button _focus={{ boxShadow: "none" }} _hover={{ bg: '#A2543D' }} borderColor='#DA8E71' borderRadius='200px' color='#DA8E71'
                                variant='outline' height='47px' width='529px'>SENT FEEDBACK</Button>
                        </Center>
                    </Box>
                    <Box marginLeft='100px' backgroundColor='#000000' width='0px' height='550px' border='1px'></Box>

                    <Box marginLeft='-400px'>
                        {/**Upload photo/video */}
                        <div style={{ display: selectedUploadFile ? 'block' : 'none' }}>

                            <Box marginLeft='150px' marginTop='50px' width='600px' height='100%' backgroundColor='#FCE5D7' p={4} color='#575757'>
                                <label onChange={handleImageChange} htmlFor="formId">

                                    {/**<input name="" type="file" accept="image/*,video/*" id="formId" hidden />*/}
                                    <Center marginTop='15%'>
                                        <img width='25%' src="https://s3-alpha-sig.figma.com/img/e61d/d2cb/0a63e30674435607b06b4d6b466384f5?Expires=1652659200&Signature=URLDx3p2s8~-sw~0ToQSzVYZQntaSlYpFwCKnw-Wb94HVTr448gEWOEPMkrMPNb0tnTsMiiCKTusgmmPnk5EJr3lK66zGOMbgUxqPvJdx6i0Tv6umys4UTeMwq~MAdwiPNTce9HQ5rBRWOWgVE3EmDgiAhh-dfM6U73VfeUShGkeU5yNv-yifAPBU5r~mgx2dh3YoMIQ4iKfS--pzUFW4BE6YMdNiPoDfMwMpJrYdaFPQpmGK0lsJPdEn5nxnzVLQkn-JrH9uyGi0FXsL9cxCH6Ofcy5BDEKtL90dk3jnEzc3YXvlXKJaQ2M8Z40yW7HaF5fmp987hV7SpJZjSsipw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                    </Center>
                                    <Center marginBottom='15%'>
                                        <h1>Click to upload a photo/video</h1>
                                    </Center>
                                    <Center>
                                        <input name="" type="file" accept="image/*,video/*" id="formId" />
                                    </Center>
                                </label>
                            </Box>
                        </div>

                        {/**Text feedback */}
                        <div style={{ display: selectedUploadFeedbackTex ? 'inline' : 'none' }}>

                            <Box marginLeft='150px' marginTop='50px' width='600px' backgroundColor='#FCE5D7' p={4} color='#575757'>
                                <Center>
                                    <img width='25%' src="https://s3-alpha-sig.figma.com/img/5c37/7770/eced2bac8d7213431dc4807a6e524329?Expires=1652659200&Signature=UfMtDJqYCdsp1JugqHNKOyyH35cL7EbQ05e8uwmf-k4K3ShQwqXn676qqLZs7ma0xQUg7RZiz2-vu04xKFca8btN8AhHxl5U83dd3zYjyOtOl2rIzQKnBmfPFtCodlUlyBUwHb2ul7Qniji08dJts7Sh81p7JSWWtP3CeZMiFl9kg~Wb8nXhWhYg9dJyaUZUd0YuAhSwt8~DYH02fQd9JUbaB84neQplwy0LT9zIwTBHaBR5dyawTeM03J5MG3y-uAz1-p1bhpaByil2I35RlfgjpoC72HttNyajOMb3amfvr2AIUqrnu9zjkaraUHkHtGrzoZMMc40PMBskJoMjIw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                </Center>
                                <Center>
                                    <Textarea _focus={{ boxShadow: "none" }} _hover={{ boxShadow: 'none' }} marginBottom='10%' width='70%' height='150px' borderColor='#A2543D'
                                        value={value}
                                        onChange={handleInputChange}
                                        placeholder='Place your text here...'
                                        _placeholder={{ textColor: '#A2543D' }}
                                        color='#A2543D'
                                    />
                                </Center>
                            </Box>
                        </div>

                        {/**Audio feedback */}
                        <div style={{ display: selectedUploadAudio ? 'block' : 'none' }}>
                            <Box marginLeft='150px' marginTop='50px' width='600px' height='100%' backgroundColor='#FCE5D7' p={4} color='#575757'>
                                <Center>
                                    <Button _focus={{ boxShadow: "none" }} marginTop='2%' backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }}
                                        color='#FFFFFF' borderColor='#CE7E5C' width='206px' height='47px' marginBottom='2%' onClick={uploadAudioMic}>Use mic</Button>
                                </Center>
                                <Center>
                                    <Button _focus={{ boxShadow: "none" }} backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }} color='#FFFFFF'
                                        borderColor='#CE7E5C' width='206px' height='47px' marginBottom='2%' onClick={uploadAudioFiles}>From files</Button>
                                </Center>

                                <div style={{ display: selectedUploadAudioFiles ? 'none' : 'block' }}>
                                    <Center marginBottom='5%'>
                                        <img width='20%' src="https://s3-alpha-sig.figma.com/img/9570/6275/02fe629724c6451bfc58e8b408959b7f?Expires=1652659200&Signature=ersh~djo0M0azAQXkkTt4atepCPDgD7pfkNhGnpDDINizApqLzAFk8SMm-PpkHFaMqzOW-xSqAfeDd8V8mXslKQY7g97M6zXewSuftfpQkewSOmHfT8s3OINRHV3iqDEW4z8f0j~8q5D9Q7iEhCOVXWWiklU9PYEpJOrXNpTib75MigEcus2~vkeBGPNvtWLUxXlbKELRs1lJ4Bi~qr2hxGiRdeGELKk~WBl0qchXBivzZEevHwInxe7Huusa1Ug1QE3CFctUOk2xxDU569K4PKG7siFbZQ4gNZUlUXsZa9w6bFmzwBZHuu7c8gph3ooZQXf3c65Ew99zAjkdd5CxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                    </Center>
                                </div>

                                {/**upload audio*/}
                                <div style={{ display: selectedUploadAudioFiles ? 'block' : 'none' }}>
                                    <label onChange={handleImageChange} htmlFor="formIdAudio">
                                        <input id="formIdAudio" hidden type="file" accept="audio/*" onChange={handleImageChange}></input>
                                        <Center>
                                            <img width='20%' src="https://s3-alpha-sig.figma.com/img/9570/6275/02fe629724c6451bfc58e8b408959b7f?Expires=1652659200&Signature=ersh~djo0M0azAQXkkTt4atepCPDgD7pfkNhGnpDDINizApqLzAFk8SMm-PpkHFaMqzOW-xSqAfeDd8V8mXslKQY7g97M6zXewSuftfpQkewSOmHfT8s3OINRHV3iqDEW4z8f0j~8q5D9Q7iEhCOVXWWiklU9PYEpJOrXNpTib75MigEcus2~vkeBGPNvtWLUxXlbKELRs1lJ4Bi~qr2hxGiRdeGELKk~WBl0qchXBivzZEevHwInxe7Huusa1Ug1QE3CFctUOk2xxDU569K4PKG7siFbZQ4gNZUlUXsZa9w6bFmzwBZHuu7c8gph3ooZQXf3c65Ew99zAjkdd5CxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                        </Center>
                                        <Center>
                                            <h1>Click to upload audio</h1>
                                        </Center>
                                    </label>
                                </div>

                                {/**record audio */}
                                <div style={{ display: selectedUploadAudioMic ? 'block' : 'none' }}>
                                    <Center>
                                        <div>
                                            <Center>
                                                <p>recording status: {status}</p>
                                            </Center>
                                            <audio style={{ display: selectedSubmitRecordAudio ? 'block' : 'none' }} src={mediaBlobUrl || undefined} controls></audio>

                                            <Center>
                                                <Button style={{ display: selectedStartRecordAudio ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} backgroundColor='#CE7E5C' borderRadius='200px' _hover={{ bg: '#CE7E5C' }}
                                                    color='#FFFFFF' borderColor='#CE7E5C' onClick={() => { startRecording(); startRecordAudio() }}>Start Recording</Button>
                                            </Center>

                                            <Center>
                                                <Button style={{ display: selectedStopRecordAudio ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} backgroundColor='#CE7E5C' borderRadius='200px' _hover={{ bg: '#CE7E5C' }}
                                                    color='#FFFFFF' borderColor='#CE7E5C' onClick={() => { stopRecording(); stopRecordAudio(); }}>Stop Recording</Button>
                                            </Center>

                                            <Center>
                                                <Button style={{ display: selectedSubmitRecordAudio ? 'block' : 'none' }} _focus={{ boxShadow: "none" }} backgroundColor='#CE7E5C' borderRadius='200px' _hover={{ bg: '#CE7E5C' }}
                                                    color='#FFFFFF' borderColor='#CE7E5C' onClick={() => { recordAudio(); submitRecordAudio() }}>Submit</Button>
                                            </Center>

                                        </div>
                                    </Center>
                                </div>
                            </Box>

                        </div>
                    </Box>
                </SimpleGrid>

            </BrowserView>



        </>
    )
}


export default Feedback