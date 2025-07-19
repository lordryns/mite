function closeAlert() {
const alertEl = document.getElementById('alert-container');
alertEl.style.opacity = '0';
setTimeout(() => {
alertEl.remove();
}, 300);

}

document.addEventListener('DOMContentLoaded', () => {
  const countElement = document.getElementById('extensions-count');
  const decreaseBtn = document.getElementById('decrease-count');
  const increaseBtn = document.getElementById('increase-count');
  const hideAlertCheckbox = document.getElementById('hide-alert');
  const saveBtn = document.getElementById('save-settings');


  document.getElementById('tip-alert').onclick = closeAlert;

  let extensionAmount = "";
  extensionAmount = localStorage.getItem("extension_amount");
  if (extensionAmount === null) {
    localStorage.setItem("extension_amount", 10)
    extensionAmount = 10;
  } 

  countElement.innerHTML = extensionAmount;

  increaseBtn.onclick = function () {
    extensionAmount += 5;
    localStorage.setItem("extension_amount", extensionAmount);
    countElement.innerHTML = extensionAmount;
  }

  decreaseBtn.onclick = function () {
    if (extensionAmount > 5) {
      extensionAmount -= 5;
    } else {
      extensionAmount = 5;
    }
    localStorage.setItem("extension_amount", extensionAmount);
    countElement.innerHTML = extensionAmount;
  }


});


