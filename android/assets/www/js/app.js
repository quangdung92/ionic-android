// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


function TestController($scope, ngFB) {
    $scope.tasks = [
        {title: 'FaceBook'},
        {title: 'Modal'},
    ];
    $scope.fbLogin = function () {
        ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
            function (response) {
                console.log(response);
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded');
                    $scope.closeLogin();
                } else {
                    alert('Facebook login failed');
                }
            });
    };
}
function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('info', {
            url: '/FaceBook',
            templateUrl: 'facebook.html'
        })
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'TodoCtrl'
        })

}
angular.module('starter', ['ionic','ngOpenFB'])
    .controller('TodoCtrl', TestController)
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
