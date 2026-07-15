import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Menu, X, LayoutDashboard, TrendingUp, Wallet, Star } from 'lucide-react'

// === SUPABASE ===
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
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
function Trade() {
  const [selectedPair, setSelectedPair] = useState('BTC')
  const [leverage, setLeverage] = useState(10)
  const [amount, setAmount] = useState('')
  const [side, setSide] = useState<'long' | 'short' | null>(null)
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')

  const pairs = [
    { symbol: 'BTC', price: '67,234.50', change: '+2.34%', color: '#F7931A' },
    { symbol: 'ETH', price: '3,456.78', change: '+1.87%', color: '#627EEA' },
  ]

  const selected = pairs.find(p => p.symbol === selectedPair)

  // Order Book Data
  const asks = [
    { price: '67,250', size: '0.45', total: '0.45' },
    { price: '67,245', size: '1.20', total: '1.65' },
    { price: '67,240', size: '0.80', total: '2.45' },
    { price: '67,235', size: '2.10', total: '4.55' },
    { price: '67,230', size: '1.50', total: '6.05' },
  ]

  const bids = [
    { price: '67,225', size: '1.20', total: '1.20' },
    { price: '67,220', size: '0.80', total: '2.00' },
    { price: '67,215', size: '2.50', total: '4.50' },
    { price: '67,210', size: '1.00', total: '5.50' },
    { price: '67,205', size: '1.80', total: '7.30' },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">📈 Trade</h1>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {pairs.map((pair) => (
            <button
              key={pair.symbol}
              onClick={() => setSelectedPair(pair.symbol)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedPair === pair.symbol
                  ? 'bg-primary/20 border border-primary text-text-primary'
                  : 'bg-surface border border-transparent text-text-secondary hover:bg-surface-elevated'
              }`}
            >
              <span className="font-bold">{pair.symbol}</span>
              <span className="text-xs text-text-secondary ml-1">/USDC</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Bar */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-2xl font-mono font-bold">${selected?.price}</p>
            <p className={`text-sm ${selected?.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
              {selected?.change} (24h)
            </p>
          </div>
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          <div className="hidden sm:block">
            <p className="text-xs text-text-secondary">24h High</p>
            <p className="text-sm font-mono">$68,450.00</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-text-secondary">24h Low</p>
            <p className="text-sm font-mono">$66,100.00</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-text-secondary">Volume</p>
            <p className="text-sm font-mono">$2.4B</p>
          </div>
        </div>
        <div className="flex gap-1">
          {['1m', '5m', '15m', '1h', '4h', '1d'].map((interval) => (
            <button key={interval} className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded bg-surface-elevated/50">
              {interval}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chart - 2 kolom */}
        <div className="lg:col-span-2 glass-panel p-4 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl mb-3">📊</p>
            <p className="text-text-secondary">Price Chart</p>
            <p className="text-xs text-text-secondary mt-1">TradingView integration coming soon</p>
          </div>
        </div>

        {/* Order Form - 1 kolom */}
        <div className="lg:col-span-1 glass-panel p-4 space-y-4">
          <div className="text-center border-b border-white/5 pb-3">
            <p className="text-2xl font-mono font-bold">${selected?.price}</p>
            <p className={`text-sm ${selected?.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
              {selected?.change}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Leverage</span>
              <span className="font-bold text-primary">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full h-1 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-text-secondary">
              <span>1x</span>
              <span>10x</span>
              <span>25x</span>
              <span>50x</span>
            </div>
          </div>

          <div className="flex gap-1 bg-surface rounded-lg p-1">
            {['market', 'limit'].map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type as any)}
                className={`flex-1 py-1.5 text-sm rounded-md capitalize transition-all ${
                  orderType === type
                    ? 'bg-surface-elevated text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div>
            <label className="text-sm text-text-secondary">Amount (USDC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="input-primary w-full mt-1"
            />
            <div className="flex gap-1 mt-1">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setAmount((1000 * pct / 100).toString())}
                  className="flex-1 py-1 text-xs bg-surface-elevated hover:bg-surface-elevated/80 rounded transition-all"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSide('long')}
              className={`py-2.5 rounded-lg font-semibold transition-all ${
                side === 'long'
                  ? 'bg-success text-white'
                  : 'bg-success/10 text-success hover:bg-success/20'
              }`}
            >
              ↑ Long
            </button>
            <button
              onClick={() => setSide('short')}
              className={`py-2.5 rounded-lg font-semibold transition-all ${
                side === 'short'
                  ? 'bg-danger text-white'
                  : 'bg-danger/10 text-danger hover:bg-danger/20'
              }`}
            >
              ↓ Short
            </button>
          </div>

          <button
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              side === 'long'
                ? 'bg-success hover:bg-success/80 text-white'
                : side === 'short'
                ? 'bg-danger hover:bg-danger/80 text-white'
                : 'bg-surface-elevated text-text-secondary cursor-not-allowed'
            }`}
            disabled={!side || !amount}
          >
            {side ? `${side.toUpperCase()} ${selectedPair}/USDC` : 'Select Direction'}
          </button>
        </div>

        {/* Order Book - 1 kolom */}
        <div className="lg:col-span-1 glass-panel p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold">Order Book</span>
            <span className="text-xs text-text-secondary">Depth</span>
          </div>

          <div className="grid grid-cols-3 text-xs text-text-secondary border-b border-white/5 pb-2 mb-2">
            <span>Price</span>
            <span className="text-center">Size</span>
            <span className="text-right">Total</span>
          </div>

          {/* Asks */}
          <div className="space-y-0.5">
            {asks.map((item, i) => (
              <div key={i} className="grid grid-cols-3 text-xs text-danger/80 hover:bg-surface-elevated/50 rounded px-2 py-0.5">
                <span className="font-mono">{item.price}</span>
                <span className="text-center font-mono">{item.size}</span>
                <span className="text-right font-mono text-text-secondary">{item.total}</span>
              </div>
            ))}
          </div>

          {/* Current Price */}
          <div className="py-2 text-center border-y border-white/5 my-1">
            <span className="text-lg font-mono font-bold text-success">$67,234.50</span>
          </div>

          {/* Bids */}
          <div className="space-y-0.5">
            {bids.map((item, i) => (
              <div key={i} className="grid grid-cols-3 text-xs text-success/80 hover:bg-surface-elevated/50 rounded px-2 py-0.5">
                <span className="font-mono">{item.price}</span>
                <span className="text-center font-mono">{item.size}</span>
                <span className="text-right font-mono text-text-secondary">{item.total}</span>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-text-secondary pt-2 border-t border-white/5 mt-2">
            Spread: 0.05%
          </div>
        </div>
      </div>

      {/* Bottom: Positions */}
      <div className="glass-panel p-4">
        <div className="flex gap-4 border-b border-white/5 pb-3 mb-3">
          {['Open Positions', 'Order History', 'Trade History'].map((tab) => (
            <button key={tab} className="text-sm text-text-secondary hover:text-text-primary transition">
              {tab}
            </button>
          ))}
        </div>
        <div className="text-center py-6 text-text-secondary">
          <p className="text-sm">No open positions</p>
          <p className="text-xs mt-1">Open a position using the form above</p>
        </div>
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

          {/* Desktop Menu */}
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
            
            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-text-primary p-1 hover:bg-surface-elevated rounded-lg transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* === MOBILE MENU === */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10">
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
