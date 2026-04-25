import { useEffect } from 'react'
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
import CampaignDetailPage from './pages/Campaign/CampaignDetailPage'
import JoinPage from './pages/JoinPage'
import CompendiumPage from './pages/CompendiumPage'
import ModulesPage from './pages/ModulesPage'
import SettingsPage from './pages/SettingsPage'
import { useSettingsStore } from './store/settingsStore'

// Register the core module once on app load
registerModule(coreModule)

export default function App() {
  const darkMode = useSettingsStore(s => s.darkMode)

  // Apply dark mode class globally at app root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

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
          <Route path="/campaigns/:id" element={<ProtectedRoute><CampaignDetailPage /></ProtectedRoute>} />
          <Route path="/join/:code" element={<ProtectedRoute><JoinPage /></ProtectedRoute>} />
          <Route path="/compendium" element={<ProtectedRoute><CompendiumPage /></ProtectedRoute>} />
          <Route path="/modules" element={<ProtectedRoute><ModulesPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
