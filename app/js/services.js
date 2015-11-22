var bookcatServices = angular.module('bookcatServices', ['ngResource']);

bookcatServices.factory('Book', ['$resource',
	function($resource) {
		return $resource('books/:bookId.json', {}, {
			query: {method: 'GET', params: {bookId: 'books'}, isArray: true}
		});
	}]);

bookcatServices.factory('BookConmments', ['$resource',
	function($resource) {
		return $resource('book_comments/:bookId.json', {}, {
			
		});
	}]);