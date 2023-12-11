import React from 'react';

import {block} from '../../../utils/cn';
import {EnrichedLink} from '../../EnrichedLink/EnrichedLink';
import type {EnrichedLinkProps} from '../../EnrichedLink/EnrichedLink';

import './GroupLinks.scss';

export interface GroupLinksProps {
    columnGroup: GroupLinkColumn;
    className?: string;
}

export interface GroupLinkColumn {
    title?: string;
    // Column items
    items: EnrichedLinkProps[];
}

const b = block('group-links');

const GroupLinks = ({columnGroup: {title, items}, className}: GroupLinksProps) => {
    return (
        <div className={b(null, className)} key={title}>
            <ul className={b('group')}>
                {title && <h5 className={b('group-title')}>{title}</h5>}
                {items.map((item) => (
                    <li key={item.title} className={b('item-wrapper')}>
                        <EnrichedLink className={b('item')} {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupLinks;
