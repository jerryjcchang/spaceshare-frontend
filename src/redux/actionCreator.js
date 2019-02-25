const URL = 'http://localhost:3001/api/v1'
const LOGIN = `${URL}/login`
const PROFILE = `${URL}/profile`


function loggingInCurrentUser(token){
    return (dispatch) => {
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


function loggedIn(user_info){
    return {type: "LOG_IN", payload: user_info}
}

function loggingOut(){
    return {type: "LOG_OUT"}
}

export {loggingInUser, loggingInCurrentUser, loggingOut}