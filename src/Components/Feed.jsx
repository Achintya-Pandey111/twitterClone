import { useState, useEffect } from 'react';
import {testTweets as someTweets} from "../tweets.js"
const Feed = () => {
  const [tweets, setTweets] = useState(someTweets);
  const [input, setInput] = useState("");
  

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('x-posts')) || tweets;
    setTweets(saved);
  }, []);

  const handlePost = () => {
    if (!input.trim()) return

    const newTweet = {
      id: crypto.randomUUID(),
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
      <div className="topHead">
        <div className='ForYou'>For you</div>
        <div className='Following'>Following</div>
      </div>      

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
          style={{ backgroundColor: '#1d9bf0', border: 'none', borderRadius:'10px' , color: 'white', cursor: 'pointer' }}
        >
          Delete Post
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