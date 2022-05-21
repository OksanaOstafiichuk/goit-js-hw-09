import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
  value: document.querySelector('.value')
}

refs.btnStart.addEventListener('click', onClickStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    if (currentDate > selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
};

let timerId = null;
const selectedDate = flatpickr('#datetime-picker', options);
refs.btnStart.disabled = true;


function onClickStart(evt) {
  const startDate = selectedDate.selectedDates[0];

  timerId = setInterval(() => {
    const dateCurrent = Date.now();
    const differenceDate = startDate - dateCurrent;
    
    if (differenceDate < 0) {
      clearInterval(timerId);
      Notiflix.Notify.success('Your time is up');
      refs.btnStart.disabled = false;

      return;
    }

    const time = convertMs(differenceDate);

    updateTimer(time)
  }, 1000)
    
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimer( { days, hours, minutes, seconds } ) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

