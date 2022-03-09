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

const ChatBubble = ({ chatText, date, isMe, audioFile }) => {
    const [audioLoading, setAudioLoading] = useState(false)
    const playAudio = async () => {
        try {
            setAudioLoading(true)

            await FileSystem.downloadAsync(
                audioFile,
                FileSystem.documentDirectory + 'audio.wav'
            )

            const soundObject = new Audio.Sound()
            await soundObject.loadAsync({
                uri: FileSystem.documentDirectory + 'audio.wav',
            })
            soundObject.playAsync()

            setAudioLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <Box
            bg={isMe ? 'green.200' : 'gray.200'}
            alignSelf={isMe ? 'flex-end' : 'flex-start'}
            w="140px"
            px={5}
            pt={2}
            pb='5'
            borderRadius={10}
            my={3}
            mx={2}
        >
            <Text>{chatText}</Text>
            <Text
                position="absolute"
                bottom='1'
                right='1'
                fontSize='2xs'
                color='gray.500'
            >
                {dateToTime(date)}
            </Text>

            {audioLoading ?
                <Spinner
                    position="absolute"
                    bottom='20px'
                    right='1' /> :
                <Icon
                    as={Ionicons}
                    name="play-circle-outline"
                    size="sm"
                    position="absolute"
                    bottom='20px'
                    right='1'
                    onPress={async () => {
                        await playAudio()
                    }} />}
        </Box>
    )
}

const ChatReplies = ({ chats }) => {
    const store = useStore()
    const userId = store.getState().userInfo.userId
    let prevDate = ''

    return (
        <Box w="400px">
            {chats ?
                chats.map(({ senderId, date, audioFile, text }) => {
                    if (dateToStr(date).slice(0, -8) !== prevDate) {
                        return (
                            <>
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
                                        >{dateToStr(date).slice(0, -8)}</Text>
                                    </Box>
                                </Center>
                                <ChatBubble date={date} audioFile={audioFile} chatText={text} isMe={userId === senderId} />
                            </>
                        )
                    }
                    prevDate = dateToStr(date).slice(0, -8);
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

    const scrollViewRef = useRef();

    useEffect(() => {
        setInterval(() => {
            getConvo(userId)
                .then(res => {
                    updateChat(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, 1000)
    }, [])

    return (
        <Box>
            {recordModalVisible &&
                <RecordModal setRecordModalVisible={setRecordModalVisible} />}

            {textModalVisible &&
                <TextModal setTextModalVisible={setTextModalVisible} />
            }


            <Center my={3} position="absolute" top={5} zIndex={-1} w='100%'
                opacity={(recordModalVisible || textModalVisible) ? 30 : 100}>

                <Center>
                    <ScrollView w='100%' h='500px' my={3}
                        bg="gray.300"
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    >

                        <ChatReplies chats={chats} />

                    </ScrollView>
                    <Box
                        flexDir='row'
                        my={3}
                        justifyContent='space-between'
                        w='300px'
                    >
                        <Button w="130px" h="60px" colorScheme='amber'
                            leftIcon={<Icon as={Ionicons} name="megaphone-outline" size="sm" />}
                            onPress={() => { setRecordModalVisible(true) }}
                        >
                            Speech
                        </Button>

                        <Button w="130px" h="60px" colorScheme='amber'
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
        userId: state.userInfo.userId,
        chat: state.chat || []
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateChat: (pl) => dispatch({ type: 'update/chat', payload: pl })
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