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

// Find topic
const dropdownMenuElement = document.getElementById("dropdownMenu");
dropdownMenuElement.addEventListener("click", (event) => {
  const target = event.target;
  console.log(target);

  if (target.tagName === "LI") {
    const topic = target.id;
    window.location.href = `topic-wise.html?topic=${topic}`;
  }
});

const dropdownMenuElement2 = document.getElementById("dropdownMenu2");
dropdownMenuElement2.addEventListener("click", (event) => {
  const target = event.target;
  console.log(target);

  if (target.tagName === "LI") {
    const topic = target.id;
    console.log(topic);
    window.location.href = `topic-wise.html?topic=${topic}`;
  }
});

function showLoader() {
  const loader = document.getElementById("loader-container-search");
  if (loader.style.display === "none") {
    loader.style.display = "block";
  }
}

function hideLoader() {
  const loader = document.getElementById("loader-container-search");
  if (loader.style.display === "block") {
    loader.style.display = "none";
  }
}

// search book
const searchInput = document.getElementById("searchInput");
const bookInfo = document.getElementById("book-info");
let typingTimer;
const typingDelay = 1000;

searchInput.addEventListener("input", (event) => {
  const value = event.target.value.trim();
  console.log(value);

  // Clear the previous timer
  clearTimeout(typingTimer);

  // Set a new timer to call the API after 1 second
  typingTimer = setTimeout(() => {
    if (value && value.length > 2) {
      bookInfo.style.display = "block";
      showLoader();

      axios
        .get(`https://gutendex.com/books?search=${value}`)
        .then(function (response) {
          const data = response.data.results;
          console.log(data);

          bookInfo.innerHTML = "";

          data.map((book) => {
            console.log(book);
            const imageUrl =
              book.formats["image/jpeg"] || "/images/Image Not Found.jpg";
            const foundBook = document.createElement("div");

            foundBook.innerHTML = `
              <div class="book-data">
                <img src=${imageUrl} alt=${book.title} srcset="">
                <div>
                  <div>
                    <p id="book-data-title">Title: ${book.title}</p>
                  </div>
                  <a href="book.html?ids=${book.id}" target="_self">
                    <button id="book-data-btn">
                      Detail
                    </button>
                  </a>
                </div>
              </div>
            `;

            bookInfo.appendChild(foundBook);
          });
          hideLoader();
        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
        });
    } else {
      bookInfo.style.display = "none";
      bookInfo.innerHTML = "";
      hideLoader();
    }
  }, typingDelay);
});

// wishlist dot
function updateWishlistDot() {
  let wishlists = JSON.parse(localStorage.getItem("wishlists")) || [];

  const wishlistLargeButton = document.getElementById("wishlist-large");
  const wishlistSmallButton = document.getElementById("wishlist-small");
  if (wishlists.length > 0) {
    wishlistLargeButton.classList.add("has-items");
    wishlistSmallButton.classList.add("has-items");
  } else {
    wishlistLargeButton.classList.remove("has-items");
    wishlistSmallButton.classList.remove("has-items");
  }
}

// Call this function when the page loads
updateWishlistDot();
