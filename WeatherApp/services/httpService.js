weatherApp.service('$httpService', ['$http', '$q', function ($http, $q) {
	var self = this;
	this.response;
	this.getApi = function (apiurl, paramObj) {
		var deffered = $q.defer();
		$http({
			method: 'GET',
			url: apiurl,
			params: paramObj,
			cache: true,
		}).then(function (response) {
			//console.log(response);
			deffered.resolve(response);
			self.response = response;
			console.log(self.response);
		}, function (error) {
			//error function
			deffered.reject(error);
		});
		return deffered.promise;
	}
}]);
