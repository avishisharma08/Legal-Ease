import React, { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [simplifiedText, setSimplifiedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSimplify = async () => {
    if (!text.trim()) {
      setError('Please paste or type some legal text to simplify.')
      return
    }

    setLoading(true)
    setError('')
    setSimplifiedText('')

    try {
      const response = await fetch('http://localhost:8000/simplify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to simplify document.')
      }

      setSimplifiedText(data.simplified_text)
    } catch (err) {
      setError(err.message || 'An error occurred while communicating with the backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>LegalEase - Document Simplifier</h1>
      <p>Paste legal text below to simplify it into plain, easy-to-understand English.</p>

      <div>
        <label htmlFor="rawText"><strong>Legal Text:</strong></label>
        <br />
        <textarea
          id="rawText"
          rows={10}
          style={{ width: '100%', marginTop: '8px', padding: '8px' }}
          placeholder="Paste your legal text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '12px' }}>
        <button
          onClick={handleSimplify}
          disabled={loading}
          style={{ padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Simplifying...' : 'Simplify'}
        </button>
      </div>

      {error && (
        <div style={{ marginTop: '15px', color: 'red' }}>
          <strong>Error: </strong> {error}
        </div>
      )}

      {simplifiedText && (
        <div style={{ marginTop: '20px' }}>
          <h3>Simplified Version:</h3>
          <div
            style={{
              padding: '12px',
              border: '1px solid #ccc',
              backgroundColor: '#f9f9f9',
              whiteSpace: 'pre-wrap',
            }}
          >
            {simplifiedText}
          </div>
        </div>
      )}
    </div>
  )
}
