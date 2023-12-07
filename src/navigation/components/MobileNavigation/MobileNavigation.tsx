import React, {Fragment} from 'react';

import {Bars, Xmark} from '@gravity-ui/icons';
import type {ButtonProps} from '@gravity-ui/page-constructor';
import {Button, Icon} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {NavigationItemModel} from '../../models';
import {ButtonsContainer, ButtonsContainerDirection} from '../ButtonsContainer/ButtonsContainer';
import {MOBILE_ICON_SIZE} from '../Header/Header';

import {MobileNavigationItem} from './MobileNavigationItem/MobileNavigationItem';
import {MobileNavigationPopup} from './MobileNavigationPopup/MobileNavigationPopup';

import './MobileNavigation.scss';

const b = block('cloud-mobile-navigation');

interface MobileNavigationProps {
    isOpened: boolean;
    toogleOpen: (isOpened: boolean) => void;
    isSearchOpen: boolean;
    data: NavigationItemModel[];
    onMenuScroll: (scrollTop: number) => void;
    popupClassName?: string;
    buttons?: ButtonProps[];
    hasActionButton?: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
    isOpened,
    toogleOpen,
    isSearchOpen,
    data,
    buttons,
    onMenuScroll,
    hasActionButton,
}) => {
    const icon = isOpened ? Xmark : Bars;

    return (
        <div className={b()}>
            <Button
                view="flat"
                size="l"
                className={b('icon', {hidden: isSearchOpen})}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    toogleOpen(!isOpened);
                }}
            >
                <Icon data={icon} size={MOBILE_ICON_SIZE} />
            </Button>
            <MobileNavigationPopup
                isOpened={isOpened}
                onClose={() => toogleOpen(false)}
                onMenuScroll={onMenuScroll}
            >
                <nav>
                    <ul className={b()}>
                        {data.map((item) => (
                            <li className={b()} key={item.title}>
                                <MobileNavigationItem data={item} />
                            </li>
                        ))}
                    </ul>
                    {buttons && (
                        <ButtonsContainer
                            buttons={buttons}
                            className={b('buttons')}
                            width="max"
                            direction={ButtonsContainerDirection.Column}
                            hasActionButton={hasActionButton}
                        />
                    )}
                    {/* <HeaderUser
                        className={b('user')}
                        size="l"
                        showUserInfo
                        popupClassName={popupClassName}
                    /> */}
                </nav>
            </MobileNavigationPopup>
        </div>
    );
};
