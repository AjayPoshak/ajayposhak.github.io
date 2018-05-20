(function() {
  const videoURLs = [{
        type: 'mp4',
        URL: 'http://res.cloudinary.com/ddbxa4afa/video/upload/ac_none/v1526734008/WhatsApp_Video_2018-05-19_at_3.14.30_PM_k6f5aw.mp4'
    }, {
        type: 'webm',
        URL: 'http://res.cloudinary.com/ddbxa4afa/video/upload/ac_none,c_scale,q_auto:eco,w_414/v1526734008/WhatsApp_Video_2018-05-19_at_3.14.30_PM_k6f5aw.webm'
    }];
  const sideBarBtn = document.getElementById("js-sidebar-btn"),
    sideBar = document.getElementById("js-sideBar"),
    videoElement = document.getElementsByTagName('video')

  sideBarBtn.addEventListener("click", clickHandler, false);
  sideBar.addEventListener("click", clickHandler, false);

  function clickHandler() {
    if (sideBar.classList.contains("close-sidebar")) {
      sideBar.classList.remove("close-sidebar");
      sideBar.classList.add("open-sidebar");
    } else {
      sideBar.classList.remove("open-sidebar");
      sideBar.classList.add("close-sidebar");
    }
  }

  if (videoElement) {
      for (let i = 0; i < videoURLs.length; i++) {
          const source = document.createElement('source');
          source.src = videoURLs[i].URL;
          source.type = `video/${videoURLs[i].type}`
          videoElement.appendChild(source);
      }
    }
})();
