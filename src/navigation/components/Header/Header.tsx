import React, {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {ChevronLeft} from '@gravity-ui/icons';
import {OverflowScroller, Theme} from '@gravity-ui/page-constructor';
import {Button, Icon} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {AnalyticsContext, AnalyticsContextProps} from '../../contexts/analytics';
import {Device, DeviceContext} from '../../contexts/device';
import {LocationContext, LocationContextProps} from '../../contexts/location';
import {MobileContext} from '../../contexts/mobile';
import {
    HeaderNavigationData,
    Locale,
    NavigationSectionType,
    ServicesData,
    SolutionsData,
} from '../../models';
import {getMobilePopupData, prepareNavigationConfig} from '../../utils';
import {ButtonsContainer} from '../ButtonsContainer/ButtonsContainer';
import {LangSwitch} from '../LangSwitch/LangSwitch';
import Logo from '../Logo/Logo';
import {MobileNavigation} from '../MobileNavigation/MobileNavigation';
import {Navigation} from '../Navigation/Navigation';
import {Search} from '../Search/Search';

import './Header.scss';

const b = block('cloud-header');

export const MOBILE_ICON_SIZE = 24;

export interface CustomElements {
    left?: ReactNode;
    right?: ReactNode;
    actions?: ReactNode;
}
export interface HeaderProps {
    theme: Theme;
    data: HeaderNavigationData;
    servicesData: ServicesData;
    solutionsData: SolutionsData;
    locales: Locale[];
    isMobile?: boolean;
    device?: Device;
    analytics?: AnalyticsContextProps;
    location?: LocationContextProps;
    customElements?: CustomElements;
}

export const Header: React.FC<HeaderProps> = ({
    theme = Theme.Light,
    data,
    analytics = {},
    isMobile,
    locales,
    servicesData,
    solutionsData,
    device,
    location = {},
    customElements,
}) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [withBackground, setWithBackground] = useState(false);
    const [withShadow, setWithShadow] = useState(true);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
    const [pageHasScroll, setPageHasScroll] = useState(false);
    const locale = useMemo(() => locales.find(({active}) => active), [locales]);
    const {left, right, actions} = customElements || {};
    const {logo, search, langSwitch, buttons: buttonConfigs, navigation} = data;

    const buttons = buttonConfigs?.map(({analyticsEvents, ...button}) => ({
        ...button,
        onClick: analyticsEvents
            ? () => {
                  analytics?.sendEvents?.(
                      Array.isArray(analyticsEvents) ? analyticsEvents : [analyticsEvents],
                  );
              }
            : undefined,
    }));

    const largePopupData = useMemo(() => {
        return {
            services: servicesData,
            solutions: solutionsData,
        };
    }, [servicesData, solutionsData]);

    const mobileLargePopupData = useMemo(() => {
        return {
            services: getMobilePopupData(servicesData, NavigationSectionType.Services),
            solutions: getMobilePopupData(solutionsData, NavigationSectionType.Solutions),
        };
    }, [servicesData, solutionsData]);

    const desktopNavigationConfig = navigation
        ? prepareNavigationConfig(navigation, largePopupData)
        : undefined;
    const mobileNavigationConfig = navigation
        ? prepareNavigationConfig(navigation, mobileLargePopupData)
        : undefined;

    const showButtonsContainer = isMobile
        ? !navigation && buttons && buttons.length === 1
        : Boolean(buttons);

    const openSearch = useCallback(() => {
        setIsSearchMode(true);
    }, []);

    const closeSearch = useCallback(() => {
        setIsSearchMode(false);
    }, []);

    const handleOpenPopup = useCallback(() => {
        setIsPopupOpen(true);
    }, []);

    const handleClosePopup = useCallback(() => {
        setIsPopupOpen(false);
    }, []);

    const toggleMobileNavigationPopup = useCallback(
        (isOpened: boolean) => {
            setIsMobileNavigationOpen(isOpened);

            // disable header's shadow on mobile with opened menu and if page was scrolled
            if (isOpened && pageHasScroll) {
                setWithShadow(false);
            }
        },
        [pageHasScroll],
    );

    const onMenuScroll = useCallback(
        (scrollTop: number) => {
            // enable header's shadow on mobile if mobile menu started to scroll
            setWithShadow(scrollTop > 0);

            if (!pageHasScroll) {
                setWithBackground(scrollTop > 0);
            }
        },
        [pageHasScroll],
    );

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.pageYOffset;

            if (scrollTop === 0 && withBackground) {
                setWithBackground(false);
            } else if (scrollTop > 0 && !withBackground) {
                setWithBackground(true);
            }

            if (scrollTop === 0 && pageHasScroll) {
                setPageHasScroll(false);
            } else if (scrollTop > 0 && !pageHasScroll) {
                setPageHasScroll(true);
            }
        };

        onScroll();
    });

    // TODO - try rewrite using browser api
    //     const onRouteChange = () => {
    //         setIsMobileNavigationOpen(false);
    //     };

    //     router.events?.on('routeChangeComplete', onRouteChange);
    //     router.events?.on('hashChangeComplete', onRouteChange);

    //     window.addEventListener('scroll', onScroll);

    //     return () => {
    //         window.removeEventListener('scroll', onScroll);

    //         router.events?.off('routeChangeComplete', onRouteChange);
    //         router.events?.off('hashChangeComplete', onRouteChange);
    //     };
    // }, [pageHasScroll, router.events, withBackground]);
    return (
        <LocationContext.Provider value={location}>
            <AnalyticsContext.Provider value={analytics}>
                <DeviceContext.Provider value={device}>
                    <MobileContext.Provider value={Boolean(isMobile)}>
                        <header
                            className={b({
                                'with-background': withBackground,
                                'with-shadow': withShadow,
                                search: isSearchMode,
                                'open-popup': isPopupOpen,
                                'one-row': !desktopNavigationConfig,
                            })}
                            ref={headerRef}
                        >
                            <div className={b('container')}>
                                <div className={b('left')}>
                                    {logo && (
                                        <Logo
                                            {...logo}
                                            theme={theme}
                                            className={b('logo')}
                                            imageClassName={b('logo-img')}
                                        />
                                    )}
                                    {isMobile && (
                                        <Button view="flat" size="l" className={b('back')}>
                                            <Icon data={ChevronLeft} size={MOBILE_ICON_SIZE} />
                                        </Button>
                                    )}
                                    {left}
                                </div>
                                <div className={b('right')}>
                                    <div className={b('icons-container')}>
                                        {search && (
                                            <Search
                                                text={search}
                                                closeSearch={closeSearch}
                                                openSearch={openSearch}
                                                isSearchMode={isSearchMode}
                                                iconClassName={b('icon')}
                                            />
                                        )}
                                        {langSwitch && (
                                            <LangSwitch
                                                text={locale?.region}
                                                iconClassName={b('icon')}
                                                isSearchMode={isSearchMode}
                                                locales={locales}
                                                showText={!isMobile}
                                            />
                                        )}
                                    </div>
                                    {showButtonsContainer && (
                                        <ButtonsContainer
                                            buttons={buttons}
                                            className={b('buttons')}
                                        >
                                            {actions}
                                        </ButtonsContainer>
                                    )}
                                    {right}
                                    {mobileNavigationConfig ? (
                                        <MobileNavigation
                                            toogleOpen={toggleMobileNavigationPopup}
                                            isOpened={isMobileNavigationOpen}
                                            isSearchOpen={isSearchMode}
                                            data={mobileNavigationConfig}
                                            buttons={buttons}
                                            onMenuScroll={onMenuScroll}
                                            popupClassName={b('user-popup')}
                                            customElements={customElements}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            {desktopNavigationConfig ? (
                                <div className={b('scroller')}>
                                    <OverflowScroller
                                        arrowClassName={b('scroll-arrow')}
                                        arrowSize={14}
                                    >
                                        <Navigation
                                            data={desktopNavigationConfig}
                                            headerRef={headerRef}
                                            handleOpenPopup={handleOpenPopup}
                                            handleClosePopup={handleClosePopup}
                                            withBackground={withBackground}
                                        />
                                    </OverflowScroller>
                                </div>
                            ) : null}
                        </header>
                    </MobileContext.Provider>
                </DeviceContext.Provider>
            </AnalyticsContext.Provider>
        </LocationContext.Provider>
    );
};
