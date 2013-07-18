/* WARNING: the name of the class is important! Make sure that if your plugin is in pages/myplugin/, then the class is named Pages_Myplugin_Index! */
class Pages_Myplugin_Index {
   public static $description = "Hello World";
   public static $isOptional = true;
   public static $showOnMenu = false; // do not show up in the administration

   /* 
    * Function called by the administration options plugin
    * We have no option (see gpx plugin for an example of options)
    */
   static public function getOptions() {
      return array();
   }

   /*
    * When the plugin is activated, the following file(s) will be loaded in the gallery
    */
   static public function getUserScripts() {
      return array('./admin/pages/myplugin/scripts/jgallery.myplugin.js');
   }
}; 

