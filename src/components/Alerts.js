import Swal from 'sweetalert2'

const confirm = (header, text) => {
  Swal.fire({
    icon: 'success',
    title: header,
    text: text
  })
}

const myAlert = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Login Unsuccessful',
    text: 'Incorrect username and password combination, please try again.',
    heightAuto: false,
    customClass: 'swal'
  })
}



export { confirm, myAlert }
