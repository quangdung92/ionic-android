// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


function TestController($scope, ngFB, $location) {
    $scope.tasks = [
        {title: 'FaceBook'},
        {title: 'Youtube'},
    ];
}
function FaceController($scope,ngFB) {
    $scope.fbLogin = function () {
        ngFB.login({scope: 'email,public_profile,user_friends'}).then(
            function (response) {
                console.log(response);
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded');
                    $location.path("/");
                } else {
                    alert('Facebook login failed');
                }
            });
    };
}
function YoutubeController($scope,$http) {
    $scope.youtubeParams = {
        key: 'AIzaSyCfR2XE9HP1PHKUn5YgkrwP7wpxmvG6keg',
        type: 'video',
        maxResults: '5',
        part: 'id,snippet',
        q: 'usavich',
        order: 'date',
        channelId: 'UCjwceawojfsRoc5I9iSgivw'
    }
    $scope.searchYoutube = function () {
        console.log("work in here!");
        $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
            console.log('Kqnew'+response);
            angular.forEach(response, function(key, value){
                console.log('CJJJA'+key);
                console.log('TTTTt'+value);
            });
        });
    };
}
function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('facebook', {
            url: '/FaceBook',
            templateUrl: 'facebook.html',
            controller: 'FaceCtrl'
        })
        .state('youtube', {
            url: '/Youtube',
            templateUrl: 'youtube.html',
            controller: 'YoutubeCtrl'
        })
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'TodoCtrl'
        })

}
//Googlekey  AIzaSyCfR2XE9HP1PHKUn5YgkrwP7wpxmvG6keg
//UCjwceawojfsRoc5I9iSgivw
angular.module('starter', ['ionic','ngOpenFB'])
    .controller('TodoCtrl', TestController)
    .controller('FaceCtrl', FaceController)
    .controller('YoutubeCtrl', YoutubeController)
    .run(function ($ionicPlatform, ngFB) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            ngFB.init({appId: '1648975548724128'});
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(route)
