import React, { useState, useEffect, useContext, createContext } from 'react';
// We still use lucide-react for icons, as it's a simple install
import { User, Clipboard, Coffee, Calendar, TrendingUp, Shield, ArrowLeft, RefreshCw, Info } from 'lucide-react';

// --- (A) CSS STYLES ---
// All styles are in this component. No need for external .css files or Tailwind.
const AppStyles = () => (
  <style>{`
    :root {
      --color-primary-green: #28a745;
      --color-primary-green-dark: #218838;
      --color-primary-green-light: #e6f7eb;
      --color-blue: #007bff;
      --color-blue-dark: #0069d9;
      --color-blue-light: #e6f2ff;
      --color-red: #dc3545;
      --color-red-light: #fde8e8;
      --color-yellow: #ffc107;
      --color-yellow-dark: #e0a800;
      --color-text-dark: #343a40;
      --color-text-light: #6c757d;
      --color-bg-light: #f8f9fa;
      --color-border: #dee2e6;
      --color-card-bg: #ffffff;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      --border-radius: 8px;
    }

    /* Base */
    body, html, #root {
      height: 100%;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--color-bg-light);
      color: var(--color-text-dark);
      -webkit-font-smoothing: antialiased;
    }

    /* Layout */
    .app-container {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
    }

    /* Sidebar */
    .sidebar {
      width: 250px;
      background: var(--color-card-bg);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      overflow-y: auto;
      flex-shrink: 0;
      padding: 1rem 0;
    }
    .sidebar-header {
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .sidebar-header span:first-child { font-size: 1.75rem; }
    .sidebar-header span:last-child {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary-green-dark);
    }
    .sidebar-nav {
      padding: 0.5rem 1rem;
    }
    .nav-link {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 0.25rem;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 0.95rem;
      color: var(--color-text-light);
      gap: 0.75rem;
      text-align: left;
    }
    .nav-link:hover {
      background: var(--color-bg-light);
      color: var(--color-text-dark);
    }
    .nav-link.active {
      background: var(--color-primary-green-light);
      color: var(--color-primary-green-dark);
      font-weight: 600;
    }
    .nav-link svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    /* Header */
    .welcome-header h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text-dark);
      margin: 0;
    }
    .welcome-header p {
      font-size: 1rem;
      color: var(--color-text-light);
      margin-top: 0.25rem;
    }

    /* Page Card */
    .page-card {
      background: var(--color-card-bg);
      padding: 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      margin-top: 1.5rem;
    }
    .page-card-header {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-primary-green-dark);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--color-border);
    }

    /* Forms */
    .form-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .form-grid { grid-template-columns: repeat(2, 1fr); }
      .form-grid .col-span-2 { grid-column: span 2 / span 2; }
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--color-text-dark);
    }
    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 0.6rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      font-size: 1rem;
      box-sizing: border-box; /* Important */
    }
    .form-textarea {
      min-height: 80px;
      font-family: inherit;
    }
    .form-footer {
      margin-top: 1.5rem;
      text-align: right;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-primary {
      background-color: var(--color-primary-green);
      color: white;
    }
    .btn-primary:hover {
      background-color: var(--color-primary-green-dark);
    }
    .btn-secondary {
      background-color: var(--color-text-light);
      color: white;
    }
    .btn-secondary:hover {
      background-color: var(--color-text-dark);
    }
    .btn-warning {
      background-color: var(--color-yellow);
      color: #333;
    }
    .btn-warning:hover {
      background-color: var(--color-yellow-dark);
    }
    .btn-info {
      background-color: var(--color-blue);
      color: white;
    }
    .btn-info:hover {
      background-color: var(--color-blue-dark);
    }
    .btn-outline {
      background-color: transparent;
      color: var(--color-text-light);
      border: 1px solid var(--color-border);
    }
    .btn-outline:hover {
      background-color: var(--color-bg-light);
      color: var(--color-text-dark);
    }
    .btn-link {
      color: var(--color-blue);
      background: none;
      padding: 0;
      font-weight: 500;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Analysis Page */
    .analysis-result-box {
      padding: 1.5rem;
      border-radius: var(--border-radius);
      background: var(--color-primary-green-light);
      border: 1px solid var(--color-primary-green);
      color: var(--color-primary-green-dark);
    }
    .analysis-result-box h3 { font-size: 1.25rem; font-weight: 600; }
    .analysis-result-box strong { font-size: 1.75rem; font-weight: 700; }
    .analysis-result-box button { margin-top: 1rem; }
    
    .question-block { margin-bottom: 1.5rem; }
    .question-options { margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .question-options label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 400;
    }
    .progress-bar-container {
      width: 100%;
      background-color: var(--color-bg-light);
      border-radius: 99px;
      height: 10px;
    }
    .progress-bar-inner {
      height: 10px;
      background-color: var(--color-primary-green);
      border-radius: 99px;
      transition: width 0.3s ease;
    }
    .progress-text {
      text-align: center;
      font-size: 0.9rem;
      color: var(--color-text-light);
      margin-top: 0.5rem;
    }
    .analysis-nav {
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
    }

    /* Diet/Schedule Placeholder */
    .placeholder-box {
      text-align: center;
      padding: 2.5rem;
      background: var(--color-bg-light);
      border-radius: var(--border-radius);
    }
    .placeholder-box svg {
      width: 48px;
      height: 48px;
      color: var(--color-text-light);
      margin: 0 auto;
    }
    .placeholder-box h3 {
      font-size: 1.25rem;
      font-weight: 500;
      margin-top: 1rem;
    }
    .placeholder-box p {
      color: var(--color-text-light);
      margin-top: 0.5rem;
    }
    .placeholder-box button { margin-top: 1.5rem; }

    /* Diet/Schedule Content */
    .diet-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 768px) { .diet-grid { grid-template-columns: 1fr 1fr; } }
    
    .diet-box {
      padding: 1.25rem;
      border-radius: var(--border-radius);
    }
    .diet-box h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }
    .diet-box ul {
      list-style-position: inside;
      padding-left: 0.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .favor-box {
      background: var(--color-primary-green-light);
      border: 1px solid var(--color-primary-green);
    }
    .favor-box h4 { color: var(--color-primary-green-dark); }
    .avoid-box {
      background: var(--color-red-light);
      border: 1px solid var(--color-red);
    }
    .avoid-box h4 { color: var(--color-red); }

    .schedule-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    /* Follow-up List */
    .follow-up-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 400px;
      overflow-y: auto;
      padding-right: 0.5rem;
    }
    .follow-up-entry {
      background: var(--color-bg-light);
      padding: 1rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--color-border);
    }
    .follow-up-entry-date {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text-dark);
    }
    .follow-up-entry-note {
      margin-top: 0.5rem;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .no-entries {
      text-align: center;
      padding: 1.5rem;
      color: var(--color-text-light);
    }

    /* Admin Panel */
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .admin-table-container {
      overflow-x: auto;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
    }
    .admin-table {
      width: 100%;
      min-width: 600px;
      border-collapse: collapse;
      font-size: 0.95rem;
    }
    .admin-table thead {
      background-color: var(--color-bg-light);
    }
    .admin-table th, .admin-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--color-border);
      text-align: left;
      vertical-align: top;
    }
    .admin-table th { font-weight: 600; }
    .admin-table tr:last-child td { border-bottom: none; }
    
    .prakriti-badge {
      display: inline-block;
      padding: 0.25rem 0.6rem;
      border-radius: 99px;
      font-size: 0.8rem;
      font-weight: 500;
      background-color: var(--color-blue-light);
      color: var(--color-blue-dark);
    }
    
    /* Admin Detail */
    .detail-section { margin-bottom: 2rem; }
    .detail-section-header {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--color-border);
    }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem 1.5rem;
    }
    @media (min-width: 768px) { .detail-grid { grid-template-columns: 1fr 1fr; } }
    .detail-grid strong {
      font-weight: 500;
      color: var(--color-text-dark);
    }
    .detail-grid span, .detail-grid pre {
      color: var(--color-text-light);
    }
    .detail-grid pre {
      background: var(--color-bg-light);
      padding: 0.5rem;
      border-radius: 6px;
      font-family: inherit;
      white-space: pre-wrap;
      word-break: break-word;
      margin-top: 0.25rem;
    }
    .detail-scores-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      text-align: center;
      margin-top: 1rem;
    }
    .score-box {
      padding: 1rem;
      border-radius: var(--border-radius);
    }
    .score-box span:first-child {
      display: block;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .score-box span:last-child {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .score-box.vata { background: var(--color-blue-light); color: var(--color-blue-dark); }
    .score-box.pitta { background: var(--color-red-light); color: var(--color-red); }
    .score-box.kapha { background: #f1f3f5; color: var(--color-text-dark); }
    .detail-followups {
      max-height: 300px;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-primary-green-dark);
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 6px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
      opacity: 0;
      transform: translateY(20px);
      z-index: 1000;
    }
    .toast.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>
);


// --- (B) GLOBAL STATE (CONTEXT) ---
// This part is unchanged and holds all application data

const AppDataContext = createContext();

const AppProvider = ({ children }) => {
    const appDataKey = 'ayurBalanceData';
    const allUsersDataKey = 'ayurBalanceAllUsers';

    const [appData, setAppData] = useState(() => {
        try {
            const storedData = localStorage.getItem(appDataKey);
            if (storedData) return JSON.parse(storedData);
        } catch (error) { console.error("Error parsing appData", error); }
        return {
            userId: crypto.randomUUID(),
            profile: { name: '', age: '', gender: 'Prefer not to say', weight: '', height: '', health_goals: '', medical_conditions: '' },
            analysis: { scores: { vata: 0, pitta: 0, kapha: 0 }, result: null },
            followUps: []
        };
    });

    const [allUsersData, setAllUsersData] = useState(() => {
        try {
            const storedUsers = localStorage.getItem(allUsersDataKey);
            return storedUsers ? JSON.parse(storedUsers) : [];
        } catch (error) { console.error("Error parsing allUsersData", error); return []; }
    });
    
    const [toast, setToast] = useState({ message: '', visible: false });

    useEffect(() => {
        localStorage.setItem(appDataKey, JSON.stringify(appData));
        setAllUsersData(prevAllUsers => {
            const userIndex = prevAllUsers.findIndex(user => user.userId === appData.userId);
            let newAllUsers = [...prevAllUsers];
            if (userIndex > -1) newAllUsers[userIndex] = appData;
            else newAllUsers.push(appData);
            localStorage.setItem(allUsersDataKey, JSON.stringify(newAllUsers));
            return newAllUsers;
        });
    }, [appData]);

    const showToast = (message) => {
        setToast({ message, visible: true });
        setTimeout(() => {
            setToast({ message: '', visible: false });
        }, 3000);
    };

    const saveProfile = (profileData) => {
        setAppData(prevData => ({ ...prevData, profile: profileData }));
        showToast('Profile saved successfully!');
    };

    const saveAnalysis = (analysisData) => {
        setAppData(prevData => ({ ...prevData, analysis: analysisData }));
        showToast('Analysis complete! View your new diet plan.');
    };
    
    const retakeAnalysis = () => {
        setAppData(prevData => ({
            ...prevData,
            analysis: { scores: { vata: 0, pitta: 0, kapha: 0 }, result: null }
        }));
        showToast('Analysis reset. You can take the quiz again.');
    };

    const addFollowUp = (note) => {
        if (!note.trim()) {
            showToast('Note cannot be empty.');
            return;
        }
        const newEntry = { date: new Date().toISOString(), note: note };
        setAppData(prevData => ({
            ...prevData,
            followUps: [newEntry, ...prevData.followUps]
        }));
    };
    
    const refreshAdminData = () => {
        try {
            const storedUsers = localStorage.getItem(allUsersDataKey);
            setAllUsersData(storedUsers ? JSON.parse(storedUsers) : []);
            showToast('Admin data refreshed.');
        } catch (error) {
            showToast('Error refreshing admin data.');
        }
    };

    return (
        <AppDataContext.Provider value={{ 
            appData, 
            allUsersData, 
            saveProfile, 
            saveAnalysis, 
            retakeAnalysis, 
            addFollowUp, 
            showToast, 
            refreshAdminData 
        }}>
            {children}
            <Toast message={toast.message} visible={toast.visible} />
        </AppDataContext.Provider>
    );
};

// --- (C) SHARED COMPONENTS ---

const Toast = ({ message, visible }) => {
    return (
        <div className={`toast ${visible ? 'visible' : ''}`}>
            {message}
        </div>
    );
};

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const navLinks = [
        { id: 'profile', label: 'User Profile', icon: User },
        { id: 'analysis', label: 'Prakriti Analysis', icon: Clipboard },
        { id: 'diet', label: 'Diet Chart', icon: Coffee },
        { id: 'schedule', label: 'Daily Schedule', icon: Calendar },
        { id: 'followUp', label: 'Follow-ups', icon: TrendingUp },
        { id: 'admin', label: 'Admin Panel', icon: Shield },
    ];
    
    const isAdminActive = currentPage === 'admin' || currentPage === 'admin-detail';

    return (
        <nav className="sidebar">
            <div className="sidebar-header" onClick={() => setCurrentPage('profile')}>
                <span>🌿</span>
                <span>AyurBalance</span>
            </div>
            <div className="sidebar-nav">
                <ul>
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = link.id === 'admin' ? isAdminActive : currentPage === link.id;
                        return (
                            <li key={link.id}>
                                <button
                                    onClick={() => setCurrentPage(link.id)}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                >
                                    <Icon />
                                    {link.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

const Header = () => {
    const { appData } = useContext(AppDataContext);
    return (
        <div className="welcome-header">
            <h1>Welcome, {appData.profile.name || 'User'}!</h1>
            <p>Manage your health and wellness journey.</p>
        </div>
    );
};

// --- (D) PAGE COMPONENTS ---

const PageProfile = () => {
    const { appData, saveProfile } = useContext(AppDataContext);
    const [profileData, setProfileData] = useState(appData.profile);

    useEffect(() => {
        setProfileData(appData.profile);
    }, [appData.profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveProfile(profileData);
    };

    return (
        <div className="page-card">
            <h2 className="page-card-header">Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={profileData.name} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" value={profileData.age} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value={profileData.gender} onChange={handleChange} className="form-select">
                            <option>Prefer not to say</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight (kg)</label>
                        <input type="number" id="weight" name="weight" value={profileData.weight} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="height">Height (cm)</label>
                        <input type="number" id="height" name="height" value={profileData.height} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group col-span-2">
                        <label htmlFor="health_goals">Health Goals (e.g., weight loss, stress reduction)</label>
                        <textarea id="health_goals" name="health_goals" rows="3" value={profileData.health_goals} onChange={handleChange} className="form-textarea"></textarea>
                    </div>
                    <div className="form-group col-span-2">
                        <label htmlFor="medical_conditions">Existing Medical Conditions</label>
                        <textarea id="medical_conditions" name="medical_conditions" rows="3" value={profileData.medical_conditions} onChange={handleChange} className="form-textarea"></textarea>
                    </div>
                </div>
                <div className="form-footer">
                    <button type="submit" className="btn btn-primary">
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

const PageAnalysis = ({ setCurrentPage }) => {
    const { appData, saveAnalysis, retakeAnalysis } = useContext(AppDataContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState({});

    const questions = [
        { id: 'q1', step: 1, text: 'Body Frame', options: [
            { value: 'vata', text: 'Thin, light, either very tall or very short' },
            { value: 'pitta', text: 'Medium build, muscular' },
            { value: 'kapha', text: 'Broad, heavy, strong build' },
        ]},
        { id: 'q2', step: 1, text: 'Skin', options: [
            { value: 'vata', text: 'Dry, thin, tans easily' },
            { value: 'pitta', text: 'Oily, sensitive, prone to acne/rashes, burns easily' },
            { value: 'kapha', text: 'Thick, oily, cool, smooth' },
        ]},
        { id: 'q3', step: 1, text: 'Hair', options: [
            { value: 'vata', text: 'Dry, thin, frizzy, dark' },
            { value: 'pitta', text: 'Oily, fine, straight, prone to early graying/balding' },
            { value: 'kapha', text: 'Thick, wavy, oily, lustrous' },
        ]},
        { id: 'q4', step: 2, text: 'Mind', options: [
            { value: 'vata', text: 'Active, restless, creative, quick to learn but also quick to forget' },
            { value: 'pitta', text: 'Intelligent, sharp, focused, goal-oriented' },
            { value: 'kapha', text: 'Calm, steady, good long-term memory, slow to learn but retains well' },
        ]},
        { id: 'q5', step: 2, text: 'Temperament (under stress)', options: [
            { value: 'vata', text: 'Anxious, worried, fearful' },
            { value: 'pitta', text: 'Irritable, angry, critical' },
            { value: 'kapha', text: 'Calm, withdrawn, slow to react' },
        ]},
        { id: 'q6', step: 3, text: 'Appetite', options: [
            { value: 'vata', text: 'Variable, irregular, tendency to skip meals' },
            { value: 'pitta', text: 'Strong, sharp, gets \'hangry\' if meals are missed' },
            { value: 'kapha', text: 'Steady, consistent, can skip meals easily' },
        ]},
        { id: 'q7', step: 3, text: 'Sleep Pattern', options: [
            { value: 'vata', text: 'Light, interrupted, prone to insomnia' },
            { value: 'pitta', text: 'Moderate, sound, may wake up feeling hot' },
            { value: 'kapha', text: 'Deep, long, heavy, hard to wake up' },
        ]},
    ];
    
    const totalSteps = 3;

    const handleAnswer = (qId, value) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const scores = { vata: 0, pitta: 0, kapha: 0 };
        Object.values(answers).forEach(value => {
            if (value in scores) scores[value]++;
        });

        const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
        const dominantDoshas = Object.keys(scores).filter(key => scores[key] === maxScore);
        const result = dominantDoshas.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(' / ');
        
        saveAnalysis({ scores, result });
        setCurrentPage('diet');
    };

    if (appData.analysis.result) {
        return (
            <div className="page-card">
                <div className="analysis-result-box">
                    <h3>Your Analysis is Complete!</h3>
                    <p>Your dominant Prakriti (Dosha) is: <strong>{appData.analysis.result}</strong></p>
                    <p>Your diet chart and daily schedule have been personalized.</p>
                    <button onClick={() => retakeAnalysis()} className="btn btn-warning">
                        Retake Analysis
                    </button>
                </div>
            </div>
        );
    }
    
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="page-card">
            <h2 className="page-card-header">Prakriti Analysis Questionnaire</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3 className="page-card-header" style={{border: 'none', padding: 0, marginBottom: '1rem'}}>
                        Part {currentStep}: {currentStep === 1 ? 'Physical Characteristics' : currentStep === 2 ? 'Mental & Emotional Traits' : 'Habits & Digestion'}
                    </h3>
                    {questions.filter(q => q.step === currentStep).map(q => (
                        <div key={q.id} className="question-block">
                            <label className="form-group">{q.text}</label>
                            <div className="question-options">
                                {q.options.map(opt => (
                                    <label key={opt.value}>
                                        <input 
                                            type="radio" 
                                            name={q.id} 
                                            value={opt.value} 
                                            checked={answers[q.id] === opt.value}
                                            onChange={() => handleAnswer(q.id, opt.value)}
                                            required
                                        />
                                        <span>{opt.text}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar-inner" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p className="progress-text">Step {currentStep} of {totalSteps}</p>

                <div className="analysis-nav">
                    <button 
                        type="button" 
                        onClick={() => setCurrentStep(s => s - 1)}
                        disabled={currentStep === 1}
                        className="btn btn-outline"
                    >
                        Previous
                    </button>
                    
                    {currentStep < totalSteps && (
                        <button 
                            type="button" 
                            onClick={() => setCurrentStep(s => s + 1)}
                            className="btn btn-primary"
                        >
                            Next
                        </button>
                    )}
                    
                    {currentStep === totalSteps && (
                        <button type="submit" className="btn btn-info">
                            Calculate My Prakriti
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

const DietSchedulePlaceholder = ({ setCurrentPage }) => (
    <div className="placeholder-box">
        <Info />
        <h3>No Plan Generated</h3>
        <p>Please complete the Prakriti Analysis first. Your personalized plan will appear here.</p>
        <button 
            onClick={() => setCurrentPage('analysis')} 
            className="btn btn-primary"
        >
            Start Analysis
        </button>
    </div>
);

const VataDiet = () => (
    <div style={{marginTop: '1rem'}}>
        <h3 className="page-card-header" style={{color: 'var(--color-blue-dark)', border: 'none', padding: 0, marginBottom: '1rem'}}>Vata Balancing Diet</h3>
        <p>Focus on warm, moist, and grounding foods. Favor sweet, sour, and salty tastes. Avoid cold, dry, and light foods.</p>
        <div className="diet-grid" style={{marginTop: '1rem'}}>
            <div className="diet-box favor-box">
                <h4>Foods to Favor</h4>
                <ul>
                    <li><strong>Grains:</strong> Cooked oats, rice, wheat.</li>
                    <li><strong>Vegetables (Cooked):</strong> Asparagus, beets, carrots, sweet potatoes.</li>
                    <li><strong>Fruits (Sweet):</strong> Bananas, avocados, mangoes, peaches, plums.</li>
                </ul>
            </div>
            <div className="diet-box avoid-box">
                <h4>Foods to Reduce/Avoid</h4>
                <ul>
                    <li><strong>Grains:</strong> Barley, corn, millet, dry oats.</li>
                    <li><strong>Vegetables (Raw):</strong> Broccoli, cabbage, cauliflower, leafy greens.</li>
                    <li><strong>Fruits:</strong> Apples (raw), cranberries, pomegranates (raw).</li>
                </ul>
            </div>
        </div>
    </div>
);

const PittaDiet = () => (
    <div style={{marginTop: '1rem'}}>
        <h3 className="page-card-header" style={{color: 'var(--color-red)', border: 'none', padding: 0, marginBottom: '1rem'}}>Pitta Balancing Diet</h3>
        <p>Focus on cool, refreshing, and hydrating foods. Favor sweet, bitter, and astringent tastes. Avoid hot, spicy, and oily foods.</p>
        <div className="diet-grid" style={{marginTop: '1rem'}}>
            <div className="diet-box favor-box">
                <h4>Foods to Favor</h4>
                <ul>
                    <li><strong>Grains:</strong> Barley, oats, rice (basmati), wheat.</li>
                    <li><strong>Vegetables (Sweet/Bitter):</strong> Asparagus, broccoli, cucumber, leafy greens.</li>
                    <li><strong>Fruits (Sweet):</strong> Grapes, melons, pomegranates, sweet apples.</li>
                </ul>
            </div>
            <div className="diet-box avoid-box">
                <h4>Foods to Reduce/Avoid</h4>
                <ul>
                    <li><strong>Grains:</strong> Corn, millet, rye.</li>
                    <li><strong>Vegetables (Pungent):</strong> Onions, garlic (raw), hot peppers, tomatoes.</li>
                    <li><strong>Fruits (Sour):</strong> Sour oranges, grapefruit, olives, sour berries.</li>
                </ul>
            </div>
        </div>
    </div>
);

const KaphaDiet = () => (
    <div style={{marginTop: '1rem'}}>
        <h3 className="page-card-header" style={{color: 'var(--color-text-dark)', border: 'none', padding: 0, marginBottom: '1rem'}}>Kapha Balancing Diet</h3>
        <p>Focus on warm, light, and dry foods. Favor pungent, bitter, and astringent tastes. Avoid heavy, oily, and cold foods.</p>
        <div className="diet-grid" style={{marginTop: '1rem'}}>
            <div className="diet-box favor-box">
                <h4>Foods to Favor</h4>
                <ul>
                    <li><strong>Grains:</strong> Barley, corn, millet, rye.</li>
                    <li><strong>Vegetables (Pungent/Bitter):</strong> All leafy greens, broccoli, cauliflower, onions.</li>
                    <li><strong>Fruits (Astringent):</strong> Apples, berries, pomegranates, pears.</li>
                </ul>
            </div>
            <div className="diet-box avoid-box">
                <h4>Foods to Reduce/Avoid</h4>
                <ul>
                    <li><strong>Grains:</strong> Oats (cooked), rice, wheat.</li>
                    <li><strong>Vegetables (Sweet/Juicy):</strong> Sweet potatoes, tomatoes, zucchini, cucumber.</li>
                    <li><strong>Fruits (Sweet/Sour):</strong> Bananas, avocados, mangoes, oranges.</li>
                </ul>
            </div>
        </div>
    </div>
);

const VataSchedule = () => (
    <div style={{marginTop: '1rem'}}>
        <h3 className="page-card-header" style={{color: 'var(--color-blue-dark)', border: 'none', padding: 0, marginBottom: '1rem'}}>Vata Balancing Schedule (Focus on Routine)</h3>
        <ul className="schedule-list">
            <li><strong>6:00 AM:</strong> Wake up. Drink warm water.</li>
            <li><strong>6:15 AM - 6:45 AM:</strong> Gentle, grounding exercise (e.g., slow yoga, Tai Chi).</li>
            <li><strong>6:45 AM - 7:15 AM:</strong> Warm oil self-massage (Abhyanga) with sesame oil. Warm shower.</li>
            <li><strong>8:00 AM:</strong> Warm, nourishing breakfast (e.g., oatmeal).</li>
            <li><strong>10:00 PM:</strong> Bedtime. Ensure a warm, dark room.</li>
        </ul>
    </div>
);

const PittaSchedule = () => (
    <div style={{marginTop: '1rem'}}>
        <h3 className="page-card-header" style={{color: 'var(--color-red)', border: 'none', padding: 0, marginBottom: '1rem'}}>Pitta Balancing Schedule (Focus on Cooling & Moderation)</h3>
        <ul className="schedule-list">
            <li><strong>5:30 AM:</strong> Wake up before the sun. Drink room-temperature water.</li>
            <li><strong>5:45 AM - 6:30 AM:</strong> Cooling exercise (e.g., swimming, brisk walk).</li>
            <li><strong>6:30 AM - 7:00 AM:</strong> Cool shower. Self-massage with coconut oil.</li>
            <li><strong>7:30 AM:</strong> Breakfast (e.g., sweet fruits, oatmeal).</li>
            <li><strong>10:00 PM - 10:30 PM:</strong> Bedtime.</li>
        </ul>
    </div>
);

const KaphaSchedule = () => (
    <div style={{marginTop: '1rem'}}>
        <h3 className="page-card-header" style={{color: 'var(--color-text-dark)', border: 'none', padding: 0, marginBottom: '1rem'}}>Kapha Balancing Schedule (Focus on Stimulation & Activity)</h3>
        <ul className="schedule-list">
            <li><strong>5:00 AM:</strong> Wake up (before sunrise is ideal). Drink warm water with lemon/ginger.</li>
            <li><strong>5:30 AM - 6:30 AM:</strong> Vigorous exercise (e.g., running, cycling, vinyasa yoga).</li>
            <li><strong>6:30 AM - 7:00 AM:</strong> Dry brushing (Garshana) followed by a warm shower.</li>
            <li><strong>8:00 AM:</strong> Light breakfast (or skip if not hungry).</li>
            <li><strong>10:30 PM:</strong> Bedtime.</li>
        </ul>
    </div>
);

const PageDiet = ({ setCurrentPage }) => {
    const { appData } = useContext(AppDataContext);
    const { result } = appData.analysis;
    
    return (
        <div className="page-card">
            <h2 className="page-card-header">Your Personalized Diet Chart</h2>
            {!result && <DietSchedulePlaceholder setCurrentPage={setCurrentPage} />}
            {result?.includes('Vata') && <VataDiet />}
            {result?.includes('Pitta') && <PittaDiet />}
            {result?.includes('Kapha') && <KaphaDiet />}
        </div>
    );
};

const PageSchedule = ({ setCurrentPage }) => {
    const { appData } = useContext(AppDataContext);
    const { result } = appData.analysis;
    
    return (
        <div className="page-card">
            <h2 className="page-card-header">Your Personalized Daily Schedule (Dinacharya)</h2>
            {!result && <DietSchedulePlaceholder setCurrentPage={setCurrentPage} />}
            {result?.includes('Vata') && <VataSchedule />}
            {result?.includes('Pitta') && <PittaSchedule />}
            {result?.includes('Kapha') && <KaphaSchedule />}
        </div>
    );
};

const PageFollowUp = () => {
    const { appData, addFollowUp } = useContext(AppDataContext);
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addFollowUp(note);
        setNote('');
    };

    return (
        <div className="page-card">
            <h2 className="page-card-header">Your Progress Log</h2>
            <form onSubmit={handleSubmit} style={{marginBottom: '1.5rem'}}>
                <div className="form-group">
                  <label htmlFor="follow-up-note">Add a new note</label>
                  <textarea 
                      id="follow-up-note" 
                      rows="4" 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="form-textarea" 
                      placeholder="How are you feeling today? Any progress or challenges?"
                  ></textarea>
                </div>
                <div className="form-footer">
                    <button type="submit" className="btn btn-primary">
                        Add Log Entry
                    </button>
                </div>
            </form>
            
            <h3 className="page-card-header" style={{borderTop: '1px solid var(--color-border)', paddingTop: '1rem'}}>Past Entries</h3>
            <div className="follow-up-list">
                {appData.followUps.length === 0 ? (
                    <div className="no-entries">
                        You have no log entries yet.
                    </div>
                ) : (
                    appData.followUps.map((entry) => (
                        <div key={entry.date} className="follow-up-entry">
                            <p className="follow-up-entry-date">{new Date(entry.date).toLocaleString()}</p>
                            <p className="follow-up-entry-note">{entry.note}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const PageAdmin = ({ setCurrentPage, setSelectedUser }) => {
    const { allUsersData, refreshAdminData } = useContext(AppDataContext);

    const handleViewDetails = (userId) => {
        setSelectedUser(userId);
        setCurrentPage('admin-detail');
    };

    return (
        <div className="page-card">
            <h2 className="page-card-header">Admin Panel</h2>
            <p style={{marginTop: '-0.5rem', marginBottom: '1rem', color: 'var(--color-text-light)'}}>This panel shows data from all "students" (user profiles) saved in this browser.</p>
            
            <div className="admin-header">
                <h3 style={{fontSize: '1.2rem', fontWeight: 600}}>Student Management</h3>
                <button onClick={refreshAdminData} className="btn btn-outline">
                    <RefreshCw size={16} />
                    <span>Refresh</span>
                </button>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Prakriti</th>
                            <th>Last Follow-up</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsersData.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{textAlign: 'center', padding: '1.5rem', color: 'var(--color-text-light)'}}>
                                    No student data found.
                                </td>
                            </tr>
                        ) : (
                            allUsersData.map(user => (
                                <tr key={user.userId}>
                                    <td>{user.profile.name || 'N/A'}</td>
                                    <td>
                                        {user.analysis.result ? (
                                            <span className="prakriti-badge">{user.analysis.result}</span>
                                        ) : 'Not Analyzed'}
                                    </td>
                                    <td>
                                        {user.followUps.length > 0 ? new Date(user.followUps[0].date).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td>
                                        <button onClick={() => handleViewDetails(user.userId)} className="btn btn-link">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PageAdminDetail = ({ userId, setCurrentPage }) => {
    const { allUsersData } = useContext(AppDataContext);
    const user = allUsersData.find(u => u.userId === userId);

    if (!user) {
        return (
            <div className="page-card">
                <h2 className="page-card-header" style={{color: 'var(--color-red)'}}>Error</h2>
                <p>Could not find data for the selected user.</p>
                <button 
                    onClick={() => setCurrentPage('admin')}
                    className="btn btn-primary"
                    style={{marginTop: '1rem'}}
                >
                    Back to Admin List
                </button>
            </div>
        );
    }

    return (
        <div className="page-card">
            <div className="admin-header">
                <h2 className="page-card-header" style={{border: 'none', padding: 0, margin: 0}}>Student Details</h2>
                <button onClick={() => setCurrentPage('admin')} className="btn btn-outline">
                    <ArrowLeft size={16} />
                    <span>Back to List</span>
                </button>
            </div>

            <div className="detail-section">
                <h3 className="detail-section-header">Profile</h3>
                <div className="detail-grid">
                    <div><strong>Name:</strong> <span>{user.profile.name || 'N/A'}</span></div>
                    <div><strong>Age:</strong> <span>{user.profile.age || 'N/A'}</span></div>
                    <div><strong>Gender:</strong> <span>{user.profile.gender || 'N/A'}</span></div>
                    <div><strong>Weight:</strong> <span>{user.profile.weight ? `${user.profile.weight} kg` : 'N/A'}</span></div>
                    <div><strong>Height:</strong> <span>{user.profile.height ? `${user.profile.height} cm` : 'N/A'}</span></div>
                    <div className="col-span-2"><strong>Health Goals:</strong> <pre>{user.profile.health_goals || 'N/A'}</pre></div>
                    <div className="col-span-2"><strong>Medical Conditions:</strong> <pre>{user.profile.medical_conditions || 'N/A'}</pre></div>
                </div>
            </div>

            <div className="detail-section">
                <h3 className="detail-section-header">Prakriti Analysis</h3>
                <p><strong>Dominant Prakriti:</strong> <span style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary-green-dark)'}}>{user.analysis.result || 'Not Analyzed'}</span></p>
                <div className="detail-scores-grid">
                    <div className="score-box vata"><span>Vata Score</span> <span>{user.analysis.scores.vata}</span></div>
                    <div className="score-box pitta"><span>Pitta Score</span> <span>{user.analysis.scores.pitta}</span></div>
                    <div className="score-box kapha"><span>Kapha Score</span> <span>{user.analysis.scores.kapha}</span></div>
                </div>
            </div>

            <div className="detail-section" style={{marginBottom: 0}}>
                <h3 className="detail-section-header">Follow-up Log</h3>
                <div className="detail-followups">
                    {user.followUps.length === 0 ? (
                        <div className="no-entries">No follow-up entries for this user.</div>
                    ) : (
                        user.followUps.map((entry) => (
                            <div key={entry.date} className="follow-up-entry" style={{marginBottom: '0.75rem'}}>
                                <p className="follow-up-entry-date">{new Date(entry.date).toLocaleString()}</p>
                                <p className="follow-up-entry-note">{entry.note}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};


// --- (E) MAIN APP COMPONENT ---

export default function App() {
    const [currentPage, setCurrentPage] = useState('profile');
    const [selectedUser, setSelectedUser] = useState(null); // For admin detail view

    const renderPage = () => {
        switch (currentPage) {
            case 'profile':
                return <PageProfile />;
            case 'analysis':
                return <PageAnalysis setCurrentPage={setCurrentPage} />;
            case 'diet':
                return <PageDiet setCurrentPage={setCurrentPage} />;
            case 'schedule':
                return <PageSchedule setCurrentPage={setCurrentPage} />;
            case 'followUp':
                return <PageFollowUp />;
            case 'admin':
                return <PageAdmin setCurrentPage={setCurrentPage} setSelectedUser={setSelectedUser} />;
            case 'admin-detail':
                return <PageAdminDetail userId={selectedUser} setCurrentPage={setCurrentPage} />;
            default:
                return <PageProfile />;
        }
    };

    return (
        <AppProvider>
            {/* This component injects all the CSS */}
            <AppStyles /> 
            
            <div className="app-container">
                <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                
                <main className="main-content">
                    <Header />
                    {renderPage()}
                </main>
            </div>
        </AppProvider>
    );
}

