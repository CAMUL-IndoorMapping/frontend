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


    //const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

    const webRef: any = React.createRef();
    const [img, setImage] = useState(null);
    const showImage = () => {
        setImage(webRef.current.getScreenshot());
        console.log(webRef.current.getScreenshot());
    }


    const handleImageChange: any = async (event: any) => {
        const file = event.target.files[0];
        console.log(file);
        const base64 = await convertBase64(file);
        console.log(base64);
    }

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
        setImage(null);
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

            <MobileView>
                <SimpleGrid columns={[1]}>
                    <Box>
                        <Center>
                            <ButtonGroup marginTop='20%' marginBottom='10%'>
                                <Button width='67px' height='67px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadFeedbackText}>
                                    <img src="https://s3-alpha-sig.figma.com/img/5c37/7770/eced2bac8d7213431dc4807a6e524329?Expires=1652659200&Signature=UfMtDJqYCdsp1JugqHNKOyyH35cL7EbQ05e8uwmf-k4K3ShQwqXn676qqLZs7ma0xQUg7RZiz2-vu04xKFca8btN8AhHxl5U83dd3zYjyOtOl2rIzQKnBmfPFtCodlUlyBUwHb2ul7Qniji08dJts7Sh81p7JSWWtP3CeZMiFl9kg~Wb8nXhWhYg9dJyaUZUd0YuAhSwt8~DYH02fQd9JUbaB84neQplwy0LT9zIwTBHaBR5dyawTeM03J5MG3y-uAz1-p1bhpaByil2I35RlfgjpoC72HttNyajOMb3amfvr2AIUqrnu9zjkaraUHkHtGrzoZMMc40PMBskJoMjIw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" /></Button>

                                <Button width='67px' height='67px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadFile}>
                                    <img src='https://s3-alpha-sig.figma.com/img/2f03/7f76/ea4b824d46259756ee696c6311a3e9c2?Expires=1652659200&Signature=M78iAFpzCO4GFcvhqolOfU9obPGhP2mtJZxVIwPgAleeHuQz1Ka7pCT92McBPr-yxkhFupd~RjHYjtStFlsQotJyLD9WWVDJUFBxekzDDV9YTl70vsbtB8YdOxI3xGs-Ui0cKqCbtNECDtvgHd6AoPGSmULb-WsWE669lnH8ZCba7CSRqh3qYCHCMxaf6qcAPhg07jDXGKVWzkTkKCW6qYRxG69060oFzu-R4a3u9K4SQvqa2AEU1NlWT2Mr4d7ImbagetBQBQSTQdoYhX4gatI7EZMqix3qt5UZkX3048OgYsU0OO0oMceGqdiHjWAYkvnF~ztPUTzdbX7xQp52lQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></Button>

                                <Button width='67px' height='67px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadAudio}>
                                    <img src='https://s3-alpha-sig.figma.com/img/9570/6275/02fe629724c6451bfc58e8b408959b7f?Expires=1652659200&Signature=ersh~djo0M0azAQXkkTt4atepCPDgD7pfkNhGnpDDINizApqLzAFk8SMm-PpkHFaMqzOW-xSqAfeDd8V8mXslKQY7g97M6zXewSuftfpQkewSOmHfT8s3OINRHV3iqDEW4z8f0j~8q5D9Q7iEhCOVXWWiklU9PYEpJOrXNpTib75MigEcus2~vkeBGPNvtWLUxXlbKELRs1lJ4Bi~qr2hxGiRdeGELKk~WBl0qchXBivzZEevHwInxe7Huusa1Ug1QE3CFctUOk2xxDU569K4PKG7siFbZQ4gNZUlUXsZa9w6bFmzwBZHuu7c8gph3ooZQXf3c65Ew99zAjkdd5CxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></Button>
                            </ButtonGroup>
                        </Center>

                    </Box>

                    <Box marginBottom='15%'>

                        <div style={{ display: selectedUploadFile ? 'block' : 'none' }}>
                            <Center>
                                <Button backgroundColor='#CE7E5C' color='#FFFFFF' borderRadius='200px' _hover={{ bg: '#A2543D' }}
                                    borderColor='#A2543D' width='206px' height='47px' marginBottom='2%' onClick={uploadFileCamera}>Use camera</Button>
                            </Center>
                            <Center>
                                <Button backgroundColor='#CE7E5C' color='#FFFFFF' borderRadius='200px' _hover={{ bg: '#A2543D' }}
                                    borderColor='#A2543D' width='206px' height='47px' onClick={uploadFileGallery}>From gallery</Button>
                            </Center>
                            <div style={{ display: selectedUploadFileCamera ? 'block' : 'none' }}>

                                <div className='camera'>
                                    <Center>
                                        <Webcam ref={webRef}></Webcam>
                                    </Center>
                                    <Center>
                                        <Button colorScheme='blue' onClick={() => {
                                            showImage();
                                        }}>Take a photo</Button>
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
                                        <img src={img || undefined}></img>
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

                            <Textarea borderColor='#A2543D'
                                value={value}
                                onChange={handleInputChange}
                                placeholder='Place your text here...'
                                _placeholder={{ textColor: '#CE7E5C' }}
                                color='#CE7E5C'
                            />
                            <Text textAlign='center'>Your text: {value}</Text>
                        </div>

                        <div style={{ display: selectedUploadAudio ? 'block' : 'none' }}>
                            <Center>
                                <Button backgroundColor='#CE7E5C' color='#FFFFFF' borderRadius='200px' _hover={{ bg: '#A2543D' }}
                                    borderColor='#A2543D' width='206px' height='47px' marginBottom='2%' onClick={uploadAudioMic}>Use mic</Button>
                            </Center>
                            <Center>
                                <Button backgroundColor='#CE7E5C' color='#FFFFFF' borderRadius='200px' _hover={{ bg: '#A2543D' }}
                                    borderColor='#A2543D' width='206px' height='47px' onClick={uploadAudioFiles}>From files</Button>
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
                            <Button backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }} color='#FFFFFF'
                                borderColor='#CE7E5C' height='47px' width='220px' marginBottom='2%'>CONFIRM</Button>
                        </Center>
                        <Center>
                            <Button _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                variant='outline' height='47px' width='220px' marginBottom='2%' onClick={cancelUpload}>CANCEL</Button>
                        </Center>
                        <Center>
                            <Button _hover={{ bg: '#A2543D' }} borderColor='#DA8E71' borderRadius='200px' color='#DA8E71'
                                variant='outline' height='47px' width='220px'>SENT FEEDBACK</Button>
                        </Center>
                    </Box>

                </SimpleGrid>
            </MobileView>


            <BrowserView>

                <SimpleGrid columns={[3]}>
                    <Box marginLeft='100px'>
                        <Center>
                            <ButtonGroup marginTop='20%' marginBottom='10%' spacing='12'>
                                <Button width='93px' height='93px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadFeedbackText}>
                                    <img src="https://s3-alpha-sig.figma.com/img/5c37/7770/eced2bac8d7213431dc4807a6e524329?Expires=1652659200&Signature=UfMtDJqYCdsp1JugqHNKOyyH35cL7EbQ05e8uwmf-k4K3ShQwqXn676qqLZs7ma0xQUg7RZiz2-vu04xKFca8btN8AhHxl5U83dd3zYjyOtOl2rIzQKnBmfPFtCodlUlyBUwHb2ul7Qniji08dJts7Sh81p7JSWWtP3CeZMiFl9kg~Wb8nXhWhYg9dJyaUZUd0YuAhSwt8~DYH02fQd9JUbaB84neQplwy0LT9zIwTBHaBR5dyawTeM03J5MG3y-uAz1-p1bhpaByil2I35RlfgjpoC72HttNyajOMb3amfvr2AIUqrnu9zjkaraUHkHtGrzoZMMc40PMBskJoMjIw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" /></Button>

                                <Button width='93px' height='93px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadFile}>
                                    <img src='https://s3-alpha-sig.figma.com/img/2f03/7f76/ea4b824d46259756ee696c6311a3e9c2?Expires=1652659200&Signature=M78iAFpzCO4GFcvhqolOfU9obPGhP2mtJZxVIwPgAleeHuQz1Ka7pCT92McBPr-yxkhFupd~RjHYjtStFlsQotJyLD9WWVDJUFBxekzDDV9YTl70vsbtB8YdOxI3xGs-Ui0cKqCbtNECDtvgHd6AoPGSmULb-WsWE669lnH8ZCba7CSRqh3qYCHCMxaf6qcAPhg07jDXGKVWzkTkKCW6qYRxG69060oFzu-R4a3u9K4SQvqa2AEU1NlWT2Mr4d7ImbagetBQBQSTQdoYhX4gatI7EZMqix3qt5UZkX3048OgYsU0OO0oMceGqdiHjWAYkvnF~ztPUTzdbX7xQp52lQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></Button>

                                <Button width='93px' height='93px' _hover={{ bg: '#CE7E5C' }} borderColor='#CE7E5C'
                                    borderRadius='62px' variant='outline' onClick={uploadAudio}>
                                    <img src='https://s3-alpha-sig.figma.com/img/9570/6275/02fe629724c6451bfc58e8b408959b7f?Expires=1652659200&Signature=ersh~djo0M0azAQXkkTt4atepCPDgD7pfkNhGnpDDINizApqLzAFk8SMm-PpkHFaMqzOW-xSqAfeDd8V8mXslKQY7g97M6zXewSuftfpQkewSOmHfT8s3OINRHV3iqDEW4z8f0j~8q5D9Q7iEhCOVXWWiklU9PYEpJOrXNpTib75MigEcus2~vkeBGPNvtWLUxXlbKELRs1lJ4Bi~qr2hxGiRdeGELKk~WBl0qchXBivzZEevHwInxe7Huusa1Ug1QE3CFctUOk2xxDU569K4PKG7siFbZQ4gNZUlUXsZa9w6bFmzwBZHuu7c8gph3ooZQXf3c65Ew99zAjkdd5CxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></Button>
                            </ButtonGroup>
                        </Center>

                        <Center>
                            <Button backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }} color='#FFFFFF'
                                borderColor='#CE7E5C' height='47px' width='529px' marginBottom='5%'>CONFIRM</Button>
                        </Center>
                        <Center>
                            <Button _hover={{ bg: '#DA8E71' }} borderColor='#A2543D' borderRadius='200px' color='#A2543D'
                                variant='outline' height='47px' width='529px' marginBottom='10%' onClick={cancelUpload}>CANCEL</Button>
                        </Center>
                        <Center>
                            <Button _hover={{ bg: '#A2543D' }} borderColor='#DA8E71' borderRadius='200px' color='#DA8E71'
                                variant='outline' height='47px' width='529px'>SENT FEEDBACK</Button>
                        </Center>
                    </Box>
                    <Box marginLeft='100px' backgroundColor='#000000' width='0px' height='550px' border='1px'></Box>

                    <Box marginLeft='-400px'>

                        <div style={{ display: selectedUploadFile ? 'block' : 'none' }}>

                            <Box marginLeft='150px' marginTop='50px' width='600px' height='400px' backgroundColor='#FCE5D7' p={4} color='#575757'>
                                <label onChange={handleImageChange} htmlFor="formId">
                                    <input name="" type="file" accept="image/*,video/*" id="formId" hidden />
                                    <Center marginTop='80px'>
                                        <img width='30%' src="https://s3-alpha-sig.figma.com/img/e61d/d2cb/0a63e30674435607b06b4d6b466384f5?Expires=1652659200&Signature=URLDx3p2s8~-sw~0ToQSzVYZQntaSlYpFwCKnw-Wb94HVTr448gEWOEPMkrMPNb0tnTsMiiCKTusgmmPnk5EJr3lK66zGOMbgUxqPvJdx6i0Tv6umys4UTeMwq~MAdwiPNTce9HQ5rBRWOWgVE3EmDgiAhh-dfM6U73VfeUShGkeU5yNv-yifAPBU5r~mgx2dh3YoMIQ4iKfS--pzUFW4BE6YMdNiPoDfMwMpJrYdaFPQpmGK0lsJPdEn5nxnzVLQkn-JrH9uyGi0FXsL9cxCH6Ofcy5BDEKtL90dk3jnEzc3YXvlXKJaQ2M8Z40yW7HaF5fmp987hV7SpJZjSsipw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                    </Center>
                                    <Center>
                                        <h1>Click to upload a photo/video</h1>
                                    </Center>
                                </label>
                            </Box>
                        </div>

                        <div style={{ display: selectedUploadFeedbackTex ? 'inline' : 'none' }}>


                                            

                            <Center>
                                <img width='40%' src="https://s3-alpha-sig.figma.com/img/20f5/75ec/062d4e940ac8d58d5b5ae7cafc43c573?Expires=1652659200&Signature=B3qLW-qjUk76hJpW48ScI-gyYVUDNnmkj~ACgTDugE5zYqTpCSSpXtBe-OTinnDuH1CjJ85d5LtdEs0n0SgnTslHrBnLvckLtOailTput0HPLHATV62H5hCWYYWwEWzqiUAzSZPBObkxB3fO9kjlcWQE2cLWsjKy47a6EkgvkOKcIUD0NQRihZ7Q9lelLR49QX825B1Z7LF1upw6biUnvXoU1IDFCMGfC5Bh24rM17PCKNaPTaumydlLkT8-HaiXmzhgyl7cEcT5ayHOdM8UERfyMx7McalISpZs-yREtK9pL51aE03CuSmzcSER9YCF8thtFriAlyc~Ecq~AVHdBA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                            </Center>
                            <Center>
                                <Textarea width='70%' borderColor='#A2543D'
                                    value={value}
                                    onChange={handleInputChange}
                                    placeholder='Place your text here...'
                                    _placeholder={{ textColor: '#CE7E5C' }}
                                    color='#CE7E5C'
                                />
                            </Center>
                            <Center>
                                <Text color='#CE7E5C' width='70%' textAlign='center'>Your text: {value}</Text>
                            </Center>
                        </div>

                        <div style={{ display: selectedUploadAudio ? 'block' : 'none' }}>
                            <Box marginLeft='150px' marginTop='50px' width='600px' height='100%' backgroundColor='#FCE5D7' p={4} color='#575757'>
                                <Center>
                                    <Button marginTop='2%' backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }}
                                        color='#FFFFFF' borderColor='#CE7E5C' width='206px' height='47px' marginBottom='2%' onClick={uploadAudioMic}>Use mic</Button>
                                </Center>
                                <Center>
                                    <Button backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }} color='#FFFFFF'
                                        borderColor='#CE7E5C' width='206px' height='47px' marginBottom='2%' onClick={uploadAudioFiles}>From files</Button>
                                </Center>

                                <div style={{ display: selectedUploadAudioFiles ? 'none' : 'block' }}>
                                    <Center marginBottom='5%'>
                                        <img width='20%' src="https://s3-alpha-sig.figma.com/img/9570/6275/02fe629724c6451bfc58e8b408959b7f?Expires=1652659200&Signature=ersh~djo0M0azAQXkkTt4atepCPDgD7pfkNhGnpDDINizApqLzAFk8SMm-PpkHFaMqzOW-xSqAfeDd8V8mXslKQY7g97M6zXewSuftfpQkewSOmHfT8s3OINRHV3iqDEW4z8f0j~8q5D9Q7iEhCOVXWWiklU9PYEpJOrXNpTib75MigEcus2~vkeBGPNvtWLUxXlbKELRs1lJ4Bi~qr2hxGiRdeGELKk~WBl0qchXBivzZEevHwInxe7Huusa1Ug1QE3CFctUOk2xxDU569K4PKG7siFbZQ4gNZUlUXsZa9w6bFmzwBZHuu7c8gph3ooZQXf3c65Ew99zAjkdd5CxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                    </Center>
                                </div>

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

                                <div style={{ display: selectedUploadAudioMic ? 'block' : 'none' }}>
                                    <Center>
                                        <ReactMediaRecorder
                                            video
                                            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                                                <div>
                                                    <Center>
                                                        <p>recording status: {status}</p>
                                                    </Center>
                                                    <audio src={mediaBlobUrl || undefined} controls autoPlay loop></audio>
                                                    <Button backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }}
                                                        color='#FFFFFF' borderColor='#CE7E5C' onClick={startRecording}>Start Recording</Button>
                                                    <Button backgroundColor='#A2543D' borderRadius='200px' _hover={{ bg: '#CE7E5C' }}
                                                        color='#FFFFFF' borderColor='#CE7E5C' onClick={stopRecording}>Stop Recording</Button>
                                                </div>
                                            )}
                                        />
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


/**
export class Feedback extends React.Component {
   
    
}
 */
