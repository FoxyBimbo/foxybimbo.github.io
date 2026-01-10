Tile Forge



Simple little javascript app built for RPG Maker MZ but should work with other tile sets and icon sets that are the same size. 



Features

* Upload an Icon Set or Tile Set or use a blank document
* Upload an image to import tiles from
* Drag n Drop selected imported tiles to a new tile set
* Select multiple items to drag n drop
* Select a tile on the active document and use arrow keys to nudge by 1 pixel
* Select a tile on the active document and cut n paste it to other spaces on your tile set
* Save your active document
* Auto selects which format based on the size of the image uploaded
* Small Items document type that stores a 3x4 grid of 48x48 pixel tiles
* Tall Items document type that stores a 3x4 grid of 48x96 pixel tiles for tall events
* Big Items document type that stores a 3x4 grid of 96x96 pixel tiles meant for tall and wide events (like bookshelves)
* ReParse your active document, so if you use the arrow keys to move a tile into another space it will treat it as parsing a new image. This is helpful when you're moving an object that takes up two spaces but can be fit into one space. After nudging them with the arrow keys into one space together. ReParse and it will treat it as a one tile in that space now
