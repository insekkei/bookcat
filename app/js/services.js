var bookcatServices = angular.module('bookcatServices', ['ngResource']);

bookcatServices.factory('Book', ['$resource',
	function($resource) {
		return $resource('books/book:bookId.json', {}, {
			query: {method: 'GET', params: {bookId: 's'}, isArray: true}
		});
	}]);