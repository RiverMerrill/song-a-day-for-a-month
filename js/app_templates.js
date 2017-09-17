angular.module("songaday.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/account.html","\n<html>\n  <body>\n    <!--This template loads for the \'tab.adopt\' state (app.js)\n    -->\n    <ion-view view-title=\"Account Settings\">\n      <ion-content has-header=\"true\" has-tabs=\"true\" style=\"background-image:url(&quot;{{me.wall}}&quot;)\">\n        <div ng-if=\"!loggedIn\" class=\"list list-inset\">\n          <button ng-click=\"login()\" class=\"button button-light\">log in</button>\n        </div>\n        <div ng-if=\"loggedIn\" class=\"list list-inset\">\n          <label class=\"item item-input\"><span class=\"input-label\">Alias</span>\n            <input type=\"text\" ng-model=\"me.alias\" ng-blur=\"propogate()\"/>\n          </label>\n          <label class=\"item item-input\"><span class=\"input-label\">Statement</span>\n            <input type=\"text\" ng-model=\"me.statement\"/>\n          </label>\n    <label class=\"item item-input\"><span class=\"input-label\">Make Profile Private</span>\n            <input type=\"checkbox\" style =\"-webkit-appearance: checkbox !important;\" ng-model=\"me.isPrivate\"></input>\n          </label>\n        <label class=\"item item-input\"><span class=\"input-label\">Cyber Link</span>\n            <input type=\"text\" ng-model=\"me.link\"/>\n          </label>\n          <label class=\"item item-input\"><span class=\"input-label\">Avatar</span>\n            <div theme=\"image\" ng-change=\"propogate()\" s3-upload=\"s3-upload\" bucket=\"s3Bucket\" ng-model=\"me.avatar\" s3-upload-options=\"{ acl:&quot;private&quot;,getOptionsUri: awsParamsURI, folder: awsFolder}\"></div>\n          </label>\n          <label class=\"item item-input\"><span class=\"input-label\">Banner</span>\n            <div theme=\"image\" s3-upload=\"s3-upload\" bucket=\"s3Bucket\" ng-model=\"me.wall\" s3-upload-options=\"{ acl:&quot;private&quot;,getOptionsUri: awsParamsURI, folder: awsFolder}\"></div>\n          </label>\n        </div><img ng-src=\"{{me.avatar}}?default=404\" err-src=\"img/song-a-day.png\" alt=\"{{me.alias}}\" ng-click=\"showArtist(me.$id)\" class=\"avatar\"/><span class=\"artist_index_alias\"><span>{{me.alias}} </span></span>\n        <div class=\"list col-50 col-offset-25\">\n          <div ng-include=\"\'templates/song-item.html\'\" ng-repeat=\"song in songs |orderBy:&quot;-timestamp&quot;\" class=\"item artist_song\"></div>\n  <div class=\"text-center\">\n  <button ng-click=\"loadMore()\" ng-show=\"!loading && !didReachEnd\" class=\"button button-light\">more songs</button>\n   <button ng-click=\"loadAll()\" ng-show=\"!loading\" class=\"button button-light\">load all</button>\n </div>\n     </div>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/artist-detail.html","\n<html>\n  <body>\n    <!--\n    This template loads for the \'tab.song-detail\' state (app.js)\n    \'song\' is a $scope variable created in the SongCtrl controller (controllers.js)\n    The SongCtrl pulls data from the Songs service (service.js)\n    The Songs service returns an array of song data\n    -->\n   <div class=\"unauthenticated\" ng-if=\"!loggedIn\" style=\"background-color:#ffffff; position:fixed; width:100%; height:100%;top:0px;left:0px; z-index:1000;vertical-align:middle;\"><div style=\"width:800px;position:relative;line-height:1;margin-left:auto;margin-right:auto;top:40%;margin-bottom:auto;font-size:40px;\"><b>This profile is viewable only to song a day participants.</b></div></div>\n <div class ng-if=\"loading\" style=\"position:fixed; width:100%;background:white;height:100%;top:0px;left:0px; z-index:999;vertical-align:middle;\"> <div style=\"width:100px;height:100px;top:40%;position:relative;line-height:1;margin-left:auto;margin-right:auto;margin-bottom:auto;font-size:40px;\"> <loader></loader></div></div>  <ion-view view-title=\"{{artist.alias}}\">\n      <ion-content has-header=\"true\" padding=\"true\" overflow-scroll=\"true\" style=\"background-image:url(&quot;{{artist.wall}}&quot;)\">\n       <span class=\"text-center\"><a ng-href=\"{{artist.link}}\"><img ng-src=\"{{artist.avatar}}?default=404\" err-src=\"img/song-a-day.png\" alt=\"{{song.artist.alias}}\" class=\"avatar\"/></a>\n          <h1  class=\"artist_alias when-large\">{{artist.alias}}</h1>\n          <p class=\"artist_statement\">{{artist.statement}} </br>  </p></span>\n        <div class=\"row responsive-md\">\n          <div class=\"list col-50 col-offset-25\">\n            <div ng-include=\"\'templates/song-item.html\'\" ng-repeat=\"song in songs |orderBy:&quot;-timestamp&quot;\" class=\"item artist_song\"></div>\n     <div class=\"text-center\">\n              <button ng-click=\"loadMore()\" ng-show=\"!loading && !didReachEnd\" class=\"button button-light\">more songs</button>\n              <button ng-click=\"loadAll()\" ng-show=\"!loading\" class=\"button button-light\">load all</button>\n   </div>\n         </div>\n      </div>\n     </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/artist-index.html","\n<html>\n  <body>\n    <ion-view view-title=\"Songwriters\">\n      <ion-content has-header=\"true\" padding=\"true\" overflow-scroll=\"true\">\n        <loader></loader>\n        <ul class=\"list\">\n          <li ng-repeat=\"artist in artists | orderBy:&quot;songs | length&quot;:true\" ng-click=\"showArtist(artist)\" ng-show=\"artist.songs\" class=\"item item-thumbnail-left\"><img ng-src=\"{{artist.avatar}}?default=404\" err-src=\"img/song-a-day.png\" alt=\"{{artist.alias}}\" ng-click=\"showArtist(artist.$id)\" class=\"avatar\"/><span class=\"artist_index_alias\"><span>{{artist.alias}} </span><span class=\"when-large float-right song-count\">{{artist.songs|length}}</span></span></li>\n        </ul>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/comments.html","\n<ion-list><span ng-repeat=\"comment in song.comments\">\n    <p class=\"comment\"><span ng-click=\"showArtist(comment.author.key)\" class=\"comment_alias\">{{comment.author.alias}}</span><span class=\"text\">{{comment.comment}}</span></p></span>\n  <label ng-show=\"loggedIn\" class=\"comment_input item item-input\">\n    <input type=\"text\" placeholder=\"comment...\" ng-model=\"newComment\" enter-submit=\"comment(song,newComment);newComment=\'\'\"/>\n  </label>\n</ion-list>");
$templateCache.put("templates/listens.html","\n<html>\n  <body>\n    <ion-view view-title=\"Listens\">\n      <ion-content has-header=\"true\" padding=\"true\" overflow-scroll=\"true\">\n        <loader></loader>\n        <ul class=\"listens\">\n          <li ng-repeat=\"song in songs\" class=\"item\"><span class=\"float-left\">{{listens[song.$id]}}</span><span>:::</span><a href=\"#/song/{{song.$id}}\">{{song.title}} </a></li>\n        </ul>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/menu.html","\n<ion-side-menus>\n  <ion-pane ion-side-menu-content=\"\">\n    <ion-nav-bar class=\"top-nav bar-light\">\n      <ion-nav-buttons side=\"left\">\n        <div class=\"nav\">\n          <button nav-clear=\"\" menu-close=\"\" ui-sref=\"app.mission\" class=\"button button-light when-large\">Mission</button>\n          <button nav-clear=\"\" menu-close=\"\" ui-sref=\"app.artists\" class=\"button button-light when-large\">Songwriters</button>\n          <button nav-clear=\"\" menu-close=\"\" ui-sref=\"app.songs\" class=\"button button-light when-large\">Songs</button>\n        </div>\n      </ion-nav-buttons>\n      <ion-nav-buttons side=\"right\">\n        <div class=\"small-nav when-small\"><span ng-show=\"notifications.length\" class=\"badge badge-assertive\">{{notifications.length}}</span>\n          <button menu-toggle=\"right\" class=\"button button-icon icon ion-navicon-round\"></button>\n        </div>\n        <div class=\"large-nav when-large\">\n          <button nav-clear=\"\" menu-close=\"\" ui-sref=\"app.playlists\" class=\"button button-light\">Playlists</button>\n          <button ng-if=\"loggedIn\" nav-clear=\"\" menu-close=\"\" ui-sref=\"app.transmit\" class=\"button button-light\">Transmit</button>\n          <button ng-if=\"loggedIn\" nav-clear=\"\" menu-close=\"\" ui-sref=\"app.account\" class=\"button button-light\">Account</button>\n          <button nav-clear=\"\" menu-close=\"\" ui-sref=\"app.notifications\" ng-show=\"notifications.length\" class=\"button button-assertive\">{{notifications.length}}</button>\n          <button ng-click=\"login()\" ng-show=\"!loggedIn\" class=\"button button-light\">login</button>\n          <button ng-click=\"logout()\" ng-show=\"loggedIn\" class=\"button button-light\">logout</button>\n        </div>\n      </ion-nav-buttons>\n      <ion-nav-back-button class=\"button-clear\"><i class=\"icon ion-chevron-left\"></i> Back</ion-nav-back-button>\n    </ion-nav-bar>\n    <ion-nav-view name=\"main-content\" animation=\"slide-left-right\"></ion-nav-view>\n  </ion-pane>\n  <ion-side-menu side=\"right\" enable-menu-with-back-views=\"true\">\n    <ion-header-bar center=\"center\" class=\"bar-stable\">\n      <h1 class=\"title\">Song a Day          </h1>\n    </ion-header-bar>\n    <ion-content class=\"has-header\">\n      <div class=\"list\">\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.artists\" class=\"item\">Songwriters</div>\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.songs\" class=\"item\">Songs</div>\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.playlists\" class=\"item\">Playlists</div>\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.account\" ng-if=\"loggedIn\" class=\"item\">Account</div>\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.mission\" class=\"item\">Mission</div>\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.transmit\" ng-if=\"loggedIn\" class=\"item\">Transmit 🎼🎶 </div>\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.notifications\" ng-if=\"loggedIn\" class=\"item\">Notifications <span ng-if=\"notifications.length\" class=\"badge badge-assertive\">{{notifications.length}}</span></div>\n        <div nav-clear=\"\" menu-close=\"\" ui-sref=\"app.notifications\" ng-if=\"loggedIn\" class=\"item\">Logout</div>\n        <div nav-clear=\"\" menu-close=\"\" ng-click=\"login()\" ng-show=\"!loggedIn\" class=\"item\">Login</div>\n      </div>\n    </ion-content>\n  </ion-side-menu>\n  <ion-side-menu side=\"left\" enable-menu-with-back-views=\"true\">\n    <header class=\"bar bar-header bar-stable\">\n      <div class=\"buttons\">\n        <button ng-click=\"shouldShowDelete=!shouldShowDelete\" class=\"button button-icon ion-minus\"></button>\n      </div>\n      <h1 class=\"title\">Playlist </h1>\n      <div class=\"buttons\">\n        <button ng-click=\"shouldShowReorder=!shouldShowReorder\" class=\"button button-icon ion-wand\"></button>\n      </div>\n    </header>\n    <ion-content class=\"has-header\">\n      <div class=\"list\">\n        <div align-title=\"center\" class=\"item\">\n          <div class=\"item-icon-left\">\n            <button ng-click=\"ctrl.previous()\" class=\"button button-icon icon ion-skip-backward\"></button>\n          </div>\n          <div class=\"item-icon-center\">\n            <button ng-class=\"ctrl.API.currentState==&quot;play&quot;?&quot;ion-pause&quot;:&quot;ion-play&quot;\" ng-click=\"ctrl.API.playPause()\" class=\"button button-icon icon ion-pause\"></button>\n          </div>\n          <div class=\"item-icon-right\">\n            <button ng-show=\"ctrl.playlist.length!=&quot;play&quot;\" ng-click=\"ctrl.next()\" class=\"button button-icon icon ion-skip-forward\"></button>\n          </div>\n        </div>\n      </div>\n      <ion-list show-delete=\"shouldShowDelete\" show-reorder=\"shouldShowReorder\">     \n        <ion-item ng-class=\"$index==ctrl.currentSong?&quot;active&quot;:&quot;&quot;\" ng-repeat=\"song in ctrl.playlist track by song.$id\" class=\"playlist-item\">\n          <h2 ng-click=\"play(song);showSong(song)\" class=\"reorder-adjusted\">{{song.title}}</h2>\n          <ion-delete-button ng-click=\"ctrl.remove($index)\" class=\"ion-minus-circled\"></ion-delete-button>\n          <ion-reorder-button on-reorder=\"ctrl.moveSong(song, $fromIndex, $toIndex)\" class=\"ion-navicon\"></ion-reorder-button>\n        </ion-item>\n      </ion-list>\n    </ion-content>\n  </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("templates/mission.html","\n<html>\n  <body>\n    <!--This template loads for the \'tab.about\' state (app.js)\n    -->\n    <ion-view view-title=\"Mission\">\n      <ion-content has-header=\"true\" has-tabs=\"true\" padding=\"true\">\n        <div class=\"jumbotron\">\n          <h1>Songs Every Day ♬</h1><br/>\n          <p>Woody Guthrie and Bob Marley woke up early and wrote songs. We challenge you to do the same, every day.</p>\n          <h2>Rules:</h2>\n          <ul>\n            <li>\n              <h4>One Fresh Song Per Day</h4>\n            </li>\n          </ul>      Any questions contact <a href=\"mailto:songadayforamonth@gmail.com\" target=\"_top\">songadayforamonth@gmail.com</a><br/><br/>\n          <p>Active during January and July.</p><small>© Artists own their songs.</small>\n        </div>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/notifications.html","\n<html>\n  <body>\n    <ion-view view-title=\"Notifications\">\n      <ion-content overflow-scroll=\"true\" has-header=\"true\" padding=\"true\">\n        <loader></loader>\n        <ion-list>\n          <ion-item ng-repeat=\"notification in notifications\" ng-click=\"showNotification(notification)\" class=\"item-thumbnail-left\"><img ng-src=\"{{notification.author.avatar}}?default=404\" err-src=\"img/song-a-day.png\" alt=\"{{notification.author.alias}}\" ng-click=\"showArtist(notification.author.key)\" class=\"avatar\"/>\n            <h2>{{notification.message}}</h2>\n          </ion-item>\n        </ion-list>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/now-playing.html","\n<html>\n  <body>\n    <!--\n    This template loads for the \'tab.song-detail\' state (app.js)\n    \'song\' is a $scope variable created in the SongCtrl controller (controllers.js)\n    The SongCtrl pulls data from the Songs service (service.js)\n    The Songs service returns an array of song data\n    -->\n    <ion-view view-title=\"{{ctrl.nowPlaying.title}}\">\n      <ion-content has-header=\"true\" padding=\"true\"></ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/playlist-detail.html","\n<html>\n  <body>\n    <!--\n    This template loads for the \'tab.song-detail\' state (app.js)\n    \'song\' is a $scope variable created in the SongCtrl controller (controllers.js)\n    The Ctrl pulls data from the Songs service (service.js)\n    The Songs service returns an array of song data\n    -->\n    <ion-view view-title=\"{{playlist.title}}\">\n      <ion-content has-header=\"true\" padding=\"true\" overflow-scroll=\"true\">\n        <button ng-if=\"currentQueue().length &gt; 0\" ng-click=\"clearQueue()\" class=\"button button-light\">Clear Queue</button>\n        <button ng-click=\"playAll()\" class=\"button button-light\">Play all songs in {{playlist.title}}</button>\n        <div class=\"row responsive-md\">\n          <div class=\"list col-50 col-offset-25\">\n            <div ng-include=\"\'templates/song-item.html\'\" ng-repeat=\"song in songs\" class=\"playlist_song item\"></div>\n          </div>\n        </div>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/playlist-index.html","\n<html>\n  <body>\n    <ion-view view-title=\"Playlists\">\n      <ion-content overflow-scroll=\"true\" has-header=\"true\" padding=\"true\">\n        <loader></loader>\n        <ion-list>\n          <ion-item ng-repeat=\"playlist in playlists\" ng-click=\"showPlaylist(playlist)\" class=\"item-thumbnail-left\">\n            <h1>{{playlist.title}} </h1>\n            <h2 class=\"float-right\">{{playlist.count}} songs</h2>\n          </ion-item>\n          <ion-item class=\"item-thumbnail-left\"><span ng-click=\"modal.show()\" ng-if=\"currentQueue().length &gt; 0 &amp;&amp; loggedIn\" class=\"button button-light\">Save Queue</span></ion-item>\n        </ion-list>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/playlist-item.html","\n<h2><span class=\"alias\">{{playlist.title}} </span><span class=\"title\">{{playlist.count}}</span></h2>\n<p am-time-ago=\"playlist.timestamp\" class=\"float-right when-large\"></p>");
$templateCache.put("templates/playlist-new-modal.html","\n<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">New Playlist</h1>\n  </ion-header-bar>\n  <ion-content class=\"text-center\">\n    <input type=\"text\" placeholder=\"playlist title\" ng-model=\"playlistTitle\" class=\"text-center\"/><br/>\n    <button ng-click=\"savePlaylist(playlistTitle)\" class=\"button button-light\">save</button>\n  </ion-content>\n</ion-modal-view>");
$templateCache.put("templates/record-help-modal.html","\n<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">recording your song</h1>\n  </ion-header-bar>\n  <ion-content class=\"text-center\">\n    <p>\n      hello! if you\'d like to record your song here, you have a couple options.\n      You can use google chrome, or I can add you to the beta testers for the iphone app.\n      If you have an android, the android app is available here in the store:\n    </p><a href=\"https://play.google.com/store/apps/details?id=paulwand.SongADay\">android</a>\n    <button ng-click=\"joinBeta()\" class=\"button button-light\">save</button>\n  </ion-content>\n</ion-modal-view>");
$templateCache.put("templates/record.html","\n<html>\n  <body>\n    <!--\n    This template loads for the \'tab.song-detail\' state (app.js)\n    \'song\' is a $scope variable created in the SongCtrl controller (controllers.js)\n    The SongCtrl pulls data from the Songs service (service.js)\n    The Songs service returns an array of song data\n    -->\n    <ion-view view-title=\"Record\">\n      <ion-content has-header=\"true\" padding=\"true\"> \n        <div ng-if=\"!loggedIn\"><br/>\n          <button ng-click=\"login();loading=true\" class=\"button button-light\">log in</button>\n          <p>to share your vibration</p>\n        </div>\n        <div ng-if=\"transmitted\">\n          <h1>Todays Transmission:</h1>\n          <ion-item ng-include=\"\'templates/song-item.html\'\"></ion-item>\n        </div>\n        <div ng-if=\"!transmitted&amp;&amp;loggedIn\" class=\"record\"> \n          <div ng-hide=\"native\" class=\"buttons\">\n            <button ng-disabled=\"!recording\" ng-click=\"stopRecording()\" class=\"button button-icon ion-stop\">       </button><br/>\n            <button ng-class=\"recording?&quot;recording&quot;:&quot;solid&quot;\" ng-click=\"startRecording()\" class=\"button button-icon ion-record\"></button>\n          </div>\n          <h2 ng-bind=\"message\"></h2>\n          <div ng-show=\"wav_file_uri &amp;&amp; !recording\" class=\"recording\">\n            <div class=\"meta-input\">\n              <label class=\"item item-input text-center\"><span class=\"input-label\">Title</span>\n                <input ng-model=\"transmission.title\" type=\"text\" placeholder=\"song title\"/>\n              </label>\n              <label class=\"item item-input text-center\"><span class=\"input-label\">Info</span>\n                <input ng-model=\"transmission.info\" type=\"text\" placeholder=\"song information\"/>\n              </label>\n              <p>{{media}}</p>\n            </div>\n            <audio autoplay=\"autoplay\" ng-src=\"{{ wav_file_uri | trust }}\" controls=\"controls\"></audio>\n            <div ng-show=\"readyToTransmit &amp;&amp; !transmitting\" class=\"transmit\"><br/>\n              <button ng-click=\"transmit()\" class=\"button button-light ion-send\">transmit</button><br/>\n            </div>\n          </div>\n        </div>\n        <button ng-show=\"transmitted\" ng-click=\"revoke()\" class=\"button button-assertive revoke\">Revoke</button>\n        <div ng-if=\"recording_not_supported\" class=\"not_supported\">\n          <h1>Recording is not supported with this browser! ˃̣̣̥᷄⌓˂̣̣̥᷅</h1>\n          <p></p>Hello! If you\'d like to record your song here, you have a couple options.\n          You can use google chrome, or I can add you to the beta testers for the iphone app.\n          If you have an android, the android app is available here in the store:<a href=\"https://play.google.com/store/apps/details?id=paulwand.SongADay\">android app</a>\n          <button ng-click=\"joinBeta()\" ng-show=\"loggedIn\" class=\"button button-light\">Join Beta</button>\n          <button ui-sref=\"app.transmit\" class=\"button button-light\">Upload a song file</button>\n        </div>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/song-detail.html","\n<html>\n  <body>\n    <!--\n    This template loads for the \'tab.song-detail\' state (app.js)\n    \'song\' is a $scope variable created in the SongCtrl controller (controllers.js)\n    The SongCtrl pulls data from the Songs service (service.js)\n    The Songs service returns an array of song data\n    -->\n    <ion-view view-title=\"{{song.title}}\">\n      <ion-content has-header=\"true\" padding=\"true\">\n        <div class=\"row responsive-md\">\n          <div class=\"list col-50 col-offset-25\">\n            <div ng-include=\"\'templates/song-item.html\'\" class=\"item\"></div>\n          </div>\n        </div>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/song-index.html","\n<html>\n  <body>\n    <ion-view view-title=\"Songs\" when-scrolled=\"loadMore()\">\n      <ion-content overflow-scroll=\"true\" has-header=\"true\" padding=\"true\">\n        <loader></loader>\n        <div class=\"row responsive-md\">\n          <div class=\"list col-50 col-offset-25\">\n            <div ng-include=\"\'templates/song-item.html\'\" ng-repeat=\"song in songs |orderBy:&quot;-timestamp&quot;\" class=\"item\"></div>\n            <div class=\"item text-center\">\n              <button ng-click=\"loadMore()\" ng-show=\"!loading\" class=\"button button-light\">more songs</button>\n              <button ng-click=\"playAll()\" ng-show=\"!loading\" class=\"button button-light\">play all</button>\n            </div>\n          </div>\n        </div>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");
$templateCache.put("templates/song-item.html","\n<div ng-hide=\"song.artist\" class=\"card song-item\">\n  <h1 class=\"text-center loading\">☕</h1>\n</div>\n<div ng-show=\"song.artist\" class=\"card list\">\n  <div day=\"{{song.timestamp | amDateFormat:\'D\'}}\" ng-class=\"ctrl.nowPlaying.$id === song.$id?&quot;playing&quot;:&quot;&quot;\" class=\"item-avatar song_heading\"><img ng-src=\"{{song.artist.avatar}}?default=404\" err-src=\"img/song-a-day.png\" alt=\"{{song.artist.alias}}\" ng-click=\"showArtist(song.artist.key)\" class=\"avatar\"/>\n    <p ng-click=\"showSong(song);play(song)\" class=\"song_title\">{{song.title}}<span class=\"float-right song_time\">Day {{song.timestamp | amDateFormat:\'D\'}}</span></p><span ng-click=\"showArtist(song.artist.key)\" class=\"song_alias\">{{song.artist.alias}}</span>\n  </div>\n  <div class=\"item\">\n    <button ng-class=\"songIsPlaying(song) &amp;&amp; ctrl.API.currentState == &quot;play&quot; ?&quot;ion-pause&quot;:&quot;ion-play&quot;\" ng-click=\"songIsPlaying(song)?ctrl.API.playPause():play(song)\" class=\"button button-icon icon\"></button>\n    <button ng-click=\"enQueue(song)\" ng-hide=\"ctrl.playlist.indexOf(song) !=-1\" class=\"button button-icon icon ion-plus\"></button><span am-time-ago=\"song.timestamp\" class=\"float-right\"></span>\n    <h2 class=\"song_info\">  \n      <pre>{{song.info}}      </pre>\n    </h2>\n  </div>\n  <div class=\"item comment-box\">\n    <div ng-include=\"\'templates/comments.html\'\" class=\"comments\"></div>\n  </div>\n</div>");
$templateCache.put("templates/transmit.html","\n<html>\n  <body>\n    <ion-view view-title=\"Transmit\">\n      <ion-content has-header=\"true\" padding=\"true\" class=\"transmit\">\n        <loader></loader>\n        <div ng-if=\"!loggedIn\">\n          <button ng-click=\"login();loading=true\">log in</button>\n        </div>\n        <div ng-if=\"transmitted\">\n          <h1>Todays Transmission:</h1>\n          <ion-item ng-include=\"\'templates/song-item.html\'\" class=\"item-thumbnail-left\"></ion-item>\n        </div>\n        <div ng-hide=\"song\" ng-if=\"loggedIn &amp;&amp; !transmitted\">\n          <h2>Transmit a song</h2>\n          <label class=\"item item-input item-input-inset\">\n            <h1 class=\"input-label\">Title</h1>\n            <input ng-model=\"transmission.title\" type=\"text\" placeholder=\"song title\"/>\n          </label>\n          <label class=\"item item-input item-input-inset\">\n            <h1 class=\"input-label\">Info</h1>\n            <input ng-model=\"transmission.info\" type=\"text\" placeholder=\"song information\"/>\n          </label>\n          <label class=\"item item-input item-input-inset\"><span class=\"input-label\">Media</span>\n            <div s3-accept=\"audio/*\" theme=\"audio\" s3-upload=\"s3-upload\" bucket=\"s3Bucket\" ng-model=\"media\" s3-upload-options=\"{ acl:&quot;private&quot;,getOptionsUri: awsParamsURI, folder: awsFolder}\"></div>\n            <p>{{media}}</p>\n          </label>\n        </div>\n        <button ng-show=\"transmitted\" ng-click=\"revoke()\" class=\"button button-assertive revoke\">Revoke</button>\n      </ion-content>\n    </ion-view>\n  </body>\n</html>");}]);
