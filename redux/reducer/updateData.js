const updateIntervalData = (state, action, actions) => {
  return {
    ...state,
    [actions[1]]: {
      ...state[actions[1]],
      [actions[2]]: [...action.payload.data],
    },
  };
};

const updateChat = (state, action) => {
  return {
    ...state,
    chat: action.payload.data,
  };
};

const updateCurrLocation = (state, action) => {
  return {
    ...state,
    locationData: {
      ...state.locationData,
      current: {
        room: action.payload.room,
        timeSpent: action.payload.timeSpent,
      },
    },
  };
};

export { updateIntervalData, updateChat, updateCurrLocation };
