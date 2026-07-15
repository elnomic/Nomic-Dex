import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Menu, X, LayoutDashboard, TrendingUp, Wallet, Star } from 'lucide-react'

// === SUPABASE ===
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xxyskjoxfqsnhfyddmhg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eXNram94ZnFzbmhmeWRkbWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMDUxMjUsImV4cCI6MjA5OTY4MTEyNX0.fp_-LW5Ho1rA2ftzLC8j5ZEBZs8d5eZb78MgJnZP500
'
const supabase = createClient(supabaseUrl, supabaseKey)

// === PAGES ===
function Home() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-3xl font-bold text-primary">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="glass-panel p-4 sm:p-6">
          <p className="text-text-secondary text-xs sm:text-sm">Total Equity</p>
          <p className="text-lg sm:text-2xl font-bold">$100,000</p>
        </div>
        <div className="glass-panel p-4 sm:p-6">
          <p className="text-text-secondary text-xs sm:text-sm">24h P&L</p>
          <p className="text-lg sm:text-2xl font-bold text-success">+$2,500</p>
        </div>
        <div className="glass-panel p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <p className="text-text-secondary text-xs sm:text-sm">Available</p>
          <p className="text-lg sm:text-2xl font-bold">$80,000</p>
        </div>
      </div>

      <div className="glass-panel p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3">📦 Supabase Users</h2>
        {loading ? (
          <p className="text-text-secondary text-sm">Loading...</p>
        ) : users.length > 0 ? (
          <div className="space-y-1">
            {users.map((user) => (
              <div key={user.id} className="text-sm text-text-secondary">
                {user.email || user.wallet_address || 'Anonymous'}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary text-sm">No users found. Create one in Supabase!</p>
        )}
      </div>
    </div>
  )
}

function Trade() {
  return (
    <div>
      <h1 className="text-xl sm:text-3xl font-bold text-primary mb-4">📈 Trade</h1>
      <div className="glass-panel p-4 sm:p-6">
        <p className="text-text-secondary text-sm sm:text-base">Trading interface coming soon</p>
        <p className="text-xl sm:text-2xl font-mono mt-4">BTC/USDC: $67,234.50</p>
        <p className="text-success text-sm sm:text-base">+2.34%</p>
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
      <h1 className="text-xl sm:text-3xl font-bold text-primary mb-4">💼 Portfolio</h1>
      <div className="glass-panel p-4 sm:p-6">
        <h3 className="font-semibold text-sm sm:text-base mb-2">Trade History</h3>
        {loading ? (
          <p className="text-text-secondary text-sm">Loading...</p>
        ) : positions.length > 0 ? (
          <div className="space-y-2">
            {positions.map((trade) => (
              <div key={trade.id} className="flex justify-between text-xs sm:text-sm border-b border-white/5 py-2">
                <span>{trade.asset || 'Unknown'}</span>
                <span className={trade.side === 'long' ? 'text-success' : 'text-danger'}>
                  {trade.side?.toUpperCase() || '-'}
                </span>
                <span className="font-mono">${trade.amount || 0}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary text-sm">No trades yet</p>
        )}
      </div>
    </div>
  )
}

function Points() {
  return (
    <div>
      <h1 className="text-xl sm:text-3xl font-bold text-primary mb-4">⭐ Points</h1>
      <div className="glass-panel p-4 sm:p-6">
        <p className="text-text-secondary text-sm sm:text-base">Points & rewards coming soon</p>
      </div>
    </div>
  )
}

// === MAIN APP ===
function App() {
  const [page, setPage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trade', label: 'Trade', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'points', label: 'Points', icon: Star },
  ]

  const navigate = (pageId: string) => {
    setPage(pageId)
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* === NAVBAR === */}
      <nav className="bg-surface border-b border-white/10 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer">
            <span className="text-xl font-bold text-primary">Nomic</span>
            <span className="text-[10px] text-text-secondary bg-primary/10 px-2 py-0.5 rounded">Beta</span>
          </div>

          {/* Desktop Menu - hidden di mobile */}
          <div className="hidden md:flex gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`px-4 py-1.5 rounded-lg text-sm transition ${
                  page === item.id
                    ? 'bg-primary/20 text-primary border border-primary/20'
                    : 'text-text-secondary hover:text-white hover:bg-surface-elevated'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button className="hidden md:inline-block btn-primary text-sm py-1.5 px-4">
              Connect Wallet
            </button>
            
            {/* Mobile Hamburger - hanya di mobile */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-text-primary p-1 hover:bg-surface-elevated rounded-lg transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* === MOBILE MENU (Slide Down) === */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10">
            {/* Menu Items */}
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                      page === item.id
                        ? 'bg-primary/20 text-primary border border-primary/20'
                        : 'text-text-secondary hover:text-white hover:bg-surface-elevated'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )
              })}
            </div>
            
            {/* Connect Wallet Button di Mobile */}
            <button className="w-full mt-3 btn-primary text-sm py-3">
              🔗 Connect Wallet
            </button>
          </div>
        )}
      </nav>

      {/* === CONTENT === */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {page === 'home' && <Home />}
        {page === 'trade' && <Trade />}
        {page === 'portfolio' && <Portfolio />}
        {page === 'points' && <Points />}
      </main>
    </div>
  )
}

export default App
