const Widgets = () => {
  return (
    <div className="widgets">
      <input className="search-bar" placeholder="Search here :-)"/>
      <div className="trending-box">
        <h3>What's happening</h3>
        <p style={{ color: '#71767b', fontSize: '14px' }}>Trending in India</p>
        <p>#NewtonSchool</p>
      </div>
    </div>
  );
};

export default Widgets;