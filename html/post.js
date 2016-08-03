(function () {
    'use strict';
	class blogFormController {

		 constructor (Blog) {
			this.posts = [];

			this.blog = Blog;

		  Blog.query()
			.$promise.then((data) => {
				this.posts = data;
			})
		}

		save (data){
			this.blog.create(data)
			.$promise.then((data) => {
				this.posts.push(data);
				this.data.text = "";
				console.log(this.posts);
			})
			.catch(err => alert("something gone wrong"))
		}

		del (index){
			this.blog.delete({id: this.posts[index]._id})
			.$promise.then(() => {
				this.posts.splice(index, 1);
			})
		}

		ed (index){
			console.log({id: this.posts[index]._id});
			this.blog.edit({id: this.posts[index]._id}, this.posts[index])
			.$promise.then((data) => {
				this.posts[index] = data;
			})
		}
	}
	// let blogFormController = $injector.instantiate(blogFormController)
	var app = angular.module('postApp', ['ngClassified','ngResource'])
	.constant('$classify', true)
	.controller('blogFormController', blogFormController)
    .factory('Blog', ($resource => {
        var blogApiUrl = '/api';
        return $resource(blogApiUrl,{},
            	{
                query: {
                    method: 'GET',
                    url: blogApiUrl,
                    isArray: true
                },
            
                create: {method: 'POST'},
            
                edit: {
                    method: 'PUT',
                    url: blogApiUrl + '/:id'
                },

                delete: {
                    method: 'DELETE',
                    url: blogApiUrl + '/:id'
                }
			
            });

    }));
})();