document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (event) => {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

  //  dropdown for mobile view
  const dropdownButton2 = document.getElementById("dropdownButton2");
  const dropdownMenu2 = document.getElementById("dropdownMenu2");

  dropdownButton2.addEventListener("click", () => {
    dropdownMenu2.classList.toggle("hidden");
  });

  document.addEventListener("click", (event) => {
    if (
      !dropdownButton2.contains(event.target) &&
      !dropdownMenu2.contains(event.target)
    ) {
      dropdownMenu2.classList.add("hidden");
    }
  });

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
        const bookListDiv = document.getElementById("book-list");

        books.forEach((book) => {
          const bookDiv = document.createElement("div");
          bookDiv.innerHTML = `<h3>${book.title}</h3>
                                 <p>Author: ${book.authors
                                   .map((author) => author.name)
                                   .join(", ")}</p>`;
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
