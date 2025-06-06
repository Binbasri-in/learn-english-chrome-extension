# English Learning Browser Extension 🔤📚

A Chrome extension that transforms your browsing experience into an interactive English learning journey. Simply click on any word while browsing to get instant definitions, pronunciations, and examples.

## ✨ Features

### 🎯 Core Functionality
- **One-Click Word Lookup**: Click any word on any webpage to get instant definitions
- **Smart Text Processing**: Automatically wraps all text content with clickable spans while preserving HTML structure
- **Real-time Dictionary**: Fetches definitions, pronunciations, and examples from Dictionary API
- **Audio Pronunciation**: Listen to correct word pronunciations with built-in audio player
- **Multi-Context Support**: Works on all websites with special handling for video platforms

### 🎨 User Interface
- **Beautiful Popup Design**: Clean, responsive popup interface with organized word information
- **Shadow DOM Implementation**: Style isolation ensures the extension doesn't interfere with website styling
- **Responsive Layout**: Adapts to different screen sizes and positions
- **Intuitive Controls**: Easy-to-use close buttons and navigation elements

## 🚀 Installation

### For Development
1. Clone this repository:
   ```bash
   git clone [your-repo-url]
   cd english-learning-extension
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the project directory

5. The extension should now appear in your extensions list

## 🔧 How It Works

### 1. Content Script Injection
The extension automatically injects content scripts into web pages based on the URL:
- `Standard.js` for regular websites
- `videos.js` for YouTube and Netflix

### 2. Text Processing
- Scans all text elements (p, h1-h6, li) on the page
- Wraps individual words with clickable `<span>` elements
- Preserves existing HTML structure and links

### 3. Word Lookup Process
1. User clicks on a word
2. Content script captures the click event
3. Sends word to background script via Chrome messaging API
4. Background script fetches definition from Dictionary API
5. Returns formatted data to content script
6. Displays beautiful popup with word information

### 4. Shadow DOM Implementation
- Creates isolated styling environment
- Prevents conflicts with website CSS
- Ensures consistent popup appearance across all sites

## 🚧 Future Enhancements

### Planned Features
- [ ] Word saving and vocabulary lists
- [ ] Translation to multiple languages
- [ ] Offline dictionary support
- [ ] Custom word highlighting
- [ ] Progress tracking and statistics
- [ ] Integration with popular learning platforms


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Dictionary API providers for free word definitions
- Chrome Extension documentation and community
