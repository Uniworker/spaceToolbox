"use strict";

class Note {
  constructor(tag, content, index) {
    this.tag = tag ?? document.body
    this.content = content ?? ''
    this.index = index ?? 0
    this.create(tag, content, index)
  }
  create(el, title, index) {
    el.insertAdjacentHTML('beforeend', `<li class="list__item flex-grid" data-index="${index}">
              <span id="content" class="flex-grid__col">${title}</span>
              <span class="flex-grid__col flex-grid__col--sm">
                <span class="btn btn--success" id="editor" title="Edit the note" style="position:relative"><span
                    class="lnr lnr-pencil" style="position:absolute;top:25%;left:35%"></span></span>
                <span class="btn btn--danger" id="terminator" title="Delete forever" style="position:relative"><span class="lnr lnr-cross" style="position:absolute;top:25%;left:35%"></span></span>
              </span>
            </li>`);
  }
  edit(el, title) {
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (state) {
      el.classList.add('btn--warning');
      el.innerHTML = '&#10004;';
      title.setAttribute('contenteditable', 'true');
      title.style.cssText = 'border-bottom:2px dashed red;font-style:italic';
      el.classList.remove('btn--success');
    } else {
      el.classList.add('btn--success');
      el.innerHTML = '<span class="lnr lnr-pencil" style="position:absolute;top:25%;left:35%"></span>';
      title.setAttribute('contenteditable', 'false');
      title.style.cssText = 'border-bottom:none;font-style:normal';
      el.classList.remove('btn--warning');
    }
  }
  terminate(el) {
    el.remove()
  }
}

window.onload = function () {
  document.querySelector('form[name="sender"]').addEventListener('submit', function (e) {
    e.preventDefault();
  })
  var notes = [];
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
        notes.push(new Note(document.getElementById('list'), text.value, notes.length))
        /*localStorage.setItem('note', JSON.stringify(notes[0]))
        console.table(localStorage.getItem('note'))
        debugger*/
        prevData = text.value;
        if (text.hasAttribute('maxlength')) text.value = text.value.slice(0, text.maxLength);
        inputHandler('', 'inherit', 'Create next title');
      } else {
        inputHandler('', '2px solid red', 'Put some text here');
        text.classList.add('active');
      }
    }
    if (e.target.classList.contains('btn--success')) {
      let rootTarget = e.target.parentNode.parentElement
      notes[Number(rootTarget.dataset.index)].edit(e.target, rootTarget.firstElementChild, true)
      //let edited = localStorage.getItem('note')
      //const note = JSON.parse(edited)
    } else {
      if (e.target.classList.contains('btn--warning')) {
        let rootTarget = e.target.parentNode.parentElement
        notes[Number(rootTarget.dataset.index)].edit(e.target, rootTarget.firstElementChild)
      }
    }
    if (e.target.classList.contains('btn--danger')) {
      let rootTarget = e.target.parentNode.parentElement
      const deleted = notes.splice(Number(rootTarget.dataset.index), 1)
      deleted[0].terminate(e.target.parentNode.parentElement)
      //localStorage.removeItem('note')
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      if (text.value !== '' && text.value !== prevData) {
        notes.push(new Note(document.getElementById('list'), text.value, notes.length))
        prevData = text.value;
        if (text.hasAttribute('maxlength')) text.value = text.value.slice(0, text.maxLength);
        inputHandler('', 'inherit', 'Create next title');
      } else {
        inputHandler('', '2px solid red', 'Put some text here');
        text.classList.add('active');
      }
    }
  })
  function inputHandler(data, view, hint) {
    text.value = data;
    text.style.border = view;
    text.placeholder = hint;
  }
};