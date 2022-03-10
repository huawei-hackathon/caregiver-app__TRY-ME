import React from 'react'
import { Center, Image, ScrollView, HStack, Box, Text } from 'native-base'

const OneMealImage = ({ imgUri }) => {
   return (
      <Center flex={1}>
         <Image
            source={{ uri: imgUri }}
            alt="food pic"
            size="2xl"
         />
      </Center>
   )
}

const MealConts = ({ contents }) => {
   return (
      <ScrollView w="250px">
         {
            contents.map(({ name, type }) => (
               <HStack h="50" px={3} py={0.5} bg="gray.100" borderRadius={5}
                  style={{
                     borderColor: 'lightgray',
                     borderWidth: '0.5px',
                     borderStyle: 'solid'
                  }}>
                  <Box width="60%" justifyContent='center'>
                     <Text bold fontSize='md'>{name}</Text>
                  </Box>
                  <Box flex={1} justifyContent='center'>
                     <Text
                        fontSize='sm'
                        textAlign='right'
                        italic
                        color="gray.500">{type}</Text>
                  </Box>
               </HStack>
            ))
         }
      </ScrollView>
   )
}

export {
   OneMealImage,
   MealConts
}