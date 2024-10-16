document.addEventListener("DOMContentLoaded", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("ids"));
  detail(urlParams.get("ids"));
  function detail(id) {
    showLoader();
    console.log("aaaa", id);

    axios
      .get(`https://gutendex.com/books?ids=${id}`)
      .then(function (response) {
        console.log(response.data.results[0]);
        // handle success
        const bookInfo = response.data.results[0];
        const imageUrl =
          bookInfo.formats["image/jpeg"] ||
          "/assets/images/Image Not Found.jpg";
        const downloadUrl = bookInfo.formats["application/octet-stream"] || "";
        const readingUrl =
          bookInfo.formats["text/plain; charset=us-ascii"] || "";
        const bookDiv = document.getElementById("book");
        const book = document.createElement("div");
        book.innerHTML = `
              <div class="book-details-layout">
                <img
                  src="${imageUrl}"
                  alt=""
                  class="book-image"
                />
                <div class="book-info-area">
                  <div>
                    <p class="title">Title: ${bookInfo.title}</p>
                    <p class="author">Author: ${bookInfo.authors
                      .map((author) => author.name)
                      .join(", ")}</p>
                    <p class="id">Id: ${bookInfo.id}</p>
                  </div>
                  <div class="download-online">
                    <a href="${downloadUrl}" rel="noopener noreferrer">
                      <button class="download">Download</button>
                    </a>
                    <a href="${readingUrl}" rel="noopener noreferrer">
                      <button class="online-reading">Online Reading</button>
                    </a>
                  </div>
                </div>
              </div>
              `;

        bookDiv.appendChild(book);

        hideLoader();
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        hideLoader();
      });
  }

  function showLoader() {
    document.getElementById("loader-container").style.display = "block";
  }

  function hideLoader() {
    document.getElementById("loader-container").style.display = "none";
  }

  //  dropdown for large view
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  dropdownButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (
      dropdownMenu.style.display === "none" ||
      dropdownMenu.style.display === ""
    ) {
      dropdownMenu.style.display = "block";
    } else {
      dropdownMenu.style.display = "none";
    }
  });

  //  dropdown for mobile and tab view
  const dropdownButton2 = document.getElementById("dropdownButton2");
  const dropdownMenu2 = document.getElementById("dropdownMenu2");

  dropdownButton2.addEventListener("click", (event) => {
    event.stopPropagation();
    if (
      dropdownMenu2.style.display === "none" ||
      dropdownMenu2.style.display === ""
    ) {
      dropdownMenu2.style.display = "block";
    } else {
      dropdownMenu2.style.display = "none";
    }
  });
});
