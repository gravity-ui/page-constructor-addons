import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Magnifier, Xmark} from '@gravity-ui/icons';
import type {IconData} from '@gravity-ui/uikit';
import {Button, Icon, TextInput} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';

import {useIsIPhone} from '../../../../../../hooks/useIsIPhone';
import {ClassNameProps} from '../../../../../../models';
import {block} from '../../../../../../utils/cn';

import i18n from './i18n';

import './Search.scss';

const b = block('large-popup-search');

export type SearchSize = 's' | 'm';

interface SearchProps extends ClassNameProps {
    value?: string;
    initialValue: string;
    onSubmit: (value: string) => void;
    debounce?: number;
    placeholder?: string;
    size?: SearchSize;
    autoFocus?: boolean;
    className?: string;
    customSearchIcon?: IconData;
}

const Search = (props: SearchProps) => {
    const {
        className,
        initialValue,
        onSubmit,
        debounce: debounceTime = 300,
        placeholder = i18n('search'),
        size = 'm',
        autoFocus = false,
        value: externalValue,
        customSearchIcon,
    } = props;
    const [value, setValue] = useState<string>(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeDebounce = useCallback(debounce(onSubmit, debounceTime), []);
    const inputRef = useRef<HTMLInputElement>(null);
    const isIPhone = useIsIPhone();

    useEffect(() => {
        if (externalValue !== undefined) {
            setValue(externalValue);
        }
    }, [externalValue]);

    useEffect(() => {
        if (autoFocus && !isIPhone) {
            setTimeout(() => inputRef?.current?.focus({preventScroll: true}), 0);
        }
    }, [autoFocus, inputRef, isIPhone]);

    return (
        <div className={b({size}, className)}>
            <div className={b('search-suggest-container')} data-qa="search-suggest-container">
                <TextInput
                    value={value}
                    onUpdate={(query) => {
                        setValue(query);
                        onChangeDebounce(query);
                    }}
                    placeholder={placeholder}
                    className={b('search-suggest')}
                    size={size === 'm' ? 'xl' : 'l'}
                    controlRef={inputRef}
                />
            </div>
            {value ? (
                <Button
                    className={b('close-button')}
                    size="xs"
                    onClick={() => {
                        onChangeDebounce.cancel();
                        setValue('');
                        onSubmit('');
                    }}
                    view="flat"
                    extraProps={{'aria-label': i18n('clear-button-label')}}
                >
                    <Icon data={Xmark} size={18} />
                </Button>
            ) : (
                <Button
                    className={b('search-button')}
                    size="xs"
                    disabled={true}
                    onClick={() => {
                        onChangeDebounce.cancel();
                        setValue('');
                        onSubmit('');
                    }}
                    view="flat"
                    extraProps={{'aria-label': i18n('search-button-label')}}
                >
                    <Icon data={customSearchIcon || Magnifier} size={16} />
                </Button>
            )}
        </div>
    );
};

export default Search;
