<?php

/*
 * Do not forget to activate the plugin in the administration before testing!
 * WARNING: the name of the class is important! Make sure that if your plugin is in pages/myplugin/, then the class is named Pages_Myplugin_Index!
 */
class Pages_Myplugin_Index {
   public static $description = "Plugin";
   public static $isOptional = true;
   public static $showOnMenu = false;
   public static $userContentName = "hello";   
   public static $userContentDefaultPosition = 1; 
 
   /*
    * We export a tpl file in the main administration page.
    * The tpl will be filled by the index.myplugin.js file.
    */
   static public function getTpl() {
      $template = new liteTemplate();
      $template->file('pages/myplugin/tpl/filechooser.tpl');
      return $template->returnTpl();
   }
 
   static public function getUserFunctions() {
       return array(
          'config.contentPlugins["hello"] = function(json) {
               if(json.hashello) // written by the writeJSON function
                  alert("There is an hello file in this gallery!");
           }'
       );
   }
 
   public static function writeJSON($args) {
      $json = &$args['json'];
 
      $files = $old_json->masterDirectory->getFiles();
      foreach($files as $f) {
         if($f->extension == 'hello') {
            $json['hashello'] = true;
         }
      }
      return $json;
   }
};
