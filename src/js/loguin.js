import {
  modalInner,
  modalOuter,
  editableElements,
  editButtons,
  loginButtons,
  changeImgInput,
} from './elements';
import {
  checkForThisTooltips,
  mirrorToLocalStorage,
  selectImg,
  tooltipList,
} from './utils';

let loginForm;
let toolType;

function handleSubmit(e) {
  // if it's necessary to close some tooltips
  tooltipList.forEach((el) => {
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
function createForm() {
  toolType = 'loginToolTips';
  modalOuter.classList.add('open');
  modalInner.innerHTML = `<div class="dropdown-menu show" style="position: static;">
    <form class="px-4 py-3 login-form">
      <div class="mb-3">
      <span class="${toolType}" data-bs-toggle="tooltip" data-bs-title="You can enter whatever you want, the form will allow you to edit the page." data-bs-placement="right" data-bs-trigger="manual">
        <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
        <div class="dropup">
          <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"
            data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="100,30">
          <div class="dropdown-menu">
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
      <span class="${toolType}" data-bs-toggle="tooltip" data-bs-title="Edit my site!" data-bs-placement="right" data-bs-trigger="manual">
      <button type="submit" class="btn btn-primary" >Sign in</button>
      </span>
    </form>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">New around here? Sign up</a>
    <a class="dropdown-item" href="#">Forgot password?</a>
  </div>
</div>`;
  modalInner.style.setProperty('transform', 'translateY(0)');
  loginForm = document.querySelector('.login-form');

  // --------------------------------TOOLTIPS?---------------------------

  checkForThisTooltips(toolType);

  loginForm.addEventListener('submit', handleSubmit);
}

function manageLogin() {
  console.log(loginButtons);
  loginButtons.forEach((but) => {
    but.addEventListener('click', createForm);
  });
}

export { manageLogin };
