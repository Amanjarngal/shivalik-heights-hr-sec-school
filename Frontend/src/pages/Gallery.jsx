import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn, Image as ImageIcon } from 'lucide-react';

// No dummy data required for dynamic gallery

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setImages(data.data);
        }
      })
      .catch(err => console.error("Error fetching gallery", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* ── 1. Hero Header ── */}
      <section className="bg-[#a81d1d] text-white py-20 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffd700 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-48 -left-48 w-[40rem] h-[40rem] bg-[#ffd700]/10 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Camera className="w-12 h-12 text-[#ffd700]" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold pb-2 border-b-4 border-[#ffd700] inline-block">
              Photo Gallery
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto mt-6"
          >
            Explore the vibrant life at SHHSS. From academic excellence to cultural fests and sporting events, take a glimpse into our world.
          </motion.p>
        </div>
      </section>

      {/* Category filters removed based on user request */}

      {/* ── 3. Image Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            <div className="text-center py-20 col-span-full w-full">
              <div className="w-12 h-12 border-4 border-[#a81d1d]/20 border-t-[#a81d1d] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-bold">Loading photos...</p>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {images.map((img) => (
                  <motion.div
                    key={img._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all cursor-pointer aspect-[4/3]"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img.imageUrl || img.image}
                      alt="Gallery"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#a81d1d]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-bold mb-1 flex items-center justify-between">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {images.length === 0 && (
                <div className="text-center py-20 col-span-full w-full">
                  <ImageIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">No photos found</h3>
                  <p className="text-gray-500 mt-2">There are currently no photos in the gallery.</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* ── 4. Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 bg-white/10 hover:bg-[#a81d1d] text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl || selectedImage.image}
                alt="Gallery"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
