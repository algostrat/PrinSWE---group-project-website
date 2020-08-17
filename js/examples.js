
$( document ).ready(function() {

    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: 'examples/1.png',
            w: 1385,
            h: 460
        },
        {
            src: 'examples/2.png',
            w: 1395,
            h: 823
        },    
        {
            src: 'examples/3.png',
            w: 1381,
            h: 805
        }, 
        {
            src: 'examples/4.png',
            w: 1376,
            h: 806
        }, 
        {
            src: 'examples/5.png',
            w: 1387,
            h: 537
        }, 
        {
            src: 'examples/6.png',
            w: 1391,
            h: 503
        }, 
        {
            src: 'examples/7.png',
            w: 1607,
            h: 814
        }, 
        {
            src: 'examples/8.png',
            w: 1389,
            h: 799
        }, 
        {
            src: 'examples/9.png',
            w: 1369,
            h: 926
        }, 
        {
            src: 'examples/10.png',
            w: 1392,
            h: 806
        }, 
        {
            src: 'examples/11.png',
            w: 1391,
            h: 816
        }, 
        {
            src: 'examples/12.png',
            w: 1380,
            h: 720
        }, 
        {
            src: 'examples/13.png',
            w: 1392,
            h: 381
        }, 
        {
            src: 'examples/14.png',
            w: 1380,
            h: 819
        }, 
        {
            src: 'examples/15.png',
            w: 1388,
            h: 812
        }, 
        {
            src: 'examples/16.png',
            w: 1355,
            h: 799
        },
    ];

    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };


    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);


    //bind function to view gallery
  //  $("#view_gallery").submit(function (){
  //      gallery.init();
  //  }
   // );

    document.getElementById("view_gallery").addEventListener("click", function(event){
        event.preventDefault();
        gallery.init();
      });


});
