"use strict";

var stars = document.querySelectorAll('.star');
var tools = document.querySelectorAll('#tools li');
if (document.readyState == 'loading' || document.readyState == 'interactive') {
  document.getElementById('button').style.willChange = 'transform';
  stars.forEach(function (star, tool) {
    star.style.willChange = 'transform, opacity';
    tools[tool].style.willChange = 'transform, opacity';
  });
}
window.onload = function () {
  var lastTouchTime = 0;
  var viewport = window.innerWidth || document.documentElement.clientWidth;
  document.getElementById('sound').volume = 0.2;
  document.addEventListener('touchstart', function (e) {
    lastTouchTime = new Date();
    document.body.classList.remove('hovered');
  }, true);
  document.addEventListener('mousemove', function (e) {
    if (new Date() - lastTouchTime < 500) return;
    document.body.classList.add('hovered');
  }, true);
  document.getElementById('menu').addEventListener('click', function (e) {
    e.currentTarget.classList.toggle('--closed');
    e.currentTarget.classList.toggle('--open');
    var _loop = function _loop(i) {
      var distance = i * (360 / tools.length);
      if (e.currentTarget.classList.contains('--open')) {
        tools[i].firstChild.classList.remove('sr-only');
        viewport > 767 ? tools[i].firstChild.style.cssText = 'height:64px;width:64px;margin-left:-200px;animation: pulse 16s ease-in-out infinite;' : tools[i].firstChild.style.cssText = 'height:64px;width:64px;margin-left:-150px;animation: pulse 16s ease-in-out infinite;';
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
};
function setTrigger(item, longitude) {
  item.style.transform = "rotate(".concat(longitude, "deg)");
  item.querySelector('a span').style.transform = "rotate(-".concat(longitude, "deg)");
}