import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {Magnifier} from '@gravity-ui/icons';
import type {LinkProps} from '@gravity-ui/page-constructor';
import {Col, GridColumnSize, Link, Row} from '@gravity-ui/page-constructor';

import {block} from '../../../../../utils/cn';
import {
    CategorizedPopupData,
    CategoryData,
    NavigationItem,
    NavigationSectionData,
} from '../../../models';
import {getFlatList, getHeaderHeight} from '../../../utils';
import {SearchResult} from '../../SearchResult/SearchResult';

import {LargePopupCategory} from './LargePopupCategory/LargePopupCategory';
import {LargePopupGroup} from './LargePopupGroup/LargePopupGroup';
import {LargePopupSecondaryGroup} from './LargePopupSecondaryGroup/LargePopupSecondaryGroup';
import Search from './Search/Search';

import './LargePopup.scss';

const b = block('large-popup');
const LARGE_POPUP_INDENT = 240;

type GroupItemsMap = Record<string, NavigationItem[]>;

export interface LargePopupProps extends Omit<NavigationSectionData, 'data'> {
    data: CategorizedPopupData;
}

export const LargePopup = (props: LargePopupProps) => {
    const {data, section, placeholder, links} = props;
    const {categories} = data;

    const [currentCategory, setCurrentCategory] = useState(Object.values(categories)[0]);
    const [search, setSearch] = useState('');
    const categoriesRef = useRef<HTMLUListElement>(null);
    const [maxHeightCategories, setMaxHeightCategories] = useState(0);
    const [minHeightCategories, setMinHeightCategories] = useState(355);
    const [categoriesWithScroll, setCategoriesWithScroll] = useState(false);
    const rightSideRef = useRef<HTMLDivElement>(null);
    const rightSideContentRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);
    const currentCategoryData = categories[currentCategory.slug];
    const flatList = useMemo(() => {
        const searchableItems = Object.entries(categories).reduce<GroupItemsMap>(
            (result, [slug, {groups}]) => {
                // eslint-disable-next-line no-param-reassign
                result[slug] = groups[0].items;

                return result;
            },
            {},
        );

        return getFlatList(searchableItems);
    }, [categories]);

    const onSearch = useCallback((value: string) => setSearch(value), []);
    const changeCategory = useCallback((value: CategoryData) => {
        const rightSideCurrent = rightSideRef?.current;

        if (rightSideCurrent) {
            rightSideCurrent.scrollTop = 0;
        }
        setCurrentCategory(value);
    }, []);

    useEffect(() => {
        const maxHeight = window.innerHeight - getHeaderHeight(false) - LARGE_POPUP_INDENT;
        const rightColumnHeight = rightSideContentRef?.current?.clientHeight;
        const controlsHeight = controlsRef?.current?.clientHeight;
        setMaxHeightCategories(maxHeight);

        if (rightColumnHeight && controlsHeight) {
            setMinHeightCategories(rightColumnHeight - controlsHeight);
        }

        if (categoriesRef.current) {
            if (categoriesRef.current.scrollHeight > maxHeight) {
                setCategoriesWithScroll(true);
            }
        }
    }, []);

    return (
        <Fragment>
            <Row>
                <Col
                    className={b('left')}
                    sizes={{[GridColumnSize.Lg]: 3, [GridColumnSize.All]: 4}}
                >
                    <ul
                        className={b('categories', {'with-scroll': categoriesWithScroll})}
                        ref={categoriesRef}
                        style={{
                            maxHeight: `${maxHeightCategories}px`,
                            minHeight: `${minHeightCategories}px`,
                        }}
                    >
                        {Object.values(categories).map((category) => (
                            <LargePopupCategory
                                data={category}
                                onClick={changeCategory}
                                key={category.slug}
                                isActive={currentCategory.slug === category.slug}
                            />
                        ))}
                    </ul>
                    <div className={b('controls')} ref={controlsRef}>
                        <div className={b('links')}>
                            {links &&
                                links.map((link: LinkProps) => (
                                    <Link
                                        className={b('link')}
                                        url={link.url}
                                        text={link.text}
                                        textSize="m"
                                        key={link.url}
                                        theme="normal"
                                        arrow={true}
                                    />
                                ))}
                        </div>
                        {placeholder && (
                            <Search
                                initialValue=""
                                onSubmit={onSearch}
                                className={b('search')}
                                placeholder={placeholder}
                                value={search}
                                size="s"
                                customSearchIcon={Magnifier}
                            />
                        )}
                    </div>
                </Col>

                <Col
                    className={b('right')}
                    sizes={{[GridColumnSize.Lg]: 9, [GridColumnSize.All]: 8}}
                    ref={rightSideRef}
                >
                    <div className={b('right-content')} ref={rightSideContentRef}>
                        {search ? (
                            <SearchResult
                                value={search}
                                data={flatList}
                                section={section}
                                className={b('items')}
                            />
                        ) : (
                            <Fragment>
                                {currentCategoryData.groups.map((group, index) => {
                                    const key = group.title || group.url || index;

                                    return index ? (
                                        <LargePopupSecondaryGroup {...group} key={key} />
                                    ) : (
                                        <LargePopupGroup {...group} section={section} key={key} />
                                    );
                                })}
                            </Fragment>
                        )}
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
};
