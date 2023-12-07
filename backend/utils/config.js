require('dotenv').config()

const PORT = process.env.PORT || 3001

console.log('-----------------------------NODE_ENV:', process.env.NODE_ENV)
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

// console.log("-----------------------------MONGODB_URI:", MONGODB_URI)


// const MONGODB_URI = process.env.NODE_ENV === 'test' ?
// TEST_MONGODB_LOCAL_URI:
// process.env.MONGODB_URI_PREFIX + process.env.MONGODB_PASSWORD + process.env.MONGODB_URI_SUFFIX



// const MONGODB_URI_HIDE_PASSWORD = process.env.NODE_ENV === 'test' ?
// TEST_MONGODB_LOCAL_URI:
//  process.env.MONGODB_URI_PREFIX + '[SECRET]' + process.env.MONGODB_URI_SUFFIX // use if logging connection

module.exports = {
  MONGODB_URI,
  PORT
}