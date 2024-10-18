document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("small-screen-menu");
  const menuDetail = document.getElementById("navbar-menu-dropdown");

  menu?.addEventListener("click", (event) => {
    if (
      menuDetail.style.display === "none" ||
      menuDetail.style.display === ""
    ) {
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

  // Book suggestions
  const searchInput = document.getElementById("searchInput");
  const suggestionsDropdown = document.getElementById("suggestionsDropdown");

  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();

    if (query.length === 0) {
      suggestionsDropdown.style.display = "none";
      return;
    }

    try {
      const response = await fetch(
        `https://gutendex.com/books?search=${query}`
      );
      const data = await response.json();
      const books = data.results;

      if (books.length > 0) {
        // Clear previous suggestions
        suggestionsDropdown.innerHTML = "";
        suggestionsDropdown.style.display = "block";

        books.forEach((book) => {
          const suggestionItem = document.createElement("p");
          suggestionItem.textContent = `${book.title} by ${book.authors
            .map((author) => author.name)
            .join(", ")}`;
          suggestionItem.addEventListener("click", () => {
            searchInput.value = book.title;
            suggestionsDropdown.style.display = "none";
          });
          suggestionsDropdown.appendChild(suggestionItem);
        });
      } else {
        suggestionsDropdown.innerHTML = "<p>No results found</p>";
      }
    } catch (error) {
      console.error("Error fetching book suggestions:", error);
      suggestionsDropdown.innerHTML = "<p>Failed to fetch suggestions</p>";
    }
  });

  // Close the dropdown if clicked outside
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".navbar-search") &&
      !event.target.closest(".suggestions-dropdown")
    ) {
      suggestionsDropdown.style.display = "none";
    }
  });
});
