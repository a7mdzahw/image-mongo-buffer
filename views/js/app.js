const form = document.querySelector("form");
const fileInput = document.querySelector("form input");
const btn = document.getElementById("btn");

function readfile(file) {
  const img = new Image(300, 300);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    img.src = reader.result;
  };
  return img;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = new FormData();
  const file = fileInput.files[0];
  formdata.append("upload", file);
  fetch("/upload", {
    method: "post",
    body: formdata,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err.message));
  console.log("submitted");
});

btn.addEventListener("click", (e) => {
  fetch("/image/60c34798c93b9f66f9fc3bd2")
    .then((res) => {
      console.log("res", res);
      return res.blob();
    })
    .then((file) => {
      const div = document.getElementById("img");
      const img = readfile(file);
      div.appendChild(img);
    });
});
