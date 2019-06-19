'use strict';
let urlsToOpen=[];
let currentUrlIndex=0;
let tabId;
chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    let data = request.data;

    switch (request.msg) {
    case 'copy':console.log(data);urlsToOpen=data.urls;
    chrome.tabs.create({ url: urlsToOpen[0] },function(tab){
     tabId=tab.id;
     console.log(tab);
    });

    }

  

});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:',command=='nextUrl' , currentUrlIndex<urlsToOpen.length-1 , tabId!=null);
 
  if(command=='nextUrl' && currentUrlIndex<urlsToOpen.length-1 && tabId!=null){
    
      chrome.tabs.update(tabId,{url:urlsToOpen[++currentUrlIndex]})
  }
  else if(command=='previousUrl'&& currentUrlIndex>0 && tabId!=null){
    chrome.tabs.update(tabId,{url:urlsToOpen[--currentUrlIndex]})
  }
 
  
});
