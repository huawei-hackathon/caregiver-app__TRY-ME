import * as React from "react";
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
  View,
} from "native-base";
import { connect } from "react-redux";

import { tryLogin, getUserInfo } from "../../utils";

import { useState } from "react";
import { valPw, valUsername } from "../../utils/helper";
import { ErrorModal } from "../../components/errorModal";
import { StyleSheet } from "react-native";

const LoginArea = (props) => {
  const navigation = props.navigation;
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [errModalShow, setErrModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  let submitHandler = async () => {
    let success = false;

    if (valUsername(username) && valPw(pw)) {
      setLoading(true);
      console.log(username, pw);

      const loginAttempt = await tryLogin(username, pw);

      if (loginAttempt.success && loginAttempt.data.status) {
        let userInfo = await getUserInfo(username);

        if (userInfo.success) {
          console.log(userInfo.data);
          props.dispatchLogin({
            elderlyInfo: { ...userInfo.data.elderlyInfo },
            name: userInfo.data.name,
            userId: userInfo.data.caregiverUserId,
            elderlyId: userInfo.data.elderlyInfo.userId,
          });

          success = true;
        }
      }
    }

    if (!success) {
      setUsername("");
      setPw("");
      setErrModalShow(true);
    }

    setLoading(false);
  };

  return (
    <>
      {errModalShow ? (
        <ErrorModal
          errMsg="Login failed"
          errDesc="Username or password invalid"
          style={styles.errModal}
          setModalShow={setErrModalShow}
          show={errModalShow}
        />
      ) : (
        <></>
      )}
      <Box bg="white" shadow={2} w="90%" py="6" px="10">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome 🍓
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
            <FormControl.Label>Username</FormControl.Label>
            <Input
              onChangeText={(text) => setUsername(text)}
              value={username}
              placeholder="Enter username"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(text) => setPw(text)}
              value={pw}
              placeholder="Enter password"
            />
          </FormControl>
          <Button
            mt="2"
            onPress={() => {
              submitHandler();
            }}
            isLoading={loading}
          >
            Sign in
          </Button>
        </VStack>
      </Box>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (payload) =>
    dispatch({
      type: "loginAsUser",
      payload: payload,
    }),
});

const styles = StyleSheet.create({
  errModal: {
    position: "absolute",
    top: 0,
  },
});

export default connect(null, mapDispatchToProps)(LoginArea);
