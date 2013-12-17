var VIDEO;
var startIndex = 1;

// var QUERY = 'kittens';

var videoGenerator = {

  searchOnYouTube: function(vid, startIndex){
    return 'https://gdata.youtube.com/feeds/api/videos?' +
      'q=' + encodeURIComponent(vid) +
      '&max-results=5'

  },

  requestVideos: function(vid, startIndex) {
    console.log('requestVideos ln83', vid);
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnYouTube(vid, startIndex), true);
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

  $('form').submit(function(event){
    event.preventDefault();
    VIDEO = $('input').val();
    $('input').val('');
    $('.show').html('')
    console.log(VIDEO);
    videoGenerator.requestVideos(VIDEO, startIndex);
  });

})

