// check what website you are in and perform the desired action
// the extension will perform the same task on all the websites
// except YouTube, Netflix
//chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //  if (changeInfo.status == 'complete') {
    //    if (tab.url.includes("youtube") || tab.url.includes("netflix")) {
      //      chrome.tabs.executeScript(tabId, {
        //        file: 'scripts/videos.js'
          //  });
     //   }else {
       //     chrome.tabs.executeScript(tabId, {
         //       file: 'scripts/Standard.js'
        //    });
       // }}});


chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    filr: 'scripts/Standard.js'
  });
});

// when receiving a message from the content script
// make a request to the server and get the word's info
// then send the info back to the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get_the_word') {
    const TheWord = request.word;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${TheWord}`;

    // make a request to the server
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const content = get_content(data);

        // proint the word's info in the console
        console.log(content);

        sendResponse( content );
      })
      .catch((error) => {
        console.error('Error:', error);
      }
    );

    return true;
  }
});

// get the word's info
function get_content(data) {
  // check if the response is negative and no word was found
  if (data.title === 'No Definitions Found') {
    return {status: -1, message: 'No Definitions Found'};
  }

  const word = data[0].word;
  const phonetics = data[0].phonetics[0];
  const meanings = data[0].meanings;

  const content = {
    word,
    phonetics,
    meanings,
    status: 1,
    message: 'Found'
  };

  return content;
}

// save the word in the local storage
function saveWord (content) {
  let word = content.word,
      meaning = content.meaning,
    
      storageItem = browser.storage.local.get('definitions');

      storageItem.then((results) => {
          let definitions = results.definitions || {};

          definitions[word] = meaning;
          browser.storage.local.set({
              definitions
          });
      })
}