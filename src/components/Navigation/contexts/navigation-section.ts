import React from 'react';

export type NavigationSection = string | undefined;

export const NavigationSectionContext = React.createContext<NavigationSection>(undefined);
