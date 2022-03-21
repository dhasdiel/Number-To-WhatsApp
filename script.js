const input = document.getElementById("input");
const select = document.getElementById("select");
const form = document.getElementById("form");
const countries = import("./countries.json", {
  assert: {
    type: "json",
  },
});
countries.then((c) =>
  c.default.forEach((country) => {
    let option = document.createElement("option");
    option.value = country.dialCode;
    option.innerText = country.iso + ": " + country.dialCode;
    select.appendChild(option);
    //console.log("🗺️", country.name, country.dialCode);
  })
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkInput()) {
    document.location =
      "https://api.whatsapp.com/send?phone=" + select.value + input.value;
  }
  return false;
});

const checkInput = () => {
  const inputValue = input.value.trim();
  const selectValue = select.value.trim();
  if (selectValue === "") {
    setErrorFor(input, "dial code cannot be blank.");
  }
  if (inputValue === "") {
    setErrorFor(input, "input cannot be blank.");
  } else if (inputValue.length < 8) {
    setErrorFor(input, "input cannot be less than 8 digits.");
  }
  for (let i = 0; i < inputValue.length; i++) {
    if (inputValue.charAt(i) < "0" || inputValue.charAt(i) > "9") {
      setErrorFor(input, "input cannot be with diffrent chars then 0-9.");
    }
  }
  return true;
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.id = "form-error";
  return false;
};

const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  formControl.id = "form-success";
};
