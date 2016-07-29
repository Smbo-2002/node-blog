(function() {
    
	class blogFormController {

		 constructor ($http) {
			this.posts = [];

			this.http = $http;

			$http.get('/api')
			.then((data) => {
				this.posts = data.data;
			})
			.catch((err) => {	
				alert("something gone wrong");
			});
		}

		savePost (data){
			this.http.post('/api/', data)
			.then((data) => {
				this.posts.push(data.data);
				this.data.text = "";
				console.log(this.posts);
			})
			.catch(err => alert("something gone wrong"))
		}

		delPost (index){
			this.http.delete('/api/'+ this.posts[index]._id)
			.then(() => {
				this.posts.splice(index, 1);
			})
		}

		edPost (index){
			this.http.put('/api/'+ this.posts[index]._id, this.posts[index])
			.then((data) => {
				this.posts[index] = data.data;
			})
		}
	}
	// let blogFormController = $injector.instantiate(blogFormController)
	var app = angular.module('postApp', ['ngClassified','ngResource'])
	.constant('$classify', true)
	.controller('blogFormController', blogFormController);

	 app.factory('Blog', $resource => {
	 	return $resource('/api/');
	 });
})();