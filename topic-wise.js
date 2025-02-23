// Helper function to get query parameter from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Initialize the wishlists array from localStorage (or empty array)
let wishlists = JSON.parse(localStorage.getItem("wishlists")) || [];

function showTopicLoader() {
  const loader = document.getElementById("loader-container");
  if (loader.style.display === "none" || loader.style.display === "") {
    loader.style.display = "block";
  }
}

function hideTopicLoader() {
  const loader = document.getElementById("loader-container");
  if (loader.style.display === "block") {
    loader.style.display = "none";
  }
}

let topic = "";

window.onload = function () {
  topic = getQueryParam("topic");

  if (topic) {
    fetchTopic(topic);
  } else {
    document.getElementById(
      "book-list"
    ).innerHTML = `<p>Topic not found in URL</p>`;
  }
};

function fetchTopic(topic) {
  showTopicLoader();
  const apiUrl = `https://gutendex.com/books?topic=${topic}`;
  axios
    .get(apiUrl)
    .then(function (response) {
      const books = response.data.results;

      displayBooks(books);
      hideTopicLoader();
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
      hideTopicLoader();
    });
}

function displayBooks(books) {
  const bookListDiv = document.getElementById("book-list");

  if (books.length > 0) {
    books.forEach((book) => {
      const imageUrl =
        book.formats["image/jpeg"] || "/assets/images/Image Not Found.jpg";
      const bookId = book.id;

      const bookDiv = document.createElement("div");
      bookDiv.innerHTML = `
      <div class="card-layout">
      <div>
      <h1 style="font-weight: 700; margin-bottom: 20px;">${topic}</h1>
      <img class="card-layout-img" src="${imageUrl}" alt="${book.title}" />
              <h3 class="card-layout-title">${book.title}</h3>
              <p class="card-layout-author">
              Author: ${book.authors.map((author) => author.name).join(", ")}
              </p>
              </div>
              <div style="display: flex; gap: 8px;">
              <a href="book.html?ids=${bookId}">
              <button class="card-detail-btn">Details</button>
              </a>
              <button id="wishlist-btn-${bookId}" class="wishlist-btn">
              <img src="/icons/red-heart${
                isBookInWishlist(bookId) ? "-fill" : ""
              }.svg" alt="" />
                </button>
                </div>
                </div>
                `;
      bookListDiv.appendChild(bookDiv);

      const wishlistButton = document.getElementById(`wishlist-btn-${bookId}`);
      wishlistButton.addEventListener("click", () => {
        if (isBookInWishlist(bookId)) {
          remove(bookId);
        } else {
          add(book);
        }
      });
    });
  } else {
    document.getElementById(
      "book-list"
    ).innerHTML = `<p>No books available for topic: ${topic}</p>`;
  }
}

function isBookInWishlist(bookId) {
  return wishlists.some((book) => book.id === bookId);
}

function add(book) {
  wishlists.push(book);
  localStorage.setItem("wishlists", JSON.stringify(wishlists));
  updateButton(book.id);
  updateWishlistDot();
}

function remove(bookId) {
  wishlists = wishlists.filter((book) => book.id !== bookId);
  localStorage.setItem("wishlists", JSON.stringify(wishlists));
  updateButton(bookId);
  updateWishlistDot();
}

function updateButton(bookId) {
  const wishlistButton = document.getElementById(`wishlist-btn-${bookId}`);
  if (wishlistButton) {
    const isInWishlist = isBookInWishlist(bookId);
    wishlistButton.innerHTML = `
        <img src="/icons/red-heart${isInWishlist ? "-fill" : ""}.svg" alt="" />
      `;
  }
}
