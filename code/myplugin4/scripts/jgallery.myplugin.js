/*
 * jgallery.myplugin.js
 */
var MyPlugin = {
   // Called on each page change. 
   // Ask the plugin if it wants to handle the current page
   want:function(action) {
      return action == "myplugin"; // only handle #!myplugin
   }

   // we said we wanted the page, now let's handle it!
   handle:function(action) {
      alert("Your are on page "+action); 
   },

   // do various initialization routines and register the plugin
   init:function() {
      jGallery.plugins.push(MyPlugin);
   }
};
// inform the gallery that the file is loaded
config.pluginsInstances.push(FacePlugin);

