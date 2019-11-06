import { confirm } from '../components/Alerts'

const URL = 'https://spaceshare-api.herokuapp.com/api/v1'
const LOGIN = `${URL}/login`
const PROFILE = `${URL}/profile`
const SPACES = `${URL}/get_spaces`
const BOOKINGS = `${URL}/bookings`
const USERS = `${URL}/users`
const REDEEM = `${URL}/redeem`
const token = localStorage.getItem('token')

function setFeatures(featuresArray){
    return {type: "SET_FEATURES", payload: featuresArray}
}

function increaseIndex(){
    return {type: "INCREASE_INDEX"}
}

function resetIndex(){
    return {type: "RESET_INDEX"}
}

function setSearchTerm(searchTerm){
    return {type: "SET_SEARCH_TERM", payload: searchTerm}
}

function registerUser(info){
    return (dispatch) => {
        fetch(`${USERS}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(info)
        })
    }
}

function fetchingAllSpaces(index){
    return (dispatch) => {
        fetch(`${SPACES}/${index}`, {
            method: "GET",
            // headers: {
            //     "Authentication": `Bearer ${token}`
            // }
        })
        .then(r => r.json())
        .then(spaces => {
            // console.log(spaces)
            dispatch(fetchedSpaces(spaces))
        })
    }
}

function loggingInCurrentUser(){
    return (dispatch) => {
        // let token = localStorage.getItem('token')
        fetch(`${PROFILE}`, {
                method: "GET",
                headers: {
                    "Authentication": `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(user_info => {
                dispatch(loggedIn(user_info))
                // console.log(user_info)
            })
    }
}

function loggingInUser(info){
    return (dispatch) => {
        fetch(`${LOGIN}`, {
            method: "POST",
	        headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"},
	        body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
              if(data.error){
                alert('Incorrect username or password')
              } else {
                dispatch(loggedIn(data.user_info))
                localStorage.setItem("token", data.token)
              }
          })
        }
}

function setLoading(){
    return {type: "SET_LOADING"}
}

function setStartDate(startDate){
    return {type: "SET_START", payload: startDate}
}

function setEndDate(endDate){
    return {type: "SET_END", payload: endDate}
}

function clearStartDate(){
    return {type: "CLEAR_START"}
}

function clearEndDate(){
    return {type: "CLEAR_END"}
}

function bookingSpace(info){
    // let token = localStorage.getItem('token')
    return (dispatch) => {
        fetch(`${BOOKINGS}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authentication": `Bearer ${token}`},
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(booking => {
            // console.log(booking)
            dispatch(bookedSpace(booking))
            dispatch(clearStartDate())
            dispatch(clearEndDate())
            window.scrollTo(0, document.documentElement.outerHTML.length)
            confirm("Confirmed", "Your booking has been made successfully.")
        })
    }
}

function updatingBooking(info){
    return (dispatch) => {
        fetch(`${BOOKINGS}/${info.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authentication":`Bearer ${token}`},
            body: JSON.stringify(info)
        })
        .then(r => r.json())
        .then(bookingAndUserPointsObj => {
            dispatch(updatedBooking(bookingAndUserPointsObj))
            dispatch(cancelEdit())
            confirm("Booking Updated", "Your booking has been successfully updated.")
        })
    }
}

function deletingBooking(info){
    return (dispatch) => {
        fetch(`${BOOKINGS}/${info}`, {
            method: 'DELETE',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authentication":`Bearer ${token}`}
        })
        .then(r => r.json())
        .then(booking => {
            dispatch(deletedBooking(booking))
            confirm("Booking Cancelled", "Your booking has been successfully cancelled.")
        })
    }
}

function redeemingReward(){
    return (dispatch) => {
        fetch(`${REDEEM}`,{
            method: 'PATCH',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authentication":`Bearer ${token}`
            }
        })
        .then(() => {
          confirm("Congratulations!", "You've redeemed your award booking!")
          dispatch(redeemedReward())
          }
        )
    }
}

function redeemedReward(){
    return {type: "REDEEM_REWARD"}
}

function editingBooking(id, start, end, days){
    return {type: "EDIT_START", payload:{id, start, end, days}}
}

function cancelEdit(){
    return {type: "CANCEL_EDIT"}
}

function updatedBooking(obj){
    return {type: "UPDATE_BOOKING", payload: obj}
}

function deletedBooking(booking){
    return {type: "DELETE_BOOKING", payload: booking}
}


function loggedIn(user_info){
    return {type: "LOG_IN", payload: user_info}
}

function loggingOut(){
    localStorage.clear()
    return {type: "LOG_OUT"}
}

function fetchedSpaces(spaces){
    return {type: "FETCH_SPACES", payload: spaces}
}

function bookedSpace(booking){
    return {type: "MAKE_BOOKING", payload: booking}
}


export {registerUser,
        loggingInUser,
        loggingInCurrentUser,
        loggingOut,
        fetchingAllSpaces,
        setSearchTerm,
        setFeatures,
        setStartDate,
        setEndDate,
        clearStartDate,
        clearEndDate,
        bookingSpace,
        deletingBooking,
        editingBooking,
        cancelEdit,
        updatingBooking,
        redeemingReward,
        setLoading,
        increaseIndex,
        resetIndex,
    }
