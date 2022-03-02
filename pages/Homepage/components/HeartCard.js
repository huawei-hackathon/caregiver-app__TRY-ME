import React, { useState, useEffect } from 'react';
import { Text, Box, Center, HStack, AspectRatio, Image, Stack, Heading, Badge } from 'native-base'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart'


const HeartCard = () => {
    const [heartDailyData, setHeartDailyData] = useState([])
    const [heartRate, setHeartRate] = useState(-1)
    const [badgeColour, setBadgeColour] = useState('info')

    let data = []
    for (let i = 0; i < 24; i++) {
        data.push({
            x: i,
            y: Math.round(Math.random() * 100 + 50)
        })
    }

    useEffect(() => {
        setHeartDailyData(data)
        setHeartRate(50)

        // Set heart rate rules for healthy or unhealthy
        if (heartRate > 100) {
            setBadgeColour('danger')
        } else {
            setBadgeColour('success')
        }
    }, [heartRate])

    return <Box alignItems="center" width='100%'>
        <Box width="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}>
            <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md">
                        Heart Rate
                    </Heading>
                    <Badge colorScheme={badgeColour} width='65px'>{`${heartRate}bpm`}</Badge>
                </Stack>
            </Stack>
            <Box mt={-4}>
                <Chart
                    style={{ height: 120, width: '100%' }}
                    data={heartDailyData}
                    padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                    xDomain={{ min: 1, max: 24 }}
                    yDomain={{ min: 50, max: 150 }}
                >
                    <VerticalAxis tickCount={3} />
                    <HorizontalAxis
                        tickValues={[0, 6, 12, 18, 24]}
                        theme={{
                            labels: { formatter: (h) => `${h.toFixed(0)}:00` },
                        }}
                    />
                    <Area
                        theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } } }} />
                    <Line
                        theme={{ stroke: { color: '#ffa502', width: 2 }, }}
                    />
                </Chart>
            </Box>
        </Box>
    </Box >;
};

export default HeartCard