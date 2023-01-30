/* eslint-disable import/no-mutable-exports */

import {
  modalInner,
  modalOuter,
  editableElements,
  editButtons,
  loginButtons,
  changeImgInput,
} from './elements';
import {
  checkForLoginToasts,
  createTooltips,
  mirrorToLocalStorage,
  selectImg,
} from './utils';

let loginForm;
let loginToolTips;

function handleSubmit(e) {
  // if it's necessary to close some tooltips
  loginToolTips.forEach((el) => {
    if (el._config.trigger && el._config.trigger === 'manual') el.hide();
  });
  e.preventDefault();
  modalOuter.classList.remove('open');

  if (changeImgInput) {
    changeImgInput.onchange = function () {
      selectImg(this);
    };
  }

  editButtons.forEach((but) => {
    but.hidden = false;
    but.addEventListener('click', (ev) => {
      const t = ev.currentTarget;
      if (t.matches('.save')) {
        mirrorToLocalStorage();
      } else if (t.matches('.changeImg') && changeImgInput) {
        changeImgInput.click();
      }
    });
  });

  editableElements.forEach((el) => {
    el.contentEditable = true;
  });
  setInterval(() => {
    mirrorToLocalStorage();
    console.log('Mirroring!!!');
  }, 10000);
}
async function createForm() {
  modalOuter.classList.add('open');
  modalInner.innerHTML = `<div class="dropdown-menu show" style="position: static;">
    <form class="px-4 py-3 login-form">
      <div class="mb-3">
        <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
        <div class="dropup">
          <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"
            data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="100,30">
          <div class="dropdown-menu format">
            <h6 class="dropdown-header">Format:</h6>
            <hr class="dropdown-divider">
            <p class="dropdown-item">email@example.com</p>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="dropdownCheck">
          <label class="form-check-label" for="dropdownCheck">
            Remember me
          </label>
        </div>
      </div>
      <span class="loginToolTips" data-bs-toggle="tooltip" data-bs-title="Edit my site!" data-bs-placement="right" data-bs-trigger="manual">
      <button type="submit" class="btn btn-primary" >Sign in</button>
      </span>
    </form>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">New around here? Sign up</a>
    <a class="dropdown-item" href="#">Forgot password?</a>
  </div>
</div>
<div class="toast-container position-fixed top-0 start-0 p-3">
    <div id="loginToast" class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true"
      data-bs-delay="30000">
      <div class="toast-header">
        <!-- <img src="..." class="rounded me-2" alt="..."> -->
        <strong class="me-auto">Login:</strong>
        <small>How to</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
      You can enter whatever the credentials you want, the form will allow you to log and edit the page.
      </div>
    </div>
  </div>`;
  modalInner.style.setProperty('transform', 'translateY(0)');
  loginForm = document.querySelector('.login-form');

  // --------------------------------TOOLTIPS?---------------------------

  loginToolTips = await createTooltips('loginToolTips');
  console.log('loginToolTips', loginToolTips);
  checkForLoginToasts();
  loginForm.addEventListener('submit', handleSubmit);
}

function manageLogin() {
  console.log(loginButtons);
  loginButtons.forEach((but) => {
    but.addEventListener('click', createForm);
  });
}

export { manageLogin, loginForm };
