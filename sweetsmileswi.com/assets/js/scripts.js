$(window).ready(function () {
  var interval = setInterval(function () {
      if (window.location.hash) window.location = window.location.hash;
  }, 0);
  setTimeout(function () {
      clearInterval(interval);
  }, 1000);

  function scrollToAnchor(target) {
      var $target = $("a[name='" + target.substr(1) + "']"),
          targetName = window.location.href.split("#")[1];
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 1000, function () {
          document.location.hash = targetName;
      });
  }
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              $('html, body').animate({
                  scrollTop: target.offset().top
              }, 1000, function () {});
          }
      }
  });
});



$(function(){


$('header nav').meanmenu({
    meanMenuContainer: 'header .place-nav',
    meanMenuOpen: "<i class='icon-menu'></i>",
    meanMenuClose: "<i class='icon-plus'></i>",
    meanScreenWidth: 980,
    meanDisplay: "block"
});

  $("[data-player]").tntvideos({    
    playButton: '.play',
    closeButton: '.close',
    bodyPlaying: '.playing',
    mobileWidth: 900,
    offset: 0
  });      

  $("a[rel*=leanModal]").leanModal();


    $(".popout").on("click", function(){

      $(".popout-content").removeClass("show");

      $(".popout-content[data-popout='"+$(this).data("toggle")+"']").addClass("show");

        $("body").addClass("team-active");

      return false;

    });

      $(".popout-content").on("click", ".close", function(){

        $(this).closest(".popout-content").removeClass("show");

          $("body").removeClass("team-active");

    $(".popout-content iframe").each(function() { 
            var noAutoPlay = $('.popout-content iframe').attr('src').replace('autoplay=1','autoplay=0');
              $('.popout-content iframe').attr('src', noAutoPlay);
          });

        return false;

      });

$(".more-to-explore").appendTo($(".more-to-explore-container"));
$("main > h1:first-child, h2#append").appendTo($("#page-title .title-wrapper"));

if ($("body").hasClass("meet")){
  $("main > p").insertAfter($("#page-title h2"));
  $(".main-img").insertAfter($(".title-wrapper"));
}

//activate google map
$(".gmap").on("mouseenter",function(){
  $(this).addClass("active");
}).on("mouseleave",function(){
  $(this).removeClass("active");
});

// tabitha's fixed header with calc of header

var theWindow = $(window),
    body = $("body"),
    header = $("header"),
    headerBottom = header.outerHeight(),
    hideBottom = $("header article").outerHeight();


$(window).resize(function () {
    body.css('padding-top', header.outerHeight());
});
body.css('padding-top', headerBottom);
if (window.location.hash && theWindow.width() > 999) {
    body.addClass("scrolled");
    header.addClass("animated fadeInDown");
}

theWindow.on("scroll", function () {
    if (theWindow.width() > 999) {
        if (theWindow.scrollTop() >= headerBottom) {
            body.addClass("scrolled").removeClass("not-scrolled");
            header.addClass("animated fadeInDown");
        } else if (theWindow.scrollTop() <= headerBottom) {
            body.removeClass("scrolled").addClass("not-scrolled");
            header.removeClass("animated fadeInDown");
        }
    }
    if (theWindow.width() < 861) {
        if (theWindow.scrollTop() >= hideBottom) {
            body.addClass('attach');
        } else if (theWindow.scrollTop() <= hideBottom) {
            body.removeClass('attach');
        }
    }
});

// Social and Hours to mobile nav




  $(".hover-change").on("mouseover", function() {
      var $this = $(this);
      $this.data("original", $this.attr("src"));
      $this.attr("src", $this.data("hover"));
  }).on("mouseleave", function() {
      var $this = $(this);
      $this.data("hover", $this.attr("src"));
      $this.attr("src", $this.data("original"));
  });




  // Randomized Banner Background
      var selectBG = Math.floor(Math.random() * 11) + 1;
      if (!$("body").hasClass("page_index")) {
          $("#page-title").css({
              'background-image': 'url(https://www.sweetsmileswi.com/assets/images/banner-' + selectBG + '.jpg)',
              'background-size': 'cover',
              'background-repeat': 'no-repeat',
              'background-position': 'center center'
          })
      }


////////////////////////////// accordion + youtube video api reload on close if playing
$(".accordion h3, .accordion h2").addClass("toogle");
$(".toogle").each(function () {
    $(this).nextUntil('.toogle').add().wrapAll('<div>');
});
$(".toogle").on("click", function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active").next().slideUp();
    } else {
        $(".toogle").removeClass("active").next().slideUp();
        $(this).addClass("active").next().slideDown();
        for (var i = 0; i < $('.accordion iframe').length; i++) {
            $('.accordion iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        }
    }
});


var slideshows = $('.cycle-slideshow').on('cycle-prev cycle-next', function(e, opts) {
    // advance the other slideshow
    slideshows.not(this).cycle('goto', opts.currSlide);
});

$('#carousel .cycle-slideshow figure').click(function () {
    console.log("clicked");
    var index = $('#carousel .cycle-slideshow').data('cycle.API').getSlideIndex(this);
    slideshows.cycle('goto', index);
});


////////////////////////////// page divider
var dividerStart = "> h2, .page-divider .wrap, .page-divider .title",
    mobileWidth = 630;
$.when(setupServices()).done(function () {});



  function setupServices() {
      $(".page-divider " + dividerStart)
          .addClass("divider-title").each(function () { //auto wrap 
              $(this)
                  .nextUntil('.divider-title')
                  .addBack()
                  .wrapAll('<div class="divider-body clearfix">');
          });
    
          $(".page-divider a[name]").each(function(){              
            $(this).parent().addClass("no-anim");
                
          } );

          //if has image
          $(".divider-body").each(function() { 
            $(this).find(".divider-title + p:has(img), div.elem-left").addClass("has-img");
            $(this)
              .children(".has-img")
              .insertBefore($(this)
              .children(".divider-title")
              .first());
          });


          $(".page-divider .divider-body h2 + ul:nth-child(-n+2)").parent().attr('id', 'why').removeClass("divider-body");
          $("#why li").each(function(){
            $(this).wrapInner("<span>");
          });

//
//
//
// Auto Alternate images + add css animation classes
$(".page-divider img").each(function(index){
 if (index % 2 === 0){
  //  $(this).removeClass('elem-left').addClass('elem-right wow fadeInRight');
   $(this).closest(".divider-body").children("h2, h3, p:not(.has-img), p:not(.no-anim), ul, .btn, .btn-alt").addClass("wow fadeInLeft")
 } else {
   $(this).addClass("wow fadeInLeft")
   $(this).closest(".divider-body").children("h2, h3, p:not(.has-img), p:not(.no-anim), ul, .btn, .btn-alt").addClass("wow fadeInRight")
 }
});
    
    
            //move anchors to page-divider-body
            $(".page-divider a[name]").each(function(){              
            var getAnchor = $(this).parent(),
              anchorTarget = $(this)
                .parentsUntil(".page-divider")
                .next()
                .find(".divider-title").parent();
              getAnchor.prependTo(anchorTarget);
            });   
          } 




  /* Location Switcher */
  $("#location-switcher #accordion").on("click", ".loc", function () {
      $("#location-switcher #map iframe").attr("src", "https://www.google.com/maps/" + $(this).data("map"));
      return false;
  });

  $("#accordion>.loc").on("click", function () {
      if ($(this).hasClass("active")) {
          $(this).removeClass("active").next("p").slideUp();
          $(this).removeClass("active").next("div").slideUp();

      } else {
          $("#accordion>.loc").removeClass("active").next("p").slideUp();
          $(this).addClass("active").next("p").slideDown();
          $("#accordion>.loc").removeClass("active").next("div").slideUp();
          $(this).addClass("active").next("div").slideDown();
          for (var i = 0; i < $('#accordion iframe').length; i++) {
              $('#accordion iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
          }
      }
  });
});

//section accordion
  $(".section-toggle>button").on("click", function () {
      if ($(this).hasClass("active")) {
          $(this).removeClass("active").next("div").slideUp();
      } else {
          $(this).addClass("active").next("div").slideDown();
      }
  });


  //// Wraps toggles' H3 into clearfixed sections and moves the image infront of the H3 on desktop
  $(".section-toggle h3").each(function() {
    $(this).nextUntil('h3, div, h2').addBack().wrapAll('<div class="has-h3">');
  });

  if ($(window).width() > 750) {
    $(".has-h3").each(function(index) {
      $(this).find(".elem-left").insertBefore($(this).children("h3"));
    })
  }


/* COVID MODAL */
!function(){this.Modal=function(){var t;this.closeButton=null,this.modal=null,this.overlay=null,this.transitionEnd=(t=document.createElement("div")).style.WebkitTransition?"webkitTransitionEnd":t.style.OTransition?"oTransitionEnd":"transitionend";arguments[0]&&"object"==typeof arguments[0]&&(this.options=function(t,o){var e;for(e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);return t}({autoOpen:!0,className:"fade-and-drop",closeButton:!0,content:"",maxWidth:800,minWidth:280,overlay:!0},arguments[0])),!0===this.options.autoOpen&&this.open()},Modal.prototype.close=function(){var t=this;this.modal.className=this.modal.className.replace(" scotch-open",""),this.overlay.className=this.overlay.className.replace(" scotch-open",""),this.modal.addEventListener(this.transitionEnd,function(){t.modal.parentNode.removeChild(t.modal)}),this.overlay.addEventListener(this.transitionEnd,function(){t.overlay.parentNode&&t.overlay.parentNode.removeChild(t.overlay)}),$("body").removeClass("modal-open")},Modal.prototype.open=function(){(function(){var t,o,e;t="string"==typeof this.options.content?this.options.content:this.options.content.innerHTML;e=document.createDocumentFragment(),this.modal=document.createElement("div"),this.modal.className="scotch-modal "+this.options.className,this.modal.style.minWidth=this.options.minWidth+"px",this.modal.style.maxWidth=this.options.maxWidth+"px",!0===this.options.closeButton&&(this.closeButton=document.createElement("button"),this.closeButton.className="scotch-close close-button",this.closeButton.innerHTML="&times;",this.modal.appendChild(this.closeButton));!0===this.options.overlay&&(this.overlay=document.createElement("div"),this.overlay.className="scotch-overlay "+this.options.className,e.appendChild(this.overlay));(o=document.createElement("div")).className="scotch-content",o.innerHTML=t,this.modal.appendChild(o),e.appendChild(this.modal),document.body.appendChild(e)}).call(this),function(){this.closeButton&&this.closeButton.addEventListener("click",this.close.bind(this));this.overlay&&this.overlay.addEventListener("click",this.close.bind(this))}.call(this),window.getComputedStyle(this.modal).height,this.modal.className=this.modal.className+(this.modal.offsetHeight>window.innerHeight?" scotch-open scotch-anchored":" scotch-open"),this.overlay.className=this.overlay.className+" scotch-open",$("body").addClass("modal-open")}}();var myContent=document.getElementById("modal-box"),myModal=new Modal({content:myContent}),triggerButton=document.getElementById("trigger");triggerButton.addEventListener("click",function(){myModal.open()});
