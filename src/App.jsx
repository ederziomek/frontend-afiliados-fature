import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Baus from './pages/Baus.jsx'
import CofreComissoes from './pages/CofreComissoes.jsx'
import Ranking from './pages/Ranking.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="baus" element={<Baus />} />
          <Route path="cofre" element={<CofreComissoes />} />
          <Route path="ranking" element={<Ranking />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

