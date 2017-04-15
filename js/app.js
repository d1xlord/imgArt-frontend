'use strict';

var app = angular.module('myApp', ['ngFileUpload']);

app.controller('mainController', ['$scope', 'Upload', function($scope, Upload, $http) {
	var vm = this;
    vm.myName = "Nafis Ahmed"
	// upload later on form submit or something similar
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    $scope.sendFile = function() {
        var data = $.param({
            file: file,
            fileName: 'nafTest'
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('localhost:5000', data, config)
        .success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
        })
        .error(function(data, status, headers, config) {
            $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
        });
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'upload.php', 
            method: 'POST',
            file: file,
            data: {
                'fileName': 'nafTest',
                'targetPath' : 'upload/'
            }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    	
}]);
