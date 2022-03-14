let initState = {
  login: false,
  userInfo: {
    name: "Elizabeth Khua",
    userId: "155",
    username: "ElizabethKhua69",
    elderlyId: "116",
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
