import memoize from 'lodash/memoize';

import {
    LargePopupData,
    NavigationItemExtended,
    NavigationItemModel,
    NavigationItemType,
    NavigationSectionType,
} from '../navigation/models';

export const getIconSize = (isMobile: boolean) => {
    return isMobile ? 24 : 16;
};

export const SERVICES_PREFIX = 'services';
export const SOLUTIONS_PREFIX = 'solutions';

export function getNavigationTypePrefix(type: NavigationSectionType): string {
    switch (type) {
        case NavigationSectionType.Solutions:
            return SOLUTIONS_PREFIX;
        case NavigationSectionType.Services:
        default:
            return SERVICES_PREFIX;
    }
}

export const getNavigationTitleLink = (
    slug: string,
    type: NavigationSectionType,
    queryName?: string,
): string => {
    return type === NavigationSectionType.Services
        ? `/${getNavigationTypePrefix(type)}#${slug}`
        : `/${getNavigationTypePrefix(type)}?${queryName}=${slug}`;
};

export interface MobileLargePopupDataItem {
    id: number;
    description: string;
    slug: string;
    url: string;
    name: string;
}

export interface MobileLargePopupData {
    items: MobileLargePopupDataItem[];
}

export const prepareNavigationConfig = memoize(
    (
        data: NavigationItemModel[],
        largePopupData: {
            [key: string]: LargePopupData | MobileLargePopupData[];
        },
    ) =>
        data.map((item: NavigationItemModel) => {
            if (item.type === NavigationItemType.LargePopup) {
                return {
                    ...item,
                    data: largePopupData[item.section],
                };
            }

            return item;
        }),
    (...args) => JSON.stringify(args),
);

export const getMobilePopupData = memoize(
    (data: LargePopupData, section: NavigationSectionType) => [
        {
            items: data?.categories?.map((item) => {
                return {
                    ...item,
                    url: getNavigationTitleLink(
                        item.slug,
                        section,
                        section === NavigationSectionType.Solutions ? 'category' : undefined,
                    ),
                } as MobileLargePopupDataItem;
            }),
        },
    ],
    (...args) => JSON.stringify(args),
);

export const getHeaderHeight = (isMobile: boolean) => {
    return isMobile ? 68 : 94;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFlatMap<T extends Record<string, any>>(
    dataByKeys: Record<string, T[]>,
    key: string,
): Record<string, T> {
    const navigationItems: Record<string, T> = {};

    Object.values(dataByKeys).forEach((dataByKey) => {
        dataByKey.forEach((data: T) => {
            if (data[key]) {
                navigationItems[data[key]] = data;
            }
        });
    });

    return navigationItems;
}

export function getFlatList<T extends Record<string, unknown>>(
    dataByKey: Record<string, T[]>,
    key = 'slug',
): T[] {
    return Object.values(getFlatMap(dataByKey, key));
}

export function applySearch(
    searchRaw: string,
    navigationItems: NavigationItemExtended[],
): NavigationItemExtended[] {
    const search = searchRaw.toLowerCase();

    return navigationItems.filter(
        ({name, slug, description}) =>
            (name && name.toLowerCase().includes(search)) ||
            slug.includes(search) ||
            (description && description.toLowerCase().includes(search)),
    );
}
