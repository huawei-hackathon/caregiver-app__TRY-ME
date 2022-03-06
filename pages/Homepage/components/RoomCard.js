import React, { useState, useEffect } from 'react'
import { Text, Box, Stack, VStack, HStack, Heading, Center } from 'native-base'
import { dateToStr, dateToTime } from '../../../utils'

function RoomCard() {
   const [currentRoom, setCurrentRoom] = useState()
   const [sinceTime, setSinceTime] = useState()

   useEffect(() => {
      setCurrentRoom('Kitchen')
      setSinceTime(new Date())
   }, [])


   return (
      <Box width="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
         borderColor: "coolGray.600",
         backgroundColor: "gray.700"
      }} _web={{
         shadow: 2,
         borderWidth: 0
      }} _light={{
         backgroundColor: "gray.50"
      }}>
         <Stack p="4" justifyContent='center'>
            <Stack space={2}>
               <Heading size="md">
                  Location📍
               </Heading>
            </Stack>

            <Center h={50} w='100%'>
               <VStack>
                  {currentRoom != undefined &&
                     <>
                        <HStack alignItems="center" space={1}>
                           <Text
                              fontSize='lg'>Currently In: </Text>
                           <Text
                              bold
                              fontSize='xl'>{currentRoom}</Text>
                        </HStack>

                        <Text
                           fontSize='xs'
                           color='gray.500'>
                           Since: {dateToTime(sinceTime)}
                        </Text>
                     </>
                  }
               </VStack>
            </Center>
         </Stack>
      </Box>
   )
}

export default RoomCard