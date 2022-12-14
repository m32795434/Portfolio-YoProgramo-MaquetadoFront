const loginButtons = Array.from(document.querySelectorAll('.login'));

export function manageLogin(e) {
  console.log(e);
}
loginButtons.forEach((but) => {
  but.addEventListener('click', manageLogin);
});
