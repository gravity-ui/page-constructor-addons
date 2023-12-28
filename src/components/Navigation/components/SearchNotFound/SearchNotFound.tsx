import React from 'react';

import type {TextSize} from '@gravity-ui/page-constructor';
import {GridColumnSize, Row, Title} from '@gravity-ui/page-constructor';

import {block} from '../../../../utils/cn';

import i18n from './i18n';

import './SearchNotFound.scss';

const b = block('search-not-found');

interface SearchNotFoundProps {
    notFoundDescription?: string;
    size?: TextSize;
}

export const SearchNotFound: React.FC<SearchNotFoundProps> = (props) => {
    const {notFoundDescription, size = 's'} = props;
    const title = {
        text: i18n('search-not-found-title'),
        textSize: size,
    };

    return (
        <Row className={b()}>
            <Title
                colSizes={{
                    [GridColumnSize.Lg]: 9,
                    [GridColumnSize.All]: 12,
                }}
                title={title}
                subtitle={notFoundDescription || i18n('search-not-found-description')}
                className={b('title')}
            />
        </Row>
    );
};
