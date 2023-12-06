import type {FC, ReactNode} from 'react';
import React, {useCallback, useContext} from 'react';

import {getLinkProps} from '@gravity-ui/page-constructor';

import {useIsCurrentPage} from '../../../../hooks/useIsCurrentPage';
import {block} from '../../../../utils/cn';
import {NO_MENU_TAB_SELECTED} from '../../../constants';
import {AnalyticsContext} from '../../../contexts/analytics';
import {LocationContext} from '../../../contexts/location';
import {AnalyticsEventType, NavigationItemModel, NavigationItemType} from '../../../models';

import './NavigationItem.scss';

const b = block('navigation-item');

interface NavigationItemOwnProps {
    item: NavigationItemModel;
    isActive: boolean;
    handleOpenPopup: () => void;
    handleClosePopup: () => void;
    handleActiveTab: (currentIndex: number) => void;
    index: number;
    children?: ReactNode;
    tooltipId?: string;
}

export const NavigationItem: FC<NavigationItemOwnProps> = ({
    item,
    isActive,
    handleActiveTab,
    handleOpenPopup,
    handleClosePopup,
    index,
    children,
    tooltipId,
}) => {
    const {type, title, link, section} = item;
    const {hostname} = useContext(LocationContext);
    const linkProps = link && getLinkProps(link?.url, hostname, link?.target);
    const isPopupExist =
        type === NavigationItemType.LargePopup ||
        type === NavigationItemType.MediumPopup ||
        type === NavigationItemType.MediumPopupWithCategories;

    const {sendEvents} = useContext(AnalyticsContext) || {};
    const handleMouseEnter = useCallback(() => {
        handleActiveTab(index);

        if (isPopupExist) {
            handleOpenPopup();
        }
    }, [handleActiveTab, handleOpenPopup, index, isPopupExist]);

    const handleMouseLeave = useCallback(() => {
        if (isPopupExist) {
            handleClosePopup();
        }
        handleActiveTab(NO_MENU_TAB_SELECTED);
    }, [handleActiveTab, handleClosePopup, isPopupExist]);

    // TODO fix with native browser location
    // useEffect(() => {
    //     router.events?.on('routeChangeComplete', handleMouseLeave);
    //     router.events?.on('hashChangeComplete', handleMouseLeave);

    //     return () => {
    //         router.events?.off('routeChangeComplete', handleMouseLeave);
    //         router.events?.off('hashChangeComplete', handleMouseLeave);
    //     };
    // });

    const handleOnClick = useCallback(() => {
        sendEvents?.([
            {
                name: AnalyticsEventType.PopupItemClick,
                params: {url: link?.url, section},
            },
        ]);
    }, [link?.url, section, sendEvents]);

    const isCurrentPage = useIsCurrentPage(link?.url);

    return (
        <li
            key={title}
            className={b({})}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {type === NavigationItemType.Link ? (
                <a
                    className={b('text', {active: isActive})}
                    href={link?.url}
                    {...linkProps}
                    onClick={handleOnClick}
                    aria-current={isCurrentPage ? 'page' : undefined}
                >
                    {title}
                </a>
            ) : (
                <button
                    className={b('text', {active: isActive, cursor: 'default'})}
                    onClick={handleMouseEnter}
                    aria-expanded={isActive}
                    aria-controls={tooltipId}
                >
                    {title}
                </button>
            )}
            {children}
        </li>
    );
};
