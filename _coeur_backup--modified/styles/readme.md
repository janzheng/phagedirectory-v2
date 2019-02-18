

# Coeur Styles

These are the default style sheets that drive the Coeur style guide and projects based on Coeur.



## Usage

Install the package using `npm install coeur` and import the styles with `@import '@path/to/node_modules/coeur/index.scss';`

Importing `index.scss` brings the entire coeur in, which makes prototyping easy, but is fairly large. You can selectively include the CSS you need once you know the components you need.

You can also run your project through PurgeCSS to get rid of the extra fat.



### Structure

#### Heart
Coeur is influenced by atomic design and CSS cascades. `_heart` contains all the necessary elements like sizes, some core mixins, and colors. 

#### Head
Head includes basics like grids, CSS reset, mixin, responsive design, layouts, and so on.

#### Neck
Neck are the pieces necessary pieces that make up body components, like buttons, layouts, links, paragraph styles, and so on.

#### Body (components)
Body components are the components of coeur, and include pieces like cards, boxes, tags, modals, and so on. These all depend on how the `heart`, `head`, and `neck` are configured.







### Coeur 2.0

Coeur 2 introduces naming and other changes influenced by recent developments and style guides like PhotonCSS. This version is meant to be incompatible with original coeur, as some of class names never made sense.


### Coeur

Coeur started out as a way to reuse component styles, and snowballed into a huge collection.




### Major Changes

- started v2
- size-p2 is now size-2; size-m2 is now size--2
- original size-2 (double) is now size-2x
- addition of CSS vars, and the $theme map for storing all variables
- addition of variable maps: mixins should be used to extend from base, not @extend ...etc.



### Todo

- z-index mixin / manager





