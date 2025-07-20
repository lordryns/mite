function closeAlert() {
const alertEl = document.getElementById('alert-container');
alertEl.style.opacity = '0';
setTimeout(() => {
alertEl.remove();
}, 300);

}


// putting outside the content loaded function to speed up the load
handleExtensionPerPage();
toggleLocalRemoteSource(); 
toggleGetExtensionStatusOnLoadState();
toggleShowTips();
document.addEventListener('DOMContentLoaded', () => {


 });

function handleExtensionPerPage() {
  const countElement = document.getElementById('extensions-count');
  const decreaseBtn = document.getElementById('decrease-count');
  const increaseBtn = document.getElementById('increase-count');
  const hideAlertCheckbox = document.getElementById('hide-alert');
   
  let extensionAmount = 10;
  extensionAmount = localStorage.getItem("extension_amount");
  if (extensionAmount === null) {
    localStorage.setItem("extension_amount", 10)
    extensionAmount = 10;
  }

  extensionAmount = Number(extensionAmount);



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


}

function toggleLocalRemoteSource() {
  const localSourceBtn = document.getElementById('local-source');
  const remoteSourceBtn = document.getElementById('remote-source');

  let isLocal = false;
  isLocal = localStorage.getItem("is-local");
  if (isLocal === null) {
    localStorage.setItem("is-local", false.toString())
    isLocal = false;
  }

  isLocal = isLocal === 'true';

  localSourceBtn.onclick = function () {
    isLocal = true;
    localStorage.setItem("is-local", isLocal.toString())
    updateButtonStyles(isLocal);
    }

  remoteSourceBtn.onclick = function () {
    isLocal = false;
   localStorage.setItem("is-local", isLocal.toString())
    updateButtonStyles(isLocal);
  }

  updateButtonStyles(isLocal);

  function updateButtonStyles(isLocal) {
    const activeClasses = "px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 bg-indigo-600 dark:bg-indigo-700 text-white";
    const inactiveClasses = "px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600";
    
    if (isLocal) {
      localSourceBtn.className = `${activeClasses} rounded-l-md`;
      remoteSourceBtn.className = `${inactiveClasses} rounded-r-md border-l-0`;
    } else {
      remoteSourceBtn.className = `${activeClasses} rounded-r-md`;
      localSourceBtn.className = `${inactiveClasses} rounded-l-md border-r-0`;
    }
  }
}

function toggleGetExtensionStatusOnLoadState() {
  const checkbox = document.getElementById('get-extension-status-checkbox');

  let isChecked = true;
  isChecked = localStorage.getItem("ping-onload");
  if (isChecked === null) {
    localStorage.setItem("ping-onload", true.toString())
    isChecked = true;
  }

  isChecked = isChecked === 'true';
  checkbox.checked = isChecked;
  checkbox.onclick = function () {
    localStorage.setItem("ping-onload", checkbox.checked)
  }
}

function toggleShowTips() {
  const checkbox = document.getElementById('show-tips-checkbox');

  let isChecked = true;
  isChecked = localStorage.getItem("show-tips");
  if (isChecked === null) {
    localStorage.setItem("show-tips", true.toString())
    isChecked = true;
  }

  isChecked = isChecked === 'true';
  checkbox.checked = isChecked;

  if (isChecked) {
    document.getElementById('alert-container').remove();
  } else {
    document.getElementById('tip-alert').onclick = closeAlert;
  }
  checkbox.onclick = function () {
    localStorage.setItem("show-tips", checkbox.checked)
  }
}
