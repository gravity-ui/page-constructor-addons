import React from 'react';

import type {IconData} from '@gravity-ui/uikit';
import {Icon} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../models';
import {block} from '../../utils/cn';

import './ButtonWithIcon.scss';

const b = block('ButtonWithIcon');

export interface ButtonWithIconProps extends ClassNameProps {
    icon: IconData;
    theme?: 'primary' | 'secondary' | 'link' | 'accent';
    size?: 'xs' | 's' | 'm' | 'n';
    iconSize?: number;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    ariaLabel?: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = (props) => {
    const {
        icon,
        theme = 'primary',
        size = 's',
        iconSize = 16,
        disabled = false,
        onClick,
        className,
        ariaLabel,
    } = props;

    return (
        <button
            type="button"
            className={b({size, theme, disabled}, className)}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            <Icon data={icon} size={iconSize} />
        </button>
    );
};

export default ButtonWithIcon;
