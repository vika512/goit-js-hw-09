import { Notify } from 'notiflix';

const refs = {
  button: document.querySelector('button'),
  form: document.querySelector('form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise ((res, rej) => {
    setTimeout (() => {
      if (shouldResolve) {
        res({ position, delay })
      } else {
        rej({ position, delay })
      }
    }, delay)
  })
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);
  const amount = Number(refs.amountInput.value);
  // console.log(delay, step, amount)


  if(delay < 0 || step < 0 || amount < 0) {
    Notify.warning(
      `Enter number more than 0`
    );
  } 
  
  else if(Number(amount) === 0) {
    Notify.warning(`Enter number more than 0`);
  } 
  
  else{
    for (let i = 0; i < amount; i++) {
      createPromise(i, delay + step * i)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
        });
    }
  };

};




