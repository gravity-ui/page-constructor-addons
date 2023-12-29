import React from 'react';

import {Col, GridColumnSize, Row} from '@gravity-ui/page-constructor';

import {block} from '../../../../../utils/cn';
import {PopupData} from '../../../models';
import {NavigationPopupItem} from '../../Navigation/NavigationPopupItem/NavigationPopupItem';

import './MediumPopup.scss';

const b = block('medium-popup');

interface MediumPopupProps {
    data: PopupData;
}

export const MediumPopup = ({data}: MediumPopupProps) => (
    <Row>
        <Col className={b()}>
            {data.groups.map((dataItem) =>
                dataItem.items.map((item) => (
                    <NavigationPopupItem
                        {...item}
                        key={item.title}
                        hover
                        imageSize={dataItem.imageSize}
                        sizes={{
                            [GridColumnSize.Xl]: 3,
                            [GridColumnSize.Md]: 4,
                            [GridColumnSize.All]: 12,
                        }}
                    />
                )),
            )}
        </Col>
    </Row>
);
