"use strict";

// Default random array length
let randomArrayLength = 10;

// Function to update the array size from button clicks
const setArraySize = (size) => {
  randomArrayLength = size;
  alert(`Random array size set to ${randomArrayLength}. Click "Generate Random Array" to visualize.`);
};

const startVisualization = async () => {
  const customInput = document.getElementById("custom-array").value.trim();

  // Clear the screen
  await clearScreen();

  if (customInput) {
    // Handle custom input
    const customArray = customInput.split(",").map((num) => parseInt(num.trim(), 10));
    if (customArray.some(isNaN)) {
      alert("Invalid input. Please enter numbers separated by commas.");
      return;
    }
    renderArray(customArray);
  } else {
    // Handle random input based on the selected array size
    const sizeValue = Number(document.querySelector(".size-menu").value);
    if (sizeValue > 0) {
      const randomArray = generateRandomArray(sizeValue, 5, 50);
      renderArray(randomArray);
    } else {
      alert("Please select an array size.");
    }
  }
};


// Function to generate a random array
const generateRandomArray = (length, min, max) => {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    randomArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return randomArray;
};



// Function to render the array on the screen
const renderArray = (array) => {
  const arrayContainer = document.querySelector(".array");
  arrayContainer.innerHTML = ""; // Clear any existing bars

  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "cell";
    bar.style.height = `${value * 3}px`; // Scale height for visualization
    bar.setAttribute("value", value);
    arrayContainer.appendChild(bar);
  });
};

// Function to handle Array Size selection
const handleArraySizeChange = () => {
  const sizeMenu = document.getElementById("menu");
  const selectedSize = parseInt(sizeMenu.value, 10);

  if (selectedSize > 0) {
    randomArrayLength = selectedSize; // Update the global random array size
    const randomArray = generateRandomArray(randomArrayLength, 5, 50); // Range: 5-50
    renderArray(randomArray);
  }
};



//starts here
const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 4;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
};




const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
  const customInput = document.getElementById("custom-array").value.trim();
  const sizeValue = Number(document.querySelector(".size-menu").value);

  // Clear the screen
  await clearScreen();

  if (customInput) {
    // If custom input exists, render the custom array
    const customArray = customInput.split(",").map((num) => parseInt(num.trim(), 10));
    if (customArray.some(isNaN)) {
      alert("Invalid input. Please enter numbers separated by commas.");
      return;
    }
    renderArray(customArray);
  } else if (sizeValue > 0) {
    // Otherwise, render a random array with the selected size
    const randomArray = generateRandomArray(sizeValue, 5, 100); // Range: 5-100
    renderArray(randomArray);
  } else {
    alert("Please select an array size or provide custom input.");
  }
};


const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const customArrayInput = (input) => {
  const array = input.split(',').map(Number);
  RenderArray(array);
};


const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};


document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
// Add event listener to the Array Size dropdown
/*document
  .getElementById("menu")
  .addEventListener("change", handleArraySizeChange);
*/
window.onload = RenderScreen;
