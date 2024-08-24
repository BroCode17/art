// import React, { useState } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { shopData } from '../../../../utils/data';

// interface Artwork {
//   id: string;
//   title: string;
//   artist: string;
//   imageUrl: string;
//   description: string;
// }
// interface ArtworkCopy {
//   url: string;
  
// }

// interface GalleryProps {
//   artworks: Artwork[];
// }

// const ArtworkCard: React.FC<{ artwork: ArtworkCopy; onClick: () => void }> = ({ artwork, onClick }) => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//       transition={{ duration: 0.5 }}
//       onClick={onClick}
//     >
//       <Image
//         src={`/images/${artwork.url}`}
//         alt={artwork.url as any}
//         layout="fill"
//         objectFit="cover"
//         className="transition-transform duration-300 hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
//         <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//           <h3 className="text-lg font-semibold">{artwork.url}</h3>
//           <p className="text-sm">{artwork.url}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const ArtworkModal: React.FC<{ artwork: Artwork; onClose: () => void }> = ({ artwork, onClose }) => {
//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full"
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 20 }}
//       >
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         <div className="flex flex-col md:flex-row">
//           <div className="w-full md:w-1/2 aspect-square relative">
//             <Image
//               src={artwork.imageUrl}
//               alt={artwork.title}
//               layout="fill"
//               objectFit="cover"
//             />
//           </div>
//           <div className="w-full md:w-1/2 p-6">
//             <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
//             <p className="text-lg text-gray-600 mb-4">{artwork.artist}</p>
//             <p className="text-gray-700">{artwork.description}</p>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// const Gallery: React.FC<GalleryProps> = ({ artworks }) => {
//   const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8 text-center">Art Gallery</h1>
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ staggerChildren: 0.1 }}
//       >
//         {shopData.map((artwork, index) => (
//           <ArtworkCard
//             key={index}
//             artwork={artwork}
//             onClick={() => setSelectedArtwork(artwork)}
//           />
//         ))}
//       </motion.div>
//       {/* <AnimatePresence>
//         {selectedArtwork && (
//           <ArtworkModal
//             artwork={selectedArtwork}
//             onClose={() => setSelectedArtwork(null)}
//           />
//         )}
//       </AnimatePresence> */}
//     </div>
//   );
// };

// export default Gallery;


import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { shopData } from '../../../../utils/data';
import HeadTitle from '@/components/HeadTitle';
import ImageSkeleton from '@/components/_images/ImageSkeleton';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  description: string;
}
interface ArtworkCopy {
  url: string;
}

interface GalleryProps {
  artworks: Artwork[];
}

const getGridSpan = (index: number): string => {
  const patterns = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2',
    'col-span-2 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-3 row-span-2',
  ];
  return patterns[index % patterns.length];
};

const ArtworkCard: React.FC<{ artwork: ArtworkCopy; index: number; onClick: () => void }> = ({ artwork, index, onClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-md shadow-lg cursor-pointer  ${getGridSpan(index)} w-full`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <div className="w-full h-full relative">
      {isLoading && <ImageSkeleton />}
        <Image
          src={`/images/${artwork.url}`}
          alt={artwork.url}
          fill
          sizes='95'
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105 w-full h-auto"
          onLoad={() => setIsLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-semibold">{artwork.url}</h3>
          <p className="text-white text-sm">{artwork.url}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ArtworkModal: React.FC<{ artwork: ArtworkCopy; onClose: () => void }> = ({ artwork, onClose }) => {
    
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-white rounded-lg overflow-hidden max-w-3xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-[300px] md:w-[400px]">
          <div className="w-full  aspect-square relative">
            <Image
            src={`/images/${artwork.url}`}
              alt={artwork.url}
              layout="fill"
              objectFit="cover"
              onClick={onClose}

            />
          </div>
          {/* <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-2">{artwork.url}</h2>
            <p className="text-lg text-gray-600 mb-4">{artwork.url}</p>
            <p className="text-gray-700">{artwork.url}</p>
          </div>
        </div> */}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ artworks }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkCopy | null>(null);

  return (
    <div className="  px-4 py-8 mt-10">
      <HeadTitle title='Art Gallery' className='mb-4 text-left'/>
      <motion.div
        className="grid max-sm:grid-cols-2 grid-cols-3 max-sm:gap-2 gap-4 auto-rows-[150px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {shopData.map((artwork, index) => (
          <ArtworkCard
            key={index}
            artwork={artwork}
            index={index}
            onClick={() => setSelectedArtwork(artwork)}
          />
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;