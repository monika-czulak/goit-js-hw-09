import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let todaysDate = new Date();
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() - todaysDate.getTime() >= 0) {
      btnStart.disabled = false;
      selectedDate = selectedDates[0];
    } else {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
    }
  },
};

btnStart.disabled = true;
const calendar = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  value < 10 ? (value = value.toString().padStart(2, '0')) : value;
  return value;
}

btnStart.addEventListener('click', () => {
  function updateTimer() {
    btnStart.disabled = true;
    todaysDate = new Date();
    let timeDiff = selectedDate.getTime() - todaysDate.getTime();
    let remainingTime = convertMs(timeDiff);

    timerDays.innerHTML = addLeadingZero(remainingTime.days);
    timerHours.innerHTML = addLeadingZero(remainingTime.hours);
    timerMinutes.innerHTML = addLeadingZero(remainingTime.minutes);
    timerSeconds.innerHTML = addLeadingZero(remainingTime.seconds);

    if (timeDiff < 1000) {
      clearInterval(timerId);
      Notify.info('Time is up!', {
        position: 'center-top',
      });
    }
  }
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
});
