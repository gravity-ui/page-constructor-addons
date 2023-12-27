import React from 'react';

import Check from '@gravity-ui/icons/Check';
import {Icon} from '@gravity-ui/uikit';

import {block} from '../../../../../utils/cn';
import {LangSwitchItem} from '../../../models';

import './LangSwitchPopup.scss';

const b = block('cloud-lang-switch-popup');

interface LangSwitchPopupProps {
    items: LangSwitchItem[];
}

export const LangSwitchPopup: React.FC<LangSwitchPopupProps> = ({items}) => {
    return (
        <div className={b()}>
            {items.map(({title, description, active, url, icon}) => {
                return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={b('item')} key={description} href={active ? undefined : url}>
                        <div className={b('row')}>
                            {icon && (
                                <Icon className={b('icon')} data={icon} width={18} height={12} />
                            )}
                            <div className={b('text')}>
                                <span className={b('name')}>{title}</span>
                                <span className={b('lang')}>{description}</span>
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
                    </a>
                );
            })}
        </div>
    );
};
