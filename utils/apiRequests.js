let baseUrl = 'http://119.13.104.214:80'
let tunnelUrl = 'https://modern-quail-50.loca.lt'
const axios = require('axios')

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

const getData = async (type, interval, userId, dateInp) => {
    const date = new Date().toISOString().slice(0, 10)
    const map = {
        D: 'day',
        W: 'week',
        M: 'month',
        Y: 'year'
    }

    try {
        let res = await axios.post(`${baseUrl}/${type}/${map[interval]}`, {
            'userId': userId,
            'date': `${date}`
        })

        return {
            success: true,
            data: res.data
        }
    }
    catch (e) {
        return {
            success: false,
            data: e
        }
    }

}

const getConvo = async (userId) => {
    try {
        let res = await axios.post(`${baseUrl}/getConversation`, {
            userId
        })

        return {
            success: true,
            data: res.data
        }
    }
    catch (e) {
        return {
            success: false,
            data: e
        }
    }

}

const getReport = async (userId) => {
    try {
        let res = await axios.post(`${baseUrl}/generateReport`, {
            userId
        })
        return {
            success: true,
            msg: `http://119.13.104.214:80/getReport/${res.data.id}`
        }
    }
    catch (e) {
        console.log('GET REPORT ERR:', e)
        return {
            success: false,
            msg: e
        }
    }
}

const getUserInfo = async (userId) => {
    try {
        let res = await axios.post(`${baseUrl}/users/getProfile`, {
            userId
        })
        return {
            success: true,
            msg: res.data
        }
    }
    catch (e) {
        console.log('GET REPORT ERR:', e)
        return {
            success: false,
            msg: e
        }
    }
}


module.exports = {
    announceMessage,
    tryLogin,
    getData,
    getConvo,
    getReport,
    getUserInfo
}