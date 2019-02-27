const URL = 'http://localhost:3001/api/v1'
const LOGIN = `${URL}/login`
const PROFILE = `${URL}/profile`
const SPACES = `${URL}/spaces`
const CREATE_BOOKING = `${URL}/bookings`

function fetchingAllSpaces(){
    return (dispatch) => {
        fetch(`${SPACES}`, {
            method: "GET",
            // headers: {
            //     "Authentication": `Bearer ${token}`
            // }
        })
        .then(r => r.json())
        .then(allSpaces => {
            dispatch(fetchedAllSpaces(allSpaces))
        }) 
    }
}

function loggingInCurrentUser(){
    return (dispatch) => {
        let token = localStorage.getItem('token')
        fetch(`${PROFILE}`, {
                method: "GET",
                headers: {
                    "Authentication": `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(user_info => {
                dispatch(loggedIn(user_info))
                console.log(user_info)
            })
    }
}

function loggingInUser(info){
    // debugger
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
            console.log(data)
              if(data.error){ 
                alert('Incorrect username or password')
              } else {
                dispatch(loggedIn(data.user_info))
                localStorage.setItem("token", data.token)
              }
          })
        }
}

function bookingSpace(info){
    let token = localStorage.getItem('token')
    return (dispatch) => {
        fetch(`${CREATE_BOOKING}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authentication": `Bearer ${token}`},
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(booking => {
            console.log(booking)
            dispatch(bookedSpace(booking))
        })
    }
}


function loggedIn(user_info){
    return {type: "LOG_IN", payload: user_info}
}

function loggingOut(){
    localStorage.clear()
    alert('Goodbye!')
    return {type: "LOG_OUT"}
}

function fetchedAllSpaces(allSpaces){
    return {type: "FETCH_ALL_SPACES", payload: allSpaces}
}

function bookedSpace(booking){
    return {type: "MAKE_BOOKING", payload: booking}
}

export {loggingInUser, loggingInCurrentUser, loggingOut, fetchingAllSpaces, bookingSpace}