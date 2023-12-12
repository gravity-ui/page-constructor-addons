import React, {useMemo} from 'react';

import type {TextSize} from '@gravity-ui/page-constructor';
import {Row, Title} from '@gravity-ui/page-constructor';

import {block} from '../../../../../utils/cn';
import {CategoryGroupData} from '../../../../models';
import {NavigationPopupItem} from '../../../Navigation/NavigationPopupItem/NavigationPopupItem';

import './LargePopupProducts.scss';

const b = block('cloud-large-popup-products');

export const LargePopupProducts: React.FC<CategoryGroupData> = ({items, title, url}) => {
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
                    {Object.values(items).map(({name, icon, url: itemUrl}) => {
                        return (
                            <NavigationPopupItem
                                key={name}
                                url={itemUrl}
                                image={icon}
                                name={name}
                                description={null}
                                tag={null}
                                icon={null}
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
