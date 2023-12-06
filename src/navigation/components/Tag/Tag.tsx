import React from 'react';

import {block} from '../../../utils/cn';

import './ServiceTag.scss';

const b = block('ServiceTag');

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
