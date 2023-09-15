let rate = 2.0;
let prev = "";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === 'speedChange'){
    rate = request.rate*1;
  }
  if (request.command === 'toggle') {
    chrome.tts.isSpeaking(
      function(res){
        if(res){
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { command: 'stopObserving' });
            chrome.tts.stop();
          });
        }
        else{
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { command: 'startObserving' });
          });
        }
      }
    )
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === 'domChanged') {
    curr = request.data.textContent;
    if(curr != prev){
      chrome.tts.speak(curr, {'rate': rate, 'enqueue': true});
      prev = curr;
    }
  }
});
