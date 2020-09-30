const container = document.getElementById("container");
const loading = document.querySelector(".loading");

var index = 0;

fetch(
  "https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/sunilkrbajpai/ecom/master/db.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Work with JSON data here
    // console.log(data);

    // show initial 10 colleges details
    for (let i = 0; i < 10; i++, index++) {
      let x = { post: data.colleges[index] };
      console.log(x);
      addDataToDOM(x);
    }

    // on scroll to bottom function
    window.onscroll = function (ev) {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        if (index < data.colleges.length) {
          console.log("called loading", data.colleges.length);
          //show animation
          showLoading();
        } else {
          loading.classList.remove("show");
        }
      }
    };

    function showLoading() {
      loading.classList.add("show");
      console.log("show loading called", index);
      setTimeout(callData, 2000);
    }

    function callData() {
      for (let i = 0; i < 10, index < 50; i++, index++) {
        let x = { post: data.colleges[index] };
        console.log(x);
        addDataToDOM(x);
      }
      loading.classList.remove("show");
    }
  })
  .catch((err) => {
    alert("Not able to fetch data !", err);
    // Do something for an error here
  });

function addDataToDOM(data) {
  const postElement = document.createElement("div");
  postElement.classList.add("blog-post");
  // <p class="ribbon">Promoted</p>

  postElement.innerHTML = `
  <p class="ribbon">Promoted</p>
    <img src=${data.post.image} class="image"/>
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

  loading.classList.remove("show");
}