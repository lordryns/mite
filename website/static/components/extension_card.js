const notyf = new Notyf(); 

const statusConfig = {
    working: { 
      dot: 'bg-green-500', 
      badge: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    unstable: { 
      dot: 'bg-yellow-500', 
      badge: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    },
    down: { 
      dot: 'bg-red-500', 
      badge: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200',
      icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    default: { 
      dot: 'bg-gray-500', 
      badge: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  };
 

export default function extensionCard({ title, version, sources, lang, status, lastChecked, url }) {
  
  const { dot, badge, icon } = statusConfig[status] || statusConfig.default;
  const statusText = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';

  const sourcesHTML = sources.map(source => `
    <div class="flex items-center text-xs">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      <a href="${source.url}" class="text-indigo-600 dark:text-indigo-400 hover:underline truncate" target="_blank">
        ${source.name}
      </a>
    </div>
  `).join('');

  return `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- Card Header -->
      <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div class="flex items-center truncate">
          <div class="w-3 h-3 rounded-full mr-2 ${dot} flex-shrink-0" id="${url}_dot_element"></div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">${title}</h3>
        </div>
        <span class="text-xs px-2 py-1 rounded-full ${badge} flex-shrink-0" id="${url}_badge_element">
          ${statusText}
        </span>
      </div>

      <!-- Card Body -->
      <div class="px-4 py-3">
        <!-- Version & Status -->
        <div class="flex items-start mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 mt-0.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}" />
          </svg>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400">Version <span class="font-medium">${version}</span></p>
            <p class="text-xs text-gray-400 dark:text-gray-500">Last checked: ${lastChecked}</p>
          </div>
        </div>

        <!-- Sources -->
        <div class="mb-2">
          <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sources</p>
          <div class="space-y-1.5">
            ${sourcesHTML}
          </div>
        </div>

        <!-- Language -->
        <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span>${lang || 'Multi'}</span>
        </div>
      </div>

      <!-- Card Footer -->
      <div class="px-4 py-2 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <span class="text-xs text-gray-500 dark:text-gray-400">ID: ${title.toLowerCase().replace(/\s+/g, '-')}</span>
        <button onclick="sendPingRequest('${url}')" id="${url}_refresh_element" class="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  `;
}

function sendPingRequest(url) {
  let refresh_element = document.getElementById(`${url}_refresh_element`);
  let dot_element = document.getElementById(`${url}_dot_element`);
  let badge_element = document.getElementById(`${url}_badge_element`);
  refresh_element.innerHTML = "refreshing...";
  fetch(`/api/ping_extension?url=${url}`)
    .then(res => res.json())
    .then(res => {
      refresh_element.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
`

        let status = "";
        if (res.status_code == 200) {
          status = "working";
        } else {
          status = "down";
        }
        const { dot, badge, icon } = statusConfig[status] || statusConfig.default;
        const statusText = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';

       dot_element.className = `w-3 h-3 rounded-full mr-2 ${dot} flex-shrink-0`; 
       badge_element.className = `text-xs px-2 py-1 rounded-full ${badge} flex-shrink-0`; 
       badge_element.textContent = statusText;

      if (status == "working") {
        notyf.success("Extension is active!");
      } else {
        notyf.error("Extension is down, check back later!");

      }
    })
}

window.sendPingRequest = sendPingRequest;
