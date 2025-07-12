function goToURL() {
    const urlInput = document.getElementById('urlInput');
    const browserView = document.getElementById('browserView');
    let url = urlInput.value.trim();

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url; // default pakai HTTPS
    }

    browserView.src = url;
}
