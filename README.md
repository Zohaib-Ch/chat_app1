# Chat Application Frontend

A modern, real-time chat application built with React.js, Socket.IO, and premium UI design.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure login and registration with JWT
- **Online Status**: See who's online in real-time
- **Modern UI**: Premium design with smooth animations and transitions
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Message History**: Load and view past conversations
- **Search Functionality**: Search for chats and users
- **Toast Notifications**: User-friendly feedback for actions

## Technology Stack

- React 18
- React Router DOM
- Socket.IO Client
- Axios
- React Hot Toast
- Date-fns
- CSS Modules

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

## Installation

1. Clone the repository or extract the project files

2. Install dependencies:
```bash
npm install
```

3. Make sure your backend server is running on port 5000

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open in your browser at http://localhost:3000

## Project Structure

```
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Chat/           # Chat interface components
│   ├── Common/         # Reusable UI components
│   ├── Layout/         # Layout components
│   └── Users/          # User list components
├── context/            # React Context providers
├── pages/              # Page components
├── services/           # API and socket services
├── styles/             # Global styles
└── utils/              # Utility functions
```

## Environment Configuration

The application connects to the backend at:
- API: http://localhost:5000
- Socket: ws://localhost:5000

To change these URLs, update `src/utils/constants.js`:
```javascript
export const API_BASE_URL = 'your-api-url';
export const SOCKET_URL = 'your-socket-url';
```

## Features Guide

### Authentication
- Register with username, email, and password
- Login with email and password
- Automatic token persistence

### Chatting
- Click "+" to start a new conversation
- Select a user to create or open an existing chat
- Type and press Enter or click send to send messages
- Messages appear in real-time

### User Interface
- **Desktop**: Sidebar + chat window layout
- **Mobile**: Toggle sidebar with menu button
- **Dark Theme**: Premium dark mode design
- **Animations**: Smooth transitions throughout

## Build for Production

To create a production build:
```bash
npm run build
```

The optimized files will be in the `dist` folder.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**Messages not sending?**
- Check if the backend server is running
- Verify Socket.IO connection in browser console

**Can't login?**
- Ensure backend API is accessible
- Check browser console for errors

**Styling issues?**
- Clear browser cache
- Ensure all CSS modules loaded correctly

## License

MIT License