import React, {Fragment, useCallback, useContext, useMemo, useState} from 'react';

import {Foldable, ToggleArrow, getLinkProps} from '@gravity-ui/page-constructor';

import {block} from '../../../../../utils/cn';
import {LocationContext} from '../../../contexts/location';
import {
    CategorizedPopupData,
    CategoryGroupData,
    NavigationItemType,
    NavigationSectionData,
    PopupData,
} from '../../../models';

import './MobileNavigationItem.scss';

const b = block('mobile-navigation-item');

interface MobileNavigationProps {
    data: NavigationSectionData;
}

export const MobileNavigationItem: React.FC<MobileNavigationProps> = ({data}) => {
    const {hostname} = useContext(LocationContext) || {};
    const {type, link, title, links} = data;
    const linkProps = link && getLinkProps(link?.url, hostname, link?.target);
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const toggleOpen = useCallback(() => {
        setIsOpened(!isOpened);
    }, [isOpened]);

    const sectionItemsData = useMemo(() => !link && pickData(data), [data, link]);
    return link ? (
        <a {...linkProps} href={link.url} className={b({type})}>
            {title}
        </a>
    ) : (
        <Fragment>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <div className={b({opened: isOpened})} onClick={toggleOpen}>
                <div className={b('text')}>{title}</div>
                <div className={b('arrow')}>
                    <ToggleArrow size={12} type="vertical" open={isOpened} iconType="navigation" />
                </div>
            </div>
            <Foldable isOpened={isOpened}>
                {sectionItemsData &&
                    sectionItemsData.map(({title: itemTitle, items}) => (
                        <div className={b('list')} key={items[0].title}>
                            {itemTitle && <h5 className={b('list-title')}>{itemTitle}</h5>}
                            <ul className={b('list-items')}>
                                {items.map((linkItem) => (
                                    <li className={b('li')} key={linkItem.title}>
                                        <a href={linkItem.url} className={b('list-item')}>
                                            {linkItem.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {links?.map((itemLink) => (
                                <a
                                    href={itemLink.url}
                                    className={b('list-link')}
                                    key={itemLink.url}
                                >
                                    {itemLink.text}
                                </a>
                            ))}
                        </div>
                    ))}
            </Foldable>
        </Fragment>
    );
};

function pickData({type, data}: NavigationSectionData) {
    if (type === NavigationItemType.LargePopup) {
        return [
            {
                items: Object.values((data as CategorizedPopupData).categories).map(({groups}) => ({
                    title: groups[0].title,
                    url: groups[0].url,
                })),
            },
        ] as CategoryGroupData[];
    }

    return (data as PopupData).groups;
}
