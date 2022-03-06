import * as React from "react"
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    HStack,
    Center,
    Link,
} from "native-base"
import { connect } from "react-redux"

import { tryLogin } from "../../utils"

import { useState } from 'react'
import { valPw, valUsername } from "../../utils/helper"
import { ErrorModal } from "../general/errorModal"
import { StyleSheet } from "react-native"

const LoginArea = (props) => {
    let navigation = props.navigation
    let [username, setUsername] = useState('')
    let [pw, setPw] = useState('')
    let [errModalShow, setErrModalShow] = useState(false)

    let submitHandler = () => {
        // Add login code here
        if (valUsername(username) && valPw(pw)) {
            console.log('username', username)
            console.log('password', pw)
            tryLogin(username, pw)
                .then(res => {
                    console.log(res)
                    if (res['success'] && res['validated']) {
                        console.log('logging in')
                        props.dispatchLogin(username, username)
                    } else {
                        setErrModalShow(true)
                    }
                })

        } else {
            setErrModalShow(true)
        }
    }

    return (
        <>
            <Box safeArea p="2" py="8" w="90%" maxW="290" style={{ position: 'absolute' }}>
                {errModalShow ? <ErrorModal
                    errMsg='Login failed'
                    errDesc='Username or password invalid'
                    style={styles.errModal}
                    setModalShow={setErrModalShow}
                    show={errModalShow} /> : <></>
                }

                <Heading
                    size="lg"
                    fontWeight="600"
                    color="coolGray.800"
                    _dark={{
                        color: "warmGray.50",
                    }}
                >
                    Welcome
                </Heading>
                <Heading
                    mt="1"
                    _dark={{
                        color: "warmGray.200",
                    }}
                    color="coolGray.600"
                    fontWeight="medium"
                    size="xs"
                >
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input onChangeText={text => setUsername(text)} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" onChangeText={text => setPw(text)} />
                        <Link
                            _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500",
                            }}
                            alignSelf="flex-end"
                            mt="1"
                        >
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={() => { submitHandler() }}>
                        Sign in
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text
                            fontSize="sm"
                            color="coolGray.600"
                            _dark={{
                                color: "warmGray.200",
                            }}
                        >
                            I'm a new user.{" "}
                        </Text>
                        <Link
                            _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm",
                            }}
                            onPress={() => navigation.navigate('Signup')}
                        >
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>

            </Box>
        </>

    )
}

const mapDispatchToProps = (dispatch) => ({

    dispatchLogin: (name, userId) => dispatch({
        type: 'loginAsUser', payload: {
            name,
            userId
        }
    })

})

const styles = StyleSheet.create({
    errModal: {
        position: 'absolute',
        top: 0,
    }
})

export default connect(null, mapDispatchToProps)(LoginArea)