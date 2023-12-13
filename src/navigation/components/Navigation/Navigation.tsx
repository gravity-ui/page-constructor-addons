import type {RefObject} from 'react';
import React, {useCallback, useEffect, useState} from 'react';

import {block} from '../../../utils/cn';
import {NO_MENU_TAB_SELECTED, SWITCH_MENU_TAB_TIMEOUT} from '../../constants';
import {NavigationSectionContext} from '../../contexts/navigation-section';
import {
    NavigationItemType,
    NavigationSectionData,
    PopupData,
    SetupRouteChangeHandler,
} from '../../models';
import {LargePopup, LargePopupProps} from '../popups/LargePopup/LargePopup';
import {MediumPopup} from '../popups/MediumPopup/MediumPopup';
import {MediumPopupWithCategories} from '../popups/MediumPopupWithCategories/MediumPopupWithCategories';

import {NavigationItem} from './NavigationItem/NavigationItem';
import {NavigationPopup} from './NavigationPopup/NavigationPopup';

import './Navigation.scss';

const b = block('navigation');
const tooltipPrefixId = 'navigation-item-key';

interface NavigationProps {
    data: NavigationSectionData[];
    withBackground: boolean;
    handleOpenPopup: () => void;
    handleClosePopup: () => void;
    headerRef?: RefObject<HTMLDivElement>;
    setupRouteChangeHandler?: SetupRouteChangeHandler;
}

const getPopupContent = (sectionData: NavigationSectionData) => {
    const {type, data} = sectionData;

    switch (type) {
        case NavigationItemType.LargePopup:
            return <LargePopup {...(sectionData as LargePopupProps)} />;
        case NavigationItemType.MediumPopup:
            return <MediumPopup data={data as PopupData} />;
        case NavigationItemType.MediumPopupWithCategories:
            return <MediumPopupWithCategories data={data as PopupData} />;
        default:
            return null;
    }
};

export const Navigation: React.FC<NavigationProps> = ({
    data,
    headerRef,
    handleOpenPopup,
    handleClosePopup,
    withBackground,
    setupRouteChangeHandler,
}) => {
    const [activeTab, setActiveTab] = useState(NO_MENU_TAB_SELECTED);
    const [pretendentActiveTab, setPretendentAciveTab] = useState(NO_MENU_TAB_SELECTED);
    const [previouslyFocusedElement, setPreviouslyFocusedElement] = useState<HTMLElement | null>(
        null,
    );

    const handleActiveTab = useCallback((currentIndex: number) => {
        setPreviouslyFocusedElement(document.activeElement as HTMLElement);
        setPretendentAciveTab(currentIndex);
    }, []);

    const onEscapeKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveTab(NO_MENU_TAB_SELECTED);
                setPretendentAciveTab(NO_MENU_TAB_SELECTED);
                previouslyFocusedElement?.focus();
            }
        },
        [previouslyFocusedElement],
    );

    useEffect(
        () =>
            setupRouteChangeHandler?.(() => {
                handleActiveTab(NO_MENU_TAB_SELECTED);
            }),
        [setupRouteChangeHandler, handleActiveTab],
    );

    useEffect(() => {
        const timerId = setTimeout(() => {
            setActiveTab(pretendentActiveTab);
        }, SWITCH_MENU_TAB_TIMEOUT);

        return () => clearTimeout(timerId);
    }, [activeTab, pretendentActiveTab]);

    useEffect(() => {
        document.addEventListener('keydown', onEscapeKeyDown);

        return () => {
            document.removeEventListener('keydown', onEscapeKeyDown);
        };
    }, [onEscapeKeyDown]);

    return (
        <nav>
            <ul className={b()}>
                {data.map((item, i) => {
                    const {type, section} = item;
                    const isMediumPopup =
                        type === NavigationItemType.MediumPopup ||
                        type === NavigationItemType.MediumPopupWithCategories;

                    const popupClassName = isMediumPopup ? b('popup', {medium: true}) : undefined;
                    const uniqId = `${tooltipPrefixId}-${i}`;

                    return (
                        <NavigationSectionContext.Provider value={section} key={item.title}>
                            <NavigationItem
                                item={item}
                                handleActiveTab={handleActiveTab}
                                handleClosePopup={handleClosePopup}
                                handleOpenPopup={handleOpenPopup}
                                index={i}
                                isActive={activeTab === i}
                                tooltipId={uniqId}
                            >
                                {activeTab === i && type !== NavigationItemType.Link && (
                                    <NavigationPopup
                                        withBackground={withBackground}
                                        headerRef={headerRef}
                                        className={popupClassName}
                                        id={uniqId}
                                    >
                                        {getPopupContent(item)}
                                    </NavigationPopup>
                                )}
                            </NavigationItem>
                        </NavigationSectionContext.Provider>
                    );
                })}
            </ul>
        </nav>
    );
};
