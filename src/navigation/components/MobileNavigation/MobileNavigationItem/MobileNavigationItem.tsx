import React, {Fragment, useCallback, useContext, useState} from 'react';

import {Foldable, ToggleArrow, getLinkProps} from '@gravity-ui/page-constructor';

import {block} from '../../../../utils/cn';
import {LocationContext} from '../../../contexts/location';
import {NavigationItemModel, PopupDataProps} from '../../../models';

import './MobileNavigationItem.scss';

const b = block('cloud-mobile-navigation-item');

interface MobileNavigationProps {
    data: NavigationItemModel;
}

export const MobileNavigationItem: React.FC<MobileNavigationProps> = ({data}) => {
    const {hostname} = useContext(LocationContext) || {};
    const {type, link, title, data: itemData, links} = data;
    const linkProps = link && getLinkProps(link?.url, hostname, link?.target);
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const toggleOpen = useCallback(() => {
        setIsOpened(!isOpened);
    }, [isOpened]);

    return link ? (
        <a {...linkProps} href={link.url} className={b({type})}>
            {title}
        </a>
    ) : (
        <Fragment>
            <div className={b({opened: isOpened})} onClick={toggleOpen}>
                <div className={b('text')}>{title}</div>
                <div className={b('arrow')}>
                    <ToggleArrow size={12} type="vertical" open={isOpened} iconType="navigation" />
                </div>
            </div>
            <Foldable isOpened={isOpened}>
                {(itemData as PopupDataProps[]).map(({title: itemTitle, items}) => (
                    <div className={b('list')} key={items[0].name}>
                        {itemTitle && <h5 className={b('list-title')}>{itemTitle}</h5>}
                        <ul className={b('list-items')}>
                            {items.map((linkItem) => (
                                <li className={b('li')} key={linkItem.name}>
                                    <a href={linkItem.url} className={b('list-item')}>
                                        {linkItem.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {links?.map((itemLink) => (
                            <a href={itemLink.url} className={b('list-link')} key={itemLink.url}>
                                {itemLink.text}
                            </a>
                        ))}
                    </div>
                ))}
            </Foldable>
        </Fragment>
    );
};
