import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface OpenEnrollmentOptions {
  pathwayId?: string | null;
  duration?: '4-weeks' | '6-weeks' | '8-weeks' | null;
  source?: string;
}

export interface EnrollmentContextType {
  isOpen: boolean;
  pathwayId: string | null;
  duration: '4-weeks' | '6-weeks' | '8-weeks' | null;
  source: string;
  openEnrollment: (options?: OpenEnrollmentOptions) => void;
  closeEnrollment: () => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pathwayId, setPathwayId] = useState<string | null>(null);
  const [duration, setDuration] = useState<'4-weeks' | '6-weeks' | '8-weeks' | null>(null);
  const [source, setSource] = useState<string>('direct');

  const openEnrollment = useCallback((options?: OpenEnrollmentOptions) => {
    // Explicit Behavior Rules:
    // A) If button specifies pathway only:
    //    modal opens with that pathway selected, duration unselected (null).
    // B) If button specifies duration only:
    //    modal opens with that duration selected, pathway unselected (null).
    // C) If button specifies neither:
    //    modal opens with neither selected (clean state).
    // D/E) Assessment or Career Track detail:
    //    modal opens with designated pathway selected, duration unselected (null).
    const chosenPathway = options?.pathwayId || null;
    const chosenDuration = options?.duration || null;
    const chosenSource = options?.source || (
      chosenPathway ? 'career_tracks' : chosenDuration ? 'pricing_section' : 'cta_button'
    );

    setPathwayId(chosenPathway);
    setDuration(chosenDuration);
    setSource(chosenSource);
    setIsOpen(true);
  }, []);

  const closeEnrollment = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <EnrollmentContext.Provider
      value={{
        isOpen,
        pathwayId,
        duration,
        source,
        openEnrollment,
        closeEnrollment,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
};
