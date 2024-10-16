// navbar.js

// Dropdown for large view
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownButton?.addEventListener("click", (event) => {
  if (
    dropdownMenu.style.display === "none" ||
    dropdownMenu.style.display === ""
  ) {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
});

// Dropdown for mobile and tablet view
const dropdownButton2 = document.getElementById("dropdownButton2");
const dropdownMenu2 = document.getElementById("dropdownMenu2");

dropdownButton2?.addEventListener("click", (event) => {
  if (
    dropdownMenu2.style.display === "none" ||
    dropdownMenu2.style.display === ""
  ) {
    dropdownMenu2.style.display = "block";
  } else {
    dropdownMenu2.style.display = "none";
  }
});
