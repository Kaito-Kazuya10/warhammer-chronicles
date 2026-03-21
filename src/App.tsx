import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { registerModule } from './modules/registry'
import { coreModule } from './modules/core'
import Landing from './pages/Landing'
import Characters from './pages/Characters'
import CharacterCreation from './pages/CharacterCreation/index'
import CharacterSheetPage from './pages/CharacterSheetPage'

// Register the core module once on app load
registerModule(coreModule)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/create" element={<CharacterCreation />} />
        <Route path="/sheet" element={<CharacterSheetPage />} />
      </Routes>
    </BrowserRouter>
  )
}
