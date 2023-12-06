import React from 'react';

import Check from '@gravity-ui/icons/Check';
import {Icon} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {Locale} from '../../../models';

import './LangSwitchPopup.scss';

const b = block('cloud-lang-switch-popup');

interface LangSwitchPopupProps {
    locales: Locale[];
}

export const LangSwitchPopup: React.FC<LangSwitchPopupProps> = ({locales}) => {
    return (
        <div className={b()}>
            {locales.map(({region, lang, active, href, icon}) => {
                return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={b('item')} key={region} href={active ? undefined : href}>
                        <div className={b('row')}>
                            {icon && (
                                <Icon className={b('icon')} data={icon} width={18} height={12} />
                            )}
                            <div className={b('text')}>
                                <span className={b('name')}>{region}</span>
                                <span className={b('lang')}>{lang}</span>
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
