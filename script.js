const inputNum = document.getElementById("input-num");
const inputCode = document.getElementById("input-code");
const datalist = document.getElementById("datalist");
const form = document.getElementById("form");
const btnCopy = document.getElementById("btn-copy");
const btnInput = document.getElementById("btn-input");
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
    datalist.appendChild(option);
  })
);

btnInput.addEventListener("click", function (e) {
  e.preventDefault();
  if (checkInput()) {
    document.location =
      "https://api.whatsapp.com/send?phone=" + inputCode.value + inputNum.value;
  }
  return false;
});

btnCopy.addEventListener("click", function () {
  if (checkInput()) {
    var copyText =
      "https://api.whatsapp.com/send?phone=" + inputCode.value + inputNum.value;
    navigator.clipboard.writeText(copyText.value);
    alert("Copied the text: " + copyText);
  }
});

const checkInput = () => {
  const inputNumValue = inputNum.value.trim();
  const inputCodeValue = inputCode.value.trim();
  if (inputCodeValue === "") {
    setErrorFor(inputCodeValue, "dial code cannot be blank.");
  }
  if (inputNumValue === "") {
    setErrorFor(inputNumValue, "input cannot be blank.");
  } else if (inputNumValue.length < 8) {
    setErrorFor(inputNumValue, "input cannot be less than 8 digits.");
  }
  for (let i = 0; i < inputNumValue.length; i++) {
    if (inputNumValue.charAt(i) < "0" || inputNumValue.charAt(i) > "9") {
      setErrorFor(
        inputNumValue,
        "input cannot be with diffrent chars then 0-9."
      );
    }
  }
  return true;
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querydatalistor("small");
  small.innerText = message;
  formControl.id = "form-error";
  return false;
};

const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  formControl.id = "form-success";
};
