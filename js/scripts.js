/* Проверка на моб девайс */
function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  ) || iOS();
if (isMobile) {
  document.querySelector("html").classList.add("is-mobile");
}

/* Проверка на safari */
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  document.querySelector("html").classList.add("is-safari");
}

/* Проверка на ios */
const isIos = navigator.platform.match("Mac") !== null;
if (isIos) {
  document.querySelector("html").classList.add("is-OSX");
}

/* Проверка ширины экрана */
function checkInnerWidth(width) {
  if (window.innerWidth <= width) {
    return true;
  } else {
    return false;
  }
}

$(window).on("load", function () {
  $(".preloader").fadeOut("slow");
});

window.onload = function () {
  function setTransformScale(removeCss) {
    if (checkInnerWidth(1024) || !checkInnerWidth(1600) || removeCss) {
      $("html").removeAttr("style");
      return false;
    }

    if (checkInnerWidth(1600)) {
      scaleFactor = 1;
    }

    let height = $(window).height() * (1 / scaleFactor);
    let width = $(window).width() * (1 / scaleFactor);

    $("html").css({
      width: width + "px",
      height: height + "px",
      transform: `scale(${scaleFactor})`,
    });
  }
  setTransformScale();

  $(window).resize(function () {
    setTransformScale();
  });

  /* ACCORDION*/
  $(".accordion__wrapper-item-header").click(function () {
    $(this).toggleClass("active");
    $(this).siblings(".accordion__wrapper-item-body").slideToggle();
  });

  $(".open-hidden-products").click(function () {
    if ($(this).hasClass("active")) {
      $(this).text("Показать все");
    } else {
      $(this).text("Скрыть");
    }
    $(this).toggleClass("active");
    $(this).siblings(".hidden-products").slideToggle();
  });

  $(".open-hidden-product-card-popup-palete").click(function () {
    if ($(this).hasClass("active")) {
      $(this).text("все цвета");
    } else {
      $(this).text("скрыть");

    }
    $(".product-card-popup-palete__wrapper-hidden").addClass('opacity-fix-0');

    setTimeout(function () {
      $(".product-card-popup-palete__wrapper-hidden").toggleClass('opacity-fix-1');
    }, 10);
    $(this).toggleClass("active");
    $(this).siblings(".hidden-product-card-popup-palete").slideToggle();
  });

  $(".colors__wrapper-color").click(function () {

    $(".colors__wrapper-color.active").removeClass("active");
    $(this).addClass("active");
  });

  $(".textures__wrapper-texture").click(function () {
    $(".textures__wrapper-texture.active").removeClass("active");
    $(this).addClass("active");
  });

  $(".header_top_burger").click(function () {
    $(this).toggleClass("active");
    $(".header__menu").fadeToggle("fast");
    $(".header__menu").removeClass("header-sticky-content");
    $(".header__menu").toggleClass("header-flex");

    console.log($('.header-flex').length)
    if ($('.header-flex').length == 1) {
      $("#header-icon").attr("src", "./img/icons/popup-cross.svg");
    } else {
      $("#header-icon").attr("src", "./img/icons/header-burger.svg");
    }
    $("body, html").toggleClass("noskroll");

  });

  $(".header__menu-item.parrent").click(function (EO) {
    if (checkInnerWidth(1078) && $(".header__menu-item.parrent.active").length == 0) {
      EO.preventDefault();
      $(this).toggleClass("active");
      $(".header__menu .mobile-content").toggleClass("hidden");
      $(".header__menu-item").toggleClass("hidden");
    }
  });

  $(".header__menu-item-link.close").click(function (EO) {
    if (checkInnerWidth(1078) && $(".header__menu-item.parrent.active").length == 1) {
      EO.preventDefault();

      setTimeout(() => {
        $(".header__menu-item.parrent").removeClass("active");
        $(".header__menu .mobile-content").removeClass("hidden");
        $(".header__menu-item").removeClass("hidden");
      }, 100);
    }
  });

  $(".custom-select__main").click(function (EO) {
    $(this).toggleClass("open");
  });

  const selected = []
  const selectedNames = []

  $('.custom-select.multiple .custom-select__select-item').click(function (EO) {
    const name = $(this).find('.name').text()
    const image = $(this).find('.color').find('img')[0].src
    const target = $(this).closest('.custom-select').find('.custom-select__main')
    $(this).addClass('selected')
    const index = selectedNames.indexOf(name)
    if (index === -1) {
      selectedNames.push(name)
      selected.push(
        {
          name,
          image
        }
      )
    } else {
      selectedNames.splice(index, 1)
      selected.splice(index, 1)
    }
    $(target).html('')

    if (selected.length) {
      $(target).html('')
      selected.forEach(function (el) {
        $(target).append(`<div class="selected-item">
          <div class="color"><img src="${el.image}"></div>
          <div class="name">${el.name}</div>,
        </div>`);
      })
    } else {
      $(target).html(`<div class="name">Р’С‹Р±РµСЂРёС‚Рµ РѕР±СЂР°Р·С†С‹</div>`)
    }

    $(this).closest('.custom-select').find('.custom-select__input').val(selectedNames.join(','))
  })

  $(".product-card-popup__custom-select__main").click(function (EO) {
    $(this).toggleClass("open");
  });

  $(".parrent-small").click(function (EO) {
    $(".sub_menu").toggleClass("display-block");
    $(".parrent-small").toggleClass("parrent-small-changed");
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
      $(".to_top").fadeIn().css("display", "flex");
    } else {
      $(".to_top").fadeOut();
    }
  });

  $(".to_top").click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
  });

  $(".product-card-popup__custom-select__select-item").click(function (EO) {
    const name = $(this).find(".product-card-popup__name").text();
    $(this)
      .closest(".product-card-popup__custom-select")
      .find(".product-card-popup__custom-select__main")
      .toggleClass("open");
    $(this)
      .closest(".product-card-popup__custom-select")
      .find(".product-card-popup__custom-select__main")
      .find(".product-card-popup__name")
      .text(name);
    $(this)
      .closest(".product-card-popup__custom-select")
      .find(".product-card-popup__custom-select__main");
    $(this)
      .closest(".product-card-popup__custom-select")
      .find(".product-card-popup__custom-select__input")
      .val(name);
  });

  $("[data-anchor]").click(function (EO) {
    const anchor = $(this).data("anchor");
    const section = $(`#${anchor}`);
    $("html,body").animate(
      { scrollTop: section.offset().top * (!checkInnerWidth(1600) ? 1 : 0.75) },
      "slow"
    );
  });

  if (checkInnerWidth(1024)) {
    $(".custom-js-scroll").mCustomScrollbar({
      axis: "x",
      autoDraggerLength: false,
    });
  }

  if (!checkInnerWidth(1024)) {
    gsap.registerPlugin(ScrollTrigger);
    const animateElements = $(".animate-svg .fade-animation");
    const animateTable = $(".animate-svg .animate-svg__table")[0];
    const colors = $(".main-colors__palette")[0];

    gsap.to(animateTable, {
      scrollTrigger: {
        trigger: animateTable,
        start: "50% bottom",
        end: "50% bottom",
      },
      opacity: 1,
    });

    gsap.to(colors, {
      scrollTrigger: {
        trigger: colors,
        start: "100% bottom",
        end: "100% bottom",
      },
      opacity: 1,
    });

    Array.from(animateElements).forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "200% bottom",
          end: "200% bottom",
        },
        opacity: 1,
      });
    });
  }

  /* SLIDERS */

  $(".main-section__slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    fade: true,
    cssEase: "linear",
    prevArrow: `<div class="prev"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
    nextArrow: `<div class="next"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
  });

  if (checkInnerWidth(500)) {
    $(".advantages__wrapper").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: `<div class="prev"><img src="./img/icons/slider-black-arrow-right.svg"></div>`,
      nextArrow: `<div class="next"><img src="./img/icons/slider-black-arrow-right.svg"></div>`,
    });
  }

  $(".projects-slider__mian-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    asNavFor: ".projects-slider__nav-slider",
    prevArrow: `<div class="prev"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
    nextArrow: `<div class="next"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
  });
  $(".projects-slider__nav-slider-mobile").slick({
    slidesToShow: 1,
    arrows: false,
    centerMode: false,
    focusOnSelect: true,
    asNavFor: ".projects-slider__mian-slider-mobile",
    prevArrow: `<div class="prev"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
    nextArrow: `<div class="next"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
  });

  $(".projects-slider__mian-slider-mobile").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    fade: true,
    swipe: false,
    draggable: false,
    centerMode: false,
    asNavFor: ".projects-slider__nav-slider-mobile",
    prevArrow: `<div class="prev"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
    nextArrow: `<div class="next"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
  });

  $(".beton-slider__mian-slider-mobile").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    fade: true,
    swipe: false,
    draggable: false,
    centerMode: false,
    prevArrow: `<div class="prev"><img src="./img/slider-arrow-black.svg"></div>`,
    nextArrow: `<div class="next"><img src="./img/slider-arrow-black.svg"></div>`,
  });


  $(".projects-slider__mian-slider-1").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    prevArrow: `<div class="prev"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
    nextArrow: `<div class="next"><img src="./img/icons/slider-white-arrow-right.svg"></div>`,
  });

  $(".beton-panels-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    swipe: false,
    draggable: false,
    centerMode: false,
    asNavFor: ".beton-panels-slider-dots",
  });

  $(".beton-panels-slider-dots").slick({
    slidesToShow: 6,
    centerMode: false,
    focusOnSelect: true,
    asNavFor: ".beton-panels-slider",
  });

  $(".projects-slider__nav-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".projects-slider__mian-slider",
    vertical: true,
    verticalSwiping: true,
    swipe: false,
    arrows: false,
    focusOnSelect: true,
  });

  $("#slider").on("init reInit", function (event, slick) {
    var amount = slick.slideCount;
    $("#range").attr("max", amount);
  });

  $("#slider").on("afterChange", function (e, slick, currentSlide) {
    $("#range").val(currentSlide + 1);
  });

  $("#range").on("input change", function () {
    $("#slider").slick("slickGoTo", this.value - 1);
  });

  $(".related-products__wrapper").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: `<div class="prev"><img src="./img/icons/slider-black-arrow-right.svg"></div>`,
    nextArrow: `<div class="next"><img src="./img/icons/slider-black-arrow-right.svg"></div>`,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  /* POPUPS */
  $("[data-popup]").click(function () {
    let popup = $(this).data("popup");
    $("." + popup + "-popup").fadeIn();
    $("body,html").addClass("noscroll");
    console.log('sad')
  });

  $(".popup__close, .popup_btn.close_popup").click(function () {
    let popup = $(this).closest(".popup");
    $(popup).fadeOut();
    $("body,html").removeClass("noscroll");
  });

  $(".popup__wrapper").click(function (EO) {
    EO.stopPropagation();
    if ($(EO.target).hasClass("popup__wrapper")) {
      $(".popup").fadeOut();
      $("body,html").removeClass("noscroll");
    }
  });

  /* Lazy load */
  var observer = lozad("[data-lazysrc]", {
    threshold: 0.1,
    enableAutoReload: true,
    load: function (el) {
      el.src = el.getAttribute("data-lazysrc");
      el.onload = function () {
        $(el).addClass("load");
      };
    },
  });
  observer.observe();

  var pictureObserver = lozad(".lozad", {
    threshold: 0.1,
  });
  pictureObserver.observe();

  /* DEV SCRIPTS */

  $(".download-features-button").click(function () {
    $(".download-features-button").removeClass("active").addClass("inactive");
    $(this).removeClass("inactive").addClass("active");
  });

  $(".contact-features-button").click(function () {
    $(".contact-features-button").removeClass("active").addClass("inactive");
    $(this).removeClass("inactive").addClass("active");
  });
  $(document).on("click", ".map-point-sm", function () {
    var show = $(this).data("show");
    $(show).removeClass("hide").siblings().addClass("hide");
  });

  $(".term-item-header-button").click(function () {
    $(".term-item-header-button").removeClass("active").addClass("inactive");
    $(this).removeClass("inactive").addClass("active");
  });

  $(document).on("click", ".beton-panels-slider-dots-item", function () {
    if ($(this)[0].innerHTML == 1) {
      $("#number-1").removeClass("panel-slider-visited");
      $("#number-2")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-3")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-4")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-5")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-6")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
    }

    if ($(this)[0].innerHTML == 2) {
      $("#number-1").addClass("panel-slider-visited");
      $("#number-2").removeClass("panel-slider-visited");
      $("#number-3")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-4")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-5")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-6")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
    }

    if ($(this)[0].innerHTML == 3) {
      $("#number-3").removeClass("panel-slider-visited");
      $("#number-1").addClass("panel-slider-visited");
      $("#number-2").addClass("panel-slider-visited");
      $("#number-4")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-5")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-6")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
    }
    if ($(this)[0].innerHTML == 4) {
      $("#number-4").removeClass("panel-slider-visited");
      $("#number-1").addClass("panel-slider-visited");
      $("#number-2").addClass("panel-slider-visited");
      $("#number-3").addClass("panel-slider-visited");
      $("#number-5")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
      $("#number-6")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
    }

    if ($(this)[0].innerHTML == 5) {
      $("#number-5").removeClass("panel-slider-visited");
      $("#number-1").addClass("panel-slider-visited");
      $("#number-2").addClass("panel-slider-visited");
      $("#number-3").addClass("panel-slider-visited");
      $("#number-4").addClass("panel-slider-visited");
      $("#number-6")
        .removeClass("panel-slider-visited")
        .removeClass("panel-slider-active");
    }

    if ($(this)[0].innerHTML == 6) {
      $("#number-6").removeClass("panel-slider-visited");
      $("#number-1").addClass("panel-slider-visited");
      $("#number-2").addClass("panel-slider-visited");
      $("#number-3").addClass("panel-slider-visited");
      $("#number-4").addClass("panel-slider-visited");
      $("#number-5").addClass("panel-slider-visited");
    }

    $(this).addClass("panel-slider-active");
  });

  $("#number-1").addClass("panel-slider-active");

  var StickyElement = function (node) {
    var doc = $(document),
      fixed = false,
      anchor = $(".header__top"),
      content = $(".header__menu");
    var onScroll = function (e) {
      var docTop = doc.scrollTop();
      if (docTop != 0) {
        if (!fixed) {
          content.addClass("header-sticky-content");
          content.addClass("container");
          fixed = true;
        }
      } else {
        if (fixed) {
          content.removeClass("header-sticky-content");
          content.removeClass("container");
          fixed = false;
        }
      }
    };
    $(window).on("scroll", onScroll);
  };

  var onScrollMobile = function (e) {
    var doc = $(document);
    content = $(".header");
    var docTop = doc.scrollTop();
    if (docTop != 0) {
      content.addClass("border-footer-mobile");
    } else {
      content.removeClass("border-footer-mobile");
    }
  };

  $(window).on("scroll", onScrollMobile);
  var sticky = new StickyElement($(".sticky-element"));

  $(".panels-selector").hover(
    function () {
      $(".panels-icon").addClass("display-none");
      $(".panels-button").addClass("display-block");
    },
    function () {
      $(".panels-icon").removeClass("display-none");
      $(".panels-button").removeClass("display-block");
    }
  );

  $(".kashpo-selector").hover(
    function () {
      $(".kashpo-icon").addClass("display-none");
      $(".kashpo-button").addClass("display-block");
    },
    function () {
      $(".kashpo-icon").removeClass("display-none");
      $(".kashpo-button").removeClass("display-block");
    }
  );
  $(".beton-panels-item-wrapper").hover(
    function () {

      if ($(this).children('img')[0].id == 'fibra') {
        $("#fibra").attr(
          "src",
          "./img/beton-panels-slider/fibra-hover.svg"
        );
      }
      if ($(this).children('img')[0].id == 'relef') {
        $("#relef").attr(
          "src",
          "./img/beton-panels-slider/relef-hover.svg"
        );
      }
      if ($(this).children('img')[0].id == 'perfo') {
        $("#perfo").attr(
          "src",
          "./img/beton-panels-slider/perfo-hover.svg"
        );
      }
      if ($(this).children('img')[0].id == 'isgib') {
        $("#isgib").attr(
          "src",
          "./img/beton-panels-slider/isgib-hover.svg"
        );
      }
      $(this).children('button').addClass("display-block");
      $(this).addClass("item-obl-slider");

    },
    function () {

      $(this).children('button').removeClass("display-block");
      $(this).removeClass("item-obl-slider");
      if ($(this).children('img')[0].id == 'fibra') {
        $("#fibra").attr(
          "src",
          "./img/beton-panels-slider/fibra.svg"
        );
      }
      if ($(this).children('img')[0].id == 'relef') {
        $("#relef").attr(
          "src",
          "./img/beton-panels-slider/relef.svg"
        );
      }
      if ($(this).children('img')[0].id == 'perfo') {
        $("#perfo").attr(
          "src",
          "./img/beton-panels-slider/perfo.svg"
        );
      }
      if ($(this).children('img')[0].id == 'isgib') {
        $("#isgib").attr(
          "src",
          "./img/beton-panels-slider/isgib.svg"
        );
      }
    }
  );

  $(".bench-selector").hover(
    function () {
      $(".bench-icon").addClass("display-none");
      $(".bench-button").addClass("display-block");
    },
    function () {
      $(".bench-icon").removeClass("display-none");
      $(".bench-button").removeClass("display-block");
    }
  );

  $(".plates-selector").hover(
    function () {
      $(".plates-icon").addClass("display-none");
      $(".plates-button").addClass("display-block");
    },
    function () {
      $(".plates-icon").removeClass("display-none");
      $(".plates-button").removeClass("display-block");
    }
  );

  $(".sculptures-selector").hover(
    function () {
      $(".sculptures-icon").addClass("display-none");
      $(".sculptures-button").addClass("display-block");
    },
    function () {
      $(".sculptures-icon").removeClass("display-none");
      $(".sculptures-button").removeClass("display-block");
    }
  );

  $(".bollardes-selector").hover(
    function () {
      $(".bollardes-icon").addClass("display-none");
      $(".bollardes-button").addClass("display-block");
    },
    function () {
      $(".bollardes-icon").removeClass("display-none");
      $(".bollardes-button").removeClass("display-block");
    }
  );

  $(".lamps-selector").hover(
    function () {
      $(".lamps-icon").addClass("display-none");
      $(".lamps-button").addClass("display-block");
    },
    function () {
      $(".lamps-icon").removeClass("display-none");
      $(".lamps-button").removeClass("display-block");
    }
  );

  $(".bonfire-selector").hover(
    function () {
      $(".bonfire-icon").addClass("display-none");
      $(".bonfire-button").addClass("display-block");
    },
    function () {
      $(".bonfire-icon").removeClass("display-none");
      $(".bonfire-button").removeClass("display-block");
    }
  );
};
