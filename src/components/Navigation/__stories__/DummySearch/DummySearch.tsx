import React, {useCallback, useContext, useState} from 'react';

import {Magnifier} from '@gravity-ui/icons';
import {OutsideClick} from '@gravity-ui/page-constructor';
import {Button, Icon, useUniqId} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {MobileContext} from '../../contexts/mobile';
import {getIconSize} from '../../utils';

import './DummySearch.scss';

const b = block('dummy-search');

interface DummySearchProps {
    onActiveToggle?: (isActive: boolean) => void;
}

const PLACEHOLDER = 'Search';

export const DummySearch = ({onActiveToggle}: DummySearchProps) => {
    const isMobile = useContext(MobileContext);
    const iconSize = getIconSize(isMobile);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [query, setQuery] = useState('');

    const handleClickOutside = useCallback(() => {
        onActiveToggle?.(false);
        setIsSearchMode(false);
        setQuery('');
    }, [onActiveToggle]);

    const searchTextId = useUniqId();

    return (
        <OutsideClick
            className={b({
                'search-mode': isSearchMode,
            })}
            onOutsideClick={handleClickOutside}
        >
            <div className={b('dummy-suggest')} />
            <span
                className={b('text', {'search-mode': isSearchMode, hidden: Boolean(query)})}
                id={searchTextId}
            >
                {PLACEHOLDER}
            </span>
            <Button
                view="flat"
                size="s"
                className={b('button')}
                onClick={() => {
                    onActiveToggle?.(true);
                    setIsSearchMode(true);
                }}
                disabled={isSearchMode}
                extraProps={{
                    'aria-labelledby': searchTextId,
                }}
            >
                <Icon className={b('icon')} data={Magnifier} size={iconSize} />
            </Button>
        </OutsideClick>
    );
};
