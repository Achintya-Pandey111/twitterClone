const Widgets = () => {
  const trendingTopics = [
    { category: "Trending in Tech", title: "#ReactJS", posts: "12.4K posts" },
    { category: "Technology · Trending", title: "Twitter Clone", posts: "5.2K posts" },
    { category: "Programming · Live", title: "#JavaScript", posts: "28.1K posts" },
    { category: "Trending in India", title: "#NewtonSchool", posts: "8.7K posts" },
    { category: "Tech · Trending", title: "OpenAI", posts: "45.3K posts" },
  ];

  return (
    <div className="widgets">
      <input className="search-bar" placeholder="Search X" />
      <div className="trending-box">
        <h3 style={{ marginBottom: '12px' }}>What's happening</h3>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="trending-item">
            <div className="trending-category">{topic.category}</div>
            <div className="trending-title">{topic.title}</div>
            <div className="trending-count">{topic.posts}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widgets;