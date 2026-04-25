import { useState } from 'react';

const Sidebar = ({ activeTab, setActiveTab, openProfileModal }) => {
  const name = localStorage.getItem('userName') || "Sarthak Shringi";
  const handle = localStorage.getItem('userHandle') || "@SarthakShr11450";

  const menuItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'explore', icon: '🔍', label: 'Explore' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'messages', icon: '✉️', label: 'Messages' },
    { id: 'bookmarks', icon: '📌', label: 'Bookmarks' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="sidebar">
      <div className="logo" onClick={() => setActiveTab('home')}>𝕏</div>
      <nav>
        {menuItems.map(item => (
          <div 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
      <button className="post-btn-large" onClick={() => document.querySelector('.tweet-input-section input')?.focus()}>Post</button>

      <div className="sidebar-profile" onClick={openProfileModal}>
        <div className="profile-avatar-sm">{name.charAt(0)}</div>
        <div className="profile-info">
          <span className="profile-name">{name}</span>
          <span className="profile-handle">{handle}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;