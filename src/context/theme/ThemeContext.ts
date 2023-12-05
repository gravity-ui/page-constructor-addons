import React from 'react';

import {DEFAULT_THEME} from '../../constants';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

export interface ThemeContextProps {
    theme: Theme;
}

export const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
};

export const ThemeContext = React.createContext(initialValue);
