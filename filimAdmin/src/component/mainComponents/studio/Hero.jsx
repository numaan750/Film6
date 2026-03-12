'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Advancing from './Advancing';
import TopListing from './TopListing';
import Robot from './Robot';
import Competition from './Competition';
import Runway from './Runway';
import TopList2 from './TopList2';
import Competate3 from './Competate3';
import NewCards from './NewCards';

const Hero = () => {
  // New state for studio ID
  const [studioId, setStudioId] = useState(null);
  const [alt, setAlt] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  console.log(image);

  const [advance, setAdvance] = useState({
    title: '',
    title2: '',
    description: '',
  });
  const [card1, setCard1] = useState({
    mainTitle: '',
    description: '',
    
  })
  const [card2,setCard2] = useState('');
  const [card3,setCard3] = useState('');
  const [card4,setCard4] = useState('');
  const [card5,setCard5] = useState('');
  const [card6,setCard6] = useState('');
  const [card1Image, setCard1Image] = useState(false);
  const [card2Image, setCard2Image] = useState(false);
  const [card3Image, setCard3Image] = useState(false);
  const [card4Image, setCard4Image] = useState(false);
  const [card5Image, setCard5Image] = useState(false);
  const [card6Image, setCard6Image] = useState(false);

  const [toplist, setToplist] = useState({
    alt: '',
    title: '',
    genre: '',
    description2: '',
    line: '',
    description: '',
    button: '',
    link:'',
  });
  const [toplistImage, setToplistImage] = useState(false);

  const [robot, setRobot] = useState({
    alt: '',
    title: '',
    genre: '',
    description: '',
    description2: '',
    button: '',
    link: '',
  });
  const [robotImage, setRobotImage] = useState(false);

  const [competate, setCompetate] = useState({
    alt: '',
    title: '',
    genre: '',
    line: '',
    description: '',
    description2: '',
    button: '',
    link: '',
  });
  const [competateImage, setCompetateImage] = useState(false);

  const [competate3, setCompetate3] = useState({
    alt: '',
    title: '',
    genre: '',
    description: '',
    description2: '',
    button: '',
    link: '',
  });

  const [competateImage3, setCompetateImage3] = useState(false);

  const [runway, setRunway] = useState({
    alt: '',
    title: '',
    genre: '',
    description: '',
    description2: '',
    button: '',
    link: '',
  });
  const [runwayImage, setRunwayImage] = useState(false);
  const [toplist3, setToplist3] = useState({
    alt: '',
    title: '',
    genre: '',
    description2: '',
    line: '',
    description: '',
    button: '',
    link: '',
  });

  const [toplist3Image, setToplist3Image] = useState(false);
  const [description, setDescription] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/studio/getstudio`
        );
        if (data.studio && data.studio.length > 0) {
          const homeData = data.studio[0];
          setStudioId(homeData._id);

          if (homeData.hero) {
            setTitle(homeData.hero.title || '');
            setDescription(homeData.hero.description || '');
            setAlt(homeData.hero.alt || '');
            setImage(homeData.hero.bgImage || []);
          }

          if (homeData.advance) {
            setAdvance(homeData.advance);
          }
          if(homeData.card1){
            setCard1(homeData.card1);
            setCard1Image(homeData.card1.catogryImage);
          }
          if(homeData.card2){
            setCard2(homeData.card2);
            setCard2Image(homeData.card2.catogryImage);
          }
          if(homeData.card3){
            setCard3(homeData.card3);
            setCard3Image(homeData.card3.catogryImage);
          }
          if(homeData.card4){
            setCard4(homeData.card4);
            setCard4Image(homeData.card4.catogryImage);
          }
          if(homeData.card5){
            setCard5(homeData.card5);
            setCard5Image(homeData.card5.catogryImage);
          }
          if(homeData.card6){
            setCard6(homeData.card6);
            setCard6Image(homeData.card6.catogryImage);
          }
          if (homeData.toplist) {
            setToplist(homeData.toplist);
            setToplistImage(homeData.toplist.bgImage || null);
          }
          if (homeData.competate) {
            setRobot(homeData.competate);
            setRobotImage(homeData.competate.bgImage || null);
          }
          if (homeData.toplist2) {
            setCompetate(homeData.toplist2);
            setCompetateImage(homeData.toplist2.bgImage || null);
          }
          if (homeData.competate2) {
            setRunway(homeData.competate2);
            setRunwayImage(homeData.competate2.bgImage || null);
          }
          if (homeData.toplist3) {
            setToplist3(homeData.toplist3);
            setToplist3Image(homeData.toplist3.bgImage || null);
          }
          if (homeData.competate3) {
            setCompetate3(homeData.competate3);
            setCompetateImage3(homeData.competate3.bgImage || null);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      const heroData = { title, alt, description };
      const card2Data = {  description: card2.description };
      const card3Data = { description: card3.description };
      const card4Data = {  description: card4.description };
      const card5Data = {  description: card5.description };
      const card6Data = {  description: card6.description };
      formData.append("card1", JSON.stringify(card1));
      formData.append('card2', JSON.stringify(card2Data));
      formData.append('card3', JSON.stringify(card3Data));
      formData.append('card4', JSON.stringify(card4Data));
      formData.append('card5', JSON.stringify(card5Data));
      formData.append('card6', JSON.stringify(card6Data));
      formData.append('hero', JSON.stringify(heroData));
      formData.append('advance', JSON.stringify(advance));
      formData.append('toplist', JSON.stringify(toplist));
      formData.append('competate', JSON.stringify(robot));
      formData.append('toplist2', JSON.stringify(competate));
      formData.append('competate2', JSON.stringify(runway));
      formData.append('toplist3', JSON.stringify(toplist3));
      formData.append('competate3', JSON.stringify(competate3));

      if (Array.isArray(image)) {
        image.forEach((file) => {
          console.log('Appending file to FormData:', file.name);
          formData.append('heroImage', file);
        });
      }
      if (card1Image) formData.append('card1Image', card1Image);
      if (card2Image) formData.append('card2Image', card2Image);
      if (card3Image) formData.append('card3Image', card3Image);
      if (card4Image) formData.append('card4Image', card4Image);
      if (card5Image) formData.append('card5Image', card5Image);
      if (card6Image) formData.append('card6Image', card6Image);
      if (toplistImage) formData.append('toplistImage', toplistImage);
      if (robotImage) formData.append('competateImage', robotImage);
      if (competateImage) formData.append('toplistImage2', competateImage);
      if (runwayImage) formData.append('competateImage2', runwayImage);
      if (toplist3Image) formData.append('toplistImage3', toplist3Image);
      if (competateImage3) formData.append('competateImage3', competateImage3);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/studio/studioRoute`,
        formData
      );
      setStudioId(response.data.studio._id);
      toast.success('Studio page created successfully!');
      console.log('Create Response:', response.data);
    } catch (error) {
      console.error('Error creating data:', error);
      toast.error('Error submitting data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!studioId) {
      toast.error('No studio page found to update.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      const heroData = { title, alt, description };
      formData.append('hero', JSON.stringify(heroData));
      const card2Data = { description: card2.description };
      const card3Data = { description: card3.description };
      const card4Data = { description: card4.description };
      const card5Data = { description: card5.description };
      const card6Data = { description: card6.description };
      formData.append('card1', JSON.stringify(card1));
      formData.append('card2', JSON.stringify(card2Data));
      formData.append('card3', JSON.stringify(card3Data));
      formData.append('card4', JSON.stringify(card4Data));
      formData.append('card5', JSON.stringify(card5Data));
      formData.append('card6', JSON.stringify(card6Data));
      formData.append('advance', JSON.stringify(advance));
      formData.append('toplist', JSON.stringify(toplist));
      formData.append('competate', JSON.stringify(robot));
      formData.append('toplist2', JSON.stringify(competate));
      formData.append('competate2', JSON.stringify(runway));
      formData.append('toplist3', JSON.stringify(toplist3));
      formData.append('competate3', JSON.stringify(competate3));

      if (Array.isArray(image)) {
        image.forEach((file) => {
          console.log('Appending file to FormData:', file.name);
          formData.append('heroImage', file);
        });
      }

      if(card1Image) formData.append('card1Image', card1Image);
      if(card2Image) formData.append('card2Image', card2Image);
      if(card3Image) formData.append('card3Image', card3Image);
      if(card4Image) formData.append('card4Image', card4Image);
      if(card5Image) formData.append('card5Image', card5Image);
      if(card6Image) formData.append('card6Image', card6Image);
      if (toplistImage) formData.append('toplistImage', toplistImage);
      if (robotImage) formData.append('competateImage', robotImage);
      if (competateImage) formData.append('toplistImage2', competateImage);
      if (runwayImage) formData.append('competateImage2', runwayImage);
      if (toplist3Image) formData.append('toplistImage3', toplist3Image);
      if (competateImage3) formData.append('competateImage3', competateImage3);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/studio/updateStudio/${studioId}`,
        formData
      );
      toast.success('Studio page updated successfully!');
      console.log('Update Response:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating data');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className=''>
      <div className='p-4 border'>
        <h1 className='mt-4 mb-12 text-center text-3xl font-semibold'>
          Header
        </h1>
        <form>
          <div className='rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36'>
            <label
              htmlFor='upload2'
              className='flex flex-col items-center gap-2 cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-10 w-10 fill-white stroke-indigo-500'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              <span className='text-gray-600 font-medium'>Upload file</span>
            </label>
            <input
              onChange={(e) => setImage(Array.from(e.target.files))}
              id='upload2'
              type='file'
              accept='video/*'
              multiple
              className='hidden'
            />
          </div>
          {/* Video Preview */}
          {Array.isArray(image) && image.length > 0 && (
            <div className='mt-4 flex gap-4 flex-wrap'>
              {image.map((item, index) => (
                <div key={index} className='relative -z-30'>
                  <video
                    src={
                      typeof item === 'string'
                        ? item
                        : URL.createObjectURL(item)
                    }
                    controls
                    className='w-36 h-auto'
                  />
                </div>
              ))}
            </div>
          )}
          <div className='mt-8'>
            <div className='mb-4'>
              <h1 className='text-black'>ALT TEXT</h1>
              <input
                type='text'
                placeholder='Alt Text'
                className='border border-black px-3 py-2 mt-2 outline-0'
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <h1 className='text-black'>TITLE</h1>
              <input
                type='text'
                placeholder='Title'
                className='border border-black px-3 py-2 mt-2 outline-0 w-full'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <h1 className='text-black'> Description </h1>
              <input
                type='text'
                placeholder='description'
                className='border border-black px-3 py-2 mt-2 outline-0 w-full'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      {/* Other Components */}
      <Advancing advance={advance} setAdvance={setAdvance} />
      <NewCards
        card1={card1}
        setCard1={setCard1}
        card2={card2}
        setCard2={setCard2}
        card3={card3}
        setCard3={setCard3}
        card4={card4}
        setCard4={setCard4}
        card5={card5}
        setCard5={setCard5}
        card6={card6}
        setCard6={setCard6}
        card1Image={card1Image}
        setCard1Image={setCard1Image}
        card2Image={card2Image}
        setCard2Image={setCard2Image}
        card3Image={card3Image}
        setCard3Image={setCard3Image}
        card4Image={card4Image}
        setCard4Image={setCard4Image}
        card5Image={card5Image}
        setCard5Image={setCard5Image}
        card6Image={card6Image}
        setCard6Image={setCard6Image}
      />
      <TopListing
        toplist={toplist}
        setToplist={setToplist}
        toplistImage={toplistImage}
        setToplistImage={setToplistImage}
      />
      <Robot
        robot={robot}
        setRobot={setRobot}
        robotImage={robotImage}
        setRobotImage={setRobotImage}
      />
      <Competition
        competate={competate}
        setCompetate={setCompetate}
        competateImage={competateImage}
        setCompetateImage={setCompetateImage}
      />
      <Runway
        runway={runway}
        setRunway={setRunway}
        runwayImage={runwayImage}
        setRunwayImage={setRunwayImage}
      />
      <TopList2
        toplist3={toplist3}
        setToplist3={setToplist3}
        toplist3Image={toplist3Image}
        setToplist3Image={setToplist3Image}
      />
      <Competate3
        competate3={competate3}
        setCompetate3={setCompetate3}
        competateImage3={competateImage3}
        setCompetateImage3={setCompetateImage3}
      />
      <div className='flex justify-end mt-8 mb-8'>
        {studioId ? (
          <button
            onClick={handleUpdate}
            type='button'
            disabled={loading}
            className='bg-blue-600 hover:bg-blue-800 cursor-pointer text-white px-12 py-2 rounded-sm'
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        ) : (
          <button
            onClick={handleCreate} // ← fixed!
            type='button'
            disabled={loading}
            className='bg-blue-600 hover:bg-blue-800 cursor-pointer text-white px-12 py-2 rounded-sm'
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        )}
        
      </div>
    </div>
  );
};

export default Hero;
