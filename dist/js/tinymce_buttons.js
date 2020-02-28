(function() {
  tinymce.PluginManager.add( 'swpbtn', function( editor, url ) {
      // Add Button to Visual Editor Toolbar
      editor.addButton('swpbtn', {
          title: 'Button Shortcode',
          cmd: 'swpbtn',
          image:url + '/cta.svg',
          // url + '/scanwp.png',
      });
      editor.addCommand('swpbtn', function() {
          var selected_text = editor.selection.getContent({
              'format': 'html'
          });
         
          var shortcode = '[button title="" url="" target=""]';
          return_text = shortcode;
          editor.execCommand('mceReplaceContent', false, return_text);
          return;
      });
  });
})();