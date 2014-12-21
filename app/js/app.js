'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.config',
    'myApp.controllers',
    'myApp.decorators',
    'myApp.directives',
    'myApp.filters',
    'myApp.routes',
    'myApp.services',
    'mediaPlayer',
    'ngSanitize',
    'ngS3upload'

])

.run(['simpleLogin','$firebase','fbutil','$rootScope','$timeout', function(simpleLogin,$firebase,fbutil,$rootScope,$timeout) {

  $rootScope.refreshYourself=function(callback){
    simpleLogin.getUser().then(function(user){
        if(user){
          var current_artist_key=user.google.id
          $rootScope.me = fbutil.syncObject('artists/'+current_artist_key);
          if  (!$rootScope.me['key']){
            $rootScope.me['key']=current_artist_key;
          }
          if  (!$rootScope.me['songs']){
            $rootScope.me['songs']=[];
          }
          if (callback){
            $rootScope.me.$loaded(function(){callback($rootScope.me);});
          }

        }
      });
    }

    $rootScope.refreshYourself(function(){
        $rootScope.alerts = fbutil.syncObject('alerts/'+$rootScope.me.key);
    });
    $rootScope.queue=[];
    $rootScope.hideNav=true;
    $rootScope.toggleNav=function(){
      $rootScope.hideNav=!$rootScope.hideNav;
    }
    $rootScope.beginComment=function(song){
      song.transmittingComment=true;
    }
    $rootScope.transmitComment=function(song){
      song.freshComment.timestamp=(new Date()).toISOString()
      var firecomments=fbutil.ref('songs/'+song.key+'/comments');
      if ('comments' in song){
        song.comments.push(song.freshComment);
      }else{
        song.comments=[song.freshComment];
      }
      song.freshComment={}
      song.transmittingComment=false;
    }

    $rootScope.playsong=function(song){
      var next=song.media;
      next.title=song.title;
      if($rootScope.queue.indexOf(next) == -1){
        $rootScope.queue.push(next);
        $timeout(function() {
          $rootScope.play();
        }, 100);
      }

    }
    $rootScope.play=function(){
      $rootScope.player.play();
    }
    $rootScope.skip=function(index){
      $rootScope.player.playPause(index);
      console.log($rootScope.queue[index])
      console.log("skip to "+index);


    }
    $rootScope.pause=function(){
      $rootScope.player.pause();
    }

    $rootScope.next=function(){
      $rootScope.player.next();
    }

    $rootScope.removeTrack=function(index){
      console.log('Removing track at:' + index);
      $rootScope.queue.splice(index,1);

    }
    $rootScope.clear=function(){
      $rootScope.player.pause();
      $rootScope.queue=[];
    }
    $rootScope.seekPercentage = function ($event) {
      var percentage = ($event.offsetX / $event.target.offsetWidth);
      if (percentage <= 1) {
        return percentage;
      } else {
        return 0;
      }
    };

  }])
