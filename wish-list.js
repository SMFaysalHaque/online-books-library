document.addEventListener("DOMContentLoaded", () => {
  let previousPageUrl = null;

  let wishlists = JSON.parse(localStorage.getItem("wishlists")) || [];

  function showLoader() {
    document.getElementById("loader-container").style.display = "block";
  }

  function hideLoader() {
    document.getElementById("loader-container").style.display = "none";
  }

  function fetchBooks(url) {
    showLoader();
    const bookListDiv = document.getElementById("wishlists");
    bookListDiv.innerHTML = ""; // Clear existing content

    if (url.length > 0) {
      url.forEach((book) => {
        const imageUrl =
          book.formats["image/jpeg"] || "/assets/images/Image Not Found.jpg";
        const downloadUrl = book.formats["application/octet-stream"] || "";
        const readingUrl = book.formats["text/plain; charset=us-ascii"] || "";
        const bookId = book.id;

        const bookDiv = document.createElement("div");
        bookDiv.innerHTML = `
                              <div id="wishlist-layout-${bookId}">
                                  <img
                                  id="wishlist-img"
                                  src="${imageUrl}"
                                  alt=""
                                  />
                                  <div class="book-info-area">
                                      <div>
                                          <p class="title">Title: ${
                                            book.title
                                          }</p>
                                          <p class="author">
                                          Author: ${book.authors
                                            .map((author) => author.name)
                                            .join(", ")}
                                          </p>
                                          <p class="id">Id: ${book.id}</p>
                                      </div>
                                      <div class="download-online">
                                          <a href="${downloadUrl}" rel="noopener noreferrer">
                                          <button class="download">Download</button>
                                          </a>
                                          <a href="${readingUrl}" rel="noopener noreferrer">
                                          <button class="online-reading">Online Reading</button>
                                          </a>
                                          <button id="wishlist-btn-${bookId}" class="wishlist-btn">
                                          <img src="/icons/red-heart${
                                            isBookInWishlist(bookId)
                                              ? "-fill"
                                              : ""
                                          }.svg" alt="" />
                                          </button>
                                      </div>
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
    } else {
      bookListDiv.innerHTML = `<h1 id="no-wish"><p>No wishes</p> <img src="/icons/sad.svg" alt="" />!!!</h1>`;
    }

    hideLoader();
  }

  function isBookInWishlist(bookId) {
    return wishlists.some((book) => book.id === bookId);
  }

  function add(book) {
    wishlists.push(book);
    localStorage.setItem("wishlists", JSON.stringify(wishlists));
    updateWishlist();
    updateWishlistDot();
  }

  function remove(bookId) {
    wishlists = wishlists.filter((book) => book.id !== bookId);
    localStorage.setItem("wishlists", JSON.stringify(wishlists));
    updateWishlist();
    updateWishlistDot();
  }

  function updateWishlist() {
    fetchBooks(wishlists);
  }

  fetchBooks(wishlists);
});
