var bookcatControllers = angular.module('bookcatControllers', []);
// PhoneListCtrl.$inject = ['$scope', '$http'];
bookcatControllers.controller('BookListCtrl', ['$scope', 'Book',

	function ($scope, Book) {
		$scope.books = Book.query();
		console.log($scope.books)

/*		$http.get('books/books.json').success(function(data) {
			$scope.books = data
		});*/
		
		$scope.orderProp = 'title';
	}]);

bookcatControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', 'Book',
	function ($scope, $routeParams, Book) {
		$scope.book = Book.get({bookId: $routeParams.bookId}, function (book) {
			// 如果没有summary，设为空，如果有，为分段显示做准备
			if (book.summary.length > 0) {
				$scope.summary = book.summary.replace(/\n\n/g, '\n').split('\n');
			}
			else {
				$scope.summary = '';
			}
			// 如果没有author_intro，设为空，如果有，为分段显示做准备
			if (book.author_intro.length > 0) {
				$scope.author_intro = book.author_intro.replace(/\n\n/g, '\n').split('\n');
			}
			else {
				$scope.author_intro = '';
			}

			$scope.book.notFound = false;
		},function(err, book){ 
	    	//处理错误 
	    	$scope.book.notFound = true;
	   	});

		
		/*$http.get('books/book' + $routeParams.bookId + '.json').success(function(data) {
			$scope.book = data;
			console.log($scope.book);
		});*/
	}]);