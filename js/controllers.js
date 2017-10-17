var bookcatControllers = angular.module('bookcatControllers', []);
// PhoneListCtrl.$inject = ['$scope', '$http'];
bookcatControllers.controller('BookListCtrl', ['$scope', 'Book',

	function ($scope, Book) {
		$scope.books = Book.query();

		$scope.totalPages = 0;
		$scope.totalPrice = 0.00;
		$scope.books.$promise.then(function (data) {
			for (var i = 0; i < data.length; i++) {
				// 塞分类
				var title = data[i].title;
				var author = !data[i].author ? '' : data[i].author.join(',');
				var publisher = data[i].publisher;

				// var Regx = /[A-Za-z]/;
				
				if (title.search(/[a-zA-Z]+/) !== -1 && title !== '嫌疑人X的献身' || title.match('代码') || title.match('程序')
					|| publisher.match('机械工业') || publisher.match('高等教育') || title.match('高性能网站')) {
					data[i].category = '技术';
				}
				else if (title.match('艺术') || title.match('色彩') || title.match('绘画') || title.match('设计') || title.match('瞬间之美') || title.match('下一站')) {
					data[i].category = '设计';
				}
				else if (title.match('楷') || title.match('隶') || title.match('书法')) {
					data[i].category = '书法';
				}
				else if (title.match('词典')) {
					data[i].category = '词典';
				}
				else if (title.match('诗') || title.match('词') || title.match('楚辞') || author.match('纪伯伦') || author.match('泰戈尔')) {
					data[i].category = '诗歌';
				}
				else if (title.match('南怀瑾') || title.match('林清玄') || title.match('菩提')) {
					data[i].category = '文集';
				}
				else if (title.match('史') || title.match('通鉴') || title.match('耶路撒冷三千年') || title.match('万历十五年')) {
					data[i].category = '历史';
				}
				else if (author.match('卢梭') || author.match('梭罗') || author.match('卡莱尔') || author.match('周国平') || author.match('尼采')) {
					data[i].category = '哲学';
				}
				else if (title.match('童话') || author.match('竹久梦二')) {
					data[i].category = '童话';
				}
				else if (title.match('孤独')) {
					data[i].category = '孤独';
				}
				else if (title.match('红楼') || title.match('石头记')) {
					data[i].category = '红楼';
				}
				else if (title.match('抱怨') || title.match('逻辑') || title.match('30年后') || title.match('优秀')
					|| title.match('心灵') || title.match('冰鉴') || title.match('你以为你以为的就是你以为') || title.match('拼布')
					|| title.match('儿歌')) {
					data[i].category = '乱炖';
				}
				else {
					data[i].category = '人文';
				}
				// 计算总价
				if(data[i].pages.length > 0) {
					$scope.totalPages += Number (data[i].pages);
				}
				if (data[i].price.length > 0) {
					var price = data[i].price.split('元')[0];
					if (price.match('CNY')) {
						price = price.split('CNY')[1];
					}
					if (price.match('NT')) {
						price = 32;
					}
					$scope.totalPrice += parseFloat(price);
				}
			};
			$scope.totalPrice = $scope.totalPrice.toLocaleString();
			$scope.totalPages = $scope.totalPages.toLocaleString();

		}, function (error) {
		});

		

/*		$http.get('books/books.json').success(function(data) {
			$scope.books = data
		});*/
		
		$scope.orderFunc = 'title';
		/*$scope.orderFunc = $scope.books.sort(function (a, b) {
			return a.localeCompare(b);
		});*/
	}]);

bookcatControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', 'Book', 'BookConmments', 'md5',
	function ($scope, $routeParams, Book, BookConmments, md5) {
		window.scrollTo(0,0);
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

		}, function (err, book) { 
	    	//处理错误 
	    	$scope.book.notFound = true;
	   	});

	   	$scope.commentsList = BookConmments.get({bookId: $routeParams.bookId + '_comment'}, function (commentsList) {

	   		var comment = $scope.commentsList.comments;
	   		for (var i = 0; i < comment.length; i++) {
	   			comment[i].profileSrc = 'http://www.gravatar.com/avatar/' + md5.createHash(comment[i].email);
	   		};

	   		$scope.commentsList.notFound = false;
	   	}, function (err, commentsList) {
	   		$scope.commentsList.notFound = true;
	   	})

		
		/*$http.get('books/book' + $routeParams.bookId + '.json').success(function(data) {
			$scope.book = data;
			console.log($scope.book);
		});*/
	}]);