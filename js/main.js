'use strict';

(function () {
  $('.Navbar-toggle').click(function () {
    $('.Navbar-collapse').toggleClass('is-expanded');
  });


  var app = angular.module('portfolioApp', []);

  app.controller('ProjectController', [
    '$scope',
    '$http',
    '$sce',

    function ($scope, $http, $sce) {
      $scope.projectPath = null;

      $scope.$watch('projectPath', function () {
        if ($scope.projectPath !== null) {
          $http.get('projects/' + $scope.projectPath + '.html').success(function (data, status, headers, config) {
            $scope.project = $sce.trustAsHtml(data);
          });
        }
      });

      this.set = function (path) {
        $scope.projectPath = path;
      };
    }
  ]);
})();
