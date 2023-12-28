import React from 'react';

export type LocationContextProps = {
    search?: string;
    hash?: string;
    pathname?: string;
    hostname?: string;
    asPath?: string;
};

export const LocationContext = React.createContext<LocationContextProps>({});
