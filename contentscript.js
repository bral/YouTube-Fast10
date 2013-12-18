//Look for scroll event
// document.addEventListener("scroll", function () {
//     console.log("Page is Scrolled hence requesting background page to execute my function");
//     //Request Background page for execution of a function
//     chrome.extension.sendMessage({
//         "callTo": "_someFunction"
//     });
// });


// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//     console.log('contentscript hits here');
//     if (request.method == "getSelection")
//       sendResponse({data: window.getSelection().toString()});
//     else
//       sendResponse({}); // snub them.
// });
var VIDEO;
document.addEventListener('mouseup', function(){
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log('contentscript hits here');
    if (request.method == "getSelection")
      sendResponse({data: window.getSelection().toString()});
    else
      sendResponse({}); // snub them.
  })
});