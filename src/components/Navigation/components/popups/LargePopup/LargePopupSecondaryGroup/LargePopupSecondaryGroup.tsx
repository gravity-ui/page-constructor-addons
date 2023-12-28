import React from 'react';

import {Row} from '@gravity-ui/page-constructor';

import {block} from '../../../../../../utils/cn';
import {CategoryGroupData} from '../../../../models';
import {NavigationPopupItem} from '../../../Navigation/NavigationPopupItem/NavigationPopupItem';
import {LargeGroupPopupTitle} from '../LargeGroupPopupTitle/LargeGroupPopupTitle';

import './LargePopupSecondaryGroup.scss';

const b = block('large-popup-secondary-group');

export const LargePopupSecondaryGroup: React.FC<CategoryGroupData> = (props) => (
    <div className={b()}>
        <LargeGroupPopupTitle {...props} className={b('title')} />
        <div>
            <Row className={b('items')}>
                {Object.values(props.items).map(({title: popupTitle, icon, url: itemUrl}) => {
                    return (
                        <NavigationPopupItem
                            key={popupTitle}
                            url={itemUrl}
                            image={icon}
                            title={popupTitle}
                            padding="s"
                            imageSize="s"
                        />
                    );
                })}
            </Row>
        </div>
    </div>
);
