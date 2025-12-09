import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatHome from './pages/ChatHome';
import './styles/global.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <SocketProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/chat"
                            element={
                                <ProtectedRoute>
                                    <ChatHome />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/chat" replace />} />
                        <Route path="*" element={<Navigate to="/chat" replace />} />
                    </Routes>

                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: 'var(--bg-light)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                            },
                            success: {
                                iconTheme: {
                                    primary: 'var(--success)',
                                    secondary: 'white',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: 'var(--error)',
                                    secondary: 'white',
                                },
                            },
                        }}
                    />
                </SocketProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
