"use strict";

window.onload = function () {
  var prevData = '';
  var text = document.getElementById("title");
  var counter = document.createElement('span');
  counter.classList.add('main__counter');
  counter.style.cssText = 'position:absolute;top:80px;left:70%;color:gray;font-size:14px;z-index:3';
  document.getElementById('creator').before(counter);
  text.addEventListener('input', function () {
    counter.textContent = "".concat(text.value.length, "/").concat(text.maxLength);
  });
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('main__field')) {
      inputHandler('', 'inherit', '');
      counter.textContent = "".concat(text.value.length, "/").concat(text.maxLength);
      text.classList.remove('active');
    }
    if (e.target.classList.contains('main__btn')) {
      if (text.value !== '' && text.value !== prevData) {
        document.getElementById('list').insertAdjacentHTML('beforeend', "<li\n          class=\"list__item flex-grid\" style=\"border-radius: 8px;\"\n        >\n          <span id=\"content\" class=\"flex-grid__col\">".concat(text.value, "</span>\n          <span class=\"flex-grid__col flex-grid__col--sm\">\n            <span class=\"btn btn--success\" id=\"editor\" title=\"Edit the note\"\">&#128393;</span>\n            <span class=\"btn btn--danger\" title=\"Delete forever\">&times;</span>\n          </span>\n        </li>"));
        prevData = text.value;
        if (text.hasAttribute('maxlength')) text.value = text.value.slice(0, text.maxLength);
        inputHandler('', 'inherit', 'Create next title');
      } else {
        inputHandler('', '2px solid red', 'Put some text here');
        text.classList.add('active');
      }
    }
    if (e.target.classList.contains('btn--success')) {
      editContent(document.getElementById('editor'), document.getElementById('content'), true);
    } else {
      if (e.target.classList.contains('btn--warning')) {
        editContent(document.getElementById('editor'), document.getElementById('content'));
      }
    }
    if (e.target.classList.contains('btn--danger')) document.querySelector('.list__item').remove();
  });
  function inputHandler(data, view, hint) {
    text.value = data;
    text.style.border = view;
    text.placeholder = hint;
  }
  function editContent(editor, content) {
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (state) {
      editor.classList.add('btn--warning');
      editor.innerHTML = '&#10004;';
      content.setAttribute('contenteditable', 'true');
      content.style.cssText = 'border-bottom:2px dashed red;font-style:italic';
      editor.classList.remove('btn--success');
    } else {
      editor.classList.add('btn--success');
      editor.innerHTML = '&#128393;';
      content.setAttribute('contenteditable', 'false');
      content.style.cssText = 'border-bottom:none;font-style:normal';
      editor.classList.remove('btn--warning');
    }
  }
};