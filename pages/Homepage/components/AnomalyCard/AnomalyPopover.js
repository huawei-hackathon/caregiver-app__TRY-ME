import React from "react";
import { Popover, Text, Pressable } from "native-base";
import * as Linking from "expo-linking";

const AnomalyPopover = ({ anomalyData, anomalyType, infoUrl }) => {
  console.log(anomalyData, anomalyType);
  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            {anomalyData && (
              <Text color="amber.600" underline>
                {anomalyData.length}{" "}
                {anomalyData.length > 1 ? "anomalies" : "anomaly"}
              </Text>
            )}
          </Pressable>
        );
      }}
    >
      <Popover.Content accessibilityLabel="Delete Customerd" w="56">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>{anomalyType}Anomaly</Popover.Header>
        <Popover.Body>
          {anomalyData.map(({ date, type, val, delta }) => (
            <>
              <Text underline fontSize="md">
                {`${date.slice(0, 10)} ${date.slice(11)}`}
              </Text>
              <Text color="gray.500">
                {anomalyType} was <Text bold>{val}</Text>, which is{" "}
                <Text bold>
                  {Math.abs((delta / val).toFixed(2))}% {type}
                </Text>{" "}
                than normal.
              </Text>
            </>
          ))}
        </Popover.Body>
        <Popover.Footer justifyContent="flex-start">
          <Text
            color="blue.500"
            onPress={() => {
              Linking.openURL(infoUrl);
            }}
          >
            Find out more
          </Text>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  );
};

export default AnomalyPopover;
