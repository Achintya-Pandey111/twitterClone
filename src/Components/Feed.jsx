import { useState, useEffect } from 'react';

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [input, setInput] = useState("");
  const MAX_POSTS = 10;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('x-posts')) || [];
    setTweets(saved);
  }, []);

  const handlePost = () => {
    if (!input.trim() || tweets.length >= MAX_POSTS) return;

    const newTweet = {
      id: Date.now(),
      user: localStorage.getItem('userName') || "Sarthak Shringi",
      handle: localStorage.getItem('userHandle') || "@SarthakShr11450",
      text: input,
    };

    const updated = [newTweet, ...tweets];
    setTweets(updated);
    localStorage.setItem('x-posts', JSON.stringify(updated));
    setInput("");
  };
  const handleLike = (id) => {
  const updated = tweets.map(t => 
    t.id === id ? { ...t, likes: (t.likes || 0) + 1 } : t
  );
  setTweets(updated);
  localStorage.setItem('x-posts', JSON.stringify(updated));
};

const deleteTweet = (id) => {
  const updated = tweets.filter(t => t.id !== id);
  setTweets(updated);
  localStorage.setItem('x-posts', JSON.stringify(updated));
};

  return (
    <div className="feed">
      <div className="storage-info">
        Posts: {tweets.length} / {MAX_POSTS} (Local Storage Limit)
      </div>
      
      <header className="feed-header">
        <h2>Home</h2>
      </header>

      <div className="tweet-input-section">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="What's happening?" 
        />
        <button onClick={handlePost} className="post-btn-small">Post</button>
      </div>

      <div className="tweets-container">
        {tweets.map(tweet => (
  <div key={tweet.id} className="tweet-postcard">
    <div className="avatar-circle">{tweet.user.charAt(0)}</div>
    <div className="tweet-main">
      <div className="tweet-user-details" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span className="user-bold">{tweet.user}</span>
          <span className="handle-gray">{tweet.handle} · 1m</span>
        </div>
        {/* Delete Button */}
        <button 
          onClick={() => deleteTweet(tweet.id)} 
          style={{ background: 'none', border: 'none', color: '#71767b', cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>
      <p className="tweet-body-text">{tweet.text}</p>
      <div className="tweet-actions-row">
        <span>💬 0</span> 
        <span>🔁 0</span> 
        <span onClick={() => handleLike(tweet.id)} style={{ cursor: 'pointer' }}>
          ❤️ {tweet.likes || 0}
        </span> 
        <span>📊 0</span>
      </div>
    </div>
  </div>
))}
      </div>
    </div>
  );
};

export default Feed;