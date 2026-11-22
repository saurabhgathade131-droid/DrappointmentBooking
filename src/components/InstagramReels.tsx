import React from 'react';
import { useApp } from '../context/AppContext';
import { INSTAGRAM_POSTS } from '../data/initialData';
import { Instagram, Play, ExternalLink, Heart, MessageCircle, Bookmark, Sparkles } from 'lucide-react';

export const InstagramReels: React.FC = () => {
  const { doctor } = useApp();

  return (
    <section id="instagramSection" className="py-24 bg-[#FAF7F2] border-t border-[#E8DFD5]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Instagram Profile Header Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD5] shadow-soft mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                  <img
                    src="/assets/images/vedic-vaidya-logo.jpg"
                    alt="Vedic Vaidya Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow">
                <Instagram className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">{doctor.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFE9] text-emerald-800 text-xs font-bold font-mono">
                  {doctor.instagramHandle}
                </span>
              </div>
              <p className="text-xs font-bold text-[#B86B43] tracking-wide">
                Ayurveda | Fertility • {doctor.sanskritShloka}
              </p>
              <p className="text-xs text-[#5C554E] max-w-xl leading-relaxed">
                Empowering couples with root-cause Ayurvedic fertility insights, clinical sonograms, and breaking taboos around male and female reproductive health.
              </p>
            </div>
          </div>

          <a
            href={doctor.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:opacity-95 shadow-md flex items-center gap-2 transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-3 border border-rose-200">
              <Sparkles className="w-3.5 h-3.5" /> Dr. Nagasri's Video Insights &amp; Clinical Guides
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1C1A]">
              Daily Fertility Education by Dr. Nagasri Tenneti
            </h2>
            <p className="text-sm text-[#5C554E] mt-2 max-w-2xl">
              From demystifying why 3 out of 4 fertility check-ups fail, to debunking miracle detox teas and sharing ancient recipes for sperm &amp; ovum vitality.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#5C554E] bg-white px-4 py-2 rounded-xl border border-[#E8DFD5]">
            Swipe through real reels from @vedic_vd
          </span>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD5] shadow-soft hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Simulated Reel Card Header */}
              <div className="p-4 flex items-center justify-between border-b border-[#F0EAE1]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-amber-500 to-rose-500">
                    <img src="/assets/images/vedic-vaidya-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-[#1E1C1A]">{doctor.instagramHandle}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#B86B43] bg-[#E8EFE9] px-2 py-0.5 rounded-md">
                  Reel
                </span>
              </div>

              {/* Reel Visual Poster */}
              <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden flex flex-col justify-between p-5 text-white">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-white/80 font-medium">{post.views}</span>
                </div>

                <div className="my-auto z-10 text-center px-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                  </div>
                  <h4 className="font-serif text-base font-bold leading-snug drop-shadow-md">
                    "{post.title}"
                  </h4>
                  <p className="text-[11px] text-white/80 mt-1 drop-shadow-sm font-medium">
                    {post.tagline}
                  </p>
                </div>

                {/* Subtle Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${post.accentColor} opacity-75 group-hover:opacity-85 transition-opacity`} />
              </div>

              {/* Reel Caption & Action Bar */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-[#5C554E] mb-3">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 hover:text-rose-500 cursor-pointer transition-colors" />
                      <MessageCircle className="w-4 h-4 hover:text-[#B86B43] cursor-pointer transition-colors" />
                    </div>
                    <Bookmark className="w-4 h-4 hover:text-[#B86B43] cursor-pointer transition-colors" />
                  </div>

                  <p className="text-xs text-[#5C554E] leading-relaxed line-clamp-3">
                    <strong className="text-[#1E1C1A]">{doctor.instagramHandle}</strong> {post.summary}
                  </p>
                </div>

                <a
                  href={doctor.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-bold text-[#B86B43] hover:text-[#1E1C1A] transition-colors"
                >
                  <span>Watch on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
