import React, {Fragment} from 'react';

import {AnalyticsContext, Theme} from '@gravity-ui/page-constructor';

import {AnalyticsContextProps} from '../../contexts/analytics';
import {DeviceContext, DeviceContextProps} from '../../contexts/device';
import {LocationContext, LocationContextProps} from '../../contexts/location';
import {MobileContext, MobileContextProps} from '../../contexts/mobile';
import {ThemeContext, ThemeContextProps} from '../../contexts/theme';

import {Header as HeaderComponent, HeaderProps as HeaderComponentProps} from './Header';

export interface HeaderProps extends HeaderComponentProps {
    isMobile?: MobileContextProps;
    location?: LocationContextProps;
    analytics?: AnalyticsContextProps;
    device?: DeviceContextProps;
    theme?: ThemeContextProps;
}

export const Header = (props: HeaderProps) => {
    const {
        isMobile,
        theme = Theme.Light,
        location = {},
        analytics = {},
        device = {},
        ...rest
    } = props;

    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeContext.Provider value={theme} />,
        <LocationContext.Provider value={location} />,
        <MobileContext.Provider value={Boolean(isMobile)} />,
        <DeviceContext.Provider value={device} />,
        <AnalyticsContext.Provider value={analytics} />,
    ].reduceRight(
        (prev, provider) => React.cloneElement(provider, {}, prev),
        <HeaderComponent {...rest} />,
    );
    /* eslint-enable react/jsx-key */

    return <Fragment>{context}</Fragment>;
};
