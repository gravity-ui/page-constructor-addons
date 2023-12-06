import React from 'react';

export type Device = {
    model?: string;
};

export const DeviceContext = React.createContext<Device | undefined>(undefined);
