"use strict";

var touches = [];
var cc = [];
var painter = 0;
var canvas = 0;
var color = 'black';
var colors = 0;
var isPressed = false;
var viewport = 0;
var t0,
  t1 = 0;
window.onload = function (e) {
  t0 = performance.now();
  colors = document.querySelectorAll('button[data-color]');
  colors[0].style.boxShadow = "0 0 4px 6px ".concat(color);
  document.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-color')) {
      colors[0].style.boxShadow = 'none';
      e.target.style.boxShadow = "0 0 4px 6px ".concat(e.target.dataset.color);
      color = e.target.dataset.color;
      cc.push(color);
      for (var i = 0; i < colors.length; i++) {
        if (cc.length > 1 && colors[i].dataset.color == cc[cc.length - 2]) colors[i].style.boxShadow = 'none';
      }
      if (cc.length > 2) cc.shift(color);
      console.log(cc);
    }
    if (e.target.closest('#cleaner')) painter.clearRect(0, 0, canvas.width, canvas.height);
  });
  document.getElementById('magnifier').addEventListener('change', function (e) {
    document.getElementById('range-output').innerHTML = e.currentTarget.value;
    painter.lineWidth = e.currentTarget.value;
  });
  document.getElementById('range-output').innerHTML = document.getElementById('magnifier').value;
  viewport = document.documentElement.clientWidth || window.innerWidth;
  canvas = document.getElementById('canvas');
  if (viewport > 320 && viewport <= 767) {
    canvas.height = window.innerHeight / 3 * 2;
    canvas.width = window.innerWidth;
  } else if (viewport > 767 && viewport <= 1023) {
    canvas.height = window.innerHeight / 6 * 4;
      canvas.width = window.innerWidth / 6 * 4;
  } else if (viewport > 1024) {
    canvas.height = window.innerHeight / 4 * 2;
    canvas.width = window.innerWidth / 9 * 8;
  }
  painter = canvas.getContext('2d');
  painter.lineWidth = document.getElementById('magnifier').value;
  canvas.addEventListener('mousemove', handleMove);
  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('mouseup', handleUp);
  canvas.addEventListener('touchstart', handleStart, false);
  canvas.addEventListener('touchend', handleEnd, false);
  canvas.addEventListener('touchcancel', handleCancel, false);
  canvas.addEventListener('touchmove', handleTouchMove, false);
  function handleMove(e) {
    if (isPressed) {
      painter.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      painter.strokeStyle = color;
      painter.stroke();
    }
  }
  function handleDown(e) {
    isPressed = true;
    painter.beginPath();
    painter.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  }
  function handleUp() {
    isPressed = false;
  }
  function handleStart(e) {
    var changes = e.changedTouches;
    for (var i = 0; i < changes.length; i++) {
      if (isValidTouch(changes[i])) {
        e.preventDefault();
        touches.push(copyTouch(changes[i]));
        painter.beginPath();
        painter.fillStyle = color;
        painter.fill();
      }
    }
  }
  function handleTouchMove(e) {
    var changes = e.changedTouches;
    var offset = findPos(canvas);
    for (var i = 0; i < changes.length; i++) {
      if (isValidTouch(changes[i])) {
        e.preventDefault();
        var idx = ongoingTouchIndexById(changes[i].identifier);
        if (idx >= 0) {
          painter.beginPath();
          painter.moveTo(touches[idx].clientX - offset.x, touches[idx].clientY - offset.y);
          painter.lineTo(touches[i].clientX - offset.x, touches[i].clientY - offset.y);
          painter.strokeStyle = color;
          painter.stroke();
          touches.splice(idx, 1, copyTouch(touches[i]));
        }
      }
    }
  }
  function handleEnd(e) {
    var changes = e.changedTouches;
    var offset = findPos(canvas);
    for (var i = 0; i < changes.length; i++) {
      if (isValidTouch(changes[i])) {
        e.preventDefault();
        var idx = ongoingTouchIndexById(changes[i].identifier);
        if (idx >= 0) {
          painter.lineWidth = 4;
          painter.fillStyle = color;
          painter.beginPath();
          painter.moveTo(touches[idx].clientX - offset.x, touches[idx].clientY - offset.y);
          painter.lineTo(touches[i].clientX - offset.x, touches[i].clientY - offset.y);
          touches.splice(i, 1);
        }
      }
    }
  }
  function handleCancel(e) {
    e.preventDefault();
    var changes = e.changedTouches;
    for (var i; i < changes.length; i++) {
      touches.splice(i, 1);
    }
  }
  function copyTouch(touch) {
    return {
      identifier: touch.identifier,
      clientX: touch.clientX,
      clientY: touch.clientY
    };
  }
  function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < touches.length; i++) {
      var id = touches[i].identifier;
      if (id == idToFind) return i;
    }
    return -1;
  }
  function isValidTouch(touch) {
    var curleft = 0,
      curtop = 0;
    var offset = 0;
    if (canvas.offsetParent) {
      do {
        curleft += canvas.offsetLeft;
        curtop += canvas.offsetTop;
      } while (touch == canvas.offsetParent);
      offset = {
        x: curleft - document.body.scrollLeft,
        y: curtop - document.body.scrollTop
      };
      if (touch.clientX - offset.x > 0 && touch.clientX - offset.x < parseFloat(canvas.width) && touch.clientY - offset.y > 0 && touch.clientY - offset.y < parseFloat(canvas.height)) {
        return true;
      } else return false;
    }
  }
  function findPos(obj) {
    var curleft = 0,
      curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj == obj.offsetParent);
      return {
        x: curleft - document.body.scrollLeft,
        y: curtop - document.body.scrollTop
      };
    }
  }
  t1 = performance.now();
  console.log("Loaded for ".concat(t1 - t0));
};