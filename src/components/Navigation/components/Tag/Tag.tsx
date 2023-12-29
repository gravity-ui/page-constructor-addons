import React from 'react';

import {ClassNameProps} from '@gravity-ui/page-constructor';

import {block} from '../../../../utils/cn';
import {NavigationTagColor, NavigationTag as NavigationTagModel} from '../../models';

import './Tag.scss';

const b = block('navigation-tag');

export interface NavigationTagProps extends NavigationTagModel, ClassNameProps {}

export const NavigationTag = ({
    text,
    color = NavigationTagColor.Yellow,
    className,
    size = 'm',
}: NavigationTagProps) => <div className={b({size, color}, className)}>{text}</div>;
