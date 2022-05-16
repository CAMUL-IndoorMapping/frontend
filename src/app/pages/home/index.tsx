import React, { useState } from 'react';
import { Box, Button, Flex, Heading, IconButton, Select } from '@chakra-ui/react'
import { Icon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { BsPinAngleFill } from 'react-icons/bs';
import useTranslation from "../../../i18n/use-translation";
import { isMobile } from 'react-device-detect';
import Map from './map';

const locations = [
    {
        key: 'a',
        name: 'building_a',
    },
    {
        key: 'b',
        name: 'building_b',
    },
    {
        key: 'c',
        name: 'building_c',
    },
    {
        key: 'd',
        name: 'building_d',
    },
]

const levels = ['1', '2', '3', '4']

function Home() {

    const { t } = useTranslation()
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [isLevelMenuOpen, setIsLevelsMenuOpen] = useState<true | false>(false)
    const [activeLevel, setActiveLevel] = useState('1')

    const renderCircle = (size: string, marginTop?: string, marginLeft?: string) => (
        <Box w={size} h={size} rounded='10' bg='white' ml={marginLeft} mt={marginTop}></Box>
    )

    const handleSelectOrigin = (e: any) => {
        console.log(e.target.value)
        setOrigin(e.target.value)
    }

    const handleSelectDestination = (e: any) => {
        console.log(e.target.value)
        setDestination(e.target.value)
    }

    const handleAddBeaconClick = (e: any) => {
        console.log('origin', origin)
        console.log('destination', destination)
        console.log('isLevelMenuOpen', isLevelMenuOpen)
        console.log('activeLevel', activeLevel)
    }

    const handleChangeLevel = (e: any, level: string) => {
        setActiveLevel(level)
        setIsLevelsMenuOpen(false)
    }

    return (
        <>
            <Box position='fixed' zIndex='-1'>
                <Map />
            </Box>


            <Box
                padding='1rem'
                bg='isepBrick.500'
                rounded='14'
                margin={isMobile ? '1rem' : '2rem'}
                position={isMobile ? 'static' : 'fixed'}
                bottom='0'
            >
                <Heading size='md' color='white'>
                    {("where_to_go")}
                </Heading>

                <Flex mt='1rem'>

                    <Flex direction='column' w='2rem'>
                        {renderCircle("1rem", ".4rem")}
                        {renderCircle(".3rem", ".4rem", ".3rem")}
                        {renderCircle(".3rem", ".4rem", ".3rem")}
                        {renderCircle(".3rem", ".4rem", ".3rem")}
                        {renderCircle(".3rem", ".4rem", ".3rem")}
                        {renderCircle("1rem", ".4rem")}
                    </Flex>

                    <Flex direction='column' w={{ base: '100%', md: '20rem' }}>
                        <Select variant='filled' placeholder=' ' isFullWidth _focus={{ backgroundColor: 'white' }} onChange={handleSelectOrigin}>
                            {
                                locations.map((e, i) => (
                                    <>
                                        {i === 0 && <option value={'self'}>{("my_location")}</option>}
                                        <option key={`o-${e.key}`} value={e.key}>{`${("building")} ${e.key.toUpperCase()}`}</option>
                                    </>
                                ))
                            }
                        </Select>
                        <Select variant='filled' placeholder=' ' isFullWidth _focus={{ backgroundColor: 'white' }} mt='1rem' onChange={handleSelectDestination} >
                            {
                                locations.map(e => (
                                    <>
                                        <option key={`d-${e.key}`} value={e.key}>{`${("building")} ${e.key.toUpperCase()}`}</option>
                                    </>
                                ))
                            }
                        </Select>
                    </Flex>
                </Flex>
            </Box>

            <IconButton
                aria-label='Add Beacon'
                color='white'
                bg='isepBrick.500'
                _hover={{ backgroundColor: 'isepBrick.400' }}
                _active={{ backgroundColor: 'isepBrick.300' }}
                _focus={{ boxShadow: 'none' }}
                size='lg'
                rounded='100'
                position='fixed'
                bottom={isMobile ? 'none' : '0'}
                right='0'
                margin={isMobile ? '1rem' : '2rem'}
                marginTop='0rem'
                icon={<Icon as={BsPinAngleFill} />}
                onClick={handleAddBeaconClick}
            />


            <Flex
                direction={isMobile ? 'column' : 'column-reverse'}
                ml={isMobile ? '1rem' : '2rem'}
                mt={isMobile ? '67px' : '0px'}
                position='fixed'
                top={isMobile ? '133px' : 'none'}
                bottom={isMobile ? 'none' : '220px'}
            >

                <IconButton
                    aria-label='Change Level'
                    color='white'
                    bg='isepBrick.500'
                    _hover={{ backgroundColor: 'isepBrick.400' }}
                    _active={{ backgroundColor: 'isepBrick.300' }}
                    _focus={{ boxShadow: 'none' }}
                    rounded='100'
                    w='48px'
                    h='48px'
                    mt={isMobile ? '0' : '.3rem'}
                    icon={isLevelMenuOpen ?
                        (isMobile ? <ChevronDownIcon /> : <ChevronUpIcon />)
                        : <ChevronRightIcon />}
                    onClick={() => setIsLevelsMenuOpen(!isLevelMenuOpen)}
                />

                {isLevelMenuOpen &&
                    levels.map(level => (
                        <Button
                            w='48px'
                            h='48px'
                            rounded='100'
                            mt='.3rem'
                            bg={level === activeLevel ? 'isepBrick.300' : 'isepBrick.400'}
                            onClick={(e) => { handleChangeLevel(e, level) }}
                            _focus={{ boxShadow: 'none' }}
                            _hover={{ backgroundColor: 'isepBrick.300' }}
                        >
                            {level}
                        </Button>
                    ))}
            </Flex>

        </>
    )
}

export default Home