// player count
function playerCount(player) {
  const listDecimal = document.querySelectorAll(player);
  for (let child of listDecimal) {
    const childLength = child.children;
    return childLength;
  }
}

// input filed value catch by function
// Function to check and retrieve the input field value
function inputFieldById(inputId) {
  const inputField = document.getElementById(inputId);
  let inputValue = inputField.value.trim();

  // Check if the input value is not empty and contains only numbers
  if (!/^\d*$/.test(inputValue)) {
    alert("Please enter only numbers");
    inputField.value = ""; // Clear the input field
    return; // Exit function
  }

  // Convert the input value to a number
  const perPlayerCost = parseInt(inputValue);

  // Check if the parsed value is a valid number
  if (isNaN(perPlayerCost)) {
    alert("Please enter a valid number");
    inputField.value = ""; // Clear the input field
    return; // Exit function
  }

  // Clear the input field for the next input
  inputField.value = "";

  // Return the parsed number
  return perPlayerCost;
}

// display result
function display(userId, value) {
  const user = document.getElementById(userId);
  user.innerText = value;
}
