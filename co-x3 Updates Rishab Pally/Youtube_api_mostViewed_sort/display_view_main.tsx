import React from 'react';
import VideoViewCounts from './video_count';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Video View Counts</h1>
        <VideoViewCounts />
      </header>
    </div>
  );
};

export default App;
