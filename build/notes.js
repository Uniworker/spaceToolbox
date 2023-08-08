"use strict";

require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
window.onload = function () {
  var prevData = '';
  var text = document.getElementById("title");
  var counter = document.createElement('span');
  counter.style.cssText = 'position:absolute;top:17%;left:70%;color:gray;font-size:14px;z-index:2';
  document.body.append(counter);
  text.addEventListener('input', function () {
    counter.textContent = "".concat(text.value.length, "/").concat(text.maxLength);
  });
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('form-control')) {
      inputHandler('', 'inherit', '');
      counter.textContent = "".concat(text.value.length, "/").concat(text.maxLength);
      text.classList.remove('active');
    }
    if (e.target.classList.contains('btn-outline-info')) {
      if (text.value !== '' && text.value !== prevData) {
        document.getElementById('list').insertAdjacentHTML('beforeend', "<li\n          class=\"list-group-item d-flex justify-content-between align-items-center\" style=\"border-radius: 8px;\"\n        >\n          <span id=\"content\">".concat(text.value, "</span>\n          <span>\n            <span class=\"btn btn-small btn-success\" id=\"editor\" title=\"Edit the note\">&#128393;</span>\n            <span class=\"btn btn-small btn-danger\" title=\"Delete forever\">&times;</span>\n          </span>\n        </li>"));
        prevData = text.value;
        if (text.hasAttribute('maxlength')) text.value = text.value.slice(0, text.maxLength);
        inputHandler('', 'inherit', 'Create next title');
      } else {
        inputHandler('', '2px solid red', 'Put some text here');
        text.classList.add('active');
      }
    }
    if (e.target.classList.contains('btn-success')) {
      editContent(document.getElementById('editor'), document.getElementById('content'), true);
    } else {
      if (e.target.classList.contains('btn-warning')) {
        editContent(document.getElementById('editor'), document.getElementById('content'));
      }
    }
    if (e.target.classList.contains('btn-danger')) document.querySelector('.list-group-item').remove();
  });
  function inputHandler(data, view, hint) {
    text.value = data;
    text.style.border = view;
    text.placeholder = hint;
  }
  function editContent(editor, content) {
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (state) {
      editor.classList.add('btn-warning');
      editor.innerHTML = '&#10004;';
      content.setAttribute('contenteditable', 'true');
      content.style.cssText = 'border-bottom:2px dashed red;font-style:italic';
      editor.classList.remove('btn-success');
    } else {
      editor.classList.add('btn-success');
      editor.innerHTML = '&#128393;';
      content.setAttribute('contenteditable', 'false');
      content.style.cssText = 'border-bottom:none;font-style:normal';
      editor.classList.remove('btn-warning');
    }
  }
};