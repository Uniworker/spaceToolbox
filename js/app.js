window.onload = function() {
  const audio = document.getElementById('sound')
  const menu = document.getElementById('menu')
  const tools = document.querySelectorAll('#tools li')

  audio.volume = 0.2;
  menu.addEventListener('click', (e)=>{
    e.target.classList.toggle('--closed')
    e.target.classList.toggle('--open')
    for (let unit of tools) {
      let distance = unit * (360 / tools.length)
      e.target.classList.contains('--open') ? setTrigger(unit, distance) : setTrigger(unit, '-360')
    }
  })

  function setTrigger(item, longitude) {
    item.style.transform = `rotate(${longitude}deg)`
    item.querySelector('a').style.transform = `rotate(-${longitude}deg)`
  }
}