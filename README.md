# mhpm
## MunchkinHalfling's Package Manager
This is a package manager for client-side JavaScript.
### Getting Started
To include MHPM, put the following into your `<head>`:
```html
<script src="https://cdn.jsdelivr.net/gh/munchkinhalfling/mhpm/mhpm.js"></script>
```
Then, in a script, you can import any package in the [repository file](https://github.com/munchkinhalfling/mhpm/blob/master/repository.json) with the following:
```js
...
const MyModule = Package.load("Package Name");
...
```
### Creating Packages
First, create a GitHub repo or something else for your package. Then, create an `mhpm-config.json` file that has the following syntax:
```json
{
  "name": "package name goes here",
  "version": "(optional) package version",
  "pkgfile": "(REQUIRED) javascript file of the package (see below)"
}
```
Then, create a JavaScript file (the path/URL goes in the `pkgfile` field) that follows the following syntax:
```js
(function() {
  // code/private variables
  return {
    // exported variables go here
  };
})() // notice: NO SEMICOLON AFTER CLOSURE
```
After that, go into the repository file and add an entry in the `pkgs` array that has the following format:
```json
{
  "name": "package name (REQUIRED)",
  "conf-file": "path to the configuration file made in the first step"
}
```
Then send me a pull request!
<br/><br/>
Note: I suggest that you create a GitHub repo for it and use [jsDelivr](jsdelivr.com) for the URLS, just so that the repo file stays consistent and doesn't reference a gazillion CDNs.
