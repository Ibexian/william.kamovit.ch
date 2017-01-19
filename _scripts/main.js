//TODO probably need to switch to svg for the image
//Toast to tell people to play with keys (only on desktop)
import jQuery from 'jquery';

var $ = jQuery;

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

function travel() {
  if (!document.getElementById('earth')) { return; }
  var height = document.getElementById('earth').style.height;
  var zoomLevel = Number.parseInt(height.slice(0, -2), 10);
  if (zoomLevel > 100) { return; }
  document.getElementById('earth').style.height = (zoomLevel + 1) + "vh";
  window.setTimeout(travel, 2000);
}

function checkKey(e) {
  var changePosition = function(pxPos, change) {
    var px = Number.parseInt(pxPos.slice(0, -2), 10);
    px += change;
    return px + "px";
  };
  e = e || window.event;
  var space = document.querySelector('body');
  var earth = document.querySelector('#earth');
  var ehoriz = earth.style.left;
  var evert = earth.style.top;
  var horizontal = space.style.backgroundPositionX;
  var vertical = space.style.backgroundPositionY;
  if (!horizontal) {
    horizontal = "0px";
    vertical = "0px";
    ehoriz = "0px";
    evert = "0px";
  }

  if (e.keyCode == '38') {
    // up arrow
    vertical = changePosition(vertical, 2);
    evert = changePosition(evert, 10);
  } else if (e.keyCode == '40') {
    // down arrow
    vertical = changePosition(vertical, -2);
    evert = changePosition(evert, -10);
  } else if (e.keyCode == '37') {
    // left arrow
    horizontal = changePosition(horizontal, 2);
    ehoriz = changePosition(ehoriz, 10);
  } else if (e.keyCode == '39') {
    // right arrow
    horizontal = changePosition(horizontal, -2);
    ehoriz = changePosition(ehoriz, -10);
  }
  space.style.backgroundPositionY = vertical;
  space.style.backgroundPositionX = horizontal;
  earth.style.top = evert;
  earth.style.left = ehoriz;

}
