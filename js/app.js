window.onload = function() {
  const audio = document.getElementById('sound')
  const menu = document.getElementById('menu')
  const tools = document.querySelectorAll('#tools li')

  audio.volume = 0.2;
  menu.addEventListener('click', (e)=>{
    e.target.classList.toggle('--closed')
    e.target.classList.toggle('--open')
    for (let i=0; i<tools.length; i++) {
      let distance = i * (360 / tools.length)
      if(e.target.classList.contains('--open')) {
        tools[i].firstChild.classList.remove('sr-only')
        tools[i].firstChild.style.cssText = 'height:64px;width:64px;margin-left:-200px;animation: pulse 16s ease-in-out infinite;'
        setTrigger(tools[i], distance)
      } else {
        setTrigger(tools[i], '-360')
        tools[i].firstChild.style.color = 'transparent'
        setTimeout(() => {
          tools[i].firstChild.classList.add('sr-only')
        }, 500);
      }
    }
  })
  function setTrigger(item, longitude) {
    item.style.transform = `rotate(${longitude}deg)`
    item.querySelector('a').style.transform = `rotate(-${longitude}deg)`
  }
}