import { createStore } from "redux";

let initState = {
    login: true,
    userInfo: {
        name: '',
        userId: 57,
        elderlyId: 20,
    },
    elderlyInfo: {
    },
    heartData: {
        'D': [],
        'W': [],
        'M': [],
        'Y': []
    },
    sleepData: {
        'D': [],
        'W': [],
        'M': [],
        'Y': []
    },
    stepData: {
        'D': [],
        'W': [],
        'M': [],
        'Y': []
    },
    locationData: {
        'D': [],
        'W': [],
        'M': [],
        'Y': []
    },
    mealData: {
        'D': [],
        'W': [],
        'M': [],
        'Y': []
    },
    chat: []
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

    let actions = action.type.split('/')

    if (actions[0] == 'update') {
        if (actions.length > 2) {
            return {
                ...state,
                [actions[1]]: {
                    ...state[actions[1]],
                    [actions[2]]: action.payload.data
                }
            }
        }

        if (actions[1] == 'chat') {
            return {
                ...state,
                [actions[1]]: [
                    ...[actions[1]],
                    action.payload.data]
            }
        }

        else if (actions[1] == 'elderlyInfo') {
            return {
                ...state,
                elderlyInfo: {
                    ...state.elderlyInfo,
                    [action.payload.key]: action.payload.data
                }
            }
        }
    }

    return state
}

let store = createStore(reducer)
export { store }