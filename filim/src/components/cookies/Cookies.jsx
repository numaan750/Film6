'use client';

import CookieConsent from 'react-cookie-consent';

const Cookies = () => {
  const handleAccept = () => {
    console.log('✅ Cookies Accepted');

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
      console.log('Consent sent to gtag ✅');
    } else {
      console.log('⚠️ gtag is not loaded yet.');
    }
  };

  const handleDecline = () => {
    console.log('❌ Cookies Declined');
  };

  return (
    <CookieConsent
      location='bottom'
      buttonText='Accept'
      declineButtonText='Decline'
      cookieName='mySiteCookieConsent'
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      expires={150}
      containerClasses='fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-1 z-[9999] flex  sm:flex-row items-start sm:items-center justify-between sm:gap-2'
      contentClasses='text-xs sm:text-sm m-0 p-0'
      buttonClasses='m-1 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-md transition duration-200'
      declineButtonClasses='bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm font-semibold rounded-md transition duration-200 sm:ml-2'
    >
      <p className='text-start m-0 p-0 text-xs sm:text-sm md:text-base font-sans'>
        We use cookies to improve your experience, analyze site traffic, and
        personalize content. You can accept or decline.
      </p>
    </CookieConsent>
  );
};

export default Cookies;
