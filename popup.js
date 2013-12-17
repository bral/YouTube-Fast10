// // Changes XML to JSON
// function xmlToJson(xml) {

//   // Create the return object
//   var obj = {};

//   if (xml.nodeType == 1) { // element
//     // do attributes
//     if (xml.attributes.length > 0) {
//     obj["@attributes"] = {};
//       for (var j = 0; j < xml.attributes.length; j++) {
//         var attribute = xml.attributes.item(j);
//         obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//       }
//     }
//   } else if (xml.nodeType == 3) { // text
//     obj = xml.nodeValue;
//   }

//   // do children
//   if (xml.hasChildNodes()) {
//     for(var i = 0; i < xml.childNodes.length; i++) {
//       var item = xml.childNodes.item(i);
//       var nodeName = item.nodeName;
//       if (typeof(obj[nodeName]) == "undefined") {
//         obj[nodeName] = xmlToJson(item);
//       } else {
//         if (typeof(obj[nodeName].push) == "undefined") {
//           var old = obj[nodeName];
//           obj[nodeName] = [];
//           obj[nodeName].push(old);
//         }
//         obj[nodeName].push(xmlToJson(item));
//       }
//     }
//   }
//   return obj;
// };

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
var VIDEO;
var startIndex = 1;

// var QUERY = 'kittens';

var videoGenerator = {

  searchOnYouTube: function(vid, startIndex){
    return 'https://gdata.youtube.com/feeds/api/videos?' +
      'q=' + encodeURIComponent(vid) +
      '&start-index=' + encodeURIComponent(startIndex) + '&max-results=5'

  },

  // searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
  //     'method=flickr.photos.search&' +
  //     'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
  //     'text=' + encodeURIComponent(QUERY) + '&' +
  //     'safe_search=1&' +
  //     'content_type=1&' +
  //     'sort=interestingness-desc&' +
  //     'per_page=20',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  // requestKittens: function() {
  //   var req = new XMLHttpRequest();
  //   req.open("GET", this.searchOnFlickr_, true);
  //   req.onload = this.showPhotos_.bind(this);
  //   req.send(null);
  // },

  requestVideos: function(vid, startIndex) {
    console.log('requestVideos ln83', vid);
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnYouTube(vid, startIndex), true);
    req.onload = this.showSearchResults.bind(this);
    req.send(null);
    // $.ajax({
    //   url: this.searchOnYouTube,
    //   type: 'GET',
    //   success: function(data){
    //     return this.showSearchResults.bind(this);
    //   }
    // })
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showSearchResults: function(e){
    var result = e.target.responseXML.querySelectorAll('entry');
    for(var i = 0; i < result.length; i++){
      var $link = $(result[i].querySelector('id')).text();
      var string = JSON.stringify($link);
      var link = 'http://youtube.com/watch?v=' + string.slice(-12,-1);
      var $title = $(result[i].querySelector('title')).text();
      $('.show').append('<div><a href='+ link + '>' + $title + '</a><div>');
    }
  },

  // showPhotos_: function (e) {
  //   var kittens = e.target.responseXML.querySelectorAll('photo');
  //     console.log(kittens);
  //   for (var i = 0; i < kittens.length; i++) {
  //     var img = document.createElement('img');
  //     img.src = this.constructKittenURL_(kittens[i]);
  //     img.setAttribute('alt', kittens[i].getAttribute('title'));
  //     document.body.appendChild(img);

  //   }
  // },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  // constructVideoURL: function(video){

  // },

  // constructKittenURL_: function (photo) {
  //   return "http://farm" + photo.getAttribute("farm") +
  //       ".static.flickr.com/" + photo.getAttribute("server") +
  //       "/" + photo.getAttribute("id") +
  //       "_" + photo.getAttribute("secret") +
  //       "_s.jpg";
  // }
};

$(function(){

  $('form').submit(function(event){
    event.preventDefault();
    VIDEO = $('input').val();
    $('input').val('');
    $('.show').html('')
    console.log(VIDEO);
    videoGenerator.requestVideos(VIDEO, startIndex);
  });
  // kittenGenerator.requestKittens();
  // videoGenerator.requestVideos();
})

  // function reportclick(info,tab){

  //   console.log("item " + info.menuItemId + " was clicked");
  // }

  // var item2 = chrome.contextMenus.create({"title":"Do Some YouTube Research","id":"item2","onclick": reportclick,"contexts":["selection"]  },function (){
  //   // Do what all you need here when created
  //   console.log("Context Menu 2 Created");
  // });
