import React, {Fragment} from 'react';

import type {TextSize} from '@gravity-ui/page-constructor';
import {Row, Title, block} from '@gravity-ui/page-constructor';

import {NavigationItem} from '../../models';
import {applySearch} from '../../utils';
import {NavigationItemsList} from '../Navigation/NavigationItemsList/NavigationItemsList';
import {SearchNotFound} from '../SearchNotFound/SearchNotFound';

import i18n from './i18n';

import './SearchResult.scss';

const b = block('search-result');

interface SearchResultProps {
    value: string;
    data: NavigationItem[];
    section?: string;
    className?: string;
}

export const SearchResult = ({value, data, section, className}: SearchResultProps) => {
    const result = applySearch(value, data);

    const title = {
        text: i18n('search-found', {count: result.length}),
        textSize: 'xs' as TextSize,
    };

    return (
        <div className={b()}>
            {result.length ? (
                <Fragment>
                    <Row>
                        <Title className={b('title')} title={title} colSizes={{all: 12}} />
                    </Row>
                    <div>
                        <NavigationItemsList
                            items={result}
                            section={section}
                            className={className}
                        />
                    </div>
                </Fragment>
            ) : (
                <div className={b('container')}>
                    <SearchNotFound notFoundDescription={i18n('search-not-found')} size="xs" />
                </div>
            )}
        </div>
    );
};
