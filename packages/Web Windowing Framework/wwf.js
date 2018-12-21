(function() {
    return {
        openWindow(title, html) {
            let fullHtml = `
<!doctype html>
<html>
    <head>
        <title>${title}</title>
    </head>
    <body>
        ${html}
    </body>
</html>
            `;
            let blob = new Blob([fullHtml], {type: 'text/html'});
            let blobUrl = URL.createObjectURL(blob);
            return window.open(blobUrl, "_blank", "chrome");
        }
    }
})()