import React from 'react';

import type {ButtonProps} from '@gravity-ui/page-constructor';
import {Button as PCButton} from '@gravity-ui/page-constructor';
import type {ButtonWidth} from '@gravity-ui/uikit';
// import EnterConsoleLink from 'components/EnterConsoleLink/EnterConsoleLink';

import {block} from '../../../utils/cn';

import './ButtonsContainer.scss';

export enum ButtonsContainerDirection {
    Row = 'row',
    Column = 'column',
}

interface ButtonsContainerProps {
    buttons: ButtonProps[];
    className?: string;
    width?: ButtonWidth;
    direction?: ButtonsContainerDirection;
    hasActionButton?: boolean;
}

const b = block('cloud-buttons-container');

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
    buttons,
    className,
    width,
    direction = ButtonsContainerDirection.Row,
    hasActionButton,
}) => (
    <div className={b({direction}, className)}>
        {buttons?.map((button: ButtonProps) => (
            <PCButton {...button} size="l" className={b('item')} key={button.text} width={width} />
        ))}
        {hasActionButton && (
            <button>EXTRA ACTION</button>
            // <EnterConsoleLink context="header" size="l" className={b('item')} width={width} />
        )}
    </div>
);
