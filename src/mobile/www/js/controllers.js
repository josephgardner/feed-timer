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
    var Pdate = chunk(String(item.Pdt));
    var Ptime = chunk(String(item.Ptm));
    var date = new Date(Pdate[0], Pdate[1], Pdate[2], Ptime[0], Ptime[1]);
    var time = date.getTime();
    return {
      name: baby.name,
      time: time,
      message: item.Txt
    };
  }

  function chunk(str) {
    return str.match(/.{1,2}/g);
  }
});
