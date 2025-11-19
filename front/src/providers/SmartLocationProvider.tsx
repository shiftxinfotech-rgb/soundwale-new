import {
  getLastKnownLocation,
  LocationStatus,
  SmartLocation,
  useSmartLocation,
} from '@hooks';
import React, {createContext, useContext, useEffect, useState} from 'react';

interface SmartLocationContextValue {
  location: SmartLocation | null;
  status: LocationStatus;
  refetch: () => void;
}

const SmartLocationContext = createContext<SmartLocationContextValue | null>(
  null,
);

export const useSmartLocationContext = (): SmartLocationContextValue => {
  const ctx = useContext(SmartLocationContext);
  if (!ctx) {
    throw new Error(
      'useSmartLocationContext must be used within SmartLocationProvider',
    );
  }
  return ctx;
};

interface SmartLocationProviderProps {
  children: React.ReactNode;
  fallbackCity?: string;
  staleTime?: number;
}

export const SmartLocationProvider: React.FC<SmartLocationProviderProps> = ({
  children,
  staleTime = 60000,
}) => {
  const [initialLocation, setInitialLocation] = useState<SmartLocation | null>(
    null,
  );

  useEffect(() => {
    setInitialLocation(getLastKnownLocation());
  }, []);

  const {location, status, refetch} = useSmartLocation({
    watch: false,
    staleTime,
  });

  const activeLocation = location ?? initialLocation;
  const activeStatus = location ? status : initialLocation ? 'success' : status;

  return (
    <SmartLocationContext.Provider
      value={{location: activeLocation, status: activeStatus, refetch}}>
      {children}
    </SmartLocationContext.Provider>
  );
};
