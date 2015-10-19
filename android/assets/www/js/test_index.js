(function() {
    'use strict';
    function TestController($scope,$element){
        //puts code here!
    }

    function InfoController(abc,$http,testService){
        //Get values after selected
        abc.$watch(function () { return testService.getHandler(); },

            function (value) {
                abc.sel = value;
                var sel = abc.sel;
                var page;
                $http.get('hanlder',{params: {sel:sel,page:page}}).success(function(resp) {
                    abc.totals = resp['total_pages'];
                    abc.data = resp['data'];
                });
            });

        //show total pages
        abc.range = function() {
            return new Array(abc.totals);
        };

        //choose page
        abc.loadPage = function(page) {
            $http.get('hanlder',{params: {sel:abc.sel,page:page}}).success(function(resp) {
                abc.data = resp['data'];
            });
        };
    }

    //select option
    function OptionController($scope,$http,testService){
        $scope.changeType = function(type){
            testService.setHandler(type);
        }
    }

    function userinfo(){
        var directive = {};

        directive.restrict = 'E';
        directive.template = "<h4>Name: <b>{{name}}</b> , Id: <b>{{id}}</b></h4>";

        directive.scope = {
            name : "@name",
            id : "@id",
        }
        return directive;
    }
    //update user
    function userupdate() {
        var directive = {};
        directive.restrict = 'E';
        directive.templateUrl = '/update.html';
        directive.scope = {
            name: '=name',
            id: '=id'
        };
        return directive;
    }
    // Service
    function testService() {
        var state = "List";
        return {
            getHandler: function(){
                return state;

            },
            setHandler: function(prop){
                state = prop;
            },
        };
    }

    //Create new values
    function PopController($scope,$element,testService,$http){
        $scope.$watch(function () { return testService.getHandler(); },
            function (value) {
                $scope.sel = value;
            });
        $scope.createObject = function() {
            var dat = {
                "sel": $scope.sel,
                "name": $scope.name,
                "login_id": $scope.loginId,
                "mail": $scope.mailAddress,
                "kana":$scope.kana,
                "pass":$scope.password,
            }
            $http.post('create', {dat:dat}).success(function(resp) {
                if (resp['status'] == "ok") {
                    window.location.reload;
                }
            });
        }
    }

    function route($routeProvider){//route config
        $routeProvider
            .when('/contact', {
                templateUrl: 'contact.html',
                controller: 'ContactCtrl',
                controllerAs: 'contact'
            })
            .when('/about', {
                template: 'This is about page!!!'
            })
            .otherwise({//if url not exist
                redirectTo: '/'
            })
    }

    function contactCtrl($scope){
        $scope.content = 'Content of contact page'; // use this instead of $scope
    }
    InfoController.$inject = ['$scope','$http','testService'];

    angular.module('testModule', ['ng-rails-csrf','ngRoute'])
        .service('testService', testService)
        .controller('TestController', TestController)
        .controller('PopController', PopController)
        .controller('InfoController', InfoController)
        .controller('OptionController', OptionController)
        .controller('ContactCtrl', contactCtrl)
        .directive('userinfo',userinfo)
        .directive('userupdate',userupdate)
        .config(route);
})();