import React from 'react';

import Check from '@gravity-ui/icons/Check';
import {Icon, IconData, Link} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';

import './LangSwitchPopup.scss';

const b = block('lang-switch-popup');

export interface LangSwitchPopupProps {
    items: LangSwitchPopupItem[];
}

export interface LangSwitchPopupItem {
    url: string;
    text: string;
    description?: string;
    icon?: IconData;
    active?: boolean;
}

export const LangSwitchPopup: React.FC<LangSwitchPopupProps> = ({items}) => {
    return (
        <div className={b()}>
            {items.map(({url, text, description, icon, active}) => {
                return (
                    <Link className={b('item')} key={text} href={active ? undefined : url}>
                        <div className={b('row')}>
                            {icon && (
                                <Icon className={b('icon')} data={icon} width={18} height={12} />
                            )}
                            <div className={b('text')}>
                                <span className={b('name')}>{text}</span>
                                {description && <span className={b('lang')}>{description}</span>}
                            </div>
                            {active && (
                                <Icon
                                    className={b('icon-check')}
                                    data={Check}
                                    width={16}
                                    height={16}
                                />
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
