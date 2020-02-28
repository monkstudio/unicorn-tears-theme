# ✨ Gulp tasks

Remember to pass in args to the gulp task for custom theme names, project names, or port numbers.
eg. ``unicorn-tears --project=__PROJECTNAME__``
``unicorn-tears`` is the shell script eduardo has written to shortcut cd-ing into the unicorn-tearserver folder on /devserver and running gulp from there.

### Default watch process
``unicorn-tears``

The default gulp process watches the project folder for sass and js changes and compiles the files to the root directory. Alongside this gulp will also watch all php and html files, and css files in the root.
Browsersync will appear with a notice at the bottom right if connected successfully.
If no args are passed gulp will default to watching the base install.

### Process sass files
``unicorn-tears styles``

All CSS is managed using sass in the scss folder. Gulp watches for changes to .scss files in this folder and outputs two files: style.css and style.min.css to the project root. 
Any custom vendor CSS will have to be manually wired in to the scss folder. **This is intentional because more often than not manual edit of vendor CSS is necessary.**

Source maps are generated inline in style.css. The theme will automatically link to style.css if on the Monk server, and style.min.css if not on the Monk server.

### Bower
``unicorn-tears bower``

You can optionally use bower to download dependencies to the project. Update the bower.json file and this task will download the dependency, output the files to bower_components and copy all necessary js files to ``js/-vendor`` for processing.

### Process scripts
``unicorn-tears scripts``

The gulpfile processes all scripts in the ``/js`` folder. If you are using bower make sure all the files in -vendor is actually what you need, or you might have unnecessary scripts in the minified files.

- Finally, the task will concatenate all the scripts to ``script.js`` and ``script.min.js`` to the project root.
- The theme automatically links to script.js if on the Monk server, and script.min.js if not on the Monk server.

If you want the task to exclude any scripts in the js folder, simply prefix the file or folder with a _.

## Tasks on the fly
These tasks are meant to be run once and are not part of the default watch process.

### Install and update npm packages
``unicorn-tears npm``

Run this task to update and install npm packages from package.json. This normally won't change but if you need to write custom gulp task for a specific project then this might help. In the event a dependency is deleted from the package.json file make sure to run  ``npm install`` in the gulpfile/package.json directory to restore working order.


##Tasks to run at the end of the development process

### Optimise images
``unicorn-tears images``

Move all image assets to ``images/-dump`` in the theme folder and run the task. Gulp will optimise the files in ``images/-dump`` and output all minified images to the ``images/`` root. Feel free to delete the _dump folder after running this task.

### Generate favicons
``unicorn-tears favicons``

Create a ``favicon.png`` for your project and move it to``images/-dump``. Gulp will generate a folder of favicons to the ``images/`` root. The markup for the favicons is in header.php and automatically wires the favicons in meaning you don't need to do anything else. If you need to edit the favicon html just navigate to header.php.  You can also set custom favicon output settings/sizes in the gulpfile and find html markup in the generated faviconData.json file.

### Update favicons
``unicorn-tears favicon-update``

It might be a good idea to update favicon data for sizes etc. every once in a while.

### Page speed insights
``unicorn-tears psi``

Run this task to get an overview of Google's page speed insights right in the terminal. Note the task will error out if the score is not over 70. 

### Sprites
``unicorn-tears sprites``

To generate a spritesheet dump image assets into ``images/-sprites`` (make sure they are jpg or png files) then run the task.
The generated spritesheet will be moved to the images root while the css file will be moved to ``scss/media``.

### Fontello
``unicorn-tears fontello``

Download your config.json from fontello and move it to ``fonts/fontello``.
Run the task and all assets will be copied to the ``fonts`` directory. You'll have to copy the font css manually to the scss folder as you really only need the icon codes css to overwrite in ``scss/fonts/_fontello-codes.scss``.