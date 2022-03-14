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

const updateAnomaly = (state, action) => {
  const isToday = (d1) => {
    let y = parseInt(d1.slice(0, 4));
    let m = parseInt(d1.slice(5, 7)) - 1;
    let d = parseInt(d1.slice(8, 10));
    let tdy = new Date();

    return (
      y === tdy.getFullYear() && m === tdy.getMonth() && d === tdy.getDate()
    );
  };

  return {
    ...state,
    anomalies: {
      ...state.anomalies,
      loaded: true,
      [action.payload.healthInfoType]: action.payload.anomalies.filter((x) =>
        isToday(x.date)
      ),
    },
  };
};

export { updateIntervalData, updateChat, updateCurrLocation, updateAnomaly };
