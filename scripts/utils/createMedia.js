function createMedia(data) {
  const { name, image, video, title } = data;
  if (image && image != "undefined") {
    const $img = document.createElement("img");
    $img.setAttribute("src", `assets/images/${name}/${image}`);
    $img.setAttribute("alt", `${name} ${title}`);
    return $img;
  } else {
    const $video = document.createElement("video");
    $video.setAttribute("src", `assets/images/${name}/${video}`);
    $video.setAttribute("title", title);
    return $video;
  }
}
