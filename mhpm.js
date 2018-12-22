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
                    mhpmRepoJson = requestJson('https://cdn.jsdelivr.net/gh/munchkinhalfling/mhpm@latest/repository.json');
                    mhpmRepoLoaded = true;
                    console.info("mhpm: repo file loaded");
                }
                let pkg = mhpmRepoJson.pkgs.find((_pkg) => _pkg.name === name);
                return Package.loadFromConfig(pkg["conf-file"]);
            }
            static loadFromConfig(path) {
                console.info("mhpm: loading from config file " + path);
                let confFile = requestJson(path);
                console.info("mhpm: package name is '" + confFile.name + "'");
                let resolvedDeps = new Set();
                for(let dep of confFile.dependencies) {
                    resolvedDeps.add(Package.load(dep));
                }
                return eval(request(confFile.pkgfile))(...resolvedDeps);
            }
        }
        window.Package = Package;
    })();
})();
