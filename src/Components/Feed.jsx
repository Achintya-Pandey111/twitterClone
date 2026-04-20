import { useState, useEffect } from 'react';
import {testTweets as someTweets} from "../tweets.js"
const Feed = () => {
  const [tweets, setTweets] = useState(someTweets);
  const [input, setInput] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyInput, setReplyInput] = useState("");

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
      replies: [],
      likes: 0,
      retweets: 0,
      timestamp: new Date().toISOString(),
    };

    const updated = [newTweet, ...tweets];
    setTweets(updated);
    localStorage.setItem('x-posts', JSON.stringify(updated));
    setInput("");
  };

  const handleRepost = (tweet) => {
    const repostedTweet = {
      id: crypto.randomUUID(),
      user: localStorage.getItem('userName') || "Sarthak Shringi",
      handle: localStorage.getItem('userHandle') || "@SarthakShr11450",
      text: tweet.text, // For now, simple repost just copies text
      isRepost: true,
      repostedFrom: tweet.user,
      replies: [],
      likes: 0,
      retweets: 0,
      timestamp: new Date().toISOString(),
    };

    // Increment retweet count on original
    const updatedWithCount = tweets.map(t => 
      t.id === tweet.id ? { ...t, retweets: (t.retweets || 0) + 1 } : t
    );

    const updated = [repostedTweet, ...updatedWithCount];
    setTweets(updated);
    localStorage.setItem('x-posts', JSON.stringify(updated));
  };

  const handleLike = (id) => {
    const updated = tweets.map(t => 
      t.id === id ? { ...t, likes: (t.likes || 0) + 1 } : t
    );
    setTweets(updated);
    localStorage.setItem('x-posts', JSON.stringify(updated));
  };

  const handleReply = (tweetId) => {
    if (!replyInput.trim()) return;

    const reply = {
      id: crypto.randomUUID(),
      user: localStorage.getItem('userName') || "Sarthak Shringi",
      handle: localStorage.getItem('userHandle') || "@SarthakShr11450",
      text: replyInput,
      timestamp: new Date().toISOString(),
    };

    const updated = tweets.map(t => 
      t.id === tweetId ? { ...t, replies: [...(t.replies || []), reply] } : t
    );

    setTweets(updated);
    localStorage.setItem('x-posts', JSON.stringify(updated));
    setReplyInput("");
    setReplyingTo(null);
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
            <div className="tweet-main-content">
              {tweet.isRepost && (
                <div className="repost-label" style={{ fontSize: '0.8em', color: '#71767b', marginBottom: '4px', marginLeft: '32px' }}>
                  🔁 {tweet.repostedFrom} reposted
                </div>
              )}
              <div style={{ display: 'flex' }}>
                <div className="avatar-circle">{tweet.user.charAt(0)}</div>
                <div className="tweet-main" style={{ flex: 1 }}>
                  <div className="tweet-user-details" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span className="user-bold">{tweet.user}</span>
                      <span className="handle-gray">{tweet.handle} · 1m</span>
                    </div>
                    <button 
                      onClick={() => deleteTweet(tweet.id)} 
                      style={{ backgroundColor: '#1d9bf0', border: 'none', borderRadius:'10px' , color: 'white', cursor: 'pointer', padding: '4px 8px' }}
                    >
                      Delete
                    </button>
                  </div>
                  <p className="tweet-body-text">{tweet.text}</p>
                  <div className="tweet-actions-row">
                    <span onClick={() => setReplyingTo(replyingTo === tweet.id ? null : tweet.id)} style={{ cursor: 'pointer' }}>
                      💬 {tweet.replies?.length || 0}
                    </span> 
                    <span onClick={() => handleRepost(tweet)} style={{ cursor: 'pointer' }}>
                      🔁 {tweet.retweets || 0}
                    </span> 
                    <span onClick={() => handleLike(tweet.id)} style={{ cursor: 'pointer' }}>
                      ❤️ {tweet.likes || 0}
                    </span> 
                    <span>📊 0</span>
                  </div>

                  {replyingTo === tweet.id && (
                    <div className="reply-input-box" style={{ marginTop: '10px' }}>
                      <input 
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        placeholder="Post your reply"
                        style={{ width: '80%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                      />
                      <button 
                        disabled={!replyInput.trim()}
                        onClick={() => handleReply(tweet.id)} 
                        className="post-btn-small" 
                        style={{ marginLeft: '5px', opacity: replyInput.trim() ? 1 : 0.5 }}
                      >
                        Reply
                      </button>
                    </div>
                  )}

                  {tweet.replies?.length > 0 && (
                    <div className="replies-container" style={{ marginLeft: '20px', borderLeft: '1px solid #333', paddingLeft: '10px', marginTop: '10px' }}>
                      {tweet.replies.map(reply => (
                        <div key={reply.id} className="reply-item" style={{ marginBottom: '5px', fontSize: '0.9em' }}>
                          <span className="user-bold" style={{ fontSize: '0.85em' }}>{reply.user}</span>
                          <p className="tweet-body-text" style={{ fontSize: '0.9em', margin: '2px 0' }}>{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;