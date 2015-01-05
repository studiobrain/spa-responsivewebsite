angular.module('sb-web', ['ngRoute', 'ngAnimate', 'ngTouch'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('home', {
          templateUrl: 'public/index.html'
        })
        .when('about', {
          templateUrl: 'public/about.html'
        })
        .when('apps', {
          templateUrl: 'public/apps.html'
        })
        .when('careers', {
          templateUrl: 'public/careers.html'
        })
        .when('contact', {
          templateUrl: 'public/contact.html'
        })

      $locationProvider.html5Mode(true);
    }])
  .directive('dirScroll', function ($window) {
    return function ($scope, element, attrs) {
      angular.element($window).bind('scroll', function () {
        scope.$apply();
        scope.scrollPage();
      });
    };
  })
  .controller('pageController', function ($scope, $http, $location) {
    $scope.pages = [{
      name: 'home'
    }, {
      name: 'about'
    }, {
      name: 'apps'
    }, {
      name: 'careers'
    }, {
      name: 'contact'
    }];
    $scope.surePage = function () {
      //hack for highlighted nav on refresh/reload
      $scope.section = $location.url().split('/')[1].toString() + 'Section';
      console.log($scope.section);
      updateNav($scope.section);
      //scrollToPage(token);
      //end hack
    }
    $scope.go = function (path, anchor) {
      $location.path(path);
      console.log('go() path: ' + path);
      $scope.anchor = anchor;

      scrollToPage($scope.anchor);
    }
    getSectionPlacement();
    $scope.scrollPage = function () {
      
//      for (var i = 0; i < $scope.pages.length; i++) {
//        
//      }
    }
  })

var sections;
var offset;
var offsetUnder;
var btnHome;
var btnAbout;
var btnApps;
var btnCareers;
var btnContact;
var inMotion;

function scrollToPage(anchor) {
  var page = document.querySelector('#' + anchor);
  var pagePos = page.offsetTop - 75;
  console.log(page, pagePos);

  inMotion = true;

  TweenLite.to(window, 0.5, {
    scrollTo: {
      y: pagePos
    },
    ease: Circ.easeInOut,
    onComplete: motionLess
  });
}

function motionLess() {
  inMotion = false;
}

function getSectionPlacement() {
  sections = document.querySelectorAll('section');
  btnHome = document.querySelector('#home');
  btnAbout = document.querySelector('#about');
  btnApps = document.querySelector('#apps');
  btnCareers = document.querySelector('#careers');
  btnContact = document.querySelector('#contact');
}

function updateSectionPlacement() {
  offset = window.pageYOffset + 75;
  offsetUnder = offset - 50;

  for (var i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop < offset &&
      sections[i].offsetTop > offsetUnder) {
      updateNav(sections[i].id);
    }
  }
}

function updateNav(id) {
  switch (id) {
  case 'homeSection':
    btnHome.focus();
    break;
  case 'aboutSection':
    btnAbout.focus();
    break;
  case 'appsSection':
    btnApps.focus();
    break;
  case 'careersSection':
    btnCareers.focus();
    break;
  case 'contactSection':
    btnContact.focus();
    break;
  }
}

//window.onscroll = function () {
//  if (inMotion == false) updateSectionPlacement();
//}