var bookcatControllers = angular.module('bookcatControllers', []);
// PhoneListCtrl.$inject = ['$scope', '$http'];
bookcatControllers.controller('BookListCtrl', ['$scope', 'Book',

	function ($scope, Book) {
		$scope.books = Book.query();

		$scope.totalPages = 0;
		$scope.totalPrice = 0.00;
		$scope.books.$promise.then(function (data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].pages.length > 0) {
					$scope.totalPages += Number (data[i].pages);
				}
				if (data[i].price.length > 0) {
					var price = data[i].price.split('元')[0];
					if (price.match('CNY') == 'CNY') {
						price = price.split('CNY')[1];
					}
					$scope.totalPrice += parseFloat (price);

				}
			};
			$scope.totalPrice = $scope.totalPrice.toFixed(2);

		}, function (error) {
		});

		

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