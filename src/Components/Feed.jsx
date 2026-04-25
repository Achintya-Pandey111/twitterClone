import { useState, useEffect } from 'react';
import { testTweets } from "../tweets.js";

const Feed = ({ activeTab }) => {
  const [tweets, setTweets] = useState([]);
  const [input, setInput] = useState("");
  const [feedType, setFeedType] = useState("for-you");

  useEffect(() => {
    loadAllTweets();
  }, []);

  const loadAllTweets = () => {

    const savedUserPosts = localStorage.getItem('x-user-posts');
    const userPosts = savedUserPosts ? JSON.parse(savedUserPosts) : [];
    

    const defaultTweets = testTweets;
    

    const allTweets = [...userPosts, ...defaultTweets];
    
    setTweets(allTweets);
    

    localStorage.setItem('x-posts', JSON.stringify(allTweets));
  };

  const handlePost = () => {
    if (!input.trim()) return;

    const newTweet = {
      id: Date.now(),
      user: localStorage.getItem('userName') || "Sarthak Shringi",
      handle: localStorage.getItem('userHandle') || "@SarthakShr11450",
      text: input,
      likes: 0,
      comments: 0,
      reposts: 0,
      time: "Just now",
      isUserPost: true  
    };


    const savedUserPosts = localStorage.getItem('x-user-posts');
    const userPosts = savedUserPosts ? JSON.parse(savedUserPosts) : [];
    

    const updatedUserPosts = [newTweet, ...userPosts];
    localStorage.setItem('x-user-posts', JSON.stringify(updatedUserPosts));
    

    loadAllTweets();
    setInput("");
  };

  const handleLike = (id) => {

    const savedUserPosts = localStorage.getItem('x-user-posts');
    const userPosts = savedUserPosts ? JSON.parse(savedUserPosts) : [];
    
    const isUserPost = userPosts.some(post => post.id === id);
    
    if (isUserPost) {

      const updatedUserPosts = userPosts.map(t => 
        t.id === id ? { ...t, likes: (t.likes || 0) + 1 } : t
      );
      localStorage.setItem('x-user-posts', JSON.stringify(updatedUserPosts));
    } else {

      const savedLikes = localStorage.getItem('x-default-likes');
      const likes = savedLikes ? JSON.parse(savedLikes) : {};
      likes[id] = (likes[id] || 0) + 1;
      localStorage.setItem('x-default-likes', JSON.stringify(likes));
    }
    

    loadAllTweets();
  };

  const handleRepost = (id) => {
    const savedUserPosts = localStorage.getItem('x-user-posts');
    const userPosts = savedUserPosts ? JSON.parse(savedUserPosts) : [];
    
    const isUserPost = userPosts.some(post => post.id === id);
    
    if (isUserPost) {
      const updatedUserPosts = userPosts.map(t => 
        t.id === id ? { ...t, reposts: (t.reposts || 0) + 1 } : t
      );
      localStorage.setItem('x-user-posts', JSON.stringify(updatedUserPosts));
    } else {
      const savedReposts = localStorage.getItem('x-default-reposts');
      const reposts = savedReposts ? JSON.parse(savedReposts) : {};
      reposts[id] = (reposts[id] || 0) + 1;
      localStorage.setItem('x-default-reposts', JSON.stringify(reposts));
    }
    
    loadAllTweets();
  };

  const deleteTweet = (id) => {

    const savedUserPosts = localStorage.getItem('x-user-posts');
    const userPosts = savedUserPosts ? JSON.parse(savedUserPosts) : [];
    
    const updatedUserPosts = userPosts.filter(t => t.id !== id);
    localStorage.setItem('x-user-posts', JSON.stringify(updatedUserPosts));
    

    loadAllTweets();
  };


  const getLikes = (tweet) => {
    if (tweet.isUserPost) return tweet.likes || 0;
    const savedLikes = localStorage.getItem('x-default-likes');
    const likes = savedLikes ? JSON.parse(savedLikes) : {};
    return likes[tweet.id] || tweet.likes || 0;
  };


  const getReposts = (tweet) => {
    if (tweet.isUserPost) return tweet.reposts || 0;
    const savedReposts = localStorage.getItem('x-default-reposts');
    const reposts = savedReposts ? JSON.parse(savedReposts) : {};
    return reposts[tweet.id] || tweet.reposts || 0;
  };

  const filteredTweets = feedType === "for-you" 
    ? tweets 
    : tweets.filter(t => (t.likes || 0) > 100);

  return (
    <div className="feed">
      <div className="feed-header">
        <div className="feed-tabs">
          <div 
            className={`tab ${feedType === 'for-you' ? 'active' : ''}`}
            onClick={() => setFeedType('for-you')}
          >
            For you
          </div>
          <div 
            className={`tab ${feedType === 'following' ? 'active' : ''}`}
            onClick={() => setFeedType('following')}
          >
            Following
          </div>
        </div>
      </div>

      <div style={{ padding: '8px 20px', borderBottom: '1px solid #2f3336', textAlign: 'right' }}>
        <button 
          onClick={loadAllTweets}
          style={{
            backgroundColor: '#1d9bf0',
            color: 'white',
            border: 'none',
            padding: '4px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          🔄 Refresh Feed (Get New Images)
        </button>
      </div>

      <div className="tweet-input-section">
        <div className="tweet-avatar">
          {(localStorage.getItem('userName') || "Sarthak Shringi").charAt(0)}
        </div>
        <div className="tweet-input-area">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="What's happening?" 
          />
          <div className="post-actions">
            <button onClick={handlePost} className="post-btn-small">Post</button>
          </div>
        </div>
      </div>

      <div className="tweets-container">
        {filteredTweets.length === 0 ? (
          <div className="empty-feed">
            <p>No tweets yet. Be the first to post!</p>
          </div>
        ) : (
          filteredTweets.map(tweet => (
            <div key={tweet.id} className="tweet-card">
              <div className="tweet-avatar-card">{tweet.user.charAt(0)}</div>
              <div className="tweet-content">
                <div className="tweet-header">
                  <span className="tweet-name">{tweet.user}</span>
                  <span className="tweet-handle">{tweet.handle}</span>
                  <span className="tweet-time">· {tweet.time || '1m'}</span>
                  {tweet.isUserPost && (
                    <span style={{ color: '#1d9bf0', fontSize: '12px', marginLeft: '8px' }}>● Your post</span>
                  )}
                </div>
                <p className="tweet-text">{tweet.text}</p>
                {tweet.image && (
                  <div className="tweet-media">
                    <img 
                      src={tweet.image} 
                      alt="tweet media" 
                      style={{ width: '100%', borderRadius: '16px' }}
                      onError={(e) => {
                        e.target.src = "https://picsum.photos/id/1/600/400";
                      }}
                    />
                  </div>
                )}
                {tweet.video && (
                  <div className="tweet-media">
                    <video src={tweet.video} controls style={{ width: '100%', borderRadius: '16px' }} />
                  </div>
                )}
                <div className="tweet-actions">
                  <div className="action-btn">💬 {tweet.comments || 0}</div>
                  <div className="action-btn" onClick={() => handleRepost(tweet.id)}>🔁 {getReposts(tweet)}</div>
                  <div className="action-btn" onClick={() => handleLike(tweet.id)}>❤️ {getLikes(tweet)}</div>
                  {tweet.isUserPost && (
                    <div className="action-btn delete" onClick={() => deleteTweet(tweet.id)}>🗑️ Delete</div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;