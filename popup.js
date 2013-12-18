// var saywhat = function(){
//   alert(chrome.extension.getSelection());
// }
var VIDEO;

// var QUERY = 'kittens';

var videoGenerator = {

  searchOnYouTube: function(vid, startIndex){
    return 'https://gdata.youtube.com/feeds/api/videos?' +
      'q=' + encodeURIComponent(vid) +
      '&max-results=10'

  },

  requestVideos: function(vid) {
    console.log('requestVideos ln83', vid);
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnYouTube(vid), true);
    req.onload = this.showSearchResults.bind(this);
    req.send(null);
  },

  showSearchResults: function(e){
    var result = e.target.responseXML.querySelectorAll('entry');
    for(var i = 0; i < result.length; i++){
      var $link = $(result[i].querySelector('id')).text();
      var string = JSON.stringify($link);
      var link = 'http://youtube.com/watch?v=' + string.slice(-12,-1);
      var $title = $(result[i].querySelector('title')).text();
      $('.show').append('<div><a href='+ link + ' target="_blank">' + $title + '</a><div>');
    }
  },

};

$(function(){

   chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response) {
      VIDEO = response.data;
      videoGenerator.requestVideos(VIDEO);
      // content = document.getElementById('.show');
      // content.appendChild(document.createTextNode(response.data))
    });
  });

  // chrome.contextMenus.create({title: "Test %s menu item",
  //                             contexts:["selection"],
  //                             onclick: function(info, tab){ sendSearch(info.selectionText); }
  // });

  $('form').submit(function(event){
    event.preventDefault();
    VIDEO = $('input').val();
    $('input').val('');
    $('.show').html('')
    console.log(VIDEO);
    videoGenerator.requestVideos(VIDEO);
  });

})

