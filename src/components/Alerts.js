import Swal from 'sweetalert2'

const confirm = (header, text) => {
  Swal.fire({
    icon: 'success',
    title: header,
    text: text
  })
}



export { confirm }
