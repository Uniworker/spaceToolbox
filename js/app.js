window.onload = function() {
  let lastTouchTime = 0
  let viewport = window.innerWidth || document.documentElement.clientWidth
  const audio = document.getElementById('sound')
  const menu = document.getElementById('menu')
  const tools = document.querySelectorAll('#tools li')

  document.addEventListener('touchstart', (e) => {
    lastTouchTime = new Date()
    document.body.classList.remove('hovered')
  }, true)
  document.addEventListener('mousemove', (e)=>{
    if (new Date() - lastTouchTime < 500) return
    document.body.classList.add('hovered')
  }, true)

  audio.volume = 0.2;
  
  menu.addEventListener('click', (e)=>{
    e.currentTarget.classList.toggle('--closed')
    e.currentTarget.classList.toggle('--open')
    for (let i=0; i<tools.length; i++) {
      let distance = i * (360 / tools.length)
      if(e.currentTarget.classList.contains('--open')) {
        tools[i].firstChild.classList.remove('sr-only')
        viewport > 767 ?
        tools[i].firstChild.style.cssText = 'height:64px;width:64px;margin-left:-200px;animation: pulse 16s ease-in-out infinite;' :
        tools[i].firstChild.style.cssText = 'height:64px;width:64px;margin-left:-150px;animation: pulse 16s ease-in-out infinite;'
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
    item.querySelector('a span').style.transform = `rotate(-${longitude}deg)`
  }
}