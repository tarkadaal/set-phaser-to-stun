# set-phaser-to-stun
Boilerplate for using Phaser JS and Webpack together. Just add your game!

# usage

Very hastily written instructions, but you'll need:
- Node v21.6
- Itch.io's Butler for pushing: https://itch.io/docs/butler/installing.html

Then set up with:
`npm install`

# testing

`npm test`

# development

`npm run build` will build the project. You can start a dev server with `npm run serve`, and visit http://localhost:8080/

# publish

If you want to publish to itch.io, edit the `itchiotarget` in `package.json` with your target path, and be sure to `butler login`. After that, it's just `npm run itchio-push`. That tests the code, builds it, and pushes it to itch, in one easily abusable step! If anything fails, the process is aborted.

