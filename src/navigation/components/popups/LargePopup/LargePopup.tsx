import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {Magnifier} from '@gravity-ui/icons';
import type {LinkProps, TextSize} from '@gravity-ui/page-constructor';
import {Col, GridColumnSize, Link, Row, Title} from '@gravity-ui/page-constructor';

import {block} from '../../../../utils/cn';
import {
    CategoryData,
    NavigationItemExtended,
    NavigationItemModel,
    NavigationSectionType,
    ServicesData,
    SolutionsData,
} from '../../../models';
import {getFlatList, getHeaderHeight, getNavigationTitleLink} from '../../../utils';
import {NavigationItemsList} from '../../Navigation/NavigationItemsList/NavigationItemsList';
import {SearchResult} from '../../SearchResult/SearchResult';

import {LargePopupCategory} from './LargePopupCategory/LargePopupCategory';
import {LargePopupProducts} from './LargePopupProducts/LargePopupProducts';
import Search from './Search/Search';

import './LargePopup.scss';

const b = block('cloud-large-popup');
const LARGE_POPUP_INDENT = 240;

interface ExtraPopupProps
    extends Pick<NavigationItemModel, 'links' | 'section' | 'placeholder' | 'marketplace'> {
    data: ServicesData | SolutionsData;
}

export const LargePopup: React.FC<ExtraPopupProps> = (props) => {
    const {data, section, placeholder, links, marketplace} = props;
    const {categories, dataByCategory, products} = data;

    const [currentCategory, setCurrentCategory] = useState(categories[0]);
    const [search, setSearch] = useState('');
    const categoriesRef = useRef<HTMLUListElement>(null);
    const [maxHeightCategories, setMaxHeightCategories] = useState(0);
    const [minHeightCategories, setMinHeightCategories] = useState(355);
    const [categoriesWithScroll, setCategoriesWithScroll] = useState(false);
    const rightSideRef = useRef<HTMLDivElement>(null);
    const rightSideContentRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);

    const currentCategoryItems = dataByCategory[currentCategory.slug];
    const flatList = useMemo(
        () => getFlatList<NavigationItemExtended>(dataByCategory),
        [dataByCategory],
    );

    const onSearch = useCallback((value: string) => setSearch(value), []);
    const changeCategory = useCallback((value: CategoryData) => {
        const rightSideCurrent = rightSideRef?.current;

        if (rightSideCurrent) {
            rightSideCurrent.scrollTop = 0;
        }
        setCurrentCategory(value);
    }, []);
    const currentProducts = products?.[currentCategory?.slug];

    const titleProps = useMemo(() => {
        return {
            text: currentCategory.name,
            textSize: 'xs' as TextSize,
            url: getNavigationTitleLink(
                currentCategory.slug,
                section,
                section === NavigationSectionType.Solutions ? 'category' : undefined,
            ),
        };
    }, [currentCategory.name, currentCategory.slug, section]);

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
                        {categories.map((category) => (
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
                                <div>
                                    <Row>
                                        <Col className={b('title')}>
                                            <Title title={titleProps} />
                                        </Col>
                                    </Row>
                                    <div>
                                        <NavigationItemsList
                                            items={currentCategoryItems}
                                            section={section}
                                            itemClassName={b('item')}
                                            className={b('items')}
                                        />
                                    </div>
                                </div>
                                {currentProducts && (
                                    <LargePopupProducts {...marketplace} data={currentProducts} />
                                )}
                            </Fragment>
                        )}
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
};
