import React, {useCallback, useContext, useState} from 'react';

import {Magnifier, Xmark} from '@gravity-ui/icons';
import {OutsideClick} from '@gravity-ui/page-constructor';
import {Button, Icon, useUniqId} from '@gravity-ui/uikit';

import SearchSuggest from '../../../components/SearchSuggest/SearchSuggest';
import {block} from '../../../utils/cn';
import {MobileContext} from '../../contexts/mobile';
import {getIconSize} from '../../utils';

import './Search.scss';

const b = block('cloud-search');

interface SearchProps {
    isSearchMode: boolean;
    closeSearch: () => void;
    openSearch: () => void;
    text?: string;
    iconClassName?: string;
}

export const Search: React.FC<SearchProps> = ({
    text,
    isSearchMode,
    closeSearch,
    openSearch,
    iconClassName,
}) => {
    const isMobile = useContext(MobileContext);
    const iconSize = getIconSize(isMobile);
    const [query, setQuery] = useState('');

    const getQuery = useCallback((value: string) => {
        setQuery(value);
    }, []);

    const handleClickOutside = useCallback(() => {
        closeSearch();
        setQuery('');
    }, [closeSearch]);
    const onSuggestBlur = useCallback(() => {
        if (!query) {
            closeSearch();
        }
    }, [query, closeSearch]);

    const searchTextId = useUniqId();

    return (
        <OutsideClick
            className={b({
                'search-mode': isSearchMode,
            })}
            onOutsideClick={handleClickOutside}
        >
            <SearchSuggest
                className={b('suggest')}
                containerClass={b('container')}
                query={isSearchMode ? undefined : ''}
                focused={isSearchMode}
                onFocus={openSearch}
                onBlur={onSuggestBlur}
                popupClass={b('suggest-popup')}
                getValue={getQuery}
                customClearIcon={Xmark}
            />
            <span
                className={b('text', {'search-mode': isSearchMode, hidden: Boolean(query)})}
                id={searchTextId}
            >
                {text}
            </span>
            <Button
                view="flat"
                size="s"
                className={b('button')}
                onClick={openSearch}
                disabled={isSearchMode}
                extraProps={{
                    'aria-labelledby': searchTextId,
                }}
            >
                <Icon className={b('icon', iconClassName)} data={Magnifier} size={iconSize} />
            </Button>
        </OutsideClick>
    );
};
