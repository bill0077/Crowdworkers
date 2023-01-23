$('.carousel').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,

  prevArrow: $('.button_prev'),
  nextArrow: $('.button_next'),
  
  autoplay: true,
  autoplaySpeed: 2000,

  centerMode: true,
  centerPadding: "0px",

  draggable: true,
  focusOnSelect: true,
  pauseOnFucus: true,

  slidesToShow: 1
});
