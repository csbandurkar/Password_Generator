const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbols = '~`!@#$%^&*()_-+={[}]|:"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
//set circle color to grey
//call
handleSlider();// to show length oon wiiindow
setIndicator("#ccc");
//1.set password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  // slider color
  const mini = inputSlider.min;
  const maxi = inputSlider.max;
  // inputSlider.Style.backgroundSize = ((passwordLength - mini) * 100 / (maxi - mini)) + "% 100%";

}
// 2. set indicator
function setIndicator(color) {
  //color and shadow
  indicator.style.backgroundColor = color;
  //shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}
//3. integer
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// 4 number
function generateRandomNumber() {
  // console.log("NUM");
  return getRndInteger(0, 9);
}
// 5 uppercse
function generateLowerCase() {
  // console.log("LLL");
  // we will get integere so have to convert to character
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
  // console.log("UPP");
  // we will get integere so have to convert to character
  return String.fromCharCode(getRndInteger(65, 91));
}
// 6  character charAt for charaacterr at that index
function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  // console.log("symbo");
  return symbols.charAt(randNum);  // I MISS HERE IN PARANTHESIS
}
//7 strength
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numberCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasLower && hasUpper && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6) {
    setIndicator("#ff0");
  }
  else {
    setIndicator("#f00");
  }

}
// 8 th
// ((await())) will only work when the asyn function is created 

async function copyContent() {
  //display run 
  //scale 0
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  }
  catch (e) {
    copyMsg.innerText = " failed";
  }
  // to make copy value of span visible
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}
//15th


function shufflePassword(array) {
  //Fisher Yates Method work on aray os we will require array
  for (let i = array.length - 1; i > 0; i--) {
    // random j finding 
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

//13 th
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });
  // special casse 
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
  }
  // call handleslide functiioon as the password length change 
  handleSlider();
}
//12 th
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
});

// 9th
inputSlider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

//10th to copy
copyBtn.addEventListener('click', () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});
//11th generate btn
generateBtn.addEventListener('click', () => {

});

// 14th  
generateBtn.addEventListener('click', () => {
  // none of the check box is selected
  if (checkCount == 0)
    return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  // let's start the journey to find new pass word
  // remove old password
  password = "";

  // lets put the stuff mentioned by check boxes

  // if (uppercaseCheck.checked) {
  //   password += generateUpperCase();
  // }
  // if (lowercaseCheck.checked) {
  //   password += generateLowerCase();
  // }
  // if (numberCheck.checked) {
  //   password += generateRandomNumber();
  // }
  // if (symbolsCheck.checked) {
  //   password += generateSymbol();
  // }

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  if (numberCheck.checked) {
    funcArr.push(generateRandomNumber);
  }
  if (symbolsCheck.checked) {
    funcArr.push(generateSymbol);
  }

  //compalasary addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  // remaining addition 

  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randindex = getRndInteger(0, funcArr.length);
    password += funcArr[randindex]();
  }

  //shuffle password
  password = shufflePassword(Array.from(password));

  // show in UI
  passwordDisplay.value = password;

  // to show strength()
  calcStrength();

});


