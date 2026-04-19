const Sidebar = () => {
  const name = localStorage.getItem('userName') || "Sarthak Shringi";
  const handle = localStorage.getItem('userHandle') || "@SarthakShr11450";

  return (
    <div className="sidebar">
      <div className="logo">𝕏</div>
      <nav className="nav-menu">
        <div className="nav-link bold">Home</div>
        <div className="nav-link">Explore</div>
        <div className="nav-link">Notifications</div>
        <div className="nav-link">Messages</div>
        <div className="nav-link">Bookmarks</div>
        <div className="nav-link">Profile</div>
      </nav>
      <button className="post-btn-large">Post</button>

      <div className="sidebar-profile">
        <div className="profile-info">
          <span className="profile-name">{name}</span>
          <span className="profile-handle">{handle}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;