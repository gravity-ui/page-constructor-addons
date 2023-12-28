import {AnalyticsEvent as PCAnalyticsEvent} from '@gravity-ui/page-constructor';
import type {ButtonProps, LinkProps} from '@gravity-ui/page-constructor';
import {SVGIconData} from '@gravity-ui/uikit/build/esm/components/Icon/types';

export enum AnalyticsEventType {
    ItemClick = 'item-click',
    PopupItemClick = 'popup-item-click',
}

export enum NavigationItemType {
    LargePopup = 'large-popup',
    MediumPopup = 'medium-popup',
    MediumPopupWithCategories = 'medium-popup-with-categories',
    Link = 'link',
}

export enum NavigationTagColor {
    Green = 'green',
    Yellow = 'yellow',
    Blue = 'blue',
}

export interface LogoData {
    href?: string;
    src?: string;
    width?: number;
    title?: string;
    text?: string;
    alt?: string;
}

export interface LangSwitchItem {
    title: string;
    description?: string;
    url?: string;
    active?: boolean;
    icon?: SVGIconData;
}

export interface NavigationData {
    navigation: NavigationSectionData[];
    logo: LogoData;
    buttons: ButtonProps[];
    langSwitchItems?: LangSwitchItem[];
}

export interface AnalyticsEvent extends PCAnalyticsEvent {
    params?: Partial<Record<string, string>>;
}

export type SetupRouteChangeHandler = (handler: () => void) => void;

export interface NavigationTag {
    text: string;
    color?: NavigationTagColor;
    size?: 's' | 'm';
}

export interface NavigationItem {
    title: string;
    slug: string;
    url: string;
    description: string;
    icon?: string;
    tag?: NavigationTag;
}

export interface CategoryGroupData {
    title?: string;
    items: NavigationItem[];
    imageSize?: 's' | 'xm' | 'm';
    url?: string;
}

export interface CategoryData {
    slug: string;
    title: string;
    description?: string;
    groups: CategoryGroupData[];
}
export interface CategorizedPopupData {
    categories: Record<string, CategoryData>;
}

export interface PopupData {
    groups: CategoryGroupData[];
}

export interface NavigationSectionData {
    title: string;
    data?: PopupData | CategorizedPopupData;
    type: NavigationItemType;
    section?: string;
    link?: LinkProps;
    links?: LinkProps[];
    placeholder?: string;
}
