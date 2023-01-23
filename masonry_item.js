var grid = document.querySelector('.grid');
var msnry;

imagesLoaded( grid, function() {
  // init Isotope after all images have loaded
  msnry = new Masonry( grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    /*percentPosition: true,*/
    percentPosition: false,
    fitWidth: true,
    gutter: 20,
    stagger: 10,
    transitionDuration: '1.2s'
  });
});
