import React from "react";
import { Popover, Text, Pressable } from "native-base";

import { dateToDaysAndTime } from "../../../../utils";

const AnomalyPopover = ({ anomalyData, anomalyType }) => {
  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <Text color="amber.600" underline>
              {anomalyData.length}{" "}
              {anomalyData.length > 1 ? "anomalies" : "anomaly"}
            </Text>
          </Pressable>
        );
      }}
    >
      <Popover.Content accessibilityLabel="Delete Customerd" w="56">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>{anomalyType}Anomaly</Popover.Header>
        <Popover.Body>
          {anomalyData.map(({ date, type, val }) => (
            <>
              <Text underline fontSize="md">
                {dateToDaysAndTime(
                  new Date(`${date.slice(0, 10)}T${date.slice(11)}`)
                )}
              </Text>
              <Text color="gray.500">
                {anomalyType} was {val}, which was {type} than normal.
              </Text>
            </>
          ))}
        </Popover.Body>
        <Popover.Footer justifyContent="flex-end"></Popover.Footer>
      </Popover.Content>
    </Popover>
  );
};

export default AnomalyPopover;
