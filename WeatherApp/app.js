//API KEY - 67fc2feae188441820f5aca19df0ccda
//API http://api.openweathermap.org/data/2.5/weather?q=london&cnt=2&APPID=67fc2feae188441820f5aca19df0ccda

//MODULES
var weatherApp = angular.module('weatherApp', ['ngRoute', "ngResource"]);

weatherApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'homeController'
		})
		.when('/forecast', {
			templateUrl: 'templates/forecast.html',
			controler: 'forecastController'
		})
		.when('/forecast/:cnt', {
			templateUrl: 'templates/forecast.html',
			controler: 'forecastController'
		});
});

//Custom Directives
weatherApp.directive('ngCustomWeather', ['$log', function ($log) {

	return {

		restrict: 'AEMC',
		templateUrl: 'directives/weatherDirective.html',
		scope: {
			weatherObject: '=',
			convertTemp: '&',
			dateConvert: '&'
		},
		replace: false,
		transclude: true

	}

}])

//Custom Services
weatherApp.service('weatherService', function () {

	this.cityName = 'San Francisco, CA';
	this.cnt = 2;
});

//CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'weatherService', function ($scope, $location, weatherService) {
	$scope.cityName = weatherService.cityName;
	$scope.getWeather = function () {
		$location.path('/forecast');
	};
	$scope.$watch('cityName', function () {
		weatherService.cityName = $scope.cityName;
	});

}]);

weatherApp.controller('forecastController', ['$scope', '$filter', '$routeParams', '$httpService', 'weatherService', function ($scope, $filter, $routeParams, $httpService, weatherService) {

	$scope.cityName = weatherService.cityName;
	$scope.cnt = $routeParams.cnt || 2;
	$scope.convertToFarenheit = function (degK) {

		return Math.round((1.8 * (degK - 273)) + 32);

	};
	$scope.convertDate = function (date) {
		return new Date(date * 1000)
	};
	$scope.paramObj = {
		q: $scope.cityName,
		APPID: '67fc2feae188441820f5aca19df0ccda',
		cnt: $scope.cnt
	};
	$scope.url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
	$httpService.getApi($scope.url, $scope.paramObj).then(function (response) {
		$scope.data = response.data;
		console.log($scope.data);
	}, function (error) {
		console.log(error);
	});
}]);