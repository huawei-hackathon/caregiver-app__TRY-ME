let baseUrl = 'http://119.13.104.214:80'
let tunnelUrl = 'https://modern-quail-50.loca.lt'

const tryLogin = (username, password) => {
    return new Promise(async (res, rej) => {
        let options = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'caregiverUserId': username,
                'password': password
            })
        }

        try {
            let response = await fetch(`${baseUrl}/users/authenticateCaregiver`, options)
            if (response.ok) {
                let respJson = await response.json()
                res({
                    success: true,
                    validated: respJson['status'],
                    msg: 'request was successfl'
                })
            } else {
                res({
                    success: false,
                    msg: 'Server side error'
                })
            }
        }
        catch (e) {
            res({
                success: false,
                msg: e
            })
        }
    })
}

const announceMessage = (userId, text) => {
    return new Promise(async (res, rej) => {
        let options = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'userId': userId,
                'text': text
            })
        }

        try {
            let response = await fetch(`${baseUrl}/announceMessage`, options)
            if (response.ok) {
                let respJson = await response.json()
                res({
                    success: true,
                    msg: respJson
                })
            } else {
                res({
                    success: false,
                    msg: 'Server side error'
                })
            }
        }
        catch (e) {
            res({
                success: false,
                msg: e
            })
        }
    })
}

module.exports = {
    announceMessage,
    tryLogin
}