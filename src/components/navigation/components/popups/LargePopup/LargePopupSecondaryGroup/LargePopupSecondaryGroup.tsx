import React, {useMemo} from 'react';

import type {TextSize} from '@gravity-ui/page-constructor';
import {Row, Title} from '@gravity-ui/page-constructor';

import {block} from '../../../../../../utils/cn';
import {CategoryGroupData} from '../../../../models';
import {NavigationPopupItem} from '../../../Navigation/NavigationPopupItem/NavigationPopupItem';

import './LargePopupSecondaryGroup.scss';

const b = block('large-popup-secondary-group');

export const LargePopupSecondaryGroup: React.FC<CategoryGroupData> = ({items, title, url}) => {
    const titleProps = useMemo(() => {
        return title
            ? {
                  text: title,
                  textSize: 'xs' as TextSize,
                  url: url,
              }
            : undefined;
    }, [title, url]);

    return (
        <div className={b()}>
            {titleProps && <Title className={b('title')} title={titleProps} />}
            <div>
                <Row className={b('items')}>
                    {Object.values(items).map(({title: popupTitle, icon, url: itemUrl}) => {
                        return (
                            <NavigationPopupItem
                                key={popupTitle}
                                url={itemUrl}
                                image={icon}
                                title={popupTitle}
                                padding={'s'}
                                imageSize={'s'}
                            />
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};
