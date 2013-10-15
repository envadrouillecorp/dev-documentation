var myTheme = {
   /*
    * Boolean to tell whether you want the gallery to perform smooth
    * transition between pages (fadeIn/fadeOut)
    */
   animateContent : false,
 
   /*
   * Called on all pages, with or without an argument. May be used to display a breadcrumb or anything you want.
   * @json: /!\ the json being displayed or *undefined* when performing a search
   */
   showHeader:function(json) {
      // Simplest code: do nothing.
   },
 
   /*
   * Called multiple times most pages to display content.
   * @content the content to display (e.g., 'dirs', 'pics', 'vids', 'gpx', ...)
   * @json the json being displayed
   */
   showContent:function(content, json) {
      switch(content) {
        case 'dirs': return myTheme.showDirs(json);
        case 'pics': return myTheme.showPics(json);
        case 'vids': return myTheme.showVids(json);
        default: return jGallery.defaultContent(content, json);
      }
   },
 
   /*
   * Called to display a search result
   * @dataFull: the galleries that match all searched keywords
   * @dataPartial: the galleries that some of the searched keywords
   * @keywords: the searched keywords
   */
   showSearch:function(dataFull, dataPartial, keywords) {
     if(dataFull.length) {
       myTheme.showSearchResults(dataFull, keywords);
     }
     if(dataPartial.length) {
       myTheme.showSearchResults(dataPartial, keywords);
     }
   },
   showSearchResults:function(data, keywords) {
     if(!data)
       return;
     
     for (var i in data) {
       var res = {};
       res.ID = data[i].ID;
       res.url = data[i].url;
       res.descr = data[i].descr;
       res.starred = data[i].starred;
       res.completeurl = data[i].url;
     
       res.title = jGallery.highlightText(data[i].url, keywords);
       res.thumb = data[i].url+'/'+data[i].thumbs[0];
     
       $("#dirTpl").tmpl(res).appendTo('#search_results');
       $('#dir'+res.ID).click({url:res.url}, function(ev) {
         ev.preventDefault();
         jGallery.switchPage(ev.data.url);
       });
     }
   },
 
   /*
    * Called to display an error.
    * @data: use data.Error to get the error message
    */
   showError:function(data) {
     $("#errorTpl").tmpl(data).appendTo('#content');
   },
     
   /*
    * Called before displaying the first page and when the user
    * changes the gallery language.
    * All text in <... class="translate"></...> markups will
    * be automatically translated for you.
    * @lang: 'en', 'fr', ...
    */
   changeThemeLang:function(lang) {
     if(lang == 'fr') {
       config.tr['Hello'] = 'Salut';
       // <span class="translate">Hello<span> will be shown as "Salut" in French
     }
   },

   /*
   * Called to display galleries.
   * @json: the json being displayed; galleries are in the json.dirs field.
   */
   showDirs:function(json) {
       if(!json.dirs)
           return;
     
     var dirs = [];
     var dirUrl = jGalleryModel.pageToUrl(json.realurl);
     for (var i in json.dirs) {
         dirs[i] = {
             ID:i,
             completeurl:json.dirs[i].completeurl || (dirUrl+json.dirs[i].url),
             thumb:json.dirs[i].thumb || (dirUrl+json.dirs[i].url+'/'+json.dirs[i].thumbs[0]),
             title:json.dirs[i].title || json.dirs[i].url,
             descr:json.dirs[i].descr,
         };
         /* you may also want to set .day , .month, .year and .starred  */
         /* you can also specify a .separator (html string) that will show before the directory */
         /* see the dirTpl template in /index.html to get the list of variables used by the template */
     
         $("#dirTpl").tmpl(dirs[i]).appendTo('#content');
     
         $('#dir'+dirs[i].ID).css('opacity', 1);
         $('#dir'+dirs[i].ID+' img').css('opacity', 1);
         $('#dir'+dirs[i].ID).click({url:json.dirs[i].url}, function(ev) {
           ev.preventDefault();
           jGallery.switchPage(dirUrl+ev.data.url);
         });
     }
   },
  
   /*
   * Called to display pictures
   * @json: the json being displayed; pictures are in the json.pics field.
   */
   showPics:function(json) {
     if(!json.pics)
       return;
     
     var pics = [];
     var dirUrl = jGalleryModel.pageToUrl(json.realurl);
     for (var i in json.pics) {
       pics[i] = {
         ID:i,
         url:(json.pics[i].fullpath?json.pics[i].fullpath:dirUrl),
         big:json.pics[i].url,
         thumb:json.pics[i].url.replace(/\.([^\.]+)$/, "_c.$1"), //pic.jpg -> pic_c.jpg
         original:json.pics[i].original
       };
       $("#picTpl").tmpl(pics[i]).appendTo('#content');
       $('#pic'+i+' img').css('opacity', 1);
     }
   },
  
   /*
   * Called to display videos
   * @json: the json being displayed; videos are in the json.vids field.
   */
   showVids:function(json) {
     if(!json.vids)
       return;
     
     var dirUrl = jGalleryModel.pageToUrl(json.realurl);
     var vids = [];
     for (var i in json.vids) {
       vids[i] = {
         ID:i,
         vid:json.vids[i].url,
         path:dirUrl,
         h:360,
         w:640
       };
       $("#vidTpl").tmpl(vids[i]).appendTo('#content');
     }
   },

   init:function() {
   },
   clean:function() {
   },
};
// your theme must be in /theme/mytheme
config.loadedThemes['mytheme'] = myTheme;
