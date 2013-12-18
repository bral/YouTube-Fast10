
var VIDEO;
document.addEventListener('mouseup', function(){
  console.log('eventlistener')
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log('contentscript hits here');
    if (request.method == "getSelection")
      sendResponse({data: window.getSelection().toString()});
    else
      sendResponse({}); // snub them.
  })
});