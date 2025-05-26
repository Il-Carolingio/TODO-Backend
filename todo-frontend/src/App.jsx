import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Componente para proteger rutas (requiere autenticación)
const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Usa el contexto de autenticación
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* Envuelve todo con tu contexto de autenticación */}
        <Routes>
          {/* Ruta pública (login) */}
          <Route path="/login" element={<Login />} />

          {/* Ruta pública (registro) */}
          <Route path="/register" element={<Register />} />

          {/* Ruta privada (dashboard) */}
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />

          {/* Ruta por defecto para páginas no encontradas (opcional) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;