import * as React from "react"
import {
    Center,
} from "native-base"

import LoginArea from "../components/loginPage/loginPage"

function LoginPage(props) {
    let navigation = props.navigation

    return (
        <Center flex={1} px="3" style={{ marginTop: -100 }}>
            <LoginArea navigation={navigation} />
        </Center>
    )
}

export default LoginPage