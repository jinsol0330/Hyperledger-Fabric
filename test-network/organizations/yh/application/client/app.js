'use strict';

var app = angular.module('application', []);

app.controller('AppCtrl', function($scope, appFactory) {
    $("#success_ClientAccountID").hide();
    $("#success_ClientAccountBalance").hide();
    $("#success_Transfer").hide();

    $scope.ClientAccountID = function() {
        appFactory.ClientAccountID(function(data){
            $scope.res_ClientAccountID = data;
            $("#success_ClientAccountID").show();
        });
    }
    
    $scope.ClientAccountBalance = function() {
        appFactory.ClientAccountBalance(function(data){
            $scope.res_ClientAccountBalance = data;
            $("#success_ClientAccountBalance").show();
        });
    }

    $scope.Transfer = function() {
        appFactory.Transfer($scope.transfer, function(data){
            $scope.res_Transfer = data;
            $("#success_Transfer").show();
        });
    }
});

app.factory('appFactory', function($http) {
    var factory =  {};

    factory.ClientAccountID = function(callback) {
        $http.get('/api/ClientAccountID/').success(function(output) {
            callback(output)
        });
    }
    factory.ClientAccountBalance = function(callback) {
        $http.get('/api/ClientAccountBalance/').success(function(output) {
            callback(output)
        });
    }
    factory.Transfer = function(data, callback) {
        $http.get('/api/Transfer?recipient='+data.recipient+'&amount='+data.amount).success(function(output){
            callback(output)
        });
    }
    return factory;
})