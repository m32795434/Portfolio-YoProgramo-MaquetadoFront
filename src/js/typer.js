import { wait, getRandomBetween } from './utils';
/* eslint-disable no-plusplus */
export async function write(el) {
  const text = el.textContent;
  const { length } = text;
  const { typeMin, typeMax } = el.dataset;
  let soFar = '';
  console.log(typeMin, typeMax);
  for (let i = 0; i < length; i++) {
    soFar += text[i];
    el.innerText = soFar;
    await wait(getRandomBetween(typeMin, typeMax));
    if (i === length - 1) {
      await wait(2000);
      write(el);
    }
  }
}
