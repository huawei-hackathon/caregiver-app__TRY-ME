const tickValMap = {
   'D': [1, 6, 12, 18, 23],
   'W': [1, 2, 3, 4, 5, 6, 7],
   'M': [1, 15, 30],
   'Y': [1, 3, 5, 7, 9, 11]
}


const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']


module.exports.getTickVal = (type) => {
   return tickValMap[type]
}

module.exports.getCategories = (type) => {

   const catMap = {
      'D': ['', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      'W': ['', ...week.slice((new Date).getDay() + 1, 7), ...week.slice(0, (new Date).getDay()), week[(new Date).getDay()]],
      'M': [...Array(new Date((new Date).getFullYear(), (new Date).getMonth() + 1, 0).getDate() + 1).keys()],
      'Y': ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', "Jul", "Aug", 'Sept', 'Oct', 'Nov', 'Dec']
   }
   return catMap[type]
}