const ItemCtrl = (function() {
  
  const Item = function(id, url, shortUrl) {
    this.id = id;
    this.url = url;
    this.shortUrl = shortUrl;
  }

  const data = {
    items: [
      { id: 0,
        url: '',
        shortUrl: ''}
    ],
    currentItem: null
  }

  return {
    logData: function() {
      return data;
    },
    addLink: function(link) {
      let ID;
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1
      } else {
        ID = 0
      }
      let shortLink = ItemCtrl.generateLink(link);
      debugger
      newItem = new Item(ID, link, shortLink)
      data.items.push(newItem)
      return newItem
    },
    generateLink: async function(url) {
      const result = await fetch(`https://shrtlnk.dev/api/v2/${url}`, {
        header: {
          'api-key': 'W7fC3Z5Z8AVK4YgrxfhuxeVCo3WVpQCkTEd9j4KB8PAlP',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data) => console.log(data))
      .catch(() => console.error('Failed to fetch'))
    },
    getItemById: function (id) {
      let found = null;
      data.items.forEach(item => {
        if (item.id === id) {
          found = item
        }
      });
      return found
    },
    setCurrentLink: function(link) {
      data.currentItem = link
      return data.currentItem.shortUrl
    }
  }
})()

const UICtrl = (function() {
  const UISelectors = {
    linkInput: '#longlink',
    shortItBtn: '#shortener',
    linksContainer: '#list',
    errorMsg: '#error',
    copyLink: '#copy'
  }

  return {
    getSelectors: function() {
      return UISelectors;
    },
    getLinkInput: function() {
      return {
        longLink: document.querySelector(UISelectors.linkInput).value
      }
    },
    errorLink: function() {
      const errorMsg = document.querySelector(UISelectors.errorMsg)
      errorMsg.className = 'main__error'
      errorMsg.classList.add('active')
      setTimeout(() => {
        errorMsg.classList.remove('active')
      }, 2500)
      UICtrl.clearInput()
    },
    clearInput: function() {
      document.querySelector(UISelectors.linkInput).value = ''
    },
    addListLink: function(item) {
      const li =  document.createElement('li')
      li.className = 'list__link';
      li.classList.add('flex-grid')
      li.id = `link-${item.id}`;
      li.innerHTML = `<span class="link__long">${item.url}</span>
                      <span class="link__short">${item.shortUrl}</span>
                      <button class="link__btn btn btn--secondary" id="copy">Copy</button>`
      document.querySelector(UISelectors.linksContainer).insertAdjacentElement('beforeend', li)
    },
    copyShortLink: function(link) {
      const textarea = document.createElement('textarea')
      const copiedLink = link
      textarea.value = copiedLink
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    },
    changeButton: function(el) {
      el.style.backgroundColor = '#3498db'
      el.style.borderColor = '#3498db'
      el.textContent = 'Copied'
    }
  }
})()

const App = (function(ItemCtrl, UICtrl) {
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors()
    document.querySelector(UISelectors.shortItBtn).addEventListener('click', addLink)
    document.querySelector(UISelectors.linksContainer).addEventListener('click', copyLink)
  }

  const addLink = function(e) {
    const input = UICtrl.getLinkInput()
    if(input.longLink !== false) {
      const re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
      if(re.test(input.longLink) == false) {
        UICtrl.errorLink()
      } else if(re.test(input.longLink) == true) {
        const newLink = ItemCtrl.addLink(input.longLink)
        UICtrl.addListLink(newLink)
        UICtrl.clearInput()
      }
    }
    e.preventDefault()
  }

  const copyLink = function(e) {
    if (e.target.classList.contains('link__btn')) {
      const linkId = e.target.parentNode.id
      const linkArr = linkId.split('-')
      const id = parseInt(linkArr[1])
      const linkToCopy = ItemCtrl.getItemById(id)
      const currentLink = ItemCtrl.setCurrentLink(linkToCopy)
      UICtrl.copyShortLink(currentLink)
      UICtrl.changeButton(e.target)
    }
  }

  return {
    init: function() {
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl)

window.onload = function() {
  document.forms.sender.addEventListener('submit', function (e) {
    e.preventDefault();
  })
  App.init()
}