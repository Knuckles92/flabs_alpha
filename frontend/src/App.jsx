import { useState, useEffect } from 'react'

// Use VITE_API_URL when API is on different origin; otherwise /api (same origin)
const API_BASE = import.meta.env.VITE_API_URL || ''

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')

  const fetchItems = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/items`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setItems(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const createItem = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    try {
      const res = await fetch(`${API_BASE}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim(), description: newDesc.trim() }),
      })
      if (!res.ok) throw new Error('Failed to create')
      setNewName('')
      setNewDesc('')
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>Flabs</h1>
      <p style={{ color: '#94a3b8', marginBottom: 24 }}>
        React + FastAPI + SQLite — VPS test
      </p>

      <form onSubmit={createItem} style={{ marginBottom: 32 }}>
        <input
          type="text"
          placeholder="Item name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            padding: 10,
            marginRight: 8,
            marginBottom: 8,
            borderRadius: 6,
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#e2e8f0',
            width: '100%',
          }}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          style={{
            padding: 10,
            marginRight: 8,
            marginBottom: 8,
            borderRadius: 6,
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#e2e8f0',
            width: '100%',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: 6,
            border: 'none',
            background: '#3b82f6',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Add Item
        </button>
      </form>

      {error && (
        <p style={{ color: '#f87171', marginBottom: 16 }}>
          Error: {error}
        </p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                padding: 16,
                marginBottom: 8,
                background: '#1e293b',
                borderRadius: 8,
                border: '1px solid #334155',
              }}
            >
              <strong>{item.name}</strong>
              {item.description && (
                <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: 14 }}>
                  {item.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
