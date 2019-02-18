
# Coeur

###### WARNINGS
- This is an early-stage prototype
- This version (0.2^) breaks apps that use 0.1.58
- Further work on 0.1^ has stopped


Coeur is a resource for jumpstarting side projects and prototypes.

Coeur is a living document and will change often; you should use it as a starting point than anything else. Modify it to your own needs!

For the current WIP, please visit coeur.surge.sh.
The files will be released on Github when they're closer to done.



## Background

Coeur started as a toolbox to speed up my work process, as a style guide and reusable javascript library. Since then, it has grown into a larger collection of opinions, ideas, examples, and resources on how to design, prototype and launch new projects.

Use Coeur as a starting point for your own toolbox.



## Notes & Tips

Here are some notes and tips to get your own examples running:
- This is not a framework or a guide—it's a project starter.
- Coeur comes with documentation built in Nuxt, and a few (older) docs built in Middleman and Jekyll
- The documentation and examples can be used as a starting point for your projects
- Clone the github repository to run the documentation locally, or to try the examples
- `package.json` contains npm shortcuts to run or deploy the documentation
- Each example folder contain their own installation notes `package.json` with commands to run the respective generators
- The docs run on Nuxt and requires npm v8. Try installing nvm and running: `nvm use 8.11.2`
- Check the documentation site (https://zeee.co/coeur) for additional guidance


## Commands

These convenience commands are helpful for general project development. Check them out in `package.json` and make them your own.


``` bash
# install dependencies after copied or downloaded
$ npm install # Or yarn install

# serve with hot reload at localhost:7711 (change in package.json)
$ npm run dev

# commits and pushes changes to github (for lazy people; requires setup)
$ npm run commit

# deploy to stage server (I use surge, but you may use Now or anything else)
$ npm run surge

# deploy to production server (uses surge by default)
$ npm run deploy


# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate

```
