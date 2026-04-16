import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { startTracking } from './ut/startTracking';

const Layout = () => {
  useEffect(() => {
    
    const stopTracking = startTracking();

    return () => stopTracking();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;