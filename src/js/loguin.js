/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-plusplus */
import {
  modalInner,
  modalOuter,
  editableElements,
  editButtons,
  loginButtons,
  changeImgInput,
  imgsToChange,
} from './elements';
import {
  checkForLoginToasts,
  createTooltips,
  mirrorToLocalStorage,
  selectImg,
} from './utils';

let loginForm;
let loginToolTips;
let tooltipsSaveBts;
let logged;
let toolChangeImg;
let mirrorInterval;

// ------------------------EVENT HANDLERS-------------------------------
function handleEditButtons(ev) {
  const t = ev.currentTarget;
  if (t.matches('.save') || t.matches('.saveLg')) {
    mirrorToLocalStorage();
  } else if (t.matches('.changeImg') && changeImgInput) {
    changeImgInput.click();
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  // if it's necessary to close some tooltips in the login
  loginToolTips.forEach((el) => {
    if (el._config.trigger && el._config.trigger === 'manual') el.hide();
  });

  modalOuter.classList.remove('open');

  // setting the tooltips for the edit mode
  if (window.visualViewport.width >= 975.2) {
    tooltipsSaveBts = await createTooltips('.toolSaveBtnLg'); // from the edit mode
  } else {
    tooltipsSaveBts = await createTooltips('.toolSaveBtn'); // from the edit mode
  }
  tooltipsSaveBts.forEach((el) => {
    console.log(el.tip);
    el.tip.addEventListener(
      'click',
      () => {
        el.hide();
      },
      { once: true }
    );
  });
  // enable the tooltips for the load-img
  // console.log('img to change:', imgsToChange);

  toolChangeImg = await createTooltips('.changeImg');
  toolChangeImg.forEach((el) => {
    console.log('el:', el);
    el.tip.addEventListener(
      'click',
      () => {
        el.hide();
      },
      { once: true }
    );
  });

  // tooltips?need to change the color of the arrow? - SOME DAY IN THE FUTURE🙏
  /* const sheets = document.styleSheets;
  for (let i = 0; i < sheets.length; i++) {
    let rules = [];
    try {
      rules = sheets[i].cssRules || sheets[i].rules;
    } catch (err) {
      console.log(err);
    }
    for (let j = 0; j < rules.length; j++) {
      if (rules[j].selectorText === 'div') {
        const pseudo = rules[j];
        // pseudo.style.backgroundColor = '#your-color';
        console.dir(pseudo);
        break;
      }
    }
  } */

  shouldEnableContentEditable(true);
}

function shouldEnableContentEditable(bool) {
  if (bool) {
    localStorage.setItem('login', true);
    logged = true;
    console.log('shouldEnableContentEditable(true)');
    if (changeImgInput) {
      changeImgInput.onchange = function () {
        selectImg(this);
      };
    }
    editButtons.forEach((but) => {
      but.hidden = false;
      but.addEventListener('click', handleEditButtons);
    });
    editableElements.forEach((el) => {
      el.contentEditable = true;
    });
    mirrorInterval = setInterval(() => {
      mirrorToLocalStorage();
      console.log('Mirroring!!!');
    }, 10000);
    console.log('mirrorInterval', mirrorInterval);
    loginButtons.forEach((el) => (el.textContent = 'LOGOUT'));
  } else {
    localStorage.setItem('login', false);
    logged = false;
    console.log('login out.....');
    if (toolChangeImg) {
      toolChangeImg.forEach((el) => el.hide());
    }
    if (tooltipsSaveBts) {
      tooltipsSaveBts.forEach((el) => el.hide());
    }
    editableElements.forEach((el) => {
      el.contentEditable = false;
    });
    editButtons.forEach((but) => {
      but.hidden = true;
      but.removeEventListener('click', handleEditButtons);
    });
    mirrorToLocalStorage();
    clearInterval(mirrorInterval);
    loginButtons.forEach((el) => (el.textContent = 'LOGIN'));
  }
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
  loginForm.addEventListener('submit', handleSubmit, { once: true });

  // --------------------------------TOOLTIPS + TOASTS?---------------------------

  checkForLoginToasts();
  loginToolTips = await createTooltips('.loginToolTips'); // for the login form
}

function manageLogin() {
  logged = JSON.parse(localStorage.getItem('login'));
  console.log('refreshed....logged:', logged);
  loginButtons.forEach((but) => {
    but.addEventListener('click', () => {
      if (logged) {
        // LOGOUT
        console.log('logged true?', logged);
        shouldEnableContentEditable(false);
      } else {
        // LOGIN
        console.log('logged false?', logged);
        createForm();
        console.log('form created');
      }
    });
  });
}

export { manageLogin, loginForm, shouldEnableContentEditable };
