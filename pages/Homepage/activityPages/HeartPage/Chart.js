import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart'

const ChartComponent = ({ chartData, tickValues, theme }) => {
    let xMax = -1
    chartData.map(({ x }) => {
        if (x > xMax) {
            xMax = x
        }
    })

    return (
        <Chart
            style={{ height: 300, width: 400 }}
            data={chartData}
            padding={{ left: 40, bottom: 20, right: 40, top: 20 }}
            xDomain={{ min: 1, max: xMax }}
            yDomain={{ min: 30, max: 200 }}
        >
            <VerticalAxis tickCount={3} />
            <HorizontalAxis
                tickValues={tickValues}
                theme={theme ? theme : {}}
            />
            <Area
                theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } } }} />
            <Line
                theme={{ stroke: { color: '#ffa502', width: 2 }, }}
            />
        </Chart>
    )
}

export default ChartComponent