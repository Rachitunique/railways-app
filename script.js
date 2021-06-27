let rail1 = document.querySelector(".raileouter");
let rail2 = document.querySelector(".customerouter");
rail1.addEventListener("mouseover", function () {
  rail1.style.background = "url(./railemp.jpg)";
});
rail1.addEventListener("mouseout", function () {
  rail1.style.background = "none";
});
rail2.addEventListener("mouseover", function () {
    rail2.style.background = "url(./railcust.jpg)";
});
rail2.addEventListener("mouseout", function () {
    rail2.style.background = "none";
});
rail1.addEventListener("click", function () {
    location.assign("raile.html");
});
rail2.addEventListener("click", function () {
    location.assign("customer.html");
});
