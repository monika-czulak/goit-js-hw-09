const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStop.disabled = true;
let timerId;

btnStart.addEventListener('click', () => {
  function startSwitcher() {
    document.body.style.backgroundColor = getRandomHexColor();
    btnStart.disabled = true;
    btnStop.disabled = false;
  }
  startSwitcher();
  timerId = setInterval(startSwitcher, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
});
