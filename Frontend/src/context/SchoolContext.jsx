import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '../utils/api';

const SchoolContext = createContext();

export const useSchool = () => {
  return useContext(SchoolContext);
};

export const SchoolProvider = ({ children }) => {
  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: 'New Public Higher Secondary School',
    shortName: 'NPHSS',
    address: 'Sunderbani, Rajouri, J&K - 185153',
    phone: '+91 95968 14606',
    email: 'info@nphss.edu.in',
    workingHours: 'Mon - Sat, 9am - 4pm',
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#'
  });

  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch(getApiUrl('/api/school'));
      const result = await response.json();
      if (result.success && result.data) {
        setSchoolSettings(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch school settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SchoolContext.Provider value={{ schoolSettings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SchoolContext.Provider>
  );
};
