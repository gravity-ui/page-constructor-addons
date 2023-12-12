import {NavigationItem} from '../navigation/models';

export const getIconSize = (isMobile: boolean) => {
    return isMobile ? 24 : 16;
};

export const SERVICES_PREFIX = 'services';
export const SOLUTIONS_PREFIX = 'solutions';

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

export type NaviationItemsMap = Record<string, NavigationItem[]>;

export const getHeaderHeight = (isMobile: boolean) => {
    return isMobile ? 68 : 94;
};

export function getFlatList(dataByKeys: NaviationItemsMap, key = 'slug' as keyof NavigationItem) {
    const navigationItems: Record<string, NavigationItem> = {};

    Object.values(dataByKeys).forEach((dataByKey) => {
        dataByKey.forEach((data) => {
            if (data[key]) {
                navigationItems[data[key] as keyof NaviationItemsMap] = data;
            }
        });
    });

    return Object.values(navigationItems);
}

export function applySearch(
    searchRaw: string,
    navigationItems: NavigationItem[],
): NavigationItem[] {
    const search = searchRaw.toLowerCase();

    return navigationItems.filter(
        ({name, slug, description}) =>
            (name && name.toLowerCase().includes(search)) ||
            slug.includes(search) ||
            (description && description.toLowerCase().includes(search)),
    );
}
