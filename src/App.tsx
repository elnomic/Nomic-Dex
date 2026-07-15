import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// === SUPABASE ===
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xxyskjoxfqsnhfyddmhg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eXNram94ZnFzbmhmeWRkbWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMDUxMjUsImV4cCI6MjA5OTY4MTEyNX0.fp_-LW5Ho1rA2ftzLC8j5ZEBZs8d5eZb78MgJnZP500'
const supabase = createClient(supabaseUrl, supabaseKey)

// === PAGES ===
function Home() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Test fetch dari Supabase
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .limit(5)
        
        if (error) throw error
        setUsers(data || [])
      } catch (err) {
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">🏠 Dashboard</h1>
      
      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel p-6">
          <p className="text-text-secondary">Total Equity</p>
          <p className="text-2xl font-bold">$100,000</p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-text-secondary">24h P&L</p>
          <p className="text-2xl font-bold text-success">+$2,500</p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-text-secondary">Available</p>
          <p className="text-2xl font-bold">$80,000</p>
        </div>
      </div>

      {/* Supabase Data */}
      <div className="glass-panel p-6">
        <h2 className="text-lg font-semibold mb-3">📦 Supabase Users</h2>
        {loading ? (
          <p className="text-text-secondary">Loading...</p>
        ) : users.length > 0 ? (
          <div className="space-y-1">
            {users.map((user) => (
              <div key={user.id} className="text-sm text-text-secondary">
                {user.email || user.wallet_address || 'Anonymous'}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">No users found. Create one in Supabase!</p>
        )}
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
  const [positions, setPositions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPositions() {
      try {
        const { data, error } = await supabase
          .from('trades')
          .select('*')
          .limit(10)
        
        if (error) throw error
        setPositions(data || [])
      } catch (err) {
        console.error('Error fetching trades:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPositions()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">💼 Portfolio</h1>
      <div className="glass-panel p-6">
        <h3 className="font-semibold mb-2">Trade History</h3>
        {loading ? (
          <p className="text-text-secondary">Loading...</p>
        ) : positions.length > 0 ? (
          <div className="space-y-2">
            {positions.map((trade) => (
              <div key={trade.id} className="flex justify-between text-sm border-b border-white/5 py-2">
                <span>{trade.asset || 'Unknown'}</span>
                <span className={trade.side === 'long' ? 'text-success' : 'text-danger'}>
                  {trade.side?.toUpperCase() || '-'}
                </span>
                <span className="font-mono">${trade.amount || 0}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">No trades yet</p>
        )}
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

      <main className="max-w-7xl mx-auto p-6">
        {pages[page] || <Home />}
      </main>
    </div>
  )
}

export default App
