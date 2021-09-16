# Website

Git repo for my personal website at [brignull.co.uk](http://www.brignull.co.uk).

## Repo layout

The general layout is:
```
- src
- data
- _build
```

The `_build` directory should not be modified directory and is generated from the `src` directory. Anything in the `data` directory is intended to be deployed without needing any building.

## Jekyll redirects

See the `_config.yml` file for the Jekyll configuration.

The contents of the `_build` directory is mapped onto the root so that the undesirable prefix is removed. This lets us serve files from the root URL while keeping them separated within the repo.

## Building

To build the site run
```
./build.sh`
```
This will delete and regenerate the `_build` directory.

See the `build.js` file for more information.

## Deploying

Just push the repo. It will be deployed using GitHub Pages.
