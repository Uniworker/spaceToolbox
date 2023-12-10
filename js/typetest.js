const root = document
const pick = root.querySelector.bind(root)
const sc = pick('#sc').innerHTML = '10'
const ms = pick('#ms').innerHTML = '000'
const current = pick('#current').innerHTML = '0'
var w10s = 0, started = false
var text = ["Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay"]
pick('#content').innerHTML = text[0]
function runApp(t) {
  if(!started) {
    countdown(Number(sc))
    started = true;
  }
  pick('#content').innerHTML = text[0].replace(t, `<g>${t}</g>`)
  return t
}
pick('#text').addEventListener('input', (e) => {
  var t = runApp(e.target.value)
  pick('#current').innerHTML = e.target.value.length
  if(pick('#content').innerHTML != text[0]) {
    if(t.split("").length > w10s) {
      w10s = t.split("").length
    }
  }
})
function resetAll() {
  setTimeout(() => {
    started = false
    pick('#text').value = ''
    pick('#sc').innerHTML = '10'
    pick('#ms').innerHTML = '00'
    w10s = 0
    pick('#loader').remove()
    pick('#panel').style.cssText = 'background: transparent; opacity: 1; transition: all 0.5s linear'
  }, 2000)
  pick('#panel').style.cssText = 'background: rgba(0, 0, 0, 0.7); opacity: 0.3; transition: all 0.5s linear'
  let div = document.createElement('div')
  div.className = 'typetest__loader'
  div.id = 'loader'
  document.documentElement.append(div)
}

function countdown(t = 10) {
  const miliseconds = 1000
  var seconds = t * miliseconds
  const step = 10
  var tick = setInterval(() => {
    seconds -= step
    const remaining_sc = Math.floor(seconds / miliseconds)
    const remaining_ms = seconds % miliseconds
    pick('#ms').innerHTML = remaining_ms
    pick('#sc').innerHTML = remaining_sc
    if (seconds <= 0) {
      resetAll()
      clearInterval(tick)
    }
  }, 10)
}