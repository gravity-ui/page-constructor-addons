import React from 'react';

import {block} from '../../../utils/cn';

import './Tag.scss';

const b = block('navigation-tag');

export enum NavigationTagColor {
    Green = 'green',
    Yellow = 'yellow',
    Blue = 'blue',
}

export interface NavigationTagProps {
    text: string;
    color?: NavigationTagColor;
    className?: string;
    size?: 's' | 'm';
}

export const NavigationTag: React.FC<NavigationTagProps> = ({
    text,
    color = NavigationTagColor.Yellow,
    className,
    size = 'm',
}) => {
    return <div className={b({size, color}, className)}>{text}</div>;
};
