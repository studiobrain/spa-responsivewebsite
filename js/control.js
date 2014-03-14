angular.module('phonerulesweb', ['ngRoute', 'ngAnimate', 'ngTouch'])

    .config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider

            .when('/home', {
                templateUrl: 'public/index.html'
            })
            .when('/about', {
                templateUrl: 'public/about.html'
            })
            .when('/apps', {
                templateUrl: 'public/apps.html'
            })
            .when('/careers', {
                templateUrl: 'public/careers.html'
            })
            .when('/contact', {
                templateUrl: 'public/contact.html'
            })
    }])

    .controller('pageController', function ($scope, $http, $location, $anchorScroll) {

        $scope.anchor = '';

        $scope.go = function (path, anchor) {

            $location.path(path);
            console.log('go() path: ' + path);
            $scope.anchor = anchor;

            scrollToPage($scope.anchor);
        }

        getSectionPlacement();
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

    inMotion = true;

    TweenLite.to(window, 0.5, {scrollTo: {y: pagePos}, ease: Circ.easeInOut, onComplete:motionLess});
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
        case 'homeSection': btnHome.focus(); break;
        case 'aboutSection': btnAbout.focus(); break;
        case 'appsSection': btnApps.focus(); break;
        case 'careersSection': btnCareers.focus(); break;
        case 'contactSection': btnContact.focus(); break;
    }
}

window.onscroll = function () {
    if (inMotion == false) updateSectionPlacement();
}


