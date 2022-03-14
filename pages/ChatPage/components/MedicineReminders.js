import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Center,
  Heading,
  HStack,
  VStack,
  CheckIcon,
  ScrollView,
  Button,
  CloseIcon,
  Input,
  Select,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

const SingleReminder = ({ medicine, time, checked }) => {
  return (
    <Box w="100%" bg="gray.50" shadow={1} mb={2}>
      <HStack p={2}>
        <VStack>
          <Text fontSize="md">{medicine}</Text>
          <Text color="gray.500">{time}</Text>
        </VStack>

        {checked && (
          <CheckIcon
            color="green.400"
            position="absolute"
            right="3"
            alignSelf="center"
            size="sm"
          />
        )}
      </HStack>
    </Box>
  );
};

const CurrReminders = ({ setMedicineReminderVisible }) => {
  const [reminders, setReminders] = useState({
    Morning: [
      { medicine: "Antibiotics", time: "8:00", checked: true },
      { medicine: "Vitamin C", time: "8:10", checked: true },
      {
        medicine: "High blood pressure medicine",
        time: "8:20",
        checked: false,
      },
    ],
    Afternoon: [
      {
        medicine: "High blood pressure medicine",
        time: "13:00",
        checked: false,
      },
      { medicine: "Diabetes medicine", time: "13:10", checked: false },
    ],
    Evening: [{ medicine: "Antibiotics", time: "19:00", checked: false }],
  });
  const [numDoses, setNumDoses] = useState(0);
  const [chosenTime, setChosenTime] = useState({
    0: new Date(),
    1: new Date(),
    2: new Date(),
  });
  const [medicineToAdd, setMedicineToAdd] = useState("");

  const handleNewReminder = () => {
    console.log("new reminder");
    for (let i = 0; i < numDoses; i++) {
      let t = chosenTime[i];
      let timeCat = "";
      if (t.getHours() < 11) {
        timeCat = "Morning";
      } else if (t.getHours() < 17) {
        timeCat = "Afternoon";
      } else {
        timeCat = "Evening";
      }

      setReminders({
        ...reminders,
        [timeCat]: [
          ...reminders[timeCat],
          {
            medicine: "medicine test",
            time: `${t.getHours()}:${
              t.getMinutes().toString().length == 1
                ? "0" + t.getMinutes().toString()
                : t.getMinutes().toString()
            }`,
            checked: false,
          },
        ],
      });
    }
  };

  return (
    <Box h="100%" justifyContent="center" alignItems="center">
      <Box
        alignItems="center"
        width="360px"
        height="650px"
        bg="white"
        shadow={2}
        position="absolute"
        top="10px"
        p={5}
      >
        <CloseIcon
          size="xs"
          position="absolute"
          right="4"
          top="4"
          onPress={() => {
            setMedicineReminderVisible(false);
          }}
        />
        <Text bold fontSize="xl">
          Current Reminders🔔
        </Text>
        <Box
          h="250px"
          w="100%"
          justifyContent="center"
          mt={3}
          borderWidth="0.5"
          borderColor="gray.200"
        >
          <ScrollView>
            {Object.keys(reminders).map((e) => {
              return (
                <>
                  <Text bold fontSize="lg" color="primary.700">
                    {e}
                  </Text>

                  <Box>
                    {reminders[e].map(({ medicine, time, checked }) => {
                      return (
                        <SingleReminder
                          medicine={medicine}
                          time={time}
                          checked={checked}
                        />
                      );
                    })}
                  </Box>
                </>
              );
            })}
          </ScrollView>
        </Box>

        <Box w="100%" mt={3}>
          <Text bold fontSize="xl" textAlign="center" mb={3}>
            Add Reminder➕
          </Text>

          <Box h="200px" borderWidth="0.5" borderColor="gray.200">
            <ScrollView m={3}>
              <Input
                placeholder="Medicine name"
                w="100%"
                my={2}
                value={medicineToAdd}
                onChangeText={setMedicineToAdd}
              />

              <Select
                selectedValue={numDoses}
                onValueChange={(x) => {
                  setNumDoses(x);
                }}
                mb={2}
                placeholder="Number of doses"
              >
                <Select.Item label="1" value={1} />
                <Select.Item label="2" value={2} />
                <Select.Item label="3" value={3} />
              </Select>

              {[...Array(numDoses)].map((e, i) => {
                return (
                  <HStack space={3} alignItems="center" mb={1}>
                    <Text>Dose {i + 1}</Text>
                    <DateTimePicker
                      key={i}
                      value={chosenTime[i]}
                      onChange={(_, date) => {
                        setChosenTime({ ...chosenTime, [i]: date });
                      }}
                      mode="time"
                      style={{ width: "100%" }}
                    />
                  </HStack>
                );
              })}
            </ScrollView>
          </Box>
        </Box>
        <Button
          w="100%"
          mt={5}
          onPress={() => {
            handleNewReminder();
          }}
        >
          Add Reminder
        </Button>
      </Box>
    </Box>
  );
};

function MedicineReminders({ setMedicineReminderVisible }) {
  return (
    <CurrReminders setMedicineReminderVisible={setMedicineReminderVisible} />
  );
}

export default MedicineReminders;
