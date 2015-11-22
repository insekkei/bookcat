var bookcatApp = angular.module('bookcatApp', [
	'ngRoute',
	'bookcatAnimations',
	'bookcatControllers',
	'bookcatFilters',
	'bookcatServices',
	'angular-md5'
]);

bookcatApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/books', {
				templateUrl: 'partials/book-list.html',
				controller: 'BookListCtrl'
			}).
			when('/books/:bookId', {
				templateUrl: 'partials/book-detail.html',
				controller: 'BookDetailCtrl'
			}).
			otherwise({
				redirectTo: '/books'
			});
	}]);