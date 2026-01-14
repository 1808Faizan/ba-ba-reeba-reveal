import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Header from '@/components/Header';
import londonImg from '@/assets/2-London-1.jpg';
import dubaiImg from '@/assets/2-Dubai-1.jpg';
import madridImg from '@/assets/2-Madrid.jpg';
import "swiper/css";
import FooterSection from '@/components/FooterSection';

/* LOGOS */
import estileria from "@/assets/logo-estileria.png";
import arde from "@/assets/logo-arde.svg";
import quintin from "@/assets/logo-quintin.svg";
import paraguas from "@/assets/logo-el-paraguas.svg";
import amazonico from "@/assets/logo-amazonico.svg";
import library from "@/assets/logo-library.png";

import contactImg from '@/assets/contact-left.jpg'; 

const accordionItems = [
  'Find Us',
  'Opening times',
  'Dress code & Children',
  'Press & Media Enquiries',
];
const locations = [
  { title: 'New Delhi', image: londonImg },
  { title: 'Pune', image: dubaiImg },
  { title: 'Mumbai', image: madridImg },
];
const brandLogos = [
  estileria,
  arde,
  quintin,
  paraguas,
  amazonico,
  library,
];

const ContactPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

     

      {/* SPLIT IMAGE + ACCORDION SECTION */}
      {/* SPLIT IMAGE + ACCORDION SECTION */}
<section className="w-full flex flex-col md:flex-row">
  
  {/* Left Image (reduced height) */}
  <div className="w-full md:w-1/2 h-[260px] md:h-[100vh]">
    <img
      src={contactImg}
      alt="Contact location"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right Content */}
  <div className="w-full md:w-1/2 bg-[#000000] text-white flex items-center">
    <div className="w-full px-6 md:px-16 py-14 space-y-8">

      {accordionItems.map((title, index) => (
        <div key={index} className="border-b border-white/30 pb-6">
          
          {/* Accordion Header */}
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="text-xl md:text-2xl font-serif">
              {title}
            </h3>
            <ChevronDown
              className={`transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Accordion Content */}
          <motion.div
            initial={false}
            animate={{
              height: openIndex === index ? 'auto' : 0,
              opacity: openIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
           <div className="pt-4 text-white/80 text-sm md:text-base leading-relaxed space-y-2">
  {index === 0 ? (
    <p>
      18th Floor, Boulevard Towers by Brahma Corp,<br />
      Camp Area, Pune,<br />
      Maharashtra 411001
    </p>
  ) : index === 1 ? (
    <>
      <p>Monday&nbsp;&nbsp;&nbsp;12:30 pm – 1:00 am</p>
      <p>Tuesday&nbsp;&nbsp;12:30 pm – 1:00 am</p>
      <p>Wednesday&nbsp;12:30 pm – 1:00 am</p>
      <p>Thursday&nbsp;&nbsp;12:30 pm – 1:00 am</p>
      <p>Friday&nbsp;&nbsp;&nbsp;12:30 pm – 1:00 am</p>
      <p>Saturday&nbsp;12:30 pm – 1:00 am</p>
      <p>Sunday&nbsp;&nbsp;&nbsp;12:30 pm – 1:00 am</p>
    </>
  ) : (
    <p>
      This information will help guests plan their visit and
      understand our policies and location details.
    </p>
  )}
</div>


          </motion.div>

        </div>
      ))}

    </div>
  </div>
</section>


    {/* LOCATIONS SECTION */}
<section className="bg-[#000000] py-14 md:py-24">
  <div className="max-w-9xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {locations.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="group relative h-[420px] md:h-[520px] overflow-hidden cursor-pointer"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500" />

          {/* Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-white">
            <h3 className="font-serif text-4xl md:text-5xl mb-2">
              {item.title}
            </h3>

            <span className="text-sm uppercase tracking-widest border-b border-white pb-1 opacity-90 group-hover:opacity-100 transition">
              Discover
            </span>
          </div>
        </motion.div>
      ))}

    </div>
  </div>
</section>
 
{/* LOGO SLIDER SECTION */}
{/* LOGO SLIDER SECTION */}
<section className="bg-[#da8848] py-1 md:py-1 overflow-hidden">
  <div className="max-w-9xl mx-auto px-2">

    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 1, // ❗ NOT 0
        disableOnInteraction: false,
      }}
      speed={4500}
      loop={true}
      freeMode={true}              // ✅ REQUIRED
      allowTouchMove={true}
      loopAdditionalSlides={6}     // ✅ FIX LOOP FREEZE
      slidesPerView={2}
      spaceBetween={40}
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 }, // ❗ NOT 6
      }}
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide
          key={index}
          className="flex items-center justify-center"
        >
          <img
            src={logo}
            alt="Brand logo"
            className="
              w-36 md:w-44 lg:w-48
              h-auto
              object-contain
              opacity-80
              hover:opacity-100
              transition duration-300
            "
          />
        </SwiperSlide>
      ))}
    </Swiper>

  </div>
</section>


      {/* Back */}
        {/*<div className="text-center pb-20">
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground"
        >
          ← Back to Home
        </Link>
      </div>*/}
  <FooterSection />
     
    </div>
  );
};

export default ContactPage;
