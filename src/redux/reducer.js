import {combineReducers} from 'redux'

const setUserReducer = (oldState="", action) => {
  switch(action.type){
    case "LOG_IN":
      return action.payload.user
    case "LOG_OUT":
      return ""
    default:
      return oldState
  }
}

const setBookingsReducer = (oldState="", action) => {
  switch(action.type){
    case "LOG_IN":
      return action.payload.bookings
    case "LOG_OUT":
      return ""
    default:
      return oldState
  }
}

const setSpacesReducer = (oldState=[], action) => {
  switch(action.type){
    case "LOG_IN":
      return action.payload.spaces
    case "MAKE_BOOKING":
      debugger
      return [...oldState, action.payload]
    case "LOG_OUT":
      return ""
    default:
      return oldState
  }
}

const setAllSpacesReducer = (oldState=[], action) => {
  switch(action.type){
    case "FETCH_ALL_SPACES":
      return action.payload
    default:
      return oldState
  }
}

const rootReducer = combineReducers({
  allSpaces: setAllSpacesReducer,
  currentUser: setUserReducer,
  user_bookings: setBookingsReducer,
  user_spaces: setSpacesReducer
})

// state = {
//   email: "",
//   // firstName: "",
//   // lastName: "",
//   // company: "",
//   // password: "",
//   // passwordConfirmation: "",
//   // city: "",
//   // phoneNumber: ""
// }

// const emailReducer = (oldState=state, action) => {
//   switch(action.type){
//     case "UPDATE EMAIL":
//       return {
//         ...oldState, email: action.payload
//       }
//     default:
//       return oldState
//   }
// }

// const firstNameReducer = (oldState=state, action) => {
//   switch(action.type){
//     case "UPDATE FIRST NAME":
//       return {
//         ...oldState, email: action.payload
//       }
//     default:
//       return oldState
//     }
//   }
//     case "UPDATE FIRST NAME":
//       return {
//         ...oldState, firstName: action.payload
//       }
//     case "UPDATE LAST NAME":
//       return {
//         ...oldState, lastName: action.payload
//       }
//     case "UPDATE LAST NAME":
//       return {
//         ...oldState, lastName: action.payload
//       }
//   }
// }

export default rootReducer
