(function() { // Closure for mhpm library
    let mhpmRepoJson;
    let mhpmRepoLoaded = false;
    let request = url => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        return xhr.responseText;
    }
    let requestJson = (url) => {
        
        return JSON.parse(request(url));
    }
    (function() { // Closure for Module
        class Package {
            static load(name) {
                if(!mhpmRepoLoaded) {
                    console.info("mhpm: loading repo file");
                    mhpmRepoJson = requestJson('https://cdn.jsdelivr.net/gh/munchkinhalfling/mhpm/repository.json');
                    mhpmRepoLoaded = true;
                    console.info("mhpm: repo file loaded");
                }
                console.info("mhpm: loading package '" + name + "'");
                let pkg = mhpmRepoJson.pkgs.find((_pkg) => _pkg.name === name);
                let pkgConfFile = requestJson(pkg["conf-file"]);
                return eval(request(pkgConfFile.pkgfile));
            }
        }
        window.Package = Package;
    })();
})();