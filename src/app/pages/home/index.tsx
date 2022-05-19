import React, { useEffect, useState } from 'react';
import { BrowserView } from 'react-device-detect';
import { Box, Spinner, Flex, Heading, IconButton, Select, Center, Text } from '@chakra-ui/react'
import { Icon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { BsPinAngleFill } from 'react-icons/bs';
import useTranslation from "../../../i18n/use-translation";
import { isMobile } from 'react-device-detect';
import Map from './map';
import "./style.scss";
import { searchWaypoints, mapBeacons } from '../../services/beacons';
import { Beacon, Path } from '../../../types/beacons';

function Home() {

    const { t } = useTranslation()
    const [origin, setOrigin] = useState<number | undefined>(undefined)
    const [destination, setDestination] = useState<number | undefined>(undefined)
    const [isLevelMenuOpen, setIsLevelsMenuOpen] = useState<true | false>(false)
    const [activeLevel, setActiveLevel] = useState('1')
    const [loading, setLoading] = useState<boolean>(false)
    const [beacons, setBeacons] = useState<Beacon[]>([])
    const [path, setPath] = useState<Path[]>([])
    const [toolTipActive, setToolTipActive] = useState<boolean>(false)
    const [toogleBeacons, setToogleBeacons] = useState(true)

    useEffect(() => {
        setLoading(true)

        const fetchBeacons = async () => {
            await mapBeacons(setBeacons)
        }

        fetchBeacons()
            .catch(console.error)

        setLoading(false)
    }, [toogleBeacons])

    const handleToogleBeacons = () => {
        setToogleBeacons(!toogleBeacons)
    }

    const renderCircle = (size: string, marginTop?: string, marginLeft?: string) => (
        <Box w={size} h={size} rounded='10' bg='white' ml={marginLeft} mt={marginTop}></Box>
    )

    const handleSelectOrigin = (e: any) => {
        setOrigin(e.target.value)
        searchPath({ origin: e.target.value, destination: destination })
    }

    const handleSelectDestination = (e: any) => {
        setDestination(e.target.value)
        searchPath({ origin: origin, destination: e.target.value })
    }

    const searchPath = async ({ origin, destination }) => {
        if (origin === undefined || destination === undefined || origin === destination) return
        // const data = await searchWaypoints(origin, destination)

        const data = [
            {
                idPath: 1,
                x: "1",
                y: "2",
                z: "2"
            },
            {
                idPath: 1,
                x: "111",
                y: "112",
                z: "2"
            },
            {
                idPath: 1,
                x: "150",
                y: "150",
                z: "2"
            },
            {
                idPath: 1,
                x: "200",
                y: "200",
                z: "4"
            },
            {
                idPath: 1,
                x: "250",
                y: "250",
                z: "5"
            }
        ]

        setPath(data)
    }

    const handleAddBeaconClick = (e: any) => {
        setToolTipActive(!toolTipActive)
    }

    const handleChangeLevel = (level: string) => {
        setActiveLevel(level)
        setIsLevelsMenuOpen(false)
    }

    return (
        <>
            {loading ? (
                <Center>
                    <Box height={"300px"}></Box>
                    <Text fontFamily={"Montserrat-SemiBold"}>
                        {t("loading_data")}
                    </Text>
                    <Box width={"75px"}></Box>

                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Center>

            ) : (
                <>
                    <Map
                        path={path}
                        activeLevel={activeLevel}
                        handleAddBeaconClick={handleAddBeaconClick}
                        toolTipActive={toolTipActive}
                        handleToogleBeacons={handleToogleBeacons} />

                    <Box
                        padding='1rem'
                        bg='isepBrick.500'
                        rounded='14'
                        margin={isMobile ? '1rem' : '2rem'}
                        position={isMobile ? 'static' : 'fixed'}
                        bottom='0'
                    >
                        <Heading size='md' color='white'>
                            {t("where_to_go")}
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
                                        beacons.map((e, i) => (
                                            <>
                                                {i === 0 && <option value={'self'}>{t("my_location")}</option>}
                                                <option key={`o-${e.beaconId}`} value={e.beaconName}>{e.beaconName}</option>
                                            </>
                                        ))
                                    }
                                </Select>
                                <Select variant='filled' placeholder=' ' isFullWidth _focus={{ backgroundColor: 'white' }} mt='1rem' onChange={handleSelectDestination} >
                                    {
                                        beacons.map(e => (
                                            <>
                                                <option key={`o-${e.beaconId}`} value={e.beaconName}>{e.beaconName}</option>
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

                        <button className={`floorButton ${isLevelMenuOpen ? 'show' : ''} ${activeLevel === '1' ? 'active' : ''} `}
                            data-floor="1"
                            onClick={() => {
                                handleChangeLevel('1')
                            }}
                        >1</button>

                        <button className={`floorButton ${isLevelMenuOpen ? 'show' : ''} ${activeLevel === '2' ? 'active' : ''} `}
                            data-floor="2"
                            onClick={() => {
                                handleChangeLevel('2')
                            }}
                        >2</button>

                        <button className={`floorButton ${isLevelMenuOpen ? 'show' : ''} ${activeLevel === '3' ? 'active' : ''} `}
                            data-floor="3"
                            onClick={() => {
                                handleChangeLevel('3')
                            }}
                        >3</button>

                        <button className={`floorButton ${isLevelMenuOpen ? 'show' : ''} ${activeLevel === '4' ? 'active' : ''} `}
                            data-floor="4"
                            onClick={() => {
                                handleChangeLevel('4')
                            }}
                        >4</button>

                        <button className={`floorButton ${isLevelMenuOpen ? 'show' : ''} ${activeLevel === '5' ? 'active' : ''} `}
                            data-floor="5"
                            onClick={() => {
                                handleChangeLevel('5')
                            }}
                        >5</button>

                    </Flex>
                </>
            )}
        </>
    )
}

export default Home;