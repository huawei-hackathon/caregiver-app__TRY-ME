import { VictoryChart, VictoryCandlestick, VictoryAxis, VictoryTheme } from "victory-native"

const ChartComponent = ({ chartData, roomArr, theme }) => {

   return (
      <VictoryChart
         theme={VictoryTheme.material}
         domainPadding={{ x: 25 }}
      >
         <VictoryAxis
            tickFormat={(t) => roomArr[t]}
         />
         <VictoryAxis dependentAxis />
         <VictoryCandlestick
            // horizontal
            candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
            data={chartData}
         />
      </VictoryChart>
   )
}

export default ChartComponent