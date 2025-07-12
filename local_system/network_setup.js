function updateNetworkIcon() {
  const statusIcon = document.getElementById('network-icon');
  if (navigator.onLine) {
    statusIcon.src = 'drive/C/system/icons/online.png';
    statusIcon.alt = 'Online';
  } else {
    statusIcon.src = 'drive/C/system/icons/offline.png';
    statusIcon.alt = 'Offline';
  }
}

updateNetworkIcon();

window.addEventListener('online', updateNetworkIcon);
window.addEventListener('offline', updateNetworkIcon);