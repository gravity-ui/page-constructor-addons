import React, {useMemo} from 'react';

import type {TextSize} from '@gravity-ui/page-constructor';
import {Row, Title} from '@gravity-ui/page-constructor';

import {block} from '../../../../../utils/cn';
import {ProductData} from '../../../../models';
import {NavigationPopupItem} from '../../../Navigation/NavigationPopupItem/NavigationPopupItem';

import './LargePopupProducts.scss';

const b = block('cloud-large-popup-products');

interface ExtraPopupProductsProps {
    title?: string;
    url?: string;
    data: ProductData[];
}

export const LargePopupProducts: React.FC<ExtraPopupProductsProps> = ({data, title, url}) => {
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
                    {Object.values(data).map(({marketingInfo, url: itemUrl}) => {
                        return (
                            <NavigationPopupItem
                                key={marketingInfo.name}
                                url={itemUrl}
                                image={marketingInfo.logo}
                                name={marketingInfo.name}
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
