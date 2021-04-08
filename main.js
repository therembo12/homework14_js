let $gallery = document.querySelector(".gallery");
$slider = document.querySelector(".slider");
$list = document.querySelector(".list");
$image_list = document.querySelector(".image-list");

let $right_big_arrow = document.createElement("SPAN");
$right_big_arrow.classList.add("rba");
$right_big_arrow.innerHTML = "&#10148;";
$slider.appendChild($right_big_arrow);
let $right_small_arrow = document.createElement("SPAN");
$right_small_arrow.classList.add("rsa");
$right_small_arrow.innerHTML = "&#10148;";
$list.appendChild($right_small_arrow);

let $left_big_arrow = document.createElement("SPAN");
$left_big_arrow.classList.add("lba");
$left_big_arrow.innerHTML = "&#10148;";
$slider.appendChild($left_big_arrow);
let $left_small_arrow = document.createElement("SPAN");
$left_small_arrow.classList.add("lsa");
$left_small_arrow.innerHTML = "&#10148;";
$list.appendChild($left_small_arrow);

function load() {
  let url =
    "https://pixabay.com/api/?key=20964841-3e9ea1f4de7242e72edc23091&q=car&image_type=photo";

  let GET_Server = new XMLHttpRequest();
  GET_Server.open("GET", url);
  GET_Server.send();
  GET_Server.onload = function () {
    if (GET_Server.status !== 200) {
      console.log("Error loading data!!!");
    } else {
      let data = JSON.parse(GET_Server.response).hits;
      get_list(data);
    }
  };
}
function get_list(images) {
  for (image of images) {
    const $LI = document.createElement("LI");
    $LI.style.backgroundImage = `url(${image.webformatURL})`;
    $image_list.appendChild($LI);
  }
  let $images = document.querySelectorAll(".image-list li"),
    prev = 0,
    $images_width = $images[0].getBoundingClientRect().width,
    $image_listPosition = 0,
    $image_listWidth = $images_width * $images.length;
  $list.style.width = $images_width * 5 + 2 + "px";
  $gallery.style.width = $list.style.width;
  activeImage(0, $images);
  for (let i = 0; i < $images.length; i++) {
    $images[i].addEventListener("click", () => {
      activeImage(i, $images);
    });
  }
  $right_small_arrow.addEventListener("click", () => {
    $image_listPosition = $image_listPosition - $images_width;
    if ($image_listPosition < -($image_listWidth - $images_width * 5)) {
      $image_listPosition = 0;
    }
    $image_list.style.left = $image_listPosition + "px";
  });
  $left_small_arrow.addEventListener("click", () => {
    $image_listPosition = $image_listPosition + $images_width;
    if ($image_listPosition > 0) {
      $image_listPosition = -($image_listWidth - $images_width * 5);
    }
    $image_list.style.left = $image_listPosition + "px";
  });

  $left_big_arrow.addEventListener("click", () => {
    // $image_listPosition = $image_listPosition + $images_width;
    // if ($image_listPosition > 0) {
    //   $image_listPosition = -($image_listWidth - $images_width * 8)+150;
    // }
    // $image_list.style.left = $image_listPosition + "px";
    if (prev <= 0) {
      prev = 0;
      activeImage($images.length - 1, $images);
    } else {
      activeImage(prev - 1, $images);
    }
    -($image_listPosition = prev * $images_width);
    if ($image_listPosition >= $image_listWidth) {
      -($image_listPosition = -(prev * $images_width)) + "px";
    }
    if ($image_listPosition >= $image_listWidth + $images_width) {
      -($image_listPosition = prev * $images_width);
    }
    $image_list.style.left = -$image_listPosition + "px";
  });

  $right_big_arrow.addEventListener("click", () => {
    if (prev >= $images.length - 1) {
      prev = 0;
      activeImage(prev, $images);
    } else {
      activeImage(prev + 1, $images);
    }

    $image_listPosition = prev * $images_width;
    if ($image_listPosition >= $image_listWidth) {
      $image_listPosition = prev * $images_width;
    }
    $image_list.style.left = -$image_listPosition + "px";
  });
  function activeImage(index, list) {
    $slider.style.backgroundImage = list[index].style.backgroundImage;
    list[index].classList.add("active");
    if (prev >= 0 && prev !== index) {
      list[prev].classList.remove("active");
    }
    prev = index;
  }
}
load();
// $image_listPosition = $image_listPosition - $images_width;
// if ($image_listPosition == -image_listWidth) {
//   $image_listPosition = 0;
// }
// if ($image_listPosition > -image_listWidth + $images_width * 4) {
//   $image_list.style.left = $image_listPosition + "px";
// }
// if ($image_listPosition > image_listWidth){
//   $image_listPosition
// }
