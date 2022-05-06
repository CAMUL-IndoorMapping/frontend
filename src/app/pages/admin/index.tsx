import React, { ReactNode } from 'react';
import { Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Image, Center, Button, ButtonGroup, Heading, Stack, Square, Circle, Flex } from '@chakra-ui/react'
import ReactAudioPlayer from 'react-audio-player';
import {BrowserView, MobileView} from 'react-device-detect';
import { SimpleGrid } from '@chakra-ui/react'

    interface Feedback {
        date: string,
        feedback: string,
        name: string,
        type: string,
      }
      
      const array1: Feedback[] = [
        {date: "qui. 31/03 19:32", feedback: "Não tenho nada a dizer a aplicação é incrivel", name: "João das Neves", type: "text"},
        {date: "qui. 31/03 20:02", feedback: "Os devs são muito fofinhos", name: "John", type: "text"},
        {date: "qui. 31/03 23:20", feedback: "https://www.w3schools.com/images/w3schools_green.jpg", name: "Wanda Maximoff", type: "image"},
        {date: "qui. 31/03 23:45", feedback: "my_audio_file.ogg", name: "You don't wanna know", type: "audio"},
      ];

      export class AdminFeedback extends React.Component<{},{}>{
        
        private getFeedback(feedback: string, type:string):ReactNode  {
            if(type === "image"){
                return (<Image src={feedback} alt=""/>)
            }
            else if(type==="audio"){
                return <ReactAudioPlayer
                src= {feedback}
                autoPlay
                controls
              />
            }
            else{
                return <Text fontSize='md'>
                {feedback}
            </Text>
            }
        }

        private getIcon(type:string):ReactNode  {
            if(type === "image"){
                return (<img src="https://s3-alpha-sig.figma.com/img/2f03/7f76/ea4b824d46259756ee696c6311a3e9c2?Expires=1652659200&Signature=M78iAFpzCO4GFcvhqolOfU9obPGhP2mtJZxVIwPgAleeHuQz1Ka7pCT92McBPr-yxkhFupd~RjHYjtStFlsQotJyLD9WWVDJUFBxekzDDV9YTl70vsbtB8YdOxI3xGs-Ui0cKqCbtNECDtvgHd6AoPGSmULb-WsWE669lnH8ZCba7CSRqh3qYCHCMxaf6qcAPhg07jDXGKVWzkTkKCW6qYRxG69060oFzu-R4a3u9K4SQvqa2AEU1NlWT2Mr4d7ImbagetBQBQSTQdoYhX4gatI7EZMqix3qt5UZkX3048OgYsU0OO0oMceGqdiHjWAYkvnF~ztPUTzdbX7xQp52lQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="uploadImage" width="30" height="30"/>);
            }
            else if(type==="audio"){
                return (<img src="https://s3-alpha-sig.figma.com/img/9570/6275/02fe629724c6451bfc58e8b408959b7f?Expires=1652659200&Signature=ersh~djo0M0azAQXkkTt4atepCPDgD7pfkNhGnpDDINizApqLzAFk8SMm-PpkHFaMqzOW-xSqAfeDd8V8mXslKQY7g97M6zXewSuftfpQkewSOmHfT8s3OINRHV3iqDEW4z8f0j~8q5D9Q7iEhCOVXWWiklU9PYEpJOrXNpTib75MigEcus2~vkeBGPNvtWLUxXlbKELRs1lJ4Bi~qr2hxGiRdeGELKk~WBl0qchXBivzZEevHwInxe7Huusa1Ug1QE3CFctUOk2xxDU569K4PKG7siFbZQ4gNZUlUXsZa9w6bFmzwBZHuu7c8gph3ooZQXf3c65Ew99zAjkdd5CxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="uploadAudio" width="20" height="20"/>);            
            }
            else{
                return (<img src="https://s3-alpha-sig.figma.com/img/5c37/7770/eced2bac8d7213431dc4807a6e524329?Expires=1652659200&Signature=UfMtDJqYCdsp1JugqHNKOyyH35cL7EbQ05e8uwmf-k4K3ShQwqXn676qqLZs7ma0xQUg7RZiz2-vu04xKFca8btN8AhHxl5U83dd3zYjyOtOl2rIzQKnBmfPFtCodlUlyBUwHb2ul7Qniji08dJts7Sh81p7JSWWtP3CeZMiFl9kg~Wb8nXhWhYg9dJyaUZUd0YuAhSwt8~DYH02fQd9JUbaB84neQplwy0LT9zIwTBHaBR5dyawTeM03J5MG3y-uAz1-p1bhpaByil2I35RlfgjpoC72HttNyajOMb3amfvr2AIUqrnu9zjkaraUHkHtGrzoZMMc40PMBskJoMjIw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="uploadText" width="30" height="30"/>);            
            }
        }

        render(){
            return(
                <>
                {array1.map(({ date, feedback, name, type }) => (
                 <MobileView>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                            <AccordionButton bg='isepBrick.300' w='100%' p={4} color='isepGrey.500'>
                            {this.getIcon(type)}
                                <Box flex='1' textAlign='left' textColor='#000000'>
                                    {date}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {this.getFeedback(feedback, type)}
                                <Text fontSize='xs' as='i'>
                                    {name}
                                </Text>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </MobileView>
                ))}

                {array1.map(({ date, feedback, name, type }) => (
                <BrowserView>
                <SimpleGrid columns={[1, 2]}>
                <Box>
                    <Center>
                        <ButtonGroup marginTop='1%' marginBottom='0.5%'>
                            <Button width='500px' height='67px' _hover={{ bg: '#CE7E5C' }} variant='outline' > 
                                <Box margin={'2'}>
                                    {this.getIcon(type)}
                                </Box> 
                                <Text> 
                                    {date}
                                </Text>
                            </Button>
                        </ButtonGroup>
                    </Center>
                </Box>
                <Box marginBottom='1%'>
                   wurt
                </Box>
                </SimpleGrid>
                {/* Write the code for browser components here*/}
                    
                </BrowserView>
                ))}
                </>
            )
        }
      }