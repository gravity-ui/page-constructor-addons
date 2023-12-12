import React from 'react';

export type MobileContextProps = boolean;

export const MobileContext = React.createContext<MobileContextProps>(false);
