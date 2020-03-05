import Swal from "sweetalert2";

const confirm = (header, text) => {
  Swal.fire({
    icon: "success",
    title: header,
    text: text
  });
};

const myAlert = () => {
  Swal.fire({
    icon: "warning",
    title: "Login Unsuccessful",
    text: "Incorrect username and password combination, please try again.",
    heightAuto: false,
    customClass: "swal"
  });
};

const warning = () => {
  Swal.fire({
    icon: "warning",
    title: "Form must be filled out",
    text: "Please complete all required fields."
  });
};

export { confirm, myAlert, warning };
