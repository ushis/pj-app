'use strict';

angular
  .module('pjApp')
  .controller('CarsLocationShowCtrl',
    function(_, $scope, Location, uiGmapGoogleMapApi) {

    $scope.location = $scope.car.location;

    $scope.address = null;

    $scope.showSaveButton = false;

    $scope.map = {
      zoom: 6,
      options: {
        mapTypeControl: false,
        mapTypeControlId: 'ROADMAP',
        panControl: true,
        streetViewControl: false,
        zoomControl: true
      }
    };

    $scope.marker = {
      id: $scope.car.id,
      events: {
        click: function() {
          $scope.map.center = _.clone($scope.marker.coords);
          $scope.map.zoom = _.max([$scope.map.zoom, 16]);
        },
        dragstart: function() {
          $scope.marker.options.opacity = 0.6;
        },
        dragend: function() {
          $scope.showSaveButton = true;
        }
      },
      options: {
        cursor: 'move',
        draggable: true
      }
    };

    $scope.loadAddress = function() {
      var location = {
        lat: $scope.location.latitude,
        lng: $scope.location.longitude
      };

      uiGmapGoogleMapApi.then(function(maps) {
        (new maps.Geocoder()).geocode({location: location}, function(results) {
          if (results.length > 0) {
            $scope.address = results[0].formatted_address;
          }
        });
      });
    };

    $scope.submit = function() {
      var params = {
        carId: $scope.car.id
      };

      var data = {
        latitude: $scope.marker.coords.latitude,
        longitude: $scope.marker.coords.longitude
      };

      if ($scope.pending) {
        return;
      }

      Location.save(params, {location: data}).$promise
        .then(function(resp) {
          $scope.location = resp.location;
          $scope.car.location = $scope.location;
          $scope.reset();
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.reset = function() {
      if ($scope.location) {
        $scope.map.center = _.clone($scope.location);
        $scope.marker.coords = _.clone($scope.location);
        $scope.marker.options.opacity = 1;
        $scope.loadAddress();
      } else {
        $scope.map.center = {latitude: 51.3, longitude: 12.4};
        $scope.marker.coords = {latitude: 51.3, longitude: 12.4};
        $scope.marker.options.opacity = 0.6;
      }

      $scope.showSaveButton = false;
    };

    $scope.reset();
  });
