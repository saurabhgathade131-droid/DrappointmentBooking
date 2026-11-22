import React from 'react';
import { useApp } from '../context/AppContext';
import { MEDIA_INTERVIEWS } from '../data/initialData';
import { Play, ExternalLink, X } from 'lucide-react';

export const MediaInterviews: React.FC = () => {
  const { activeVideoModal, openVideoModal, closeVideoModal } = useApp();

  return (
    <section id="mediaSection" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B86B43]">Broadcast Media & Public Talks</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1C1A] mt-2">
              Television Interviews with Dr. Nageshree
            </h2>
            <p className="text-sm sm:text-base text-[#5C554E] mt-2 max-w-2xl">
              Watch Dr. Nageshree address critical questions on natural conception, breaking myths around PCOS, AMH, and sperm quality on leading news channels.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs font-semibold text-[#5C554E] bg-[#FAF7F2] px-4 py-2 rounded-xl border border-[#E8DFD5]">
              Featured on Zee 24 Taas, Saam TV, ABP Majha
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEDIA_INTERVIEWS.map(media => (
            <div
              key={media.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8DFD5] shadow-soft hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => openVideoModal(media)}
              >
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1E1C1A]">
                  {media.channel}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-md text-xs font-medium">
                  {media.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#B86B43] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#B86B43] font-medium mb-2">
                    <span>{media.topic}</span>
                    <span className="text-[#5C554E]">{media.views}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1E1C1A] mb-2 leading-snug group-hover:text-[#B86B43] transition-colors">
                    {media.title}
                  </h4>
                  <p className="text-xs text-[#5C554E] leading-relaxed line-clamp-2">
                    {media.summary}
                  </p>
                </div>

                <button
                  onClick={() => openVideoModal(media)}
                  className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-bold text-[#1E1C1A] hover:text-[#B86B43] transition-colors"
                >
                  <span>Watch Doctor's Explanation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DFD5]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B86B43]">
                    {activeVideoModal.channel} • {activeVideoModal.topic}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1E1C1A]">{activeVideoModal.title}</h3>
                </div>
                <button
                  onClick={closeVideoModal}
                  className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#1E1C1A] hover:bg-[#1E1C1A] hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full rounded-2xl overflow-hidden aspect-video bg-black shadow-inner mb-4">
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> TV Broadcast Segment
                    </span>
                    <span className="text-white text-xs opacity-80">{activeVideoModal.duration}</span>
                  </div>

                  <div className="text-center my-auto">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#B86B43]/90 text-white flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 transition-transform">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                    <p className="text-white text-sm font-medium mt-3">Click to Stream Segment with Dr. Nageshree</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white text-xs flex items-center justify-between">
                    <span>Key Focus: Natural Ovulation &amp; Semen Quality Protocols</span>
                    <span className="text-[#D6855B] font-semibold">Ex-Gynoveda Clinical Archives</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFD5] text-xs text-[#5C554E] leading-relaxed">
                <strong className="text-[#1E1C1A] block mb-1">Key Takeaway from Dr. Nageshree:</strong>
                {activeVideoModal.summary}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
