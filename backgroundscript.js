var newSelection = function(sel){
  VIDEO = sel;
}



// function _someFunction() {
//     console.log("I am invoked ...");
// }

// //Handler when message is sent from Content Scripts
// chrome.extension.onMessage.addListener(function (message, caller, handler) {
//     if (message["callTo"] == "_someFunction") _someFunction();
// });






// function reportclick(info,tab){
//     // Do all you need here when clicked
//     console.log("item " + info.menuItemId + " was clicked");
// }
// var item2=chrome.contextMenus.create({
//   "title":"YouTube Research %s",
//   "id":"item2",
//   "onclick": reportclick,
//   "contexts":["selection"]},
//   function (){
//         // Do what all you need here when created
//     console.log("Context Menu 2 Created");
// });