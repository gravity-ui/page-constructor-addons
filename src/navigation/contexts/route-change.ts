import React from 'react';

export type RouteChangeHandlerContextProps = (handler: () => void) => void;

export const RouteChangeHandlerContext = React.createContext<
    RouteChangeHandlerContextProps | undefined
>(undefined);
