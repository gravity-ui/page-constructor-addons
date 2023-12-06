import {AnalyticsEvent as PCAnalyticsEvent} from '@gravity-ui/page-constructor';
import type {ButtonProps, GridColumnSizesType, LinkProps} from '@gravity-ui/page-constructor';
import {SVGIconData} from '@gravity-ui/uikit/build/esm/components/Icon/types';
// import type {ServicesDataTransformed} from 'contexts/ServicesDataContext';
// import type {SolutionsData} from 'models/app';

export declare enum ServiceTag {
    Preview = 'preview',
    New = 'new',
}

export enum NavigationSectionType {
    Services = 'services',
    Solutions = 'solutions',
}

export enum LinkTargetTypes {
    Blank = '_blank',
    Parent = '_parent',
    Top = '_top',
    Self = '_self',
}

export declare enum ServiceStatus {
    Develop = 'develop',
    TechPreview = 'tech-preview',
    PublicPreview = 'public-preview',
    FreePreview = 'free-preview',
    Public = 'public',
}

export interface NavigationPopupItemProps {
    name: string | null;
    description?: string | null;
    tag?: ServiceTag | null;
    icon?: string | null;
    status?: ServiceStatus;
    url: string;
    image?: string | null;
    hover?: boolean;
    sizes?: GridColumnSizesType;
    className?: string;
    padding?: 'default' | 's';
    imageSize?: 's' | 'xm' | 'm';
}

export interface PopupDataProps {
    title?: string;
    imageSize?: 's' | 'xm' | 'm';
    items: NavigationPopupItemProps[];
}

export type LargePopupData = ServicesData | SolutionsData;

export interface NavigationItemModel {
    title: string;
    type: NavigationItemType;
    section: NavigationSectionType;
    link?: {
        url: string;
        target: LinkTargetTypes;
    };
    placeholder?: string;
    links?: LinkProps[];
    marketplace?: {
        title: string;
        url: string;
    };
    data: PopupDataProps[] | LargePopupData;
}

export enum NavigationItemType {
    LargePopup = 'large-popup',
    MediumPopup = 'medium-popup',
    MediumPopupWithCategories = 'medium-popup-with-categories',
    Link = 'link',
}

export interface HeaderNavigationData {
    logo: boolean;
    search: string;
    langSwitch: boolean;
    hasActionButton?: boolean;
    buttons: ButtonProps[];
    user: true;
    navigation: NavigationItemModel[];
    reverseSolutionCategories?: boolean;
}

export interface Locale {
    lang: string;
    region: string;
    href: string;
    active?: boolean;
    icon?: SVGIconData;
}

export interface CategoryData {
    id: string;
    slug: string;
    name: string;
    description: string;
}

export interface ProductData {
    id: string;
    name: string;
    url: string;
    marketingInfo: {
        name: string;
        logo: string;
    };
}

export interface ServiceData {
    id: string;
    slug: string;
    name: string;
    description: string;
    tag: string;
    status: string;
    docUrl: string;
    consoleUrl: string;
    pricesUrl: string;
    fullName: string;
    icon: string;
}

export interface SolutionData {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    type: string;
    navDescription: string;
}

export type ExtendedServiceData = ServiceData & {url?: string};

export type ServicesByCategory = Record<string, ServiceData[]>;
export type SolutionByCategory = Record<string, SolutionData[]>;
export type ProductsByCategory = Record<string, ProductData[]>;
export type NavigationDataByCategory = ServicesByCategory | SolutionByCategory;
export type NavigationItemByCategory = Record<string, NavigationItemExtended[]>;
export type NavigationItem = Pick<
    SolutionData | ServiceData,
    'id' | 'name' | 'slug' | 'description'
>;
export type NavigationItemExtended = NavigationItem & {url: string};

export interface NavigationData {
    categories: CategoryData[];
    dataByCategory: NavigationDataByCategory;
    products?: ProductsByCategory;
}

export interface ServicesData extends NavigationData {
    dataByCategory: ServicesByCategory;
}

export interface SolutionsData extends NavigationData {
    dataByCategory: SolutionByCategory;
}

export interface InitialData {
    servicesData: ServicesData;
}

export enum AnalyticsEventType {
    ItemClick = 'item-click',
    PopupItemClick = 'popup-item-click',
}
export interface AnalyticsEvent extends PCAnalyticsEvent {
    params?: Partial<Record<string, string>>;
}
