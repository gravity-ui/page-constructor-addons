import type {FC} from 'react';
import React from 'react';

import {Row} from '@gravity-ui/page-constructor';

import {NavigationItem} from '../../../models';
import {NavigationPopupItem} from '../NavigationPopupItem/NavigationPopupItem';

interface NavigationItemsListProps {
    items: NavigationItem[];
    section?: string;
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
