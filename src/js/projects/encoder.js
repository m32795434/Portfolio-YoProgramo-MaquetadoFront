const result = document.querySelector('.encoderResult');
const filterInputs = Array.from(
  document.querySelectorAll('[name= "encoderFilter"]')
);
const decodeTitle = document.querySelector('#decodeTitle');
const passInput = document.querySelector('#alfPassword');
const textArea = document.querySelector('[name="encoderText"]');

/* eslint-disable */
// const encodeDic = ['a','b','1','c','d','2','e','f','g','3','h','i','8','j','k','9','l','m','4','n','o','0','p','q','r','5','s','t','u','6','v','w','7','x','y','z'];
const funkyLetters = {
  '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
};
/* eslint-enable */
const filters = {
  alfaNumericEncode(text) {
    // String.prototype.codePointAt();
    // String.fromCharCode()
    // take a pass. Use it to convert the text.
    // One of the chars introduced in the text + one of the chars introduced in the pass => grater than 10175 => "introduce another char in the pass"
    let textToReturn;
    // const pass = passInput.value;
    // const textLenght = text.lenght;
    // const passLenght = pass.lenght;
    // console.log('pass:', pass);
    // for (let a = 0; a < lenght; a++) {
    //   textToReturn += text[i];
    // }
    return `${text}encode`;
  },
  alfaNumericDecode(text) {
    return `${text}decode`;
  },
  funky(letter) {
    // check if there is a funky letter for this case or
    // check if there is a lower case version
    let funkyLetter = funkyLetters[letter];
    funkyLetter = funkyLetter || funkyLetters[letter.toLowerCase()];
    // if there ir nothing return the letter
    return funkyLetter || letter;
  },
  sarcastic(letter, index) {
    // if it is odd, it will return <>0, so it is truthy,
    if (index % 2) {
      return letter.toUpperCase();
    } // if it's even
    return letter.toLowerCase();
  },
  unable(letter) {
    const random = Math.floor(Math.random() * 3);
    if (random === 2 && letter === ' ') {
      return '...';
    }
    return letter;
  },
};

function transformText(text, filter) {
  // take the text and loop over each caracter
  const mod = Array.from(text.trim()).map(filters[filter]).join('');
  result.textContent = mod;
}
function encodeOrDecode(text, filter) {
  const modified = filters[filter](text);
  result.textContent = modified;
}
function handleToggle() {
  this.textContent =
    this.textContent === 'to Encode' ? 'to Decode' : 'to Encode';
  filterInputs.forEach((el) => {
    if (el.id === 'alfaNumericDecode') {
      el.hidden = !el.hidden;
      el.checked = !el.checked;
    }
    if (el.id === 'alfaNumericEncode') {
      el.hidden = !el.hidden;
    }
    el.disabled = !el.disabled;
  });
  decodeTitle.textContent =
    decodeTitle.textContent === 'Alfanumeric Encode'
      ? 'Alfanumeric Decode'
      : 'Alfanumeric Encode';
}
function handleTextAreaInput(e) {
  const filter = filterInputs.find((input) => input.checked).value;
  const { value } = e.target;
  if (filter !== 'alfaNumericEncode' && filter !== 'alfaNumericDecode') {
    transformText(value, filter);
  } else {
    encodeOrDecode(value, filter);
  }
}
function handleFilterInputsInput(e) {
  const { id } = e.target;
  if (id !== 'alfaNumericEncode' && id !== 'alfaNumericDecode') {
    transformText(textArea.value, id);
  } else {
    encodeOrDecode(textArea.value, id);
  }
}
export {
  filterInputs,
  transformText,
  handleToggle,
  handleTextAreaInput,
  handleFilterInputsInput,
  textArea,
};
