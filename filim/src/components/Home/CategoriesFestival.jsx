'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CategoriesFestival = ({ index = 0, description, img }) => {
  return (
    
    <div>
      <motion.div
        className='bg-gray-800 rounded-xl shadow-md overflow-hidden'
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.6,
          delay: index * 0.2,
          ease: 'easeOut',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Image
            src={img}
            alt={description}
            width={400}
            height={250}
            className='w-full h-62 object-cover'
          />
        </motion.div>
        <div className='p-4'>
          <h2 className='text-xl font-sans font-medium mb-2'>{description}</h2>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoriesFestival;
