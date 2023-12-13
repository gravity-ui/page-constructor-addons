import React from 'react';

export interface RouteChangeHandlerContextProps {
    setupRouteChangeHandler?: (handler: () => void) => void;
}

export const RouteChangeHandlerContext = React.createContext<
    RouteChangeHandlerContextProps | undefined
>({});
