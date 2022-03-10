import { createStore } from "redux";

let initState = {
    login: false,
    userInfo: {
        name: 'Lynn Khua',
        userId: '60',
        username: 'LynnKhua',
        elderlyId: '22',
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
    lastMealData: {
        loaded: false,
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
                userId: action.payload.userId,
                elderlyId: action.payload.elderlyId
            },
            elderlyInfo: {
                ...action.payload.elderlyInfo
            }
        }
    }
    else if (action.type == 'logout') {
        return initState
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

        else if (actions[1] == 'chat') {
            return {
                ...state,
                chat: action.payload.data
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

        else if (actions[1] == 'lastMealData') {
            return {
                ...state,
                lastMealData: {
                    loaded: true,
                    ...action.payload.data
                }
            }
        }
    }

    return state
}

let store = createStore(reducer)
export { store }