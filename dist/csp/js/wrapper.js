window.reloadStartPage = function() {
    document.querySelector('iframe#startpage')
        .contentWindow.location.reload(true);
};
