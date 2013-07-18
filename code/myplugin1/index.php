<?

/*
 * Do not forget to activate the plugin in the administration before testing!
 * Then update a directory that contains a .hello file and go into the gallery. It will show an alert box.
 * WARNING: the name of the class is important! Make sure that if your plugin is in pages/myplugin/, then the class is named Pages_Myplugin_Index! 
 */
class Pages_Myplugin_Index {
   public static $description = "Plugin";
   public static $isOptional = true;
   public static $showOnMenu = false;

   public static $userContentName = "hello";   // The name of what I will show
                                               // Will call showContent('hello', json) in the gallery
   public static $userContentDefaultPosition = 1; // the gallery shows elements in this order by default: galeries, pictures, videos. Insert at position 1 to show galeries, hello, pictures and videos.

   /* This plugin has no option. See the hello world administration plugin for options handling */
   static public function getOptions() {
      return array();
   }

   /* This plugin requires no javascript file to be loaded in the gallery. To load a file in the gallery, put its url (e.g., './admin/pages/myplugin/scripts/myscript.js') in the array */
   static public function getUserScripts() {
      return array();
   }

   /* Export one function to the gallery. Note that we could have put the code in a file and used the getUserScript function to make the gallery load the file (recommended if you have a lot of code to load) */
   static public function getUserFunctions() {
       return array(
          'config.contentPlugins["hello"] = function(json) {
               if(json.hashello) // written by the writeJSON function
                  alert("There is an hello file in this gallery!");
           }'
       );
   }

   /* Content that is shown in the administration index for each directory (e.g., a file chooser to upload a .hello file. See the 2nd example for that. */
   static public function getTpl() {
      return '';
   }

   /* Called when the gallery writes a JSON. Add our static fields. */
   public static function writeJSON($new_json_content, $old_json) {
      $json = array();

      $files = $old_json->masterDirectory->getFiles();
      foreach($files as $f) {
         if($f->extension == 'hello') {
            $json['hashello'] = true;
         }
      }
      return $json;
   }

   /* Any content we might want to export when the administration displays a directory */
   public static function getContent() {
      return array();
   }
};

