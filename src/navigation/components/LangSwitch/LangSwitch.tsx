import React, {useContext, useRef, useState} from 'react';

import Globe from '@gravity-ui/icons/Globe';
import type {ButtonProps, PopoverInstanceProps, PopupPlacement} from '@gravity-ui/uikit';
import {Button, Icon, Popover} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {MobileContext} from '../../contexts/mobile';
import {Locale} from '../../models';
import {getIconSize} from '../../utils';

import {LangSwitchPopup} from './LangSwitchPopup/LangSwitchPopup';

import './LangSwitch.scss';

const b = block('cloud-lang-switch');
const langSwitchTooltipId = 'lang-switch-tooltip-id';

interface LangSwitchProps {
    text?: string;
    iconClassName?: string;
    className?: string;
    isSearchMode?: boolean;
    direction?: PopupPlacement;
    tooltipClassName?: string;
    showText?: boolean;
    size?: ButtonProps['size'];
    iconSize?: number;
    locales: Locale[];
}

export const LangSwitch: React.FC<LangSwitchProps> = ({
    text,
    iconClassName,
    isSearchMode,
    direction = 'bottom',
    className,
    size,
    iconSize,
    locales,
    showText,
}) => {
    const isMobile = useContext(MobileContext);
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
            content={<LangSwitchPopup locales={locales} />}
            tooltipOffset={tooltipOffset}
            tooltipClassName={b('popup')}
            tooltipId={langSwitchTooltipId}
            focusTrap
            autoFocus
            onOpenChange={setIsOpened}
            disablePortal
            restoreFocusRef={buttonRef}
        >
            {({onClick}) => (
                <Button
                    view="flat"
                    size={size || (isMobile ? 'l' : 's')}
                    className={b({search: isSearchMode, 'show-text': showText})}
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
