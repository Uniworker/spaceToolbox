const ItemCtrl = (function() {
  
  const Item = function(id, url, shortUrl) {
    this.id = id;
    this.url = url;
    this.shortUrl = shortUrl;
  }

  const data = {
    items: [
      { id: 0, url: 'https://www.pexels.com/photo/young-man-sitting-in-a-car-on-a-night-street-18073372/', shortUrl: 'https://sho/link/j8t5'}
    ],
    currentItem: null
  }

  return {
    logData: function() {
      return data;
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
    }
  }
})()

const App = (function(ItemCtrl, UICtrl) {
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors()
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