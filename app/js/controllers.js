var bookcatControllers = angular.module('bookcatControllers', []);
// PhoneListCtrl.$inject = ['$scope', '$http'];
bookcatControllers.controller('BookListCtrl', ['$scope', 'Book',

	function ($scope, Book) {
		$scope.books = Book.query();

/*		$http.get('books/books.json').success(function(data) {
			$scope.books = data
		});*/
		
		$scope.orderProp = 'title';
	}]);

bookcatControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', 'Book',
	function ($scope, $routeParams, Book) {
		$scope.book = Book.get({bookId: $routeParams.bookId}, function (book) {
		});

		
		/*$http.get('books/book' + $routeParams.bookId + '.json').success(function(data) {
			$scope.book = data;
			console.log($scope.book);
		});*/
	}]);