// navbar.js

const menu = document.getElementById("small-screen-menu");
const menuDetail = document.getElementById("navbar-menu-dropdown");

menu?.addEventListener("click", (event) => {
  if (menuDetail.style.display === "none" || menuDetail.style.display === "") {
    menuDetail.style.display = "block";
  } else {
    menuDetail.style.display = "none";
  }
});

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
