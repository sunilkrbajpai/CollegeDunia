const container = document.getElementById("container");
const loading = document.querySelector(".loading");

var index = 1;

// $(function () {
//   // scroll all the way down
//   $("html, body").scrollTop($(document).height() - ($(window).height() + 280));
//   alert("scrolled");
// });

// window.addEventListener("scroll", () => {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//   console.log({ scrollTop, scrollHeight, clientHeight });

//   if (clientHeight + scrollTop >= scrollHeight) {
//     if (index <= 100)
//       // show the loading animation
//       showLoading();
//   }
// });

window.onscroll = function (ev) {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    if (index <= 100)
      // show the loading animation
      showLoading();
  }
};

function showLoading() {
  loading.classList.add("show");
  callData();
}

function callData() {
  for (let i = 0; i < 10; i++) {
    console.log("callData called", i);
    console.log("getPost index called", index);
    getPost();
  }

  console.log("-------------------------------------------------");
}

async function getPost() {
  if (index <= 100) {
    const postResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${index++}`
    );

    const postData = await postResponse.json();

    const data = { post: postData };

    addDataToDOM(data);
  }
}

function addDataToDOM(data) {
  const postElement = document.createElement("div");
  postElement.classList.add("blog-post");
  postElement.innerHTML = `
		<h2 class="title">${data.post.title}</h2>
		<h2 class="title">${data.post.id}</h2>
		<p class="text">${data.post.body}</p>
	`;
  container.appendChild(postElement);

  loading.classList.remove("show");
}

callData();
