import React, { useState, useEffect } from 'react'; // FIXED: Added useEffect import
import { 
  Briefcase, MapPin, Clock, Sparkles, 
  PlusCircle, Send, BarChart2, Search,
  AlertCircle, Loader2 
} from 'lucide-react';

const API_KEY = ""; 

const App = () => {
  // We define our state as 'postings'
  const [postings, setPostings] = useState([]);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [form, setForm] = useState({
    title: '', company: '', location: '', type: 'Full-time', description: ''
  });

  // --- 1. INITIAL LOAD: Fetch from Java ---
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jobs");
        if (response.ok) {
          const data = await response.json();
          setPostings(data); // FIXED: Changed setJobList to setPostings
        }
      } catch (error) {
        console.error("Connection to Java failed. Is Eclipse running?");
      }
    };
    fetchJobs();  
  }, []);

  // --- 2. CREATE: Send to Java ---
  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        const savedJob = await response.json();
        // FIXED: Changed setJobList and jobList to postings
        setPostings([savedJob, ...postings]); 
        setForm({ title: '', company: '', location: '', type: 'Full-time', description: '' });
      }
    } catch (error) {
      console.error("Server unreachable:", error);
    }
  };




  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  
  const optimizeRoleDescription = async () => {
    if (form.description.length < 10) return;
    setIsOptimizing(true);
    const polished = await requestAiSupport(
      `Professionalize this job description: ${form.description}`,
      "You are a recruitment specialist. Use bullet points."
    );
    if (polished) setForm(prev => ({ ...prev, description: polished.trim() }));
    setIsOptimizing(false);
  };



  return (
    <div className="app-wrapper">
      <div className="app-container">
        <nav className="navbar">
          <div className="brand">
            <div style={{ background: '#2563eb', padding: '6px', borderRadius: '8px' }}>
              <Briefcase size={20} color="white" />
            </div>
            TalentLink
          </div>
          <div className="search-wrapper">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Filter vacancies..." className="search-input" />
          </div>
        </nav>

        <main className="main-grid">
          <aside>
            <div className="sidebar-card">
              <h3>Create Vacancy</h3>
              <form onSubmit={handlePostJob}>
                <div className="form-group">
                  <label className="form-label">Position Title</label>
                  <input required name="title" value={form.title} onChange={handleInput} className="input-field" placeholder="e.g. UX Designer" />
                </div>

                <div className="grid-2">
                  <input required name="company" placeholder="Company" value={form.company} onChange={handleInput} className="input-field" />
                  <input required name="location" placeholder="Location" value={form.location} onChange={handleInput} className="input-field" />
                </div>

                <div className="form-group">
                  <label className="form-label">Engagement</label>
                  <select name="type" value={form.type} onChange={handleInput} className="input-field">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label className="form-label">Description</label>
                    <button type="button" onClick={optimizeRoleDescription} disabled={isOptimizing || !API_KEY} className="ai-btn">
                    
                    </button>
                  </div>
                  <textarea required name="description" value={form.description} onChange={handleInput} rows="5" className="input-field" style={{ resize: 'none' }} />
                </div>

                <button type="submit" className="btn-post">
                  <Send size={16} /> Publish Role
                </button>
              </form>
            </div>
          </aside>

          <section>
            <div className="header-row">
              <h2>Active Opportunities</h2>
              <span>{postings.length} results</span>
            </div>

            {postings.length === 0 ? (
              <div className="empty-state">
                <p>No listings found. Ensure your Java backend is running.</p>
              </div>
            ) : (
              postings.map(job => (
                <div key={job.id} className="job-card">
                  <div className="card-header">
                    <div>
                      <div className="company-tag">{job.company}</div>
                      <h3 className="job-title">{job.title}</h3>
                      <div className="meta"><MapPin size={14} /> {job.location}</div>
                      <div className="meta"><Clock size={14} /> {job.type}</div>
                    </div>
                    <button 
                      onClick={() => getMarketInsights(job.id, job.title, job.location)}
                      disabled={analyzingId === job.id || job.analysis || !API_KEY}
                      className="insight-btn"
                    >
                      {analyzingId === job.id ? '...' : job.analysis ? 'LOADED' : 'INSIGHT'}
                    </button>
                  </div>
                  <div className="description-text">{job.description}</div>
                  {job.analysis && (
                    <div className="insight-box">
                      {job.analysis}
                    </div>
                  )}
                </div>
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;