import React, { useState, useEffect } from 'react'
import { Text, Box, Center, Heading, HStack, Spinner } from 'native-base'

import { dateToTime } from '../../../utils'

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

   roomData.sort((a, b) => {
      a.start > b.start
   })
   return roomData
}

const RoomLogs = ({ data }) => {
   return (
      <>
         {
            data.map(({ room, start, end }) =>
               <HStack px={4} py={2} my={1} bg="gray.100" borderRadius={5}
                  style={{
                     borderColor: 'lightgray',
                     borderWidth: '0.5px',
                     borderStyle: 'solid'
                  }}>
                  <Box width="60%">
                     <Text bold fontSize='md'>{room}</Text>
                  </Box>
                  <Box flex={1} justifyContent='center'>
                     <Text
                        fontSize='sm'
                        textAlign='right'
                        italic
                        color="gray.500">{dateToTime(start)}-{dateToTime(end)}</Text>
                  </Box>
               </HStack>
            )
         }
      </>
   )
}

function RoomPage() {
   const [roomArr, setRoomArr] = useState()
   const [dateToday, setDateToday] = useState()
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true)

      setTimeout(() => {
         setDateToday(new Date())
         setRoomArr(getData())

         setLoading(false)
      }, 2000)
   }, [])

   return (
      <>
         <Center>
            <Heading my={5}>Room Logs</Heading>

            <Box w="350px">
               {
                  roomArr &&
                  <RoomLogs data={roomArr} />
               }
               {loading && <Spinner />}
            </Box>
         </Center>
      </>
   )
}

export default RoomPage