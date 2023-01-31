/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-plusplus */
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
let tooltipsSaveBts;
let logged;

// ------------------------EVENT HANDLERS-------------------------------
function handleEditButtons(ev) {
  const t = ev.currentTarget;
  if (t.matches('.save')) {
    mirrorToLocalStorage();
  } else if (t.matches('.changeImg') && changeImgInput) {
    changeImgInput.click();
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  // if it's necessary to close some tooltips
  loginToolTips.forEach((el) => {
    if (el._config.trigger && el._config.trigger === 'manual') el.hide();
  });
  modalOuter.classList.remove('open');

  // await wait(1000);
  if (window.visualViewport.width >= 992) {
    tooltipsSaveBts = await createTooltips('.saveLg'); // from the edit mode
  } else {
    tooltipsSaveBts = await createTooltips('.save'); // from the edit mode
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
  let mirrorInterval;
  if (bool) {
    localStorage.setItem('login', 'true');
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
    loginButtons.forEach((el) => (el.textContent = 'LOGOUT'));
  } else {
    localStorage.setItem('login', 'false');
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
  loginForm.addEventListener('submit', handleSubmit);

  // --------------------------------TOOLTIPS + TOASTS?---------------------------

  checkForLoginToasts();
  loginToolTips = await createTooltips('.loginToolTips'); // for the login form
}

function manageLogin() {
  logged = JSON.parse(localStorage.getItem('login'));
  console.log('logged', logged);
  loginButtons.forEach((but) => {
    but.addEventListener('click', () => {
      if (logged) {
        // LOGOUT
        shouldEnableContentEditable(false);
      } else {
        // LOGIN
        createForm();
        console.log('form created');
      }
    });
  });
}

export { manageLogin, loginForm, shouldEnableContentEditable };
