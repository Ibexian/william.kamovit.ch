//TODO probably need to switch to svg for the image
var toastr = require('toastr');

/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

// make all images responsive
$(function() {
	$("img").addClass("img-responsive");
});

// responsive tables
$(document).ready(function() {
	$("table").wrap("<div class='table-responsive'></div>");
	$("table").addClass("table");
});

// responsive embed videos
$(document).ready(function () {
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	$('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	$('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                        $('.navbar-brand').css("background:none");
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                        $('.navbar-brand').css("background:hsla(0, 100%, 100%, 0.9)");
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    $('.navbar-brand').css("background:none");
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});

/*
Js for index page - allow for arrow based screen control and earth size increase
*/


document.addEventListener('DOMContentLoaded', travel, false);
document.onkeydown = checkKey;

$(document).ready(function() {
  toastr.options = {
    "positionClass": "toast-top-center",
    "showDuration": "30"
  }
  toastr.info('Arrow keys control the page background');
});

function travel() {
  if (!document.getElementById('earth')) { return; }
  var height = document.getElementById('earth').style.height;
  var zoomLevel = Number.parseInt(height.slice(0, -2), 10);
  if (zoomLevel > 100) { return; }
  document.getElementById('earth').style.height = (zoomLevel + 1) + "vh";
  window.setTimeout(travel, 2000);
}

function checkKey(e = window.event) {
  var changePosition = function(pxPos, change, minMax, screen) {
    var px = Number.parseInt(pxPos.slice(0, -2), 10);
    px += change;
    if(px > minMax){
      px = -500;
    } else if (px < -minMax) {
      px = screen + 500;
    }
    return `${px}px`;
  };
  var space = document.querySelector('body');
  var earth = document.querySelector('#earth');
  if(!earth){return;}
  var {left, top} = earth.style;
  var {backgroundPositionX, backgroundPositionY} = space.style;
  if (!backgroundPositionX) {
    backgroundPositionX = "0px";
    backgroundPositionY = "0px";
    left = "0px";
    top = "0px";
  }

  if (e.keyCode == '38') {
    // up arrow
    backgroundPositionY = changePosition(backgroundPositionY, 2);
    top = changePosition(top, 10, 4000);
  } else if (e.keyCode == '40') {
    // down arrow
    backgroundPositionY = changePosition(backgroundPositionY, -2);
    top = changePosition(top, -10, 4000, window.innerHeight);
  } else if (e.keyCode == '37') {
    // left arrow
    backgroundPositionX = changePosition(backgroundPositionX, 2);
    left = changePosition(left, 10, 5000);
  } else if (e.keyCode == '39') {
    // right arrow
    backgroundPositionX = changePosition(backgroundPositionX, -2);
    left = changePosition(left, -10, 5000, window.innerWidth);
  }
  space.style.backgroundPositionY = backgroundPositionY;
  space.style.backgroundPositionX = backgroundPositionX;
  earth.style.top = top;
  earth.style.left = left;

}
