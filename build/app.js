"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
window.onload = function () {
  var audio = document.getElementById('sound');
  var menu = document.getElementById('menu');
  var tools = document.querySelectorAll('#tools li');
  audio.volume = 0.2;
  menu.addEventListener('click', function (e) {
    e.target.classList.toggle('--closed');
    e.target.classList.toggle('--open');
    var _iterator = _createForOfIteratorHelper(tools),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var unit = _step.value;
        var distance = unit * (360 / tools.length);
        e.target.classList.contains('--open') ? setTrigger(unit, distance) : setTrigger(unit, '-360');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  function setTrigger(item, longitude) {
    item.style.transform = "rotate(".concat(longitude, "deg)");
    item.querySelector('a').style.transform = "rotate(-".concat(longitude, "deg)");
  }
};