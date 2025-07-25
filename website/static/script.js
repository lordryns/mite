// this script is for the index.html file
// and should not be imported anywhere else (unless you really want to)


import extensionCard from '/static/components/extension_card.js'

let extensionList = document.getElementById("extensions-div");
let remoteOrLocalSpan = document.getElementById("remote-or-local");

let pageNumber = 1;

let pageNumberPreviousBtn = document.getElementById("page_number_previous_btn"); 
let pageNumberDisplay = document.getElementById("page_number_display"); 
let pageNumberNextBtn = document.getElementById("page_number_next_btn"); 

let extensionAmount = localStorage.getItem("extension_amount");
let isLocal = localStorage.getItem("is-local") == 'true';
let pingOnload = localStorage.getItem("ping-onload");
if (pingOnload === null) {
  localStorage.setItem("ping-onload", true.toString())
  pingOnload = true;
}
extensionList.innerHTML = "Loading extensions...";
let baseUrl = ""
let userSearch = "";
document.addEventListener("DOMContentLoaded", () => {
  baseUrl = fetchExtensionBaseLayer();

   pageNumberPreviousBtn.onclick = function () {
    if (pageNumber > 1){
      pageNumber -= 1;
      fetchExtensionBaseLayer();
    }
  }
  pageNumberNextBtn.onclick = function () { 
    pageNumber += 1;
    fetchExtensionBaseLayer();
  }
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let searchInput = document.getElementById("search-input");
    if (searchInput.value.length > 0) {
      pageNumber = 1;
      userSearch = searchInput.value;
      fetchExtensionBaseLayer();
      
      const showing = document.getElementById("showing-results-for");
      showing.innerHTML = `Showing results for "${searchInput.value}" `;

      showing.appendChild(xiconFunc(() => {
        showing.innerHTML = "";
        userSearch = "";
        pageNumber = 1;
        fetchExtensionBaseLayer();
      }));
      searchInput.value = "";

    }
  })
})

function fetchExtensionBaseLayer() {
  if (extensionAmount === null) {
    extensionAmount = 10;
  } 


  let finalUrl = `/api/fetch_all?page=${pageNumber}&per_page=${extensionAmount}&is_local=${isLocal}&search=${userSearch}&ping_onload=${pingOnload}` 
  fetchDataFromServer(finalUrl);
  return finalUrl;
}

function fetchDataFromServer(url) {
  extensionList.innerHTML = "Loading extensions...";
  pageNumberDisplay.innerHTML = pageNumber;
  fetch(url)
    .then(res => res.json())
    .then(res => {
      extensionList.innerHTML = "";
      let bufferString = "";
      res.data.forEach(extension => {
        let status = "";
        if (extension.ping_response.status_code == 200) {
          status = "working";
          if (extension.ping_response.response_time > 4) {
            status = "unstable";
          }
        } else if (!extension.ping_response.ping_onload) {
          status = "default";
        } else {
          status = "down";
        }
        bufferString += extensionCard({title: extension.name, status: status, version: extension.version, sources: [], lang: extension.sources[0].lang, response_time: extension.ping_response.response_time.toFixed(2), url: extension.sources[0].baseUrl, apk: extension.apk});
        extensionList.innerHTML = bufferString;
      })

      if (res.remote) {
        remoteOrLocalSpan.innerHTML = "Remote";
      } else {
        remoteOrLocalSpan.innerHTML = "Local";
      }
    })
    .catch(err => {
      console.log("err:", err)
    })

}


function xiconFunc(func) {
  const button = document.createElement("button");
  button.className = "p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors";
  button.id = "close-icon-button";
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;
  button.onclick = func;
  return button;
}

