var app = angular.module('totoTrackingApp', ['ionic', 'backand', 'angular-svg-round-progressbar']);

app.run(function($ionicPlatform, $rootScope, $timeout, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    /* 
      #SIMPLIFIED-IMPLEMENTATION:
      Example access control.
      A real app would probably call a service method to check if there
      is a logged user.

      #IMPLEMENTATION-DETAIL: views that require authorizations have an
      "auth" key with value = "true".
    */
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){
        if(toState.data && toState.data.auth == true && !$rootScope.user.email){
          event.preventDefault();
          $state.go('app.login');   
        }
    });

  });
})


.config(function($stateProvider, $urlRouterProvider, BackandProvider) {
    BackandProvider.setAppName('teaas');
    BackandProvider.setSignUpToken('4aeebc12-5567-4df5-8494-5762e66d109e');
    BackandProvider.setAnonymousToken('e718566d-aa77-4b3d-acc3-997088239968');

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.start', {
    url: '/start',
    views: {
      'menuContent': {
        templateUrl: 'templates/start.html'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    cached : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller : 'LoginCtrl'
      }
    }
  })


  .state('app.dashboard', {
    url: '/dashboard',
    data : { auth : true },
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller : 'dashboardCtrl'
      }
    }
  })

  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html'
      }
    }
  })

  
  // .state('app.account', {
  //   url: '/account',
  //   data : { auth : true },
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/account.html',
  //       controller : 'AccountCtrl'
  //     }
  //   }
  // })
















      .state('app.forgot', {
    url: '/forgot',
    views: {
      'menuContent': {
        templateUrl: 'templates/forgot.html'
      }
    }
  })




  .state('app.shop', {
    url: '/shop',
    data : { auth : true },
    cache : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/shop.html',
        controller : 'ShopCtrl'
      }
    }
  })

  .state('app.cart', {
    url: '/cart',
    data : { auth : true },
    cache : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller : 'CartCtrl'
      }
    }
  })

  .state('app.checkout', {
    url: '/checkout',
    data : { auth : true },
    cache : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/checkout.html',
        controller : 'CheckoutCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/app/start');
});
