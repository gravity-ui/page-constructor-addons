import React from 'react';

export type DeviceContextProps = {
    model?: string;
};

export const DeviceContext = React.createContext<DeviceContextProps>({});
