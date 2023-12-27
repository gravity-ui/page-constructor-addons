import React, {
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import {ChevronLeft} from '@gravity-ui/icons';
import {ClassNameProps, OverflowScroller} from '@gravity-ui/page-constructor';
import {Button, Icon} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {ButtonsContainer} from '../../components/ButtonsContainer/ButtonsContainer';
import {LangSwitch} from '../../components/LangSwitch';
import Logo from '../../components/Logo/Logo';
import {MobileNavigation} from '../../components/MobileNavigation/MobileNavigation';
import {Navigation} from '../../components/Navigation/Navigation';
import {AnalyticsContext} from '../../contexts/analytics';
import {MobileContext} from '../../contexts/mobile';
import {RouteChangeHandlerContext} from '../../contexts/route-change';
import {ThemeContext} from '../../contexts/theme';
import {NavigationData, SetupRouteChangeHandler} from '../../models';

import './Header.scss';

const b = block('cloud-header');

export const MOBILE_ICON_SIZE = 24;

export interface CustomElements {
    left?: ReactNode;
    right?: ReactNode;
    actions?: ReactNode;
}
export interface HeaderProps extends ClassNameProps {
    data: NavigationData;
    customElements?: CustomElements;
    // TODO: remove when search suggest will be opensourced
    renderSearch?: (props: {onActiveToggle: (isActive: boolean) => void}) => ReactNode;
    setupRouteChangeHandler?: SetupRouteChangeHandler;
}

export const Header: React.FC<HeaderProps> = ({
    data,
    customElements,
    setupRouteChangeHandler,
    renderSearch,
    className,
}) => {
    const {logo, langSwitchItems, buttons: buttonConfigs, navigation} = data;
    const headerRef = useRef<HTMLDivElement>(null);
    const [withBackground, setWithBackground] = useState(false);
    const [withShadow, setWithShadow] = useState(true);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
    const [pageHasScroll, setPageHasScroll] = useState(false);
    const langSwitchActiveItem = useMemo(
        () => langSwitchItems?.find(({active}) => active),
        [langSwitchItems],
    );
    const {left, right, actions} = customElements || {};

    const analytics = useContext(AnalyticsContext);
    const isMobile = useContext(MobileContext);
    const theme = useContext(ThemeContext);

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

    const showButtonsContainer = isMobile
        ? !navigation && buttons && buttons.length === 1
        : Boolean(buttons);

    const toggleSearch = useCallback((isActive: boolean) => setIsSearchMode(isActive), []);

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
        window.addEventListener('scroll', onScroll);
        onScroll();
    });

    useEffect(
        () =>
            setupRouteChangeHandler?.(() => {
                handleClosePopup();
                setIsMobileNavigationOpen(false);
            }),
        [setupRouteChangeHandler, handleClosePopup],
    );

    return (
        <RouteChangeHandlerContext.Provider value={setupRouteChangeHandler}>
            <header
                className={b(
                    {
                        'with-background': withBackground,
                        'with-shadow': withShadow,
                        search: isSearchMode,
                        'open-popup': isPopupOpen,
                        'one-row': !navigation,
                    },
                    className,
                )}
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
                            {renderSearch && renderSearch({onActiveToggle: toggleSearch})}
                            {langSwitchItems && (
                                <LangSwitch
                                    text={langSwitchActiveItem?.title}
                                    iconClassName={b('icon')}
                                    isSearchMode={isSearchMode}
                                    items={langSwitchItems}
                                    showText={!isMobile}
                                    isMobile={isMobile}
                                />
                            )}
                        </div>
                        {showButtonsContainer && (
                            <ButtonsContainer buttons={buttons} className={b('buttons')}>
                                {actions}
                            </ButtonsContainer>
                        )}
                        {right}
                        {navigation ? (
                            <MobileNavigation
                                toogleOpen={toggleMobileNavigationPopup}
                                isOpened={isMobileNavigationOpen}
                                isSearchOpen={isSearchMode}
                                data={navigation}
                                buttons={buttons}
                                onMenuScroll={onMenuScroll}
                                popupClassName={b('user-popup')}
                                customElements={customElements}
                            />
                        ) : null}
                    </div>
                </div>
                {navigation ? (
                    <div className={b('scroller')}>
                        <OverflowScroller arrowClassName={b('scroll-arrow')} arrowSize={14}>
                            <Navigation
                                data={navigation}
                                headerRef={headerRef}
                                handleOpenPopup={handleOpenPopup}
                                handleClosePopup={handleClosePopup}
                                withBackground={withBackground}
                            />
                        </OverflowScroller>
                    </div>
                ) : null}
            </header>
        </RouteChangeHandlerContext.Provider>
    );
};
