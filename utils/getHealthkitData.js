import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
} from 'react-native-health'

/* Permission options */
const permissions = {
    permissions: {
        read: [
            AppleHealthKit.Constants.Permissions.HeartRate,
            AppleHealthKit.Constants.Permissions.Steps,
            AppleHealthKit.Constants.Permissions.OxygenSaturation,
            AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            AppleHealthKit.Constants.Permissions.MindfulSession,
        ],
    },
}

const getHealthkitData = () => {
    AppleHealthKit.initHealthKit(permissions, (error) => {
        /* Called after we receive a response from the system */

        if (error) {
            console.log('[ERROR] Cannot grant permissions!')
        }

        /* Can now read or write to HealthKit */
        let options = {
            startDate: new Date().toISOString(),
        }

        AppleHealthKit.getHeartRateSamples(
            options,
            (callbackError, results) => {
                if (callbackError) {
                    console.log(callbackError)
                    return
                }

                console.log(results)
            },
        )
        AppleHealthKit.getOxygenSaturationSamples(
            options,
            (callbackError, results) => {
                if (callbackError) {
                    console.log(callbackError)
                    return
                }

                console.log(results)
            },
        )
        AppleHealthKit.getStepCount(
            (options),
            (err, results) => {
                if (err) {
                    return
                }
                console.log(results)
            },
        )
    })
}



module.exports.getHealthkitData = getHealthkitData