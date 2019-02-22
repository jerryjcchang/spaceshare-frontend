import {combineReducers} from 'redux'

state = {
  email: "",
  // firstName: "",
  // lastName: "",
  // company: "",
  // password: "",
  // passwordConfirmation: "",
  // city: "",
  // phoneNumber: ""
}

const emailReducer = (oldState=state, action) => {
  switch(action.type){
    case "UPDATE EMAIL":
      return {
        ...oldState, email: action.payload
      }
    default:
      return oldState
  }
}

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

export default reducer
