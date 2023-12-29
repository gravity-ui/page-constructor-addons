import React, {useRef, useState} from 'react';

import Globe from '@gravity-ui/icons/Globe';
import type {ButtonProps, PopoverInstanceProps, PopupPlacement} from '@gravity-ui/uikit';
import {Button, Icon, Popover} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {LangSwitchItem} from '../../models';
import {getIconSize} from '../../utils';

import {LangSwitchPopup} from './LangSwitchPopup/LangSwitchPopup';

import './LangSwitch.scss';

const b = block('lang-switch');
const langSwitchTooltipId = 'lang-switch-tooltip-id';

export interface LangSwitchProps {
    text?: string;
    iconClassName?: string;
    className?: string;
    isSearchMode?: boolean;
    direction?: PopupPlacement;
    tooltipClassName?: string;
    showText?: boolean;
    size?: ButtonProps['size'];
    iconSize?: number;
    isMobile?: boolean;
    items: LangSwitchItem[];
}

export const LangSwitch = ({
    text,
    iconClassName,
    isSearchMode,
    direction = 'bottom',
    className,
    size,
    iconSize,
    items,
    showText,
    isMobile,
}: LangSwitchProps) => {
    const tooltipRef = useRef<PopoverInstanceProps>(null);
    const buttonRef = useRef(null);
    const tooltipOffset: [number, number] = isMobile ? [0, 12] : [0, 14];
    const [isOpened, setIsOpened] = useState(false);

    return (
        <Popover
            className={className}
            ref={tooltipRef}
            openOnHover={false}
            hasArrow={false}
            placement={direction}
            content={<LangSwitchPopup items={items} />}
            tooltipOffset={tooltipOffset}
            tooltipClassName={b('popup')}
            tooltipId={langSwitchTooltipId}
            focusTrap
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onOpenChange={setIsOpened}
            disablePortal
            restoreFocusRef={buttonRef}
        >
            {({onClick}) => (
                <Button
                    view="flat"
                    size={size || (isMobile ? 'l' : 's')}
                    className={b({search: isSearchMode, 'show-text': showText, size})}
                    onClick={onClick}
                    extraProps={{
                        'aria-expanded': isOpened,
                        'aria-controls': langSwitchTooltipId,
                    }}
                    ref={buttonRef}
                >
                    {showText && <span className={b('text')}>{text}</span>}
                    <Icon
                        className={b('icon', iconClassName)}
                        data={Globe}
                        size={iconSize || getIconSize(isMobile)}
                    />
                </Button>
            )}
        </Popover>
    );
};
