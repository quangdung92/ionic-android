// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


function TestController($scope, ngFB, $location) {
    $scope.tasks = [
        {title: 'FaceBook'},
        {title: 'StoT'},
        {title: 'API'}
    ];
}
function recognizeSpeech() {

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
function APIController($scope,$http){
    var sel = "Users";
    $scope.apiget = function() {
        $http.get('https://limitless-stream-3387.herokuapp.com/api/v1/hanlder',{params: {sel:sel,page:1}}).success(function(response){
            $scope.getval = response.data;
        });
    };
}

function YoutubeController($scope) {
    function resultCallback (result){
        console.log(result.results[0][0].transcript);
        alert(result.results[0][0].transcript);
    }
    function errorCallback(error){
        angular.forEach(error, function(value, key) {
            console.log("Key"+ key);
            console.log("Value"+ value);
        });
    }
    $scope.recognizeSpeech = function() {
        var maxMatches = 5;
        var language = "en-US";
        window.plugins.speechrecognizer.start(resultCallback, errorCallback, maxMatches, language);
    };
    $scope.stopRecognition = function() {
        window.plugins.speechrecognizer.stop(resultCallback, errorCallback);
    }
    $scope.testSpeech = function() {
        TTS.speak({
            text: 'Hi! professer, have a nice day!',
            locale: 'en-GB',
            rate: 1.25
        }, function () {
                alert('success');
            }, function (reason) {
                alert(reason);
            });
    }
}
function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('facebook', {
            url: '/FaceBook',
            templateUrl: 'facebook.html',
            controller: 'FaceCtrl'
        })
        .state('StoT', {
            url: '/StoT',
            templateUrl: 'youtube.html',
            controller: 'YoutubeCtrl'
        })
        .state('api', {
            url: '/API',
            templateUrl: 'api.html',
            controller: 'APICtrl'
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
    .controller('APICtrl', APIController)
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
