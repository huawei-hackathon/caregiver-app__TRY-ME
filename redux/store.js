import { createStore } from "redux";

let initState = {}

let reducer = (state = initState, action) => {
    return state
}

let store = createStore(reducer)
export { store }