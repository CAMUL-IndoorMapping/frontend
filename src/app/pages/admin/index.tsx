import React, { ReactNode } from 'react';
import { Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Image } from '@chakra-ui/react'
import ReactAudioPlayer from 'react-audio-player';

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
                return (<img src="../../../../public/uploadImage_darker.png" alt="uploadImage" width="30" height="30"/>);
            }
            else if(type==="audio"){
                return (<img src="../../../../public/uploadAudio_darker.png" alt="uploadAudio" width="30" height="30"/>);            
            }
            else{
                return (<img src="../../../../public/uploadText_darker.png" alt="uploadText" width="30" height="30"/>);            
            }
        }

        render(){
            return(
                <>
                {array1.map(({ date, feedback, name, type }) => (
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
                ))}
                </>
            )
        }
      }