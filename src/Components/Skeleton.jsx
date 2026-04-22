import React from 'react';

const Skeleton = () => {
  return (
    <div className="tweet-postcard skeleton-tweet" style={{ borderBottom: '1px solid #2f3336', padding: '15px' }}>
      <div className="avatar-circle skeleton-bg" style={{ backgroundColor: '#333', color: 'transparent' }}></div>
      <div className="tweet-main" style={{ flex: 1 }}>
        <div className="skeleton-line skeleton-bg" style={{ width: '40%', height: '12px', marginBottom: '10px', backgroundColor: '#333', borderRadius: '4px' }}></div>
        <div className="skeleton-line skeleton-bg" style={{ width: '90%', height: '10px', marginBottom: '6px', backgroundColor: '#333', borderRadius: '4px' }}></div>
        <div className="skeleton-line skeleton-bg" style={{ width: '70%', height: '10px', backgroundColor: '#333', borderRadius: '4px' }}></div>
      </div>
    </div>
  );
};

export default Skeleton;
