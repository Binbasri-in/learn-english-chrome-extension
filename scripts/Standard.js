// when the content of the webpage is loaded, then start adding the span tags to the words
// apply the function
addSpanToAllWords();

// then create the div where the word info will be displayed
const wordInfoDiv = createDivWord();

// When the user clicks on the span element, open a new popup above the span element that contain 
// information about the word
document.addEventListener("click", function (event) {
    // to control position
    // if the clicked element is a span element
    if (event.target && event.target.className == "WordsClass") {
        // confirm the action
        console.log("Listener");
        // get the word from the span element
        const word = event.target.innerText;
        
        // get the position of the span element and make the popup appear above it
        const rect = event.target.getBoundingClientRect();
        const x = rect.left;
        const y = rect.top;
        // set the position of the popup
        wordInfoDiv.style.left = x + "px";
        wordInfoDiv.style.top = y + "px";
        // show the popup
        wordInfoDiv.style.display = "block";


        // get the word info from the API
        getWordInfo(word, wordInfoDiv.shadowRoot);
    }
});



function addSpanToAllWords() {
    // confirm the action
    console.log("addSpanToAllWords");
    // array of the HTML elements that are used to display the text (p, h, li, etc.)
    const textElements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];

    // for each element in the array above, get all the elements of that type and apply the function
    textElements.forEach(function (element) {
        const elements = document.querySelectorAll(element);
        elements.forEach(addTheSpan);
    });
}

// a function that takes the text inside an element and foreach word it adds a span tag
function addTheSpan(item) {
    // confirm the action
    console.log("addTheSpan");
    // regular expression to get all the text and the tags separately
    const regex = /(<[^>]*>)|([^<>]+)/g;
    const matches = item.innerHTML.match(regex);

    // the flag that will detect if any anchor tag is found
    let foundAnchor = false;

    // if there are matches, then apply the function
    if (matches) {
        matches.forEach(function (match) {
            // if the match is a tag, then add it to the output
            if (match.startsWith("<") && !match.startsWith("<a")) {
                item.innerHTML = item.innerHTML.replace(match, match);
            }
            // if the match is the anchor tag, then don't replace the text after the tag
            else if (match.startsWith("<a")) {
                item.innerHTML = item.innerHTML.replace(match, match);
                foundAnchor = true;
            }
            // if the match is text, then add the span tag to each word in the text
            else {
                // if the anchor tag is found, then don't replace the text after the tag
                if (foundAnchor) {
                    item.innerHTML = item.innerHTML.replace(match, match);
                    // set the flag to false
                    foundAnchor = false;
                }
                // if the anchor tag is not found, then replace the text with the span tag
                else {
                    item.innerHTML = item.innerHTML.replace(match, match.replace(/\S+/g, "<span class=\"WordsClass\">$&</span>"));
                }
            }
        });
    }
}



// function to close a div
function closeDiv(){
    document.querySelector("#TheExtensionDiv").style.display = "none";
}


// function to send the word to the API
function retrieveMeaning(word){
    // confirm the action
    console.log("retrieveMeaning");
    return chrome.runtime.sendMessage({ message: 'get_the_word',word: word });
}




// get the word info from the API
function getWordInfo(word, popup) {
    // confirm the action
    console.log("getWordInfo");
    // get the word info from the API
    retrieveMeaning(word).then(function (response) {
        // confirm the action
        console.log(response);
        // if the word is not found
        if (response.status == -1) {
            // show the word not found message and suggestions
            showWordNotFound(word, response.message, popup);
            return;
        }
        // if the word is found
        showWordInfo(response, popup);
    });
}

// function to show the word not found message and suggestions
function showWordNotFound(word, message, the_popup) {
    // set the div text content
    the_popup.querySelector(".the-word").textContent = word;
    the_popup.querySelector(".translation").textContent = message;
    return;
}

// function to show the word info
function showWordInfo(response, the_popup) {
    // add the word to the word div
    the_popup.querySelector(".the-word").textContent = response.word;

    // add the audio with the word pronunciation to the word div
    the_popup.querySelector(".audio .pronoun").textContent = response.phonetics.text;
    the_popup.querySelector(".audio audio source").setAttribute("src", response.phonetics.audio);
    //console.log(response.phonetics.audio+" "+response.phonetics.text);
    // add the word meaning list
    response.meanings.forEach(function (meaning) {
        // create a new div for the meaning and insert the data
        the_popup.querySelector(".meaning").innerHTML = `
        <div class="mean-div">
            <div class="part-of-speech">${meaning.partOfSpeech}</div>
            <div class="definition">${meaning.definitions[0].definition}</div>
            <div class="example">${meaning.definitions[0].example}</div>
        </div>
        `;
    });
    // show the word info div
    document.querySelector("#TheExtensionDiv").style.display = "block";

    // add the event listener to the close button
    the_popup.querySelector(".close").addEventListener("click", function () {
        closeDiv();
    });

    // add the event listener to the audio button
    the_popup.querySelector(".audio").addEventListener("click", function () {
        the_popup.querySelector(".audio audio").play();
    });

}

// create the div where the word info will be displayed
function createDivWord() {
    // confirm the action
    console.log("createDivWord");
    // create the div element
    var hostDiv = document.createElement("div");
    // set the class and style of the host div
    hostDiv.id = "TheExtensionDiv";
    hostDiv.style = `background-color: gainsboro;
        border: 1px solid #000;
        width: 250px;
        height: 300px;
        margin: 50px auto;
        border-radius: 5px;
        z-index: 999999;
        display: none;
        position: absolute;`;

    // create a shadow root
    var shadow = hostDiv.attachShadow({ mode: 'open' });
    shadow = hostDiv.shadowRoot;
    
    // add the popup to the shadow root inner html
    shadow.innerHTML = `
    <div class="the-popup-content">
       <div class="header">
        <div class="close">X</div>
        <div>A</div>
       </div>

       <div class="word-info">
        <div class="word">
            <div class="the-word">Word</div>
            <div class"translation"=>ترجمة بالعربي</div>
        </div>

        <div class="audio">
            <div class="pronoun">Pronunciation</div>
            <div class="audio-icon"><audio>
            <source src="" type="audio/mpeg">
            </audio>AU</div>
        </div>

        <div class="meaning">
            <div class="mean-div">
                <div class="part-of-speech">Part of speech</div>
                <div class="definition">Definition</div>
                <div class="example">Example</div>
            </div>
        </div>
       </div>

       <div class="footer">
        <a href="#">Ox</a>
        <a href="#">Ca</a>
        <a href="#">Ex</a>
        <a href="#">Im</a>
    </div>
    </div>`

        // create the style element
        var style = document.createElement('style');
        // set the style of the style element (Initial style)
        style.textContent = `
        .the-popup-content .header {
            display: flex;
            justify-content: space-between;
            padding: 5px 5px 2px 5px;
        }
        
        .the-popup-content img {
            width: 24px;
            cursor: pointer;
            
        }
        
        .the-popup-content .word-info .word  {
            background-color: #444;
            color: #fff;
            text-align: right;
            padding: 3px;
        
        }
        .the-popup-content .word-info .word .the-word {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
            text-align: left;
            
        }
        .the-popup-content .word-info .word div {
            margin: 2px 0;
        }
        .the-popup-content .word-info  .audio {
            background-color: #999;
            color: #fff;
            display: flex;
            justify-content: space-between;
            border-top: #fff 1px solid;
            padding: 2px;
        }
        .the-popup-content .meaning {
            width: 100%;
            height:140px ;
            border-top: #fff 1px solid;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: white;
            margin-bottom: 10px;
            background-color: #444;
            color: #fff;
            
        }
        .the-popup-content .meaning .mean-div {
            margin: 2px;
            text-align: left;
            border-bottom: #999 1px solid;
        }
        .the-popup-content .footer {
            display: flex;
            justify-content: space-between;
            /* set footer to the bottom of the popup */
            position: absolute;
            bottom: 0;
            width: 100%;
        }
        .the-popup-content .footer a {
            /* make the link look like a button */
            background-color: #444;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            width: 20px;
            margin: 4px;
        }
        
        .the-popup-content .footer a:hover {
            background-color: #fff;
            color: #444;
            cursor: pointer;
        }
        
        
        .the-popup-content .word-info .audio .audio-icon {
            margin: 2px;
            cursor: pointer;
        }`;

    // add the host div to the body
    document.body.appendChild(hostDiv);

    
    // add the style element to the shadow root
    hostDiv.appendChild(style);

    return hostDiv;

}


