(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const $window = $(window);
const $document = $(document);
$("body");
$window.on("scroll load", () => {
  const scrollTop = $window.scrollTop();
  const hasScrolled = scrollTop > 500;
  $(".js-show-on-scroll").toggleClass("is-visible", hasScrolled);
});
$(".js-nav-trigger").on("click", function(evt) {
  $(this).toggleClass("is-active");
  $(".nav").toggleClass("is-visible");
  evt.preventDefault();
});
$document.on("click touchstart", (evt) => {
  const $target = $(evt.target);
  if (!$target.closest(".header").length) {
    $(".nav").removeClass("is-visible");
    $(".js-nav-trigger").removeClass("is-active");
  }
});
const observerOptions = {
  rootMargin: "0px",
  threshold: 0.4
};
const observerCallback = (entries, observer2) => {
  entries.forEach((entry) => {
    const isVisible = entry.isIntersecting;
    if (isVisible) {
      $(entry.target).addClass("is-animated");
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
const animatedElements = document.querySelectorAll(".animate-in");
$window.on("load", () => {
  for (const element of animatedElements) {
    observer.observe(element);
  }
});
