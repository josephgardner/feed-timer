angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $timeout, apiUrl, babyA, babyB) {
  $scope.updates = 0;
  (function tick() {
    $scope.data = updateUI(function() {
      $scope.updates++;
      $timeout(tick, 30000);
    });
  })();

  function updateUI(callback) {
    $http.get(apiUrl).
    success(function(data, status, headers, config) {
      $scope.babyA = getKid(data, babyA);
      $scope.babyB = getKid(data, babyB);
      callback();
    }).
    error(function(data, status, headers, config) {
      // log error
      callback();
    });
  }

  function getKid(data, baby) {
    var item = data[baby.id].item;
    var date = Date.parse(item.e);
    if (item.d) {
      date -= (item.d * 60000);
    }
    return {
      name: baby.name,
      time: date,
      message: item.Txt
    };
  }
});
