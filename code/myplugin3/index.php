 /* WARNING: the name of the class is important! Make sure that if your plugin is in pages/myplugin/, then the class is named Pages_Myplugin_Index! */
class Pages_Myplugin_Index {
   /* Description that will show up in the top menu and in the options; keep it short */
   public static $description = "Hello World";

   /* Can the plugin be deactivated? Should be true */ 
   public static $isOptional = true;

   /* Create a button on the top menu? True only if you want to display something in the administration */
   public static $showOnMenu = true;

   /* 
    * Function called before calling any of the plugin action
    */
   public static function setupAutoload() {
   }

   /* 
    * Function called by the administration options plugin
    * We have no option (see gpx plugin for an example of options)
    */
   static public function getOptions() {
      return array();
   }

   static public function mainAction() {
      $template = new liteTemplate();
      $template->showPage('index'); // Will show ./tpl/index.tpl
      $template->assign(array('CLICK' => 'Click me !'));
      $template->view();
   }

   static public function fooBarAction() {
      $clicks = Controller::getParameter('clicks');
      echo File_JSON::myjson_encode(array(
         "foo" => "Hello! You have clicked the link $clicks times!"
      ));
   }
};

