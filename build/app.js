"use strict";

window.onload = function () {
  var audio = document.getElementById('sound');
  var menu = document.getElementById('menu');
  var tools = document.querySelectorAll('#tools li');
  audio.volume = 0.2;
  menu.addEventListener('click', function (e) {
    e.target.classList.toggle('--closed');
    e.target.classList.toggle('--open');
    var _loop = function _loop(i) {
      var distance = i * (360 / tools.length);
      if (e.target.classList.contains('--open')) {
        tools[i].firstChild.classList.remove('sr-only');
        tools[i].firstChild.style.cssText = 'height:64px;width:64px;margin-left:-200px;animation: pulse 16s ease-in-out infinite;';
        setTrigger(tools[i], distance);
      } else {
        setTrigger(tools[i], '-360');
        tools[i].firstChild.style.color = 'transparent';
        setTimeout(function () {
          tools[i].firstChild.classList.add('sr-only');
        }, 500);
      }
    };
    for (var i = 0; i < tools.length; i++) {
      _loop(i);
    }
  });
  function setTrigger(item, longitude) {
    item.style.transform = "rotate(".concat(longitude, "deg)");
    item.querySelector('a').style.transform = "rotate(-".concat(longitude, "deg)");
  }
};