import React, { useState, useEffect } from "react";
import axios from 'axios';
import content from './externalContent.json';

const API_KEY = 'YOUR_YOUTUBE_API_KEY';

interface VideoData {
  url: string;
  title: string;
  viewCount: number;
}

const VideoViewCounts: React.FC = () => {
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchViewCounts = async () => {
      try {
        const videoIds = content.map(item => item.url.split('v=')[1] || item.url.split('youtu.be/')[1]);

        if (videoIds.length > 0) {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(
              ','
            )}&key=${API_KEY}`
          );

          const videoDetails = response.data.items.map((video: any) => ({
            url: `https://youtu.be/${video.id}`,
            title: video.snippet.title,
            viewCount: parseInt(video.statistics.viewCount, 10),
          }));

          setVideoData(videoDetails);
        }
      }
      catch (err) 
      {
        setError('Failed to fetch video data');
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchViewCounts();
  }, []);

  if (loading)
    {
        return <div>Loading...</div>;
    }

  if (error)
    {
    return <div>{error}</div>;
    }
return(
    <div>
      <h1>Video View Counts</h1>
      <ul>
        {videoData.map(video => 
        (
          <li key={video.url}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.title}
            </a> - {video.viewCount.toLocaleString()} views
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoViewCounts;
