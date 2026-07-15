import { useState } from 'react'

// === PAGES ===
function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">🏠 Dashboard</h1>
      <p className="text-text-secondary">Welcome to Nomic DEX</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel p-6"><p className="text-text-secondary">Total Equity</p><p className="text-2xl font-bold">$100,000</p></div>
        <div className="glass-panel p-6"><p className="text-text-secondary">24h P&L</p><p className="text-2xl font-bold text-success">+$2,500</p></div>
        <div className="glass-panel p-6"><p className="text-text-secondary">Available</p><p className="text-2xl font-bold">$80,000</p></div>
      </div>
    </div>
  )
}

function Trade() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">📈 Trade</h1>
      <div className="glass-panel p-6">
        <p className="text-text-secondary">Trading interface coming soon</p>
        <p className="text-2xl font-mono mt-4">BTC/USDC: $67,234.50</p>
        <p className="text-success">+2.34%</p>
      </div>
    </div>
  )
}

function Portfolio() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">💼 Portfolio</h1>
      <div className="glass-panel p-6">
        <p className="text-text-secondary">Portfolio coming soon</p>
      </div>
    </div>
  )
}

function Points() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">⭐ Points</h1>
      <div className="glass-panel p-6">
        <p className="text-text-secondary">Points & rewards coming soon</p>
      </div>
    </div>
  )
}

// === MAIN APP ===
function App() {
  const [page, setPage] = useState('home')

  const pages: Record<string, React.ReactNode> = {
    home: <Home />,
    trade: <Trade />,
    portfolio: <Portfolio />,
    points: <Points />
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* NAVBAR */}
      <nav className="bg-surface border-b border-white/10 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div onClick={() => setPage('home')} className="text-xl font-bold text-primary cursor-pointer">
            Nomic <span className="text-xs text-text-secondary bg-primary/10 px-2 py-0.5 rounded">Beta</span>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setPage('home')} className={`px-3 py-1.5 rounded-lg text-sm transition ${page === 'home' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-white'}`}>Dashboard</button>
            <button onClick={() => setPage('trade')} className={`px-3 py-1.5 rounded-lg text-sm transition ${page === 'trade' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-white'}`}>Trade</button>
            <button onClick={() => setPage('portfolio')} className={`px-3 py-1.5 rounded-lg text-sm transition ${page === 'portfolio' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-white'}`}>Portfolio</button>
            <button onClick={() => setPage('points')} className={`px-3 py-1.5 rounded-lg text-sm transition ${page === 'points' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-white'}`}>Points</button>
          </div>

          <button className="btn-primary text-sm py-1.5 px-4">Connect</button>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto p-6">
        {pages[page] || <Home />}
      </main>
    </div>
  )
}

export default App
