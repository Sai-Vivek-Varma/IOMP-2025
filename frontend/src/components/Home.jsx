import React, { useState, useEffect } from 'react';
import OfficeList from './OfficeList.jsx';
import { AccordionCustomStyles } from './Accordion.jsx';
import Logos from './Logos.jsx';
import GarbageDetectionMap from './GarbageDetectionMap.jsx';
import Chat from './Chat.jsx';

// HeroSlider component code
const images = [
  'https://cdn.prod.website-files.com/6509fe179d7033a278a05268/65276f9b94b27036c466ba7c_Screen-Shot-2022-08-22-at-7.26.19-PM.png',
  'https://www.shutterstock.com/image-photo/close-gloved-hands-female-cleaner-260nw-2600165331.jpg',
  'https://media.istockphoto.com/id/1411289606/photo/paper-eco-friendly-disposable-tableware-with-recycling-signs-on-the-background-of-green-plants.jpg?s=612x612&w=0&k=20&c=ng731oZuBvrja5tNFkrcW-hWtWJqieyxw3A2HSei0QI=',
  'https://tablespace.com/wp-content/uploads/2025/07/Sustainability-in-Office-Fit%E2%80%91Outs_-Green-Building-Practices-That-Pay-Off.webp',
  'https://www.intelligentliving.co/wp-content/uploads/2024/10/Best-Green-Practices-to-Consider.jpg'
];

function HeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='relative w-full h-[60vh] md:h-[70vh] overflow-hidden'>
      {images.map((image, index) => (
        <div
          key={index}
          className='absolute inset-0 transition-opacity duration-1000 ease-in-out'
          style={{ opacity: currentImageIndex === index ? 1 : 0 }}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className='w-full h-full object-cover' // Adjusted for better image display
          />
        </div>
      ))}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-40 px-4'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-center drop-shadow-lg mb-4'>
          Swachhta & LiFE Dashboard
        </h1>
        <p className='text-lg md:text-xl text-center max-w-2xl drop-shadow-md'>
          Monitoring cleanliness and green practices in post offices with AI-powered insights.
        </p>
      </div>
    </div>
  );
}

// The main Home component, which now renders the HeroSlider directly
function Home() {
  return (
    <>
      <div className='flex flex-col w-full min-h-screen'>
        <HeroSlider />
        <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10'>
          
          {/* Section 1: Post Office Status & Practices - MOVED TO THE TOP */}
          <section className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Post Office Status & Practices</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <OfficeList />
              </div>
              <div>
                <Logos />
              </div>
            </div>
          </section>

          {/* Section 2: Live Monitoring & Issues - MOVED BELOW */}
          <section className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Live Monitoring & Issues</h2>
            <div className='w-full'>
              <GarbageDetectionMap />
            </div>
          </section>
          
          {/* Section 3: Additional Information & FAQs */}
          <section className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>FAQs & Resources</h2>
            <AccordionCustomStyles />
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;