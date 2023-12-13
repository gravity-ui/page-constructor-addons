import React, {useMemo} from 'react';

import {
    BREAKPOINTS,
    Col,
    GridColumnSize,
    Row,
    Title,
    useWindowBreakpoint,
} from '@gravity-ui/page-constructor';

import {block} from '../../../../utils/cn';
import {PopupData} from '../../../models';
import {
    NavigationPopupItem,
    NavigationPopupItemProps,
} from '../../Navigation/NavigationPopupItem/NavigationPopupItem';

import './MediumPopupWithCategories.scss';

const b = block('cloud-medium-popup-with-categories');

interface MediumPopupWithCategoriesProps {
    data: PopupData;
}

export const MediumPopupWithCategories: React.FC<MediumPopupWithCategoriesProps> = ({data}) => {
    const breakpoint = useWindowBreakpoint();

    const itemsArrays = data.groups.map((dataItem) =>
        dataItem.items.map((item) => ({
            ...item,
            imageSize: dataItem.imageSize,
        })),
    );
    const isDesktop = breakpoint > BREAKPOINTS.lg;
    const maxLength = Math.max(...itemsArrays.map((item) => item.length));

    const desktopItemsArray: NavigationPopupItemProps[] = useMemo(() => {
        const itemsArray = [];
        for (let i = 0; i < maxLength; i += 2) {
            for (let j = 0; j < 2; j++) {
                itemsArray.push(itemsArrays[j][i]);
                itemsArray.push(itemsArrays[j][i + 1]);
            }
        }

        return itemsArray;
    }, [itemsArrays, maxLength]);

    return (
        <Row className={b()}>
            {data.groups.map(({title, items, imageSize}) => (
                <Col
                    key={title}
                    className={b('col')}
                    sizes={{
                        [GridColumnSize.Xl]: 6,
                        [GridColumnSize.Lg]: 12,
                        [GridColumnSize.All]: 12,
                    }}
                >
                    {title && (
                        <Row>
                            <Col className={b('title')}>
                                <Title title={{text: title, textSize: 'xs'}} />
                            </Col>
                        </Row>
                    )}
                    {!isDesktop && (
                        <div>
                            <Row>
                                {items.map((item) => (
                                    <NavigationPopupItem
                                        {...item}
                                        hover
                                        imageSize={imageSize}
                                        sizes={{
                                            [GridColumnSize.Lg]: 6,
                                            [GridColumnSize.Md]: 4,
                                            [GridColumnSize.All]: 4,
                                        }}
                                        key={item.title}
                                    />
                                ))}
                            </Row>
                        </div>
                    )}
                </Col>
            ))}
            {isDesktop && (
                <Col className={b('items')}>
                    <div>
                        <Row>
                            {desktopItemsArray.map((item, index) => {
                                return typeof item === 'undefined' ? (
                                    <Col
                                        sizes={{
                                            [GridColumnSize.Xl]: 3,
                                            [GridColumnSize.Md]: 4,
                                            [GridColumnSize.All]: 12,
                                        }}
                                        key={index}
                                    />
                                ) : (
                                    <NavigationPopupItem
                                        {...item}
                                        key={item.title}
                                        hover
                                        sizes={{
                                            [GridColumnSize.Xl]: 3,
                                            [GridColumnSize.Md]: 4,
                                            [GridColumnSize.All]: 12,
                                        }}
                                    />
                                );
                            })}
                        </Row>
                    </div>
                </Col>
            )}
        </Row>
    );
};
