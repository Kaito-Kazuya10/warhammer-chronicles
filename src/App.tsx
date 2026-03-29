import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { registerModule } from './modules/registry'
import { coreModule } from './modules/core'
import { AuthProvider } from './auth/AuthProvider'
import ProtectedRoute from './auth/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import Landing from './pages/Landing'
import Characters from './pages/Characters'
import CharacterCreation from './pages/CharacterCreation/index'
import CharacterSheetPage from './pages/CharacterSheetPage'
import CampaignPage from './pages/CampaignPage'

// Register the core module once on app load
registerModule(coreModule)

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/characters" element={<ProtectedRoute><Characters /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CharacterCreation /></ProtectedRoute>} />
          <Route path="/sheet" element={<ProtectedRoute><CharacterSheetPage /></ProtectedRoute>} />
          <Route path="/campaign" element={<ProtectedRoute><CampaignPage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
