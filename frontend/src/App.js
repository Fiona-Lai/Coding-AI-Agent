// frontend/src/App.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState('// Enter your code here');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoverLine, setHoverLine] = useState(null);
  const codeRefs = useRef({});

  const handleExplain = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('http://localhost:4000/api/explain', { code, language });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const explanations = Array.isArray(result?.explanations) ? result.explanations : [];
  const errors = Array.isArray(result?.errors) ? result.errors : [];
  const raw = result?.raw;

  return (
    <div className="container">
      {/* Left: textarea + rendered view */}
      <div className="pane left">
        <div className="toolbar">
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="C">C</option>
            <option value="Cpp">C++</option>
            <option value="Csharp">C#</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Javascript">JavaScript</option>
            <option value="PHP">PHP</option>
            <option value="Ruby">Ruby</option>
            <option value="Go">Go</option>
            <option value="R">R</option>
          </select>
          <button onClick={handleExplain} disabled={loading}>
            {loading ? 'Analyzing…' : 'Explain Code'}
          </button>
        </div>

        {/* Editable textarea */}
        <textarea
          className="code-input"
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        {/* Interactive preview */}
        <div className="code-view">
          {code.split('\n').map((line, index) => (
            <div
              key={index}
              ref={el => (codeRefs.current[index + 1] = el)}
              className={`code-line ${hoverLine === index + 1 ? 'highlight' : ''}`}
              onMouseEnter={() => setHoverLine(index + 1)}
              onMouseLeave={() => setHoverLine(null)}
            >
              <span className="line-number">{index + 1}</span>
              <span className="code-content">{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Results */}
      <div className="pane right">
        {loading && <div className="placeholder">Analyzing, please wait…</div>}

        {!loading && result?.error && (
          <pre className="error">Error: {result.error}</pre>
        )}

        {!loading && raw && (
          <>
            <h3>Raw Response:</h3>
            <pre className="raw">{raw}</pre>
          </>
        )}

        {!loading && !result?.error && !raw && result && (
          <>
            <h3>Line-by-Line Explanation:</h3>
            <pre className="explanations">
              {explanations.map(item => (
                <div
                  key={item.line}
                  className={`explanation-line ${hoverLine === item.line ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoverLine(item.line)}
                  onMouseLeave={() => setHoverLine(null)}
                  onClick={() => {
                    const target = codeRefs.current[item.line];
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      target.classList.add('scroll-target');
                      setTimeout(() => target.classList.remove('scroll-target'), 1000);
                    }
                  }}
                >
                  <strong>{item.line}:</strong> {item.content}
                </div>
              ))}
            </pre>

            {errors.length > 0 && (
              <>
                <h3>Detected Issues:</h3>
                <pre className="errors">
                  {errors.map(err => (
                    <div key={err.line}>
                      Line {err.line}: {err.issue}
                    </div>
                  ))}
                </pre>
              </>
            )}
          </>
        )}

        {!loading && !result && (
          <div className="placeholder">Click “Explain Code” to see results</div>
        )}
      </div>
    </div>
  );
}

export default App;