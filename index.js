document.addEventListener("DOMContentLoaded", () => {
  let nextPageUrl = "https://gutendex.com/books";
  let previousPageUrl = null;

  let wishlists = JSON.parse(localStorage.getItem("wishlists")) || [];

  function showLoader() {
    document.getElementById("loader-container").style.display = "block";
    document.querySelector(".pagination-buttons").style.display = "none";
  }

  function hideLoader() {
    document.getElementById("loader-container").style.display = "none";
    document.querySelector(".pagination-buttons").style.display = "flex";
  }

  function fetchBooks(url) {
    showLoader();
    document.getElementById("book-list").innerHTML = "";
    axios
      .get(url)
      .then(function (response) {
        const books = response.data.results;
        const bookListDiv = document.getElementById("book-list");

        books.forEach((book) => {
          const imageUrl =
            book.formats["image/jpeg"] || "/assets/images/Image Not Found.jpg";
          const bookId = book.id;

          const bookDiv = document.createElement("div");
          bookDiv.innerHTML = `
          <div class="card-layout" style="">
            <div>
              <img
                class="card-layout-img"
                src="${imageUrl}"
                alt="${book.title}"
              />
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

          const wishlistButton = document.getElementById(
            `wishlist-btn-${bookId}`
          );
          wishlistButton.addEventListener("click", () => {
            if (isBookInWishlist(bookId)) {
              remove(bookId);
            } else {
              add(book);
            }
          });
        });

        nextPageUrl = response.data.next;
        previousPageUrl = response.data.previous;

        updatePaginationButtons();
        hideLoader();
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        hideLoader();
      });
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

  function updatePaginationButtons() {
    const nextButton = document.getElementById("next");
    const previousButton = document.getElementById("previous");

    if (nextPageUrl) {
      nextButton.removeAttribute("disabled");
    } else {
      nextButton.setAttribute("disabled", true);
    }

    if (previousPageUrl) {
      previousButton.removeAttribute("disabled");
    } else {
      previousButton.setAttribute("disabled", true);
    }
  }

  document.getElementById("next").addEventListener("click", function () {
    if (nextPageUrl) {
      fetchBooks(nextPageUrl);
    }
  });

  document.getElementById("previous").addEventListener("click", function () {
    if (previousPageUrl) {
      fetchBooks(previousPageUrl);
    }
  });

  fetchBooks(nextPageUrl);
});
