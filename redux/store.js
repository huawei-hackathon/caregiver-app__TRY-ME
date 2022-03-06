import { createStore } from "redux";

let initState = {
    login: true,
    userInfo: {
        name: 'Gee',
        userId: '15'
    },
}

let reducer = (state = initState, action) => {
    if (action.type == 'loginAsUser') {
        console.log('logging in store')
        return {
            ...state,
            login: true,
            userInfo: {
                name: action.payload.name,
                userId: action.payload.userId
            }
        }
    }

    return state
}

let store = createStore(reducer)
export { store }