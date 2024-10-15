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
        console.log(books);
        const bookListDiv = document.getElementById("book-list");

        books.forEach((book) => {
          const imageUrl =
            book.formats["image/jpeg"] || "/assets/images/Image Not Found.jpg";

          const bookDiv = document.createElement("div");
          bookDiv.innerHTML = `
            <div style="height: 450px; padding: 10px; background-color: white; border: 1px solid #e5e7eb; border-radius: 8px;">
              <img src="${imageUrl}" alt="" style="height: 150px; width: 100px; border-radius: 4px;" />
              <h3 style="font-size: 18px; margin-top: 10px;">${book.title}</h3>
              <p style="color: gray;">Author: ${book.authors
                .map((author) => author.name)
                .join(", ")}</p>
                <a href="http://127.0.0.1:5500/book.html?ids=${book.id}">
                <button onclick="detail('${
                  book.id
                }')" style="padding: 2px 6px 2px 6px; background: white; color: black; border: 1px solid #e5e7eb; border-radius: 4px;">Details</button>
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

  function detail(id) {
    console.log("aaaa", id);
    // document.getElementById("body").style.display = "none";
    // document.getElementById("search-result-area").style.display = "none";
    // document.getElementById("productDetail").style.visibility = "visible";

    axios.get(`https://gutendex.com/books?ids=${id}`).then(function (response) {
      console.log(response);
      // handle success
      // const product = response.data.data;
      // console.log("AAA:", product);
      // let cardDogDiv = document.createElement("div");
      // cardDogDiv.innerHTML = `
      //                         <div class=" row border border-2 align-items-center justify-content-lg-around">
      //                             <div class="col-12 col-lg-2" style="width: 300px; height: 250px;">
      //                                 <img class="w-100 h-100" src="${product.imageUrl}" alt="" srcset="">
      //                             </div>
      //                             <div class="col-12 col-lg-9 py-3">
      //                                 <h2>Product Name: ${product.name}</h2>
      //                                 <h5>Product Price: ${product.price} tk</h5>
      //                                 <p><span class="fw-bolder fs-5">Description: </span> ${product.description}</p>
      //                             </div>
      //                         </div>
      //                                 `;
      // document
      //   .getElementsByClassName("product-detail")[0]
      //   .appendChild(cardDogDiv);
    });
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // .finally(function () {
    //   // always executed
    // });
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
