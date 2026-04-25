import { useState } from 'react';
import Sidebar from './Components/Sidebar.jsx';
import Feed from './Components/Feed.jsx';
import Widgets from './Components/Widgets.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || "Sarthak Shringi");
  const [userHandle, setUserHandle] = useState(localStorage.getItem('userHandle') || "@SarthakShr11450");

  const handleSaveProfile = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userHandle', userHandle);
    setShowProfileModal(false);
    window.location.reload();
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openProfileModal={() => setShowProfileModal(true)}
      />
      <Feed activeTab={activeTab} />
      <Widgets />

      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Profile</h2>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
            />
            <input 
              type="text" 
              value={userHandle} 
              onChange={(e) => setUserHandle(e.target.value)}
              placeholder="Handle"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowProfileModal(false)}>Cancel</button>
              <button onClick={handleSaveProfile}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;