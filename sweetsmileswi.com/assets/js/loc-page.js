
////// lean modal

// leanModal v1.1 by Ray Stone - http://finelysliced.com.au
// Dual licensed under the MIT and GPL

(function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id)});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();
$("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault()})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);


/***** Service Page *****/


$(function () {
      let theWindow = $(window),
           hdHeight = $("header").outerHeight();
     

    /* this removes the click function on "off" popup links that don't have content yet. It prevents them from being cursor or keyboard clickable and makes screenreaders skip over them as links. Removing the class "off" from the leanModal link will re-enable that particular link */

    $("a.off").each(function (index) {
        $(this).removeAttr('href');
           $(this).removeAttr('rel');
             this.setAttribute('aria-disabled', 'true');
      });

    
    //// Appends Close button to common popups modal
      $(".common-popups .modal-content").append('<button class="modal-loc-close" aria-label="close popup"><i></i><span>Close Popup</span></button>');

      $('.common-popups .modal-content').wrapInner('<article>')
      
  $("a[rel*=leanModal]").leanModal({
		// top: 100,
		overlay: 1,
		closeButton: ".modal-loc-close, .loc-close"
  });

  $(window).bind('keyup',function(e){
    if(e.keyCode == 27)
       $('.modal-loc-close, .loc-close').closeModal(); 
})

    /// Clicking popup moves focus into modal 
        $("a[rel*=leanModal]").on("click", function(){
            let href = $(this).attr('href');
            let trimmed = href.substring(1);
           // console.log(trimmed)
            document.getElementById(trimmed).focus();
         });

 //// On closing popup gives keyboard focus back to last modal link clicked
    $('.modal-loc-close, .loc-close').on("click", function(){
        let newTag = $(this).parent().attr('id');
        // console.log(newTag)

        $("#pop-icons a").each(function() {
            if (this.href.indexOf(newTag) != -1) {
                $(this).focus()
            }
        });
    }); 
 

    
/***** Show More Content set up *****/
//// Appends close button to bottom of hidden content

$(".more-hide").each(function () {
    $(this).append('<button class="more-close" aria-label="close content">Close <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><g id="Group_198" data-name="Group 198" transform="translate(-765 -4269)"><g id="Ellipse_8" data-name="Ellipse 8" transform="translate(765 4269)" fill="none" stroke="#707070" stroke-width="1"><circle cx="36" cy="36" r="36" stroke="none"/><circle cx="36" cy="36" r="35.5" fill="none"/></g><path id="Path_2166" data-name="Path 2166" d="M302.533,445.67l-10.246,9.252-10.246-9.252-1.34,1.484,10.094,9.114L280.7,465.383l1.34,1.484,10.246-9.252,10.246,9.252,1.34-1.484-10.094-9.114,10.094-9.114Z" transform="translate(508.299 3848.33)"/></g></svg></button>');
});

$(".loc-close").each(function () {
    $(this).append('<span> <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><g id="Group_198" data-name="Group 198" transform="translate(-765 -4269)"><g id="Ellipse_8" data-name="Ellipse 8" transform="translate(765 4269)" fill="none" stroke="#fff" stroke-width="1"><circle cx="36" cy="36" r="36" stroke="none"/><circle cx="36" cy="36" r="35.5" fill="none"/></g><path fill="#fff" data-name="Path 2166" d="M302.533,445.67l-10.246,9.252-10.246-9.252-1.34,1.484,10.094,9.114L280.7,465.383l1.34,1.484,10.246-9.252,10.246,9.252,1.34-1.484-10.094-9.114,10.094-9.114Z" transform="translate(508.299 3848.33)"/></g></svg></span>');
});



$(".dr-link").click(function(){
    let _this = this;

$("#dr-bios").slideDown("normal", function () {
    let anchor = $(_this).data('anchor')
        hdHeight = $("header").outerHeight();
    if (anchor && $('#'+anchor).length) {
        let anchorHeight = $('#'+anchor).offset().top;
        $('html, body').animate({
            scrollTop: $('#'+anchor).offset().top - hdHeight -20// Means more to header height
        },400);
    }
});
return false; //Prevent the browser jump to the link anchor
});

//// Learn More button opens/closes hidden content
$("button.tog-more").on("click", function () {
    let svTop = $(this).closest('.loc-block').find(".more-hide");
    console.log(svTop)
    if ($(this).hasClass("active")) {
            $(this).closest('.loc-block').removeClass("open-togg");
        $(this).removeClass("active").closest('.loc-block').find(".more-hide").slideUp();
    } else {
        $(this).closest('.loc-block').addClass("open-togg");
        $(this).addClass("active").closest('.loc-block').find(".more-hide").slideDown();

        //// Opening content scrolls hidden section to top of page offset by header height
        $('html, body').animate({
            scrollTop: $(svTop).offset().top - hdHeight - 10 
        },400);
    }
});


//// Hidden content close button collapses content
$("button.more-close").on("click", function () {
    let svBlockHt = $(this).closest('.loc-block').find('button.tog-more');
    
    $(this).closest('.loc-block').removeClass("open-togg")
    $(this).closest('.loc-block').find('button.tog-more').removeClass("active")
    $(this).closest('.loc-block').find(".more-hide").slideUp();

     //// Closing content scrolls back to Learn More button offset by header height
    $('html, body').animate({
        scrollTop: $(svBlockHt).offset().top - hdHeight + 50
    },400);
});
     


     $(".loc-accordion h3").addClass("toggle");
        $(".toggle").each(function () {
            $(this).nextUntil('.toggle').add().wrapAll('<div>');
        });
        $(".toggle").on("click", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active").next().slideUp();
            } else {
                $(".toggle").removeClass("active").next().slideUp();
                $(this).addClass("active").next().slideDown();
            }
        });
  
  });