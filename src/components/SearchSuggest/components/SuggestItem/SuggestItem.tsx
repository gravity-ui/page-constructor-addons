import React from 'react';

import {HTML} from '@diplodoc/components';
import {Icon} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {ServiceIcon} from 'components/ServiceIcon';
import * as metrika from 'counters/metrika';
import {Breadcrumbs} from 'units/search/components/Breadcrumbs';

import {SuggestItemType} from '../../types';
import type {SearchSuggestItem} from '../../types';

import rightIcon from 'icons/chevron-right-small.svg';

import './SuggestItem.scss';

const b = block('suggest-item');

const onItemClick = () => {
    metrika.reachGoal('main', metrika.Goal.SEARCH_SUGGEST_ITEM_CLICK);
};

const renderIcon = (item: SearchSuggestItem) => {
    switch (item.type) {
        case SuggestItemType.Service:
            return <ServiceIcon name={item.icon} size={16} className={b('icon')} />;
        case SuggestItemType.Marketplace:
            return item.icon && <img src={item.icon} className={b('icon')} />;
        default:
            return null;
    }
};

/**
 *
 */
export const SuggestItem = ({item}: {item: SearchSuggestItem}) => {
    let content;

    switch (item.type) {
        case SuggestItemType.Delimiter:
            content = null;
            break;
        case SuggestItemType.Link:
            content = (
                <React.Fragment>
                    <span>{item.title}</span>
                    <Icon data={rightIcon} size={10} />
                </React.Fragment>
            );
            break;
        case SuggestItemType.Service:
        case SuggestItemType.Marketplace:
            content = (
                <React.Fragment>
                    {item.icon && <div className={b('logo')}>{renderIcon(item)}</div>}
                    <div className={b('text')}>
                        <h5 className={b('title')}>
                            <HTML>{item.title}</HTML>
                        </h5>
                        {item.description && (
                            <div className={b('description')}>
                                <HTML>{item.description}</HTML>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            );
            break;
        case SuggestItemType.Group:
            content = (
                <h5>
                    <HTML>{item.title}</HTML>
                </h5>
            );
            break;
        case SuggestItemType.Page:
            content = (
                <div>
                    <span className={b('title')}>
                        <HTML>{item.title}</HTML>
                    </span>
                    {item.breadcrumbs ? (
                        <Breadcrumbs
                            items={item.breadcrumbs}
                            depth={2}
                            delimiter="arrow"
                            className={b('breadcrumbs')}
                        />
                    ) : (
                        <div className={b('description')}>
                            <HTML>{item.description}</HTML>
                        </div>
                    )}
                </div>
            );
            break;
        default:
            content = <HTML>{item.title}</HTML>;
            break;
    }

    return (
        <div className={b({type: item.type})} onClick={onItemClick}>
            {content}
        </div>
    );
};
