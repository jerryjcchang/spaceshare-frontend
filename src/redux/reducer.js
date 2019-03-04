import {combineReducers} from 'redux'
import moment from 'moment'

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
    case "MAKE_BOOKING":
      return [...oldState, action.payload].sort((a,b) => moment(a.start)-moment(b.start))
    case "UPDATE_BOOKING":
      return oldState.map(booking => {
        if(booking.id === action.payload.id){
          return {
            ...booking,
            start: action.payload.start,
            end: action.payload.end,
            dates: action.payload.dates
          }
        }
        return booking
      })
    case "DELETE_BOOKING":
      return oldState.filter(booking => booking.id !== action.payload.id)
    default:
      return oldState
  }
}

const setSpacesReducer = (oldState=[], action) => {
  switch(action.type){
    case "LOG_IN":
      return action.payload.spaces
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

const bookingFormEditingReducer = (oldState=false, action) => {
  switch(action.type){
    case "EDIT_START":
      return true
    case "CANCEL_EDIT":
      return false
    default:
      return oldState
  }
}

const bookingFormIdReducer = (oldState="", action) => {
  switch(action.type){
    case "EDIT_START":
      return action.payload.id
    case "CANCEL_EDIT":
      return ""
    default:
      return oldState
  }
}

const bookingFormStartReducer = (oldState="", action) => {
  switch(action.type){
    case "SET_START":
      return action.payload
    case "CLEAR_START":
      return ""
    case "CANCEL_EDIT":
      return ""
    case "EDIT_START":
      return action.payload.start
    default:
      return oldState
  }
}

const bookingFormEndReducer = (oldState="", action) => {
  switch(action.type){
    case "SET_END":
      return action.payload
    case "CLEAR_END":
      return ""
    case "EDIT_START":
      return action.payload.end
    case "CANCEL_EDIT":
      return ""
    default:
      return oldState
  }
}

const setBookingFormReducer = combineReducers({
  editing: bookingFormEditingReducer,
  id: bookingFormIdReducer,
  start: bookingFormStartReducer,
  end: bookingFormEndReducer,
})

const rootReducer = combineReducers({
  allSpaces: setAllSpacesReducer,
  currentUser: setUserReducer,
  userBookings: setBookingsReducer,
  userSpaces: setSpacesReducer,
  bookingForm: setBookingFormReducer,
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
