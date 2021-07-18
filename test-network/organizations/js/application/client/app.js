'use strict';

var app = angular.module('application', []);

app.controller('AppCtrl', function($scope, appFactory) {
    $("#success_ClientAccountID").hide();
    $("#success_ClientAccountBalance").hide();
    $("#success_Mint").hide();
    $("#success_Transfer").hide();
    $("#success_Burn").hide();

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

    $scope.Mint = function() {
        appFactory.Mint($scope.mint, function(data){
            $scope.res_Mint = data;
            $("#success_Mint").show();
        });
    }

    $scope.Transfer = function() {
        appFactory.Transfer($scope.transfer, function(data){
            $scope.res_Transfer = data;
            $("#success_Transfer").show();
        });
    }

    $scope.Burn = function() {
        appFactory.Burn($scope.burn, function(data){
            $scope.res_Burn = data;
            $("#success_Burn").show();
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
    factory.Mint = function(key, callback) {
        $http.get('/api/Mint?amount='+key).success(function(output) {
            callback(output)
        });
    }
    factory.Transfer = function(data, callback) {
        $http.get('/api/Transfer?recipient='+data.recipient+'&amount='+data.amount).success(function(output){
            callback(output)
        });
    }
    factory.Burn = function(key, callback) {
        $http.get('/api/Burn?amount='+key).success(function(output) {
            callback(output)
        });
    }
    return factory;
})