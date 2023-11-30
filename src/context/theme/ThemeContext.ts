import React from 'react';

import {Theme} from '@gravity-ui/page-constructor';

import {DEFAULT_THEME} from '../../constants';

export interface ThemeContextProps {
    theme: Theme;
}

export const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
};

export const ThemeContext = React.createContext(initialValue);
