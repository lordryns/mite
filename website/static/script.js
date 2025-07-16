import extensionCard from '/static/components/extension_card.js'

let extensionList = document.getElementById("extensions-div");
let remoteOrLocalSpan = document.getElementById("remote-or-local");
extensionList.innerHTML = "Loading extensions...";
document.addEventListener("DOMContentLoaded", () => {
  fetchDataFromServer("/api/fetch_all?page=1");

  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let searchInput = document.getElementById("search-input");
    if (searchInput.value.length > 0) {
      fetchDataFromServer(`/api/fetch_all?search=${searchInput.value}`);
      
      const showing = document.getElementById("showing-results-for");
      showing.innerHTML = `Showing results for "${searchInput.value}" `;

      showing.appendChild(xiconFunc(() => {
          showing.innerHTML = "";
          fetchDataFromServer("/api/fetch_all?page=1");
      }));
      searchInput.value = "";

    }
  })
})



function fetchDataFromServer(url) {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      extensionList.innerHTML = "";
      let bufferString = "";
      res.data.forEach(extension => {
        bufferString += extensionCard({title: extension.name, status: 'working', version: 1.0, sources: [], lang: extension.lang, url: extension.sources[0].baseUrl});
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

