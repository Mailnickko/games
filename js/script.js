var app = angular.module('trackStock', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: './partials/home.html',
			controller: 'arcadeCtrl'
		})
		.state('snake', {
			url: '/snake',
			templateUrl: './partials/snake.html',
			controller: 'arcadeCtrl'
		})
		.state('breakout', {
			url: '/breakout',
			templateUrl: './partials/breakout.html',
			controller: 'arcadeCtrl'
		})

	$urlRouterProvider.otherwise('/');
})


app.controller('arcadeCtrl', function($scope) {

});