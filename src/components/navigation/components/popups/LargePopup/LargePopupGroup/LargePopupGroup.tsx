import React from 'react';

import {Col, Row} from '@gravity-ui/page-constructor';

import {block} from '../../../../../../utils/cn';
import {CategoryGroupData} from '../../../../models';
import {NavigationItemsList} from '../../../Navigation/NavigationItemsList/NavigationItemsList';
import {LargeGroupPopupTitle} from '../LargeGroupPopupTitle/LargeGroupPopupTitle';

import './LargePopupGroup.scss';

const b = block('large-popup-group');

export const LargePopupGroup: React.FC<CategoryGroupData & {section?: string}> = ({
    section,
    ...group
}) => (
    <div className={b()}>
        <Row>
            <Col className={b('title')}>
                <LargeGroupPopupTitle {...group} />
            </Col>
        </Row>
        <div>
            <NavigationItemsList items={group.items} section={section} className={b('items')} />
        </div>
    </div>
);
