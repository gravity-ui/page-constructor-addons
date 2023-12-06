import React from 'react';

import {Col, GridColumnSize, Row} from '@gravity-ui/page-constructor';

import {block} from '../../../../utils/cn';
import {PopupDataProps} from '../../../models';
import {NavigationPopupItem} from '../../Navigation/NavigationPopupItem/NavigationPopupItem';

import './MediumPopup.scss';

const b = block('cloud-medium-popup');

interface MediumPopupProps {
    data: PopupDataProps[];
}

export const MediumPopup: React.FC<MediumPopupProps> = ({data}) => (
    <Row>
        <Col className={b()}>
            {data.map((dataItem) =>
                dataItem.items.map((item) => (
                    <NavigationPopupItem
                        {...item}
                        key={item.name}
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
