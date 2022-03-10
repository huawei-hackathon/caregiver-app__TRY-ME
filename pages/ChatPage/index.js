import React, { useState, useEffect, useRef } from 'react'
import { Center, Box, Button, Heading, Icon, Text, HStack, ScrollView, Spinner } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import { connect, useStore } from 'react-redux';

import { dateToTime, dateToStr, getConvo } from '../../utils';

import RecordModal from './components/RecordModal';
import TextModal from './components/TextModal';

const ChatStack = createNativeStackNavigator()

const ChatBubble = ({ chatText, date, isMe, audioFile, soundObject }) => {
    const [audioLoading, setAudioLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    const playAudio = async () => {
        try {
            if (!isPlaying) {
                setAudioLoading(true)
                await FileSystem.downloadAsync(
                    audioFile,
                    FileSystem.documentDirectory + 'audio.wav'
                )

                await soundObject.loadAsync({
                    uri: FileSystem.documentDirectory + 'audio.wav',
                })

                setIsPlaying(true)
                soundObject.playAsync()
                    .then((res) => {
                        const time = res.durationMillis
                        // Cheater way to stop audio
                        setTimeout(() => {
                            setIsPlaying(false)
                            soundObject.unloadAsync()

                        }, time)
                    })
            } else {
                console.log('currently playing')
                soundObject.pauseAsync()
                setIsPlaying(false)
                soundObject.unloadAsync()
            }
            setAudioLoading(false)
        }
        catch (e) {
            console.log(e)
            setAudioLoading(false)
        }
    }

    return (
        <Box
            bg={isMe ? 'green.200' : 'gray.200'}
            alignSelf={isMe ? 'flex-end' : 'flex-start'}
            w="140px"
            px={2}
            pt={2}
            pb={6}
            borderRadius={10}
            my={3}
            mx={2}
        >
            <Text>{chatText}</Text>
            <Text
                position="absolute"
                bottom='1'
                left={2}
                fontSize='2xs'
                color='gray.500'
            >
                {date}
            </Text>

            {audioLoading &&
                <Spinner
                    position="absolute"
                    bottom={0}
                    right='1' />}

            {audioFile &&
                <Icon
                    as={Ionicons}
                    name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
                    size="sm"
                    position="absolute"
                    right='1'
                    bottom={0}
                    onPress={async () => {
                        await playAudio()
                    }} />
            }

        </Box>
    )
}

const ChatReplies = ({ chats, soundObject }) => {
    const store = useStore()
    const userId = store.getState().userInfo.elderlyId
    let prevDate = ''

    return (
        <Box w="400px">
            {chats ?
                chats.map(({ author, timestamp, audioLink, text }) => {
                    let showDate = false
                    if (prevDate != timestamp.slice(0, 10)) {
                        showDate = true
                        prevDate = timestamp.slice(0, 10)
                    }
                    return (
                        <>
                            {showDate &&
                                <Center>
                                    <Box
                                        borderRadius={10}
                                        w='120px'
                                        textAlign='center'
                                        bg='gray.200'
                                        mt={4}
                                    >
                                        <Text
                                            fontSize='xs'
                                            textAlign='center'
                                        >
                                            {timestamp.slice(0, 10)}
                                        </Text>
                                    </Box>
                                </Center>
                            }

                            <ChatBubble
                                date={timestamp.slice(12)}
                                audioFile={audioLink}
                                chatText={text}
                                isMe={author === 'caregiver'}
                                soundObject={soundObject} />
                        </>
                    )
                }) :
                <Text
                    textAlign='center'
                    fontSize='sm'
                    color='gray.500'
                    my={4}>No messages. Start your conversation now!</Text>
            }
        </Box>
    )
}

let ChatComponent = ({ chats, userId, updateChat }) => {

    const [recordModalVisible, setRecordModalVisible] = useState(false)
    const [textModalVisible, setTextModalVisible] = useState(false)
    const [soundObject, setSoundObject] = useState(new Audio.Sound())

    const scrollViewRef = useRef();

    useEffect(() => {
        setInterval(async () => {
            let res = await getConvo(userId)
            if (res.success) {
                updateChat(res.data)
            }
            else {
                console.log(res.data)
            }
        }, 1000)
    }, [])

    return (
        <Box>
            {recordModalVisible &&
                <RecordModal setRecordModalVisible={setRecordModalVisible} />}

            {textModalVisible &&
                <TextModal setTextModalVisible={setTextModalVisible} />
            }


            <Center mb={3} position="absolute" zIndex={-1} w='100%'
                opacity={(recordModalVisible || textModalVisible) ? 30 : 100}>

                <Center>
                    <ScrollView w='100%' h='550px'
                        bg="gray.300"
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    >
                        {
                            chats &&
                            <ChatReplies chats={chats} soundObject={soundObject} />
                        }

                    </ScrollView>
                    <Box
                        flexDir='row'
                        my={3}
                        justifyContent='space-between'
                        w='300px'
                    >
                        <Button w="130px" h="60px" colorScheme='primary'
                            leftIcon={<Icon as={Ionicons} name="megaphone-outline" size="sm" />}
                            onPress={() => { setRecordModalVisible(true) }}
                        >
                            Speech
                        </Button>

                        <Button w="130px" h="60px" colorScheme='primary'
                            leftIcon={<Icon as={Ionicons} name="phone-portrait-outline" size="sm" />}
                            onPress={() => { setTextModalVisible(true) }}
                        >
                            Text
                        </Button>
                    </Box>
                </Center>

            </Center>

        </Box >
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userInfo.elderlyId,
        chats: state.chat
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateChat: (pl) => dispatch({ type: 'update/chat', payload: { data: pl } })
    }
}

ChatComponent = connect(mapStateToProps, mapDispatchToProps)(ChatComponent)

export default function ChatPage() {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name="Chat" component={ChatComponent} />
        </ChatStack.Navigator>
    )
}