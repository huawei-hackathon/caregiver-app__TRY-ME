let baseUrl = 'http://119.13.104.214:80'
const axios = require('axios')

const tryLogin = async (username, password) => {
    try {
        let res = await axios.post(`${baseUrl}/users/authenticateCaregiver`, {
            username,
            password
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

const announceMessage = async (userId, text) => {
    try {
        let response = await axios.post(`${baseUrl}/announceMessage`, {
            'userId': userId,
            'text': text
        })

        return {
            success: true,
            data: response
        }
    }
    catch (e) {
        return {
            success: false,
            data: e
        }
    }
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

const getUserInfo = async (username) => {
    try {
        let res = await axios.post(`${baseUrl}/users/getCaregiverProfile`, {
            username: username
        })
        return {
            success: true,
            data: res.data
        }
    }
    catch (e) {
        console.log('GET REPORT ERR:', e)
        return {
            success: false,
            data: e
        }
    }
}

const getLastmeal = async (userId) => {
    try {
        let res = await axios.post(`${baseUrl}/food/lastMeal`, {
            userId
        })
        return {
            success: true,
            data: res.data
        }
    }
    catch (e) {
        console.log('GET REPORT ERR:', e)
        return {
            success: false,
            data: e
        }
    }
}

const getDateMeal = async (userId, date = new Date().toISOString().slice(0, 10)) => {
    try {
        let res = await axios.post(`${baseUrl}/food/date`, {
            userId,
            date
        })
        return {
            success: true,
            data: res.data.map(e => ({
                ...e,
                date: date
            }))
        }
    }
    catch (e) {
        console.log('GET REPORT ERR:', e)
        return {
            success: false,
            data: e
        }
    }
}

const postVoiceMsg = async (userId, audio) => {
    try {
        let response = await axios.post(`${baseUrl}/recordedCaregiverMessage`, {
            userId,
            audio
        })
        return {
            success: true,
            data: response
        }
    }
    catch (e) {
        return {
            success: false,
            data: e
        }
    }
}

module.exports = {
    announceMessage,
    tryLogin,
    getData,
    getConvo,
    getReport,
    getUserInfo,
    getLastmeal,
    getDateMeal,
    postVoiceMsg
}