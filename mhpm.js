(function(window) { // Closure for mhpm library
    let mhpmRepoJson;
    let mhpmRepoLoaded = false;
    let request = url => {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                res(xhr.responseText);
            });
            xhr.open('GET', url);
            xhr.send();
        });
    }
    let requestJson = async (url) => {
        return JSON.parse(await request(url));
    }
    (function() { // Closure for Module
        class Package {
            static async load(name) {
                if(!mhpmRepoLoaded) {
                    console.info("mhpm: loading repo file");
                    mhpmRepoJson = await requestJson('https://raw.githack.com/munchkinhalfling/mhpm/master/repository.json');
                    mhpmRepoLoaded = true;
                    console.info("mhpm: repo file loaded");
                }
                let pkg = mhpmRepoJson.pkgs.find((_pkg) => _pkg.name === name);
                return await Package.loadFromConfig(pkg["conf-file"]);
            }
            static async loadFromConfig(path) {
                console.info("mhpm: loading from config file " + path);
                let confFile = await requestJson(path);
                console.info("mhpm: package name is '" + confFile.name + "'");
                let resolvedDeps = new Set();
                for(let dep of confFile.dependencies) {
                    resolvedDeps.add(await Package.load(dep));
                }
                return eval(await request(confFile.pkgfile))(...resolvedDeps);
            }
        }
        window.Package = Package;
    })();
})(window || module.exports);
