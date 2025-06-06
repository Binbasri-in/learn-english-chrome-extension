style.textContent = `img {
    width: 24px;
    cursor: pointer;
    
}
#extension_footer a {
    /* make the link look like a button */
background-color: #444;
color: #fff;
text-decoration: none;
border-radius: 5px;
text-align: center;
width: 20px;
margin: 4px;
}
#extension_footer a:hover {
    background-color: #555;
    color: #444;
    cursor: pointer;
}`
// add the style element to the shadow root
shadow.appendChild(style);

// create the word info popup as planned
var header_div = document.createElement('div');
header_div.style = "display: flex;justify-content: space-between;padding: 5px 5px 2px 5px;";
shadow.appendChild(header_div);

// create the word info which cntains the main info
var main_info = document.createElement('div');
main_info.style = ``;
shadow.appendChild(main_info);

// create a div for the word and its translation
var word_div = document.createElement('div');
word_div.style = "background-color: #444;color: #fff;text-align: right;padding: 3px;";
main_info.appendChild(word_div);

// create a div for the word style
var the_word = document.createElement('div');
the_word.style = "font-size: 20px;font-weight: bold;margin-bottom: 5px;text-align: left;"
word_div.appendChild(the_word);

// create a div for the translation style
var the_translation = document.createElement('div');
the_translation.style = "margin: 2px 0;"
word_div.appendChild(the_translation);

// create a div for the audio and pronunciation
var audio_div = document.createElement('div');
audio_div.style = "background-color: #999;color: #fff;display: flex;justify-content: space-between;border-top: #fff 1px solid;padding: 2px;";
main_info.appendChild(audio_div);

// create a div for the audio style
var audio = document.createElement('div');
audio.style = "";
audio_div.appendChild(audio);

// create a div for the pronunciation style
var pronunciation = document.createElement('div');
pronunciation.style = "";
audio_div.appendChild(pronunciation);

// create a div for the meaning
var meaning_div = document.createElement('div');
meaning_div.style = "width: 100%;height:140px ;border-top: #fff 1px solid;overflow-x: hidden;overflow-y: auto;background-color: white;margin-bottom: 10px;background-color: #444;color: #fff;";
shadow.appendChild(meaning_div);

// mean div
var mean = document.createElement('div');
mean.style = "margin: 2px;text-align: left;border-bottom: #999 1px solid;";
meaning_div.appendChild(mean);

// creare a div for part of speech
var part_of_speech = document.createElement('div');
part_of_speech.style = "font-weight: bold;";
mean.appendChild(part_of_speech);

// create a div for the definition
var definition = document.createElement('div');
definition.style = "margin: 2px;";
mean.appendChild(definition);

// create a div for the example
var example = document.createElement('div');
example.style = "margin: 2px;";
mean.appendChild(example);

// create a div for the footer
var footer_div = document.createElement('div');
footer_div.id = "extension_footer";
footer_div.style = "display: flex;justify-content: space-between;position: absolute;bottom: 0;width: 100%;";
shadow.appendChild(footer_div);

// add the links that will be like buttons
var links = ["EX", "OX", "AM", "NO"];
for (var i = 0; i < links.length; i++) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = links[i];
    footer_div.appendChild(link);
}