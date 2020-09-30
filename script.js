const container = (element = document.getElementById("container"));
const loading = document.querySelector(".loading");

let lastLoaded = true;
var index = 0;
fetch(
  "https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/sunilkrbajpai/ecom/master/db.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Work with JSON data here

    // show initial 10 colleges details
    for (let i = 0; i < 10; i++, index++) {
      let x = { post: data.colleges[index] };
      addDataToDOM(x);
    }

    // on scroll to bottom function
    window.onscroll = function (ev) {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        if (lastLoaded) {
          lastLoaded = false;
          if (index < data.colleges.length - 1) showLoading();
          // if (index >= 49) loading.classList.remove("show");
        }
      }
    };

    // show loading image and call function to append data
    function showLoading() {
      loading.classList.add("show");
      setTimeout(callData, 2000);
    }

    // add data to DOM
    function callData() {
      for (let i = 0; i < 10; i++, index++) {
        let x = { post: data.colleges[index] };
        addDataToDOM(x);
      }
      lastLoaded = true;
    }
  })
  .catch((err) => {
    // Do something for an error here
    alert("Not able to fetch data !", err);
  });

// add data to DOM within container
function addDataToDOM(data) {
  const postElement = document.createElement("div");
  postElement.classList.add("blog-post");

  postElement.innerHTML = `
  <p class="ribbon">Promoted</p>
    <img src=assets/${data.post.image} class="image"/>
    <span class="tags">${data.post.tags[0]}</span>
    <span class="rank">#${data.post.ranking}</span>
    <span class="rating">${data.post.rating}/5 </span>
    <h2 class="title">${data.post.college_name}</h2>
    <span> ${data.post.nearest_place[0]} |</span>
    <span class="discount">${data.post.discount}</span>
    <span class="original">&#x20B9;${data.post.original_fees}</span>  
    <span class="discountedFees">&#x20B9;${data.post.discounted_fees}</span>
    <span class="cycle">${data.post.fees_cycle}</span>

    <span class="nearest">${data.post.nearest_place[1]}</span><br>
    <p><span class="colortext">93% Match:</span> ${data.post.famous_nearest_places}</p><br/>
    <p><span class="offer">${data.post.offertext}</span>  <span class="amenties"> ${data.post.amenties[0]}, ${data.post.amenties[1]}</span></p>
    `;
  container.appendChild(postElement);

  // hide loader
  loading.classList.remove("show");
}
