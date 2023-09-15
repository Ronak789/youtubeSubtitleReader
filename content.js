let observer;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === 'startObserving') {
      observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.target.id === 'ytp-caption-window-container') {
            const data = { id: mutation.target.id, textContent: mutation.target.textContent };
            chrome.runtime.sendMessage({ command: 'domChanged', data: data });
          }
        });
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    else if(request.command === 'stopObserving'){
        try{
            observer.disconnect();
        }
        catch(error){
          console.error(error.message);
        }
    }
  });