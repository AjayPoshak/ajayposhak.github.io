(function() {
  const sideBarBtn = document.getElementById("js-sidebar-btn"),
    sideBar = document.getElementById("js-sideBar");

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
})();
