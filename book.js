document.addEventListener("DOMContentLoaded", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  detail(urlParams.get("ids"));

  function detail(id) {
    showLoader();

    axios
      .get(`https://gutendex.com/books?ids=${id}`)
      .then(function (response) {
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
  // functions
  function showLoader() {
    document.getElementById("loader-container").style.display = "block";
  }

  // functions
  function hideLoader() {
    document.getElementById("loader-container").style.display = "none";
  }
});
