import React, { useEffect, useState } from 'react';
import { } from 'react-native';
import { Text, Box, Heading } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { connect, useStore } from 'react-redux';

import { getUserInfo } from '../utils';

const ProfileStack = createNativeStackNavigator()

let ProfilePageConts = ({ myInfo, elderlyInfo, updateEInfo, elderlyId }) => {

    useEffect(() => {
        getUserInfo(elderlyId)
            .then(res => {
                if (res.success) {
                    for (let prop in res.msg) {
                        updateEInfo(prop, res.msg[prop])
                    }
                }
            })
    }, [])

    return (
        <Box>
            <Heading>{ }</Heading>
        </Box>
    )
}


const mapStateToProps = (state) => {
    return {
        elderlyInfo: state.elderlyInfo,
        myInfo: state.userInfo,
        elderlyId: state.userInfo.elderlyId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEInfo: (key, data) => {
            dispatch({
                type: 'update/elderlyInfo',
                payload: {
                    key,
                    data
                }
            })
        }
    }
}

ProfilePageConts = connect(mapStateToProps, mapDispatchToProps)(ProfilePageConts)

const ProfilePage = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen component={ProfilePageConts} name="Profile" />
        </ProfileStack.Navigator>
    )
}


export default ProfilePage