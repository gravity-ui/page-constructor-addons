import React, {useRef, useState} from 'react';

import Globe from '@gravity-ui/icons/Globe';
import type {ButtonProps, PopoverInstanceProps, PopupPlacement} from '@gravity-ui/uikit';
import {Button, Icon, Popover, useMobile} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';

import {LangSwitchPopup} from './LangSwitchPopup/LangSwitchPopup';
import type {LangSwitchPopupItem} from './LangSwitchPopup/LangSwitchPopup';

import './LangSwitch.scss';

const b = block('lang-switch');
const langSwitchTooltipId = 'lang-switch-tooltip-id';

export interface LangSwitchProps {
    text?: string;
    iconClassName?: string;
    className?: string;
    direction?: PopupPlacement;
    showTextInMobileView?: boolean;
    size?: ButtonProps['size'];
    iconSize?: number;
    items: LangSwitchPopupItem[];
}

const getIconSize = (isMobile: boolean) => {
    return isMobile ? 24 : 16;
};

export const LangSwitch: React.FC<LangSwitchProps> = ({
    text,
    iconClassName,
    direction = 'bottom',
    className,
    showTextInMobileView,
    size,
    iconSize,
    items,
}) => {
    const tooltipRef = useRef<PopoverInstanceProps>(null);
    const buttonRef = useRef(null);
    const [mobile] = useMobile();
    const tooltipOffset: [number, number] = mobile ? [0, 12] : [0, 14];
    const [isOpened, setIsOpened] = useState(false);
    const showText = !mobile || showTextInMobileView;

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
            onOpenChange={setIsOpened}
            disablePortal
            restoreFocusRef={buttonRef}
        >
            {({onClick}) => (
                <Button
                    view="flat"
                    size={size || (mobile ? 'l' : 's')}
                    className={b({'show-text': showText})}
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
                        size={iconSize || getIconSize(mobile)}
                    />
                </Button>
            )}
        </Popover>
    );
};
