document.addEventListener("DOMContentLoaded", () => {
  //  dropdown for large view
  // const dropdownButton = document.getElementById("dropdownButton");
  // const dropdownMenu = document.getElementById("dropdownMenu");

  // dropdownButton.addEventListener("click", (event) => {
  //   event.stopPropagation();
  //   if (
  //     dropdownMenu.style.display === "none" ||
  //     dropdownMenu.style.display === ""
  //   ) {
  //     dropdownMenu.style.display = "block";
  //   } else {
  //     dropdownMenu.style.display = "none";
  //   }
  // });

  // //  dropdown for mobile and tab view
  // const dropdownButton2 = document.getElementById("dropdownButton2");
  // const dropdownMenu2 = document.getElementById("dropdownMenu2");

  // dropdownButton2.addEventListener("click", (event) => {
  //   event.stopPropagation();
  //   if (
  //     dropdownMenu2.style.display === "none" ||
  //     dropdownMenu2.style.display === ""
  //   ) {
  //     dropdownMenu2.style.display = "block";
  //   } else {
  //     dropdownMenu2.style.display = "none";
  //   }
  // });

  //   all books with pages and loader
  let nextPageUrl = "https://gutendex.com/books";
  let previousPageUrl = null;

  function showLoader() {
    document.getElementById("loader-container").style.display = "block";
  }

  function hideLoader() {
    document.getElementById("loader-container").style.display = "none";
  }

  function fetchBooks(url) {
    showLoader();
    document.getElementById("book-list").innerHTML = "";
    axios
      .get(url)
      .then(function (response) {
        const books = response.data.results;
        console.log(books);
        const bookListDiv = document.getElementById("book-list");

        books.forEach((book) => {
          const imageUrl =
            book.formats["image/jpeg"] || "/assets/images/Image Not Found.jpg";

          const bookDiv = document.createElement("div");
          bookDiv.innerHTML = `
          <div class="card-layout" style="">
            <div>
              <img
                class="card-layout-img"
                src="${imageUrl}"
                alt="${book.title}"
              />
              <h3
                class="card-layout-title"
              >
                ${book.title}
              </h3>
              <p class="card-layout-author">
                Author: ${book.authors.map((author) => author.name).join(", ")}
              </p>
            </div>
            <a href="http://127.0.0.1:5500/book.html?ids=${book.id}">
              <button
                class="card-detail-btn"
                onclick="detail('${book.id}')"
              >
                Details
              </button>
            </a>
          </div>
          `;
          const detailsButton = bookDiv.querySelector("button"); // Select button
          detailsButton.addEventListener("click", function () {
            detail(book.id);
          });
          bookListDiv.appendChild(bookDiv);
        });

        nextPageUrl = response.data.next;
        previousPageUrl = response.data.previous;

        const nextButton = document.getElementById("next");
        if (nextPageUrl) {
          nextButton.style.display = "inline-block";
        } else {
          nextButton.style.display = "none";
        }

        const previousButton = document.getElementById("previous");
        if (previousPageUrl) {
          previousButton.style.display = "inline-block";
        } else {
          previousButton.style.display = "none";
        }

        hideLoader();
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        hideLoader();
      });
  }

  fetchBooks(nextPageUrl);

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
});
