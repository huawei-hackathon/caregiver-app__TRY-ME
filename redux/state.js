let initState = {
  login: false,
  userInfo: {
    name: "Jordan Khua",
    userId: "266",
    username: "JordanKhua",
    elderlyId: "227",
    password: "Nullpassword",
  },
  elderlyInfo: {},
  heartData: {
    D: [],
    W: [],
    M: [],
    Y: [],
  },
  sleepData: {
    D: [],
    W: [],
    M: [],
    Y: [],
  },
  stepData: {
    D: [],
    W: [],
    M: [],
    Y: [],
  },
  locationData: {
    current: {
      room: "",
      timeSpent: "",
    },
  },
  lastMealData: {
    loaded: false,
  },
  chat: [],
  anomalies: {
    loaded: false,
  },
};

export default initState;
