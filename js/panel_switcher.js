import data from "./data.js";

$(document).ready(function () {
  //----------------- Panel Switcher --------------------

  // Remove panel click anywhere on window
  $(window).on("click", () => {
    $(".panel").removeClass("active");
  });

  $("#panel-switcher").on("click", (event) => {
    //Tránh bị đè bởi onCLick của window
    event.stopPropagation();
    $(".panel").toggleClass("active");
  });

  $("#panel").on("click", function (event) {
    event.stopPropagation();
  });

  //----------------- Change Navigation Position -------------------

  $("#main-nav-position").on("click", "a", function () {
    let selectorNavPosition = $(this).data("id");
    let pageHeader = $("#page-header");
    let pageResume = $("#page-resume");

    //Add css to nav position
    $("#main-nav-position a").removeClass("current-nav-position");
    $(this).addClass("current-nav-position");

    pageResume.removeClass(function () {
      return $(this).attr("class");
    });

    pageResume.addClass(`page-resume ${selectorNavPosition}`);

    //Add animation to header
    pageHeader.removeClass(function () {
      return $(this).attr("class");
    });

    selectorNavPosition === "layout-menu-left"
      ? pageHeader.addClass(
          "page-header animate__animated animate__fadeInLeft header__hide"
        )
      : selectorNavPosition === "layout-menu-top"
      ? pageHeader.addClass(
          "page-header animate__animated animate__fadeInDown header__hide"
        )
      : pageHeader.addClass(
          "page-header animate__animated animate__fadeInUp header__hide"
        );
  });

  //----------------- Chang Sub Page ---------------------------

  $(".header__menu").on("click", "li a", function () {
    let selectorSubPage = $(this).data("id");

    let pageHeader = $("#page-header");
    let subPage = $(".sub-page");
    let subHome = $(".sub-home");
    let subAboutMe = $(".sub-about");
    let subResume = $(".sub-resume");
    let subPortfolio = $(".sub-portfolio");
    let subContact = $(".sub-contact");

    //Add css active to menu
    $(".header__menu li a").removeClass("active");
    $(this).addClass("active");

    //
    subPage.removeClass(function (index, className) {
      return (className.match(/(^|\s)ac\S+/g) || []).join(" ");
    });

    subPage.removeClass(function (index, className) {
      return (className.match(/(^|\s)animate__\S+/g) || []).join(" ");
    });

    if (selectorSubPage === "home") {
      subHome.addClass("active animate__animated animate__fadeIn");
      pageHeader.addClass("header__hide");
    } else if (selectorSubPage === "about") {
      subAboutMe.addClass("active animate__animated animate__fadeInRight");
      pageHeader.addClass("header__hide");
    } else if (selectorSubPage === "resume") {
      subResume.addClass("active animate__animated animate__fadeInDown");
      pageHeader.addClass("header__hide");
    } else if (selectorSubPage === "portfolio") {
      subPortfolio.addClass("active animate__animated animate__fadeInUp");
      pageHeader.addClass("header__hide");
    } else {
      subContact.addClass("active animate__animated animate__fadeInLeft");
      pageHeader.addClass("header__hide");
    }
  });

  //------------------ Toggle Mobile Header ------------------

  $(".menu__toggle").on("click", function () {
    let pageHeader = $("#page-header");
    pageHeader.toggleClass("header__hide");
  });

  //----------------- Change Color Main ----------------------

  $("#main-color").on("click", "a", function () {
    let selectorColor = $(this).data("id");

    let color =
      selectorColor === "red"
        ? "#ff724c"
        : selectorColor === "blue"
        ? "#007bff"
        : selectorColor === "green"
        ? "#8bcf00"
        : selectorColor === "orange"
        ? "#fd9129"
        : selectorColor === "yellow"
        ? "#e5be24"
        : "#9161e0";

    $("#main-color a").removeClass("current-color");
    $(this).addClass("current-color");

    //set theme
    document.documentElement.style.setProperty("--main-color", color);
  });

  $(".tilt-effect").tilt({});

  //--------------------- Direction Aware Hover Effects -----------------

  // - Noel Delgado | @pixelia_me

  const nodes = [].slice.call(document.querySelectorAll(".box"), 0);
  const directions = { 0: "top", 1: "right", 2: "bottom", 3: "left" };
  const classNames = ["in", "out"]
    .map((p) => Object.values(directions).map((d) => `${p}-${d}`))
    .reduce((a, b) => a.concat(b));

  const getDirectionKey = (ev, node) => {
    const { width, height, top, left } = node.getBoundingClientRect();
    const l = ev.pageX - (left + window.pageXOffset);
    const t = ev.pageY - (top + window.pageYOffset);
    const x = l - (width / 2) * (width > height ? height / width : 1);
    const y = t - (height / 2) * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  };

  class Item {
    constructor(element) {
      this.element = element;
      this.element.addEventListener("mouseover", (ev) => this.update(ev, "in"));
      this.element.addEventListener("mouseout", (ev) => this.update(ev, "out"));
    }

    update(ev, prefix) {
      this.element.classList.remove(...classNames);
      this.element.classList.add(
        `${prefix}-${directions[getDirectionKey(ev, this.element)]}`
      );
    }
  }

  nodes.forEach((node) => new Item(node));

  //----------------------- Modal portfolio --------------------

  const arrayInformationPortfolio = data;

  const listImagePortfolio = $(".portfolio__image");
  const modalPortfolio = $(".modal__portfolio");
  const modalClose = $("#modal__close");

  modalClose[0].addEventListener("click", function () {
    modalPortfolio.removeClass("active animate__animated animate__fadeIn");
    modalPortfolio.addClass("animate__animated animate__fadeOut");
  });

  for (let i = 0; i < listImagePortfolio.length; i++) {
    const imagePortfolio = listImagePortfolio[i];
    const modalContent = $("#modal__content");

    imagePortfolio.addEventListener("click", function () {
      modalPortfolio.addClass("active animate__animated animate__fadeIn");
      modalPortfolio.removeClass("animate__fadeOut");
      let content = "";

      for (let j = 0; j < arrayInformationPortfolio.length; j++) {
        const iPortfolio = arrayInformationPortfolio[j];

        if (i === j) {
          content += `
                    <div class="modal__content--block">
                      <span class="modal__title">Project Name :</span>
                      <span class="modal__detail">${iPortfolio.projectName}</span>
                     </div>
                    <div class="modal__content--block">
                        <span class="modal__title">Technology :</span>
                        <span class="modal__detail">${iPortfolio.technology}</span>
                    </div>
                    <div class="modal__content--block">
                        <span class="modal__title">Link github :</span>
                        <span class="modal__detail">
                            <a href=${iPortfolio.github} target="_blank"><i class="fab fa-github" aria-hidden="true"></i>/${iPortfolio.github.slice(19)}</a>
                        </span>
                    </div>
                    <div class="modal__content--block">
                        <span class="modal__title">Link deploy :</span>
                        <span class="modal__detail">
                            <a href=${iPortfolio.deploy} target="_blank"><i class="fa fa-tv"></i>/${iPortfolio.deploy.slice(8)}</a>
                        </span>
                    </div>
                    <div class="modal__content--block">
                        <span class="modal__title">Description :</span>
                        <span class="modal__detail">${iPortfolio.content}</span>
                    </div>
                `;
        }
      }

      modalContent.html(content);
    });
  }
});
