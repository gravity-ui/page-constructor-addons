import type {SyntheticEvent} from 'react';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Suggest} from '@yandex-data-ui/common';
import type {Locale} from 'common/i18n/locales';
import ButtonWithIcon from 'components/Buttons/ButtonWithIcon/ButtonWithIcon';
import * as metrika from 'counters/metrika';
import {useLocale} from 'hooks/useLocale';
import {useTranslation} from 'hooks/useTranslation';
import {routerInstance} from 'router';
import {searchForSuggest} from 'units/search/api';
import type {SearchType} from 'units/search/models';
import {SearchAll, SearchItemType} from 'units/search/models';

import {SuggestItem} from './components/SuggestItem/SuggestItem';
import {SuggestItemType} from './types';
import type {
    SearchSuggestItem,
    SearchSuggestLinkableItem,
    SearchSuggestMarketplaceItem,
    SearchSuggestPageItem,
    SearchSuggestProps,
    SearchSuggestServiceItem,
} from './types';

import clearIcon from 'icons/clear.svg';

import './SearchSuggest.scss';

import {block} from '../../utils/cn';

const DEBOUNCE_TIME = 300;
const CUSTOM_ICON_SIZE = 24;
const ICON_SIZE = 12;

const b = block('SearchSuggest');

const getSearchLink = ({
    baseLink,
    query,
    type = SearchAll.All,
}: {
    baseLink: string;
    query: string;
    type?: SearchType;
}) => `${baseLink}?q=${query}&type=${type}`;

const fetchSuggestData = async (query: string, locale: Locale, type?: string) =>
    query ? searchForSuggest({locale, query, type}) : null;

const isLinkableItem = (item: SearchSuggestItem): item is SearchSuggestLinkableItem =>
    item.type === SuggestItemType.Page ||
    item.type === SuggestItemType.Service ||
    item.type === SuggestItemType.Marketplace ||
    item.type === SuggestItemType.Link;

const SearchSuggest = ({
    className,
    placeholder,
    containerClass,
    popupClass,
    focused,
    onFocus,
    onBlur,
    getValue,
    customClearIcon,
    searchLink = '/search',
    type: searchType = SearchAll.All,
    query: queryProp,
    isMobileTabletOnly = true,
    size = 'l',
}: SearchSuggestProps) => {
    const [query, setQuery] = useState(queryProp || '');
    const {locale} = useLocale();
    const {i18nK} = useTranslation('search');
    const textInputRef = useRef<Suggest<SearchSuggestItem>>(null);

    useEffect(() => {
        setQuery(queryProp || '');
    }, [queryProp]);

    useEffect(() => {
        if (focused) {
            textInputRef.current?.textInputRef.current?.focus();
        }
    }, [focused]);

    const setValue = useCallback(
        (value: string) => {
            if (getValue) {
                getValue(value);
            }

            setQuery(value);
        },
        [getValue],
    );

    const clearQuery = (e: SyntheticEvent) => {
        e.nativeEvent.stopImmediatePropagation();
        setQuery('');

        if (getValue) {
            getValue('');
        }
    };

    const selectItem = (link: string) => {
        routerInstance.push(link);
        setQuery('');
    };

    const handleItemClick = (item: SearchSuggestItem) => {
        if (!item.disabled && isLinkableItem(item)) {
            selectItem(item.link);
        }
    };

    const handleEnterKeyDown = useCallback(
        (queryStr: string) => {
            selectItem(getSearchLink({baseLink: searchLink, query: queryStr, type: searchType}));
        },
        [searchLink, searchType],
    );

    const getItems = async (searchQuery: string): Promise<SearchSuggestItem[]> => {
        try {
            const data = await fetchSuggestData(searchQuery, locale, searchType);

            // group items
            const items = data?.map.reduce<SearchSuggestItem[]>((acc, {type}) => {
                if (acc.length > 0) {
                    acc.push({
                        type: SuggestItemType.Delimiter,
                        disabled: true,
                    });
                }

                if (searchType === SearchAll.All) {
                    acc.push({
                        type: SuggestItemType.Group,
                        title: i18nK(`search-item_type-${type}`, {
                            default: i18nK('search-item_type-main'),
                        }),
                        disabled: true,
                    });
                }

                const groupItems = data?.hits
                    .filter((item) => item.type === type)
                    .map<
                        | SearchSuggestPageItem
                        | SearchSuggestServiceItem
                        | SearchSuggestMarketplaceItem
                    >((item) => {
                        const title = item.highlights?.title || item.title;
                        const description = item.highlights?.description || item.description;

                        switch (type) {
                            case SearchItemType.Services:
                                return {
                                    type: SuggestItemType.Service,
                                    title,
                                    description,
                                    link: item.url,
                                    icon: item.name,
                                };
                            case SearchItemType.Marketplace:
                                return {
                                    type: SuggestItemType.Marketplace,
                                    title,
                                    description,
                                    link: item.url,
                                    icon: item.icon,
                                };
                            default: {
                                const breadcrumbs = item.breadcrumbs?.map(({name}) => ({name}));
                                if (breadcrumbs && item.subType) {
                                    breadcrumbs.unshift({name: item.subType});
                                }

                                return {
                                    type: SuggestItemType.Page,
                                    title,
                                    description,
                                    link: item.url,
                                    breadcrumbs,
                                };
                            }
                        }
                    });

                const newAcc = acc.concat(groupItems);

                return newAcc;
            }, []);

            // add link to all results
            if (items && items.length > 0) {
                items.push({
                    type: SuggestItemType.Link,
                    title: i18nK('search_all-results'),
                    link: getSearchLink({baseLink: searchLink, query, type: searchType}),
                    tag: 'show-all',
                });

                metrika.reachGoal('main', metrika.Goal.SEARCH_SUGGEST_SHOW);
            }

            return items ?? [];
        } catch (error) {
            return [
                {
                    type: SuggestItemType.Text,
                    title: i18nK('search_error-text'),
                    disabled: true,
                },
            ];
        }
    };

    return (
        <div className={b('wrapper', containerClass)} onFocus={onFocus} onBlur={onBlur}>
            <Suggest
                className={b(null, className)}
                popupClassName={b('popup', popupClass)}
                text={query}
                onUpdate={setValue}
                getItems={getItems}
                onItemClick={handleItemClick}
                renderItem={(item) => <SuggestItem item={item} />}
                size={size}
                debounce={DEBOUNCE_TIME}
                applicableInputValue={true}
                onInputEnterKeyDown={handleEnterKeyDown}
                placeholder={placeholder}
                autoFocus={focused}
                ref={textInputRef}
            />
            {/* CLOUDFRONT-3801 */}
            {query && (
                <ButtonWithIcon
                    className={b('clear-button', {isMobileTabletOnly})}
                    onClick={clearQuery}
                    icon={customClearIcon || clearIcon}
                    iconSize={customClearIcon ? CUSTOM_ICON_SIZE : ICON_SIZE}
                    size="xs"
                />
            )}
        </div>
    );
};

export default SearchSuggest;
