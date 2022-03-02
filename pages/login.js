import * as React from "react"
import {
    Center,
} from "native-base"

import LoginArea from "../components/loginPage/loginPage"

function LoginPage(props) {
    let navigation = props.navigation
    let setLogin = props.route.params.setLogin

    return (
        <Center flex={1} px="3">
            <LoginArea navigation={navigation} setLogin={setLogin} />
        </Center>
    )
}

export default LoginPage