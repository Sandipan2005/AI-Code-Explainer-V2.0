# 🚀 AI Code Explainer & Debugger

An advanced, AI-powered web application that provides comprehensive code analysis, debugging, and optimization suggestions using Google's Gemini AI. Features a beautiful, modern UI with glassmorphism design, dark/light theme support, and intuitive drag-and-drop functionality.

## ✨ Features

- **🤖 Advanced AI Analysis**: Powered by Google Gemini AI for comprehensive code understanding
- **🔍 Multi-faceted Code Review**: Bug detection, security analysis, performance optimization, and more
- **📝 Line-by-Line Explanations**: Detailed breakdowns perfect for learning and understanding code
- **🎨 Modern UI/UX**: Glassmorphism design with smooth animations and transitions
- **🌓 Smart Theme System**: Light, dark, and auto modes with system preference detection
- **📁 Drag & Drop Support**: Easy file uploading with extensive file type support
- **🔔 Smart Notifications**: Real-time feedback for all user actions
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Optimized with Vite for lightning-fast development and builds

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini AI API
- **Build Tool**: Vite
- **Styling**: Advanced CSS animations, glassmorphism effects
- **Development**: Hot Module Replacement, TypeScript checking

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **Gemini API Key** (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd code-explainer-&-debugger
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   # Copy the example env file
   cp .env.example .env

   # Edit .env and add your Gemini API key
   # GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173`

## 🔑 API Key Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key
4. Add it to your `.env` file:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

## 📖 Usage Guide

### Basic Usage

1. **Input Code**: Paste code directly or use drag-and-drop to upload files
2. **Select Language**: Choose from auto-detect or manually select the programming language
3. **Analyze**: Click "Analyze Code with AI" to get comprehensive insights
4. **Review Results**: Explore bugs, optimizations, line-by-line explanations, and more

### Supported File Types

- JavaScript/TypeScript (`.js`, `.jsx`, `.ts`, `.tsx`)
- Python (`.py`)
- Java (`.java`)
- C/C++ (`.c`, `.cpp`)
- C# (`.cs`)
- Go (`.go`)
- Rust (`.rs`)
- PHP (`.php`)
- HTML/CSS (`.html`, `.css`, `.scss`, `.sass`, `.less`)
- Configuration files (`.json`, `.xml`, `.yaml`, `.yml`)
- And many more!

### Theme Switching

- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for extended coding sessions
- **Auto Mode**: Automatically follows your system preferences

## 🏗️ Project Structure

```
code-explainer-&-debugger/
├── components/           # React components
│   ├── CodeInput.tsx    # Code input with drag-and-drop
│   ├── AnalysisDisplay.tsx # Results display
│   ├── ThemeProvider.tsx   # Theme management
│   ├── ThemeToggle.tsx     # Theme switcher
│   ├── NotificationSystem.tsx # User feedback
│   └── ...
├── services/            # API services
│   └── geminiService.ts # Gemini AI integration
├── types.ts            # TypeScript definitions
├── App.tsx             # Main application
├── index.tsx           # Entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies

```

## 🔧 Development

### Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Adding Features

The application is modular and easy to extend:

- **New Analysis Types**: Extend the `FullAnalysisReport` type in `types.ts`
- **UI Components**: Add new components in the `components/` directory
- **API Integration**: Modify `services/geminiService.ts`
- **Styling**: Update Tailwind classes or add custom CSS

## 🐛 Troubleshooting

### Common Issues

1. **API Key Errors**:

   - Ensure your `.env` file contains `GEMINI_API_KEY=your_key`
   - Restart the dev server after adding the API key

2. **File Upload Issues**:

   - Check file size (max 1MB)
   - Ensure file type is supported
   - Try drag-and-drop instead of the upload button

3. **Theme Not Persisting**:
   - Clear browser localStorage and try again
   - Check browser developer tools for errors

### Debug Mode

Enable debug logging by opening browser developer tools (F12) and checking the Console tab for detailed error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful code analysis capabilities
- **Tailwind CSS** for the beautiful styling system
- **React** team for the amazing framework
- **Vite** for the lightning-fast build tool

## 👨‍💻 Author

**Sandipan Majumder**

- 🐙 GitHub: [https://github.com/Sandipan2005](https://github.com/Sandipan2005)
- 💼 LinkedIn: [https://linkedin.com/in/sandipan-majumder-772814323](https://linkedin.com/in/sandipan-majumder-772814323)

---

**Made with ❤️ for developers, by Sandipan Majumder**
