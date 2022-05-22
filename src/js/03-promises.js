import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form')
}

refs.form.addEventListener('submit', onSubmitForm)

function onSubmitForm(evt) {
  evt.preventDefault();
  let delay = Number(evt.target.elements.delay.value);
  let step = Number(evt.target.elements.step.value);
  let amount = Number(evt.target.elements.amount.value);

for (let i = 0; i < amount; i+= 1) {
  const position = i + 1;

  createPromise(position, delay)
    .then(({ position, delay }) => {
      setTimeout(() => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }, delay);
    })
    .catch(({ position, delay }) => {
      setTimeout(() => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }, delay);
  });

  delay += step;
  
}
  
}

function createPromise(position, delay) {

  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
      return promise;
}



