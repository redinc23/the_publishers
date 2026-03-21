/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const NetflixTV: React.FC = () => {
  return (
    <div className="tv-section hidden lg:block flex-shrink-0 w-[350px] h-[220px] relative ml-auto">
      <div className="tv-frame relative w-full h-full rounded-xl p-4 overflow-hidden">
        <div className="tv-screen w-full h-full bg-black rounded-lg relative overflow-hidden shadow-inner">
          <div className="netflix-content w-full h-full relative flex items-center justify-center animate-atmosphere">
            <div className="movie-scene absolute inset-0 opacity-60" />
            <div className="characters-netflix relative z-10 flex gap-4 items-end">
              <div className="character-netflix character-main w-11 h-18 rounded-lg bg-gradient-to-b from-[#DEB887] to-[#CD853F]" />
              <div className="character-netflix character-side w-9 h-14 rounded-lg bg-gradient-to-b from-[#8B4513] to-[#654321]" />
            </div>
            <div className="netflix-ui absolute bottom-2 left-2 right-2 flex justify-between items-center z-20">
              <div className="play-controls flex gap-2 items-center">
                <div className="play-btn w-6 h-6 bg-white/90 rounded-full flex items-center justify-center cursor-pointer text-[10px] text-black pl-0.5">
                  ▶
                </div>
              </div>
              <div className="progress-bar flex-1 h-1 bg-white/30 rounded-full mx-2 overflow-hidden">
                <div className="progress-fill h-full bg-[#e50914] w-[35%]" />
              </div>
              <div className="time-display text-white text-[10px] font-mono">1:23:45</div>
            </div>
            <div className="screen-reflection absolute inset-0 animate-reflection opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
