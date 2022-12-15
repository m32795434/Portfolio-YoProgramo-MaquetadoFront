const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

function handleSubmit(e) {
  e.preventDefault();
  modalOuter.classList.remove('open');
  document.querySelector('.edit-button').hidden = false;
  Array.from(document.querySelectorAll('.edit-text')).forEach((el) => {
    el.contentEditable = true;
  });
}
export function createForm() {
  modalOuter.classList.add('open');
  modalInner.innerHTML = `<div class="dropdown-menu show" style="position: static;">
    <form class="px-4 py-3 login-form">
      <div class="mb-3">
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
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">New around here? Sign up</a>
    <a class="dropdown-item" href="#">Forgot password?</a>
  </div>
</div>`;
  modalInner.style.setProperty('transform', 'translateY(0)');
  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', handleSubmit);
}
export function manageLogin() {
  Array.from(document.querySelectorAll('.login')).forEach((but) => {
    but.addEventListener('click', createForm);
  });
}
