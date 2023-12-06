import type {IconData} from '@gravity-ui/uikit';
import type {SuggestProps} from '@yandex-data-ui/common';
import type {BreadcrumbItem, SearchType} from 'units/search/models';

export enum SuggestItemType {
    Text = 'text',
    Page = 'page',
    Service = 'service',
    Marketplace = 'marketplace',
    Group = 'group',
    Delimiter = 'delimiter',
    Link = 'link',
}

export interface SearchSuggestBaseItem {
    type: SuggestItemType;
    disabled?: boolean;
    tag?: string;
}

export interface SearchSuggestTextItem extends SearchSuggestBaseItem {
    type: SuggestItemType.Text;
    title: string;
}

export interface SearchSuggestPageItem extends SearchSuggestBaseItem {
    type: SuggestItemType.Page;
    title: string;
    link: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export interface SearchSuggestServiceItem extends SearchSuggestBaseItem {
    type: SuggestItemType.Service;
    title: string;
    link: string;
    icon: string;
    description?: string;
}

export interface SearchSuggestMarketplaceItem extends SearchSuggestBaseItem {
    type: SuggestItemType.Marketplace;
    title: string;
    link: string;
    icon?: string;
    description?: string;
}

export interface SearchSuggestGroupItem extends SearchSuggestBaseItem {
    type: SuggestItemType.Group;
    title: string;
}

export interface SearchSuggestDelimiterItem extends SearchSuggestBaseItem {
    type: SuggestItemType.Delimiter;
}

export interface SearchSuggestLinkItem extends SearchSuggestBaseItem {
    type: SuggestItemType.Link;
    title: string;
    link: string;
}

export type SearchSuggestLinkableItem =
    | SearchSuggestPageItem
    | SearchSuggestServiceItem
    | SearchSuggestMarketplaceItem
    | SearchSuggestLinkItem;

export type SearchSuggestItem =
    | SearchSuggestLinkableItem
    | SearchSuggestTextItem
    | SearchSuggestGroupItem
    | SearchSuggestDelimiterItem;

export interface SearchSuggestProps extends Pick<SuggestProps, 'size'> {
    query?: string;
    type?: SearchType;
    placeholder?: string;
    searchLink?: string;
    focused?: boolean;
    isMobileTabletOnly?: boolean;
    containerClass?: string;
    className?: string;
    popupClass?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    getValue?: (value: string) => void;
    customClearIcon?: IconData;
}
