import type {FC} from 'react';
import React from 'react';

import {Row} from '@gravity-ui/page-constructor';

import {NavigationItemExtended, NavigationSectionType} from '../../../models';
import {NavigationPopupItem} from '../NavigationPopupItem/NavigationPopupItem';

interface NavigationItemsListProps {
    items: NavigationItemExtended[];
    section: NavigationSectionType;
    itemClassName?: string;
    className?: string;
}

export const NavigationItemsList: FC<NavigationItemsListProps> = ({
    items,
    itemClassName,
    className,
}) => {
    return (
        <Row className={className}>
            {items.map((item) => (
                <NavigationPopupItem {...item} className={itemClassName} key={item.slug} hover />
            ))}
        </Row>
    );
};
