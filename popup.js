var VIDEO;

var videoGenerator = {

  searchOnYouTube: function(vid, startIndex){
    return 'https://gdata.youtube.com/feeds/api/videos?' +
      'q=' + encodeURIComponent(vid) +
      '&max-results=10';

  },

  requestVideos: function(vid) {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnYouTube(vid), true);
    req.onload = this.showSearchResults.bind(vid);
    req.send(null);
  },

  showSearchResults: function(e){
    e.preventDefault();
    if( $('.show') ){
      $('.show').html('');
    }
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
      $('.search').text(VIDEO);
      if(VIDEO){
        videoGenerator.requestVideos(VIDEO);
      }
      // content = document.getElementById('.show');
      // content.appendChild(document.createTextNode(response.data))
    });
  });

  // chrome.contextMenus.create({title: "Test %s menu item",
  //                             contexts:["selection"],
  //                             onclick: function(info, tab){ sendSearch(info.selectionText); }
  // });
  $('input').keyup(function(event){
    event.preventDefault();
    VIDEO = $('input').val();
    $('.search').text(VIDEO);
    if(VIDEO){
      var refreshed = VIDEO, timeoutId;
      timeoutId = setTimeout(function(){
        if (refreshed === VIDEO){
        $('.show').html('');
          videoGenerator.requestVideos(VIDEO);
        }
      }, 250);
    } else {
      $('.show').html('');
    }
  });

  $('form').submit(function(event){
    event.preventDefault();
    VIDEO = $('input').val();
    $('.search').text(VIDEO);
    // $('input').val('');
    $('.show').html('');
    videoGenerator.requestVideos(VIDEO);
  });

});

