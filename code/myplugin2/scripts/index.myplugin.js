var MyPlugin = {
   //called before writing the json of directory 'dir'
   //id is the unique id that is passed to your plugin template file; 
   //it can be used to retrieve values of inputs (or other DOM elements) of the template. See next function.
   //cb is a callback that MUST be called once we are done.
   preWriteJson:function(id, dir, cb) {
      cb(); // we do nothing here
   },

   // called when writing the json. Put any parameter that you want to be sent to PHP.
   getJsonParams:function(id, dir) {
      return { myplugin_post_var:$('#plug_'+id).val() }; // add the value of our input field
   },

   // the json has been written. Nothing else remains to be done
   postWriteJson:function(id, dir, cb) {
      cb();
   },

   // the template has been added. Now you can configure what happens when 
   // the administrator interacts with your buttons/inputs
   addButtonActions:function(id, dir, data) {
      //nothing
   },

   // the gallery provides an utility function that watches changes of content
   // on inputs and checkboxes. When the content changes, the directory theme changes
   // (a warning sign that informs the administrator that she must validate her changes
   // is added for example). In this function you can specify the DOM elements that 
   // should be watched.
   getHooks:function(dir, id) {
      return [$('#plug_'+id)];
   },

   // return what you want to show in the box of a directory that has not been added
   // to the gallery
   getUnparsedDirTpl:function(dir, div, id) {
      var tpl = $("#myplugTpl").tmpl({id:id});
      return tpl.html();
   },

   // return what you want to show in the box of a directory that has been added
   // to the gallery
   getParsedDirTpl:function(dir, id, json) {
      // we reuse the json.hashello field that has been set by PHP when the
      // directory was first added
      return $("#myplugTpl").tmpl({id:id,hello:json.hashello}).html();
   },
};
plugins.push(MyPlugin);

