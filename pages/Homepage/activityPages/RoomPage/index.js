import React, { useState, useEffect } from 'react'
import { Text, Box, Center } from 'native-base'
import ChartComponent from './chart'

import { dateToTime } from '../../../../utils'

const getData = () => {
   let roomData = [
      {
         room: 'kitchen',
         start: new Date(2022, 2, 5, 10, 15),
         end: new Date(2022, 2, 5, 10, 18)
      },
      {
         room: 'bedroom',
         start: new Date(2022, 2, 5, 10, 19),
         end: new Date(2022, 2, 5, 11, 30)
      },
      {
         room: 'toilet',
         start: new Date(2022, 2, 5, 11, 33),
         end: new Date(2022, 2, 5, 11, 40)
      },
      {
         room: 'bedroom',
         start: new Date(2022, 2, 5, 11, 42),
         end: new Date(2022, 2, 5, 16, 30)
      },
   ]

   let tToMin = (t) => {
      let [h, m] = t.split(':')
      return h * 60 + m
   }

   let currI = 0
   let roomArr = []

   let data = roomData.map(({ room, start, end }) => {
      let startD = tToMin(dateToTime(start))
      let endD = tToMin(dateToTime(end))

      let xVal

      if (roomArr.findIndex(e => e === room) === -1) {
         xVal = currI
         roomArr.push(room)
         currI += 1
      } else {
         xVal = roomArr.findIndex(e => e === room)
      }

      console.log(xVal, room)

      return {
         x: xVal,
         open: startD,
         close: endD,
         high: endD,
         low: startD,
      }
   })

   return {
      data,
      roomArr
   }
}

function RoomPage() {
   const [chartData, setChartData] = useState()
   const [roomArr, setRoomArr] = useState()
   const [dateToday, setDateToday] = useState()

   useEffect(() => {
      setDateToday(new Date())
      let { data, roomArr: roomArrTmp } = getData()

      setChartData(data)
      console.log(data)

      setRoomArr(roomArrTmp)
   }, [])

   return (
      <>
         {
            (roomArr && chartData) &&
            <ChartComponent chartData={chartData} roomArr={roomArr} />
         }
      </>
   )
}

export default RoomPage