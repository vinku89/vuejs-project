import $ from 'jquery';
$(document).ready(function () {

  // Off Canvas End
  // Onscroll header color
  var header = $(".navbar");
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      header.addClass("scrolled");
      $('.navbar-brand').addClass("logo_reduce");
    } else {
      header.removeClass("scrolled");
      $('.navbar-brand').removeClass("logo_reduce");
    }
  });

  // Smooth scrolling
  // var scrollLink = $('.scroll');
  // scrollLink.click(function (e) {
  //   e.preventDefault();
  //   $('body,html').animate({
  //     scrollTop: $(this.hash).offset().top
  //   }, 1000);
  // });
  // Topbar
  // var menu = document.querySelector('.top_bar');
  // var origTopCoordinateMenu = menu.offsetTop;

  // function scroll() {
  //   if ($(window).scrollTop() >= origTopCoordinateMenu) {
  //     $('.top_bar').addClass('sticky');
  //     $('.banner_section').addClass('pdTop');
  //     $('.banner_img_wrp').addClass('psigen_banner');
  //     $('.baner_content').addClass('luxdraws_banner');
  //     $('.wrapper').addClass('token_banner');
  //   } else {
  //     $('.top_bar').removeClass('sticky');
  //     $('.banner_section').removeClass('pdTop');
  //     $('.banner_img_wrp').removeClass('psigen_banner');
  //     $('.baner_content').removeClass('luxdraws_banner');
  //     $('.wrapper').removeClass('token_banner');
  //   }
  // }
  // document.onscroll = scroll;
 
  // Page Scroll
  $("a[href^='#']").click(function (e) {
    e.preventDefault();
    var position = $($(this).attr("href")).offset().top;
    $($(this).attr("href")).css('padding-top', 100);
    $('a').each(function () {
      $(this).removeClass('current');
    })
    $(this).addClass('current');
    $("body, html").animate({
      scrollTop: position
    }, 1000);
  });
  if (window.location.hash != "") {
    $(window.location.hash).css('padding-top', 100);
  }

  function adjustStyle(width) {
    width = parseInt(width);
    if (width < 991) {
      $("#size-stylesheet").attr("href", "");
    } else {
      $("#size-stylesheet").attr("href", "css/animate.css");
    }
  }
  $(function () {
    adjustStyle($(this).width());
    $(window).resize(function () {
      adjustStyle($(this).width());
    });
  });
  // select2
  $(".js-select2").select2();
});
$(document).ready(function () {
  $(".fogt_pas").click(function(){
    $(".login_wrap").addClass("d-none");
    $(".frgt_pass").removeClass("d-none");
  });

  $(".signin_btn").click(function(){
    $(".login_wrap").removeClass("d-none");
    $(".frgt_pass").addClass("d-none");
  });

  $(".log_in").click(function(){
    $(".login_wrap").removeClass("d-none");
    $(".frgt_pass").addClass("d-none");
  });

  $(".rec_new").click(function(){
    $(".login_wrap").addClass("d-none");
    $(".frgt_pass").addClass("d-none");
    $(".cret_pas").removeClass("d-none");
  });

  $(".conf_btn").click(function(){
    $(this).hide();
    $(".reg_btn").removeClass("d-none");
  })

  $(".reg_btn").click(function(){
    $(".login_wrap").removeClass("d-none");
    $(".frgt_pass").addClass("d-none");
    $(".cret_pas").addClass("d-none");
  })

});