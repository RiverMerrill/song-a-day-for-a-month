'use strict';

/* Controllers */

angular.module('myApp.controllers', ['firebase.utils', 'simpleLogin'])
  .controller('HomeCtrl', ['$scope', 'fbutil', 'user', 'FBURL', function($scope, fbutil, user, FBURL) {
    $scope.user = user;
    $scope.FBURL = FBURL;
  }])


  .controller('PlaylistsCtrl', ['$scope','$rootScope','$timeout', 'fbutil', function($scope,$rootScope,$timeout,fbutil) {
    $scope.playlists=fbutil.syncArray('playlists/');
    $scope.clearQueue=function(){
      $scope.queue=[];
    }

    $scope.addToQueue=function(playlistID){

      $scope.queue=[];
      var playlist=fbutil.syncObject('playlists/'+playlistID);
      playlist.$loaded(function(){
        window.ga('send', 'event', 'playlist', 'play', playlist.title);
        $rootScope.player.currentTrack=0;
        $rootScope.queue=playlist.songs;
        $timeout(function(){
          $rootScope.player.play();
        },100);
      })
    }
    $scope.savePlaylist=function(){
      var title=$scope.freshPlaylistTitle
      var playlist_key=CryptoJS.SHA1($scope.alias+title).toString().substring(1,7);
      var playlist=fbutil.syncObject('playlists/'+playlist_key)
      var newPlaylist={};
      newPlaylist.songs=$scope.queue
      newPlaylist.title=title;
      newPlaylist.user_id=$scope.me.user_id;
      newPlaylist.artist={};
      newPlaylist.songs=[];
      newPlaylist.artist.alias=$scope.me.alias;
      newPlaylist.artist.key=$scope.me.key;
      $scope.queue.forEach(function(song){
        delete song.$$hashKey;
        newPlaylist.songs.push(song);
      })
      if (newPlaylist.songs.length==0){
        return;
      }
      console.log(playlist);
      console.log(newPlaylist);
      playlist.$value=newPlaylist;
      playlist.$save();
    }
  }])
  .controller('MissionCtrl', ['$scope', 'fbutil', function($scope, fbutil) {
  }])

  .controller('ArtistCtrl', ['$scope', 'artistPage','$routeParams','$timeout', function($scope, artistPage, $routeParams,$timeout) {
    artistPage.fetch($routeParams.artist,function(){
      $scope.songs=artistPage.artistSongs[$routeParams.artist];
    });
    $scope.artist=artistPage.artist;
    $scope.predicate='-timestamp';
    $scope.playAll=function(){
      window.ga('send', 'event', 'playAll');
      $scope.clear();
        $scope.songs.reverse().forEach(function(song){
          if ('media' in song){
            if(song.media.type.startsWith('audio')){
              $scope.addToQueue(song);
            }
          }
        });
        $timeout(function() {
          $scope.play();
        }, 100);
    }


  }])

  .controller('ArchiveCtrl', ['$scope','songList', function($scope,songList) {
    $scope.songs=songList;
    $scope.predicate='-songs | length'
  }])


  .controller('ArtistsCtrl', ['$scope','artistList', function($scope,artistList) {
    $scope.artists=artistList;
    $scope.artists.$loaded(function(e){
    $scope.total=0;
      $scope.artists.forEach(function(artist){
        if ('songs' in artist){
          $scope.total=Object.keys(artist.songs).length+$scope.total
        }

      })
    })
    $scope.moreArtists=function(){
    }
  }])

.controller('SongCtrl', ['$scope','$routeParams','fbutil', function($scope, $routeParams, fbutil) {
  $scope.song=fbutil.syncObject('songs/'+$routeParams.song);
}])
.controller('MediaCtrl', ['$scope','$rootScope','$routeParams','fbutil', function($scope,$rootScope, $routeParams, fbutil) {


}])

.controller('SongsCtrl', ['$scope','songs','$window','$timeout', function($scope,songs,$window,$timeout) {
  $scope.songs=songs.list;
  $scope.loading = true;
  songs.fetch(function(){
    $scope.loading = false;
  });
  $scope.playAll=function(){
    window.ga('send', 'event', 'playAll');
    $scope.clear();
    songs.batch=17
    songs.fetch(function(){
      $scope.loading = false;
      $scope.songs.forEach(function(song){
        if(song.media.type.startsWith('audio')){
          $scope.addToQueue(song);
        }
      })
      $timeout(function() {
        $scope.play();
      }, 100);
    });


  }


  $scope.predicate='-timestamp'
  $scope.moreSongs=function(){
    songs.fetch(function(){
      $scope.loading = false;
    });
  }


}])


  .controller('ChatCtrl', ['$scope', 'messageList', function($scope, messageList) {
    $scope.messages = messageList;
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        $scope.messages.$add({text: newMessage});
      }
    };
  }])

  .controller('LoginCtrl', ['$scope', 'simpleLogin', '$location', function($scope, simpleLogin, $location) {
    $scope.email = null;
    $scope.pass = null;
    $scope.confirm = null;
    $scope.createMode = false;

    function assertValidAccountProps() {
      if( !$scope.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass || !$scope.confirm ) {
        $scope.err = 'Please enter a password';
      }
      else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
        $scope.err = 'Passwords do not match';
      }
      return !$scope.err;
    }

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }
  }])

  .controller('AccountCtrl', ['$scope', 'simpleLogin', 'fbutil', 'user', '$location','artistPage',
    function($scope, simpleLogin, fbutil, user, $location,artistPage) {
      $scope.reloadPage = function(){window.location.reload();}
      if ('me' in $scope){
        $scope.me.$bindTo($scope,'me');
        $scope.artist=$scope.me;
        $scope.propogate=function(){
          artistPage.fetchSongs($scope.me,function(song){
            if ('artist' in song){
              song.artist.alias=$scope.me.alias;
              song.artist.avatar=$scope.me.avatar;
              song.user_id=$scope.me.user_id;
              song.$save()
            }
          })
      }
      $scope.me.$watch(function(){
        $scope.propogate();
      });

      }
    }

  ])
  .controller('TransmitCtrl', ['$route','$timeout','$rootScope','$scope', 'simpleLogin','$firebase', 'fbutil',
  function($route,$timeout,$rootScope,$scope, simpleLogin,$firebase, fbutil) {
    $scope.refreshYourself(function(self){

      $scope.s3OptionsUri='/config/aws.json';
      self.$loaded(function(){
        $scope.destfolder='/media/'+$scope.me.alias;
      });
    });

    $scope.$on('s3upload:success',function(e) {
      $timeout(function() {
        $scope.media=e.targetScope['filename'];
        $scope.mediaType=e.targetScope['filetype'];

      });
    });

      $scope.calculateKey = function() {
        var today=new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var offset = today.getTimezoneOffset()
        if(dd<10) {
          dd='0'+dd
        }

        if(mm<10) {
          mm='0'+mm
        }
        today = mm+'/'+dd+'/'+yyyy+'/';
        return CryptoJS.SHA1(today+$scope.me.$id).toString().substring(0,11)
      }


      $scope.fetchTodaysTranmission = function() {
        //check to see if we've transmitted a track
        $rootScope.refreshYourself(function(self){
          self.$loaded(function(){
            var sng=fbutil.syncObject('songs/'+$scope.calculateKey())
            sng.$loaded(function(){
              if (sng.media){
                $scope.song=sng;
              }
            });
          });
        });
      };

      $scope.fetchTodaysTranmission();
      /*
      $scope.startRecording=function() {
        var constraints = {
          audio: true,
          video: false
        };
        navigator.getUserMedia(constraints, function(stream) {

            var audio=angular.element(document.querySelector('#recorder'))[0];
            audio.onloadedmetadata = function() {
              var options = {
                type: 'audio' ,
                audio: audio,
              };

              window.recorder = window.RecordRTC(stream, options);
              window.recorder.startRecording();
              audio.volume=0;
            };
            audio.src = URL.createObjectURL(stream);
          }, function() {
                  alert('Something went wrong, did you allow recording?');
          });

      }
      $scope.stopRecording=function(){
        if (window.recorder){
          var audio=angular.element(document.querySelector('#recorder'))[0];
          window.recorder.stopRecording(function(url) {
            audio.src = url;
            audio.volume=.8;
            audio.play();
            $scope.recording=false;
              $scope.media=url
              var input=angular.element(document.querySelector('input'))[2];
              console.log(input);

          });
        }
      }
*/
      $scope.delete=function(song){
        $scope.refreshYourself(function(self){
          if (self.key==song.artist.key){
            $firebase(fbutil.ref('songs/'+song.key)).$set(null);
            $firebase(fbutil.ref('artists/'+self.key+'/songs/'+song.key)).$set(null);
            $route.reload();
          }else{
          }
        });
      }
      $scope.sendTransmission = function() {

        $scope.refreshYourself(function(self){
          var fresh_key=$scope.calculateKey($scope.transmission)
          var song={};
          song['info']=$scope.info||"";
          song['title']=$scope.title||"untitled";
          song['timestamp']= (new Date()).toISOString();
          song['media']={}
          song['key']=fresh_key;
          song['user_id']=self.user_id
          song['media']['src']= $scope.media;
          song['media']['type']= $scope.mediaType;
          self.$loaded(function(){
            song['artist']={'alias':self.alias||"",'key':self.$id,'avatar':self.avatar||""};
            var rf=fbutil.ref('songs/'+song.key)
            $firebase(rf).$set(song).then(function(){
              var mysongs = fbutil.syncObject(['artists', self.$id,'songs']);
                mysongs.$loaded(function(){
                  mysongs[song.key]=true;
                  mysongs.$save();
                })
              $scope.song=fbutil.syncObject('songs/'+$scope.calculateKey());
            });
          });



        });
      };

    function checkMedia() {
      $scope.err = null;
      $scope.msg = null;
      $scope.emailerr = null;
      $scope.emailmsg = null;
    }
  }
  ])
  .controller('SketchCtrl', ['$scope', 'simpleLogin', 'fbutil',
  function($scope, simpleLogin, fbutil) {
  }
  ])
  .controller('NavCtrl', ['$scope',
  function($scope) {
    $scope.hideNav=true;
    $scope.toggleNav=function(){
      $scope.hideNav=!$scope.hideNav;
    }

  }
  ])
