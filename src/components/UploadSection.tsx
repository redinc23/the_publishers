/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CloudUpload } from 'lucide-react';

export const UploadSection: React.FC = () => {
  return (
    <section className="upload-section py-20 px-6 bg-[#181818] rounded-2xl mx-6 my-10 max-w-7xl lg:mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Share Your Content</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Upload your books, videos, or audiobooks to share with our community of readers and creators.
        </p>
      </div>

      <form className="max-w-3xl mx-auto bg-zinc-800/40 p-10 rounded-2xl shadow-xl border border-white/5" onSubmit={(e) => e.preventDefault()}>
        <div className="file-upload flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl p-12 text-center cursor-pointer hover:border-[#ff7700] hover:bg-[#ff7700]/5 transition-all mb-8 group">
          <CloudUpload className="w-16 h-16 text-[#ff7700] mb-4 group-hover:scale-110 transition-transform" />
          <div className="text-xl font-semibold text-white mb-2">Click to upload or drag & drop</div>
          <div className="text-sm text-zinc-500">PDF, EPUB, MP4 up to 500MB</div>
          <input type="file" hidden />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="form-group">
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Title</label>
            <input className="w-full bg-zinc-900/70 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff7700] transition-colors" placeholder="Enter title" required />
          </div>
          <div className="form-group">
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Author/Creator</label>
            <input className="w-full bg-zinc-900/70 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff7700] transition-colors" placeholder="Enter author or creator" required />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="form-group">
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Category</label>
            <select className="w-full bg-zinc-900/70 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff7700] transition-colors appearance-none">
              <option>Book</option>
              <option>Video</option>
              <option>Audiobook</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Genre</label>
            <input className="w-full bg-zinc-900/70 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff7700] transition-colors" placeholder="e.g. Fantasy" required />
          </div>
        </div>

        <div className="form-group mb-8">
          <label className="block text-sm font-semibold text-zinc-300 mb-2">Description</label>
          <textarea className="w-full bg-zinc-900/70 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff7700] transition-colors min-h-[120px] resize-y" placeholder="Tell readers what your content is about…" required></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button type="reset" className="px-8 py-3 bg-zinc-700/70 hover:bg-zinc-700 rounded-lg font-bold transition-colors">Cancel</button>
          <button type="submit" className="px-8 py-3 bg-[#ff7700] hover:bg-[#cc5500] rounded-lg font-bold transition-colors shadow-lg shadow-[#ff7700]/20">Submit</button>
        </div>
      </form>
    </section>
  );
};
