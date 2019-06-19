'use strict';

console.log('\'Allo \'Allo! Content script');

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
// on copy event, send a message to background.html
function onCopy(e) { 
   
    navigator.clipboard.readText()
  .then(text => {
      let array=text.split('\n');
      let isCopiedContentUrlList=array.every(value=>validURL(value));
    console.log('Is Url list: ',isCopiedContentUrlList );
    if(isCopiedContentUrlList)chrome.runtime.sendMessage({msg: 'copy',data:{urls:array}});
  })
  .catch(err => {
    console.error('Failed to read clipboard contents: ', err);

  });
}

//register event listener for copy events on document
document.addEventListener('copy',onCopy,true); 

