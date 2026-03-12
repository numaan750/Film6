'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const VideoPlayer = ({video,title,description}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnd = () => {
      setIsPlaying(false);
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnd = () => {
      setIsPlaying(false); // ✅ Set to false when video ends
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, []);
  
  return (
    <div className='bg-black py-8 md:py-12 max-md:mt-12 px-4  md:px-20  '>
      <div className='  flex flex-col items-center justify-center text-center  '>
        <h1 className='text-xl sm:text-3xl  pb-3 text-white'>{title}</h1>
        <p className='text-xs sm:text-lg text-white pb-6'>{description}</p>
      </div>
      <div className='    mt-0 relative group '>
        <video
          ref={videoRef}
          className='w-full rounded-xl shadow-lg'
          src={video}
          // poster='/hero.png'
        />

        {/* Center Play Icon before play */}

        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className='absolute inset-0 z-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300'
          >
            <div className='bg-black/70 hover:bg-black/90 p-6 rounded-full text-white animate-bounce shadow-lg'>
              <Play size={36} />
            </div>
          </button>
        )}

        {/* Bottom Controls */}
        <div className='absolute bottom-5 left-0 right-0 flex items-center justify-between px-5 opacity-0 group-hover:opacity-100 transition duration-300'>
          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className='bg-black/70 hover:bg-black/90 p-2 rounded-full text-white'
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={handleMute}
            className='bg-black/70 hover:bg-black/90 p-2 rounded-full text-white'
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            className='bg-black/70 hover:bg-black/90 p-2 rounded-full text-white'
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
