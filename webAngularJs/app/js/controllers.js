'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('IndexCtrl', [function () {
    }])
    .controller('NavBarCtrl', ['$scope',function ($scope) {
    }])
    .controller('BarBtnCtrl', ['$scope',function ($scope) {
        console.log($scope);
        $scope.$on('click',function(e){
            console.log(arguments);
        });
    }])
;