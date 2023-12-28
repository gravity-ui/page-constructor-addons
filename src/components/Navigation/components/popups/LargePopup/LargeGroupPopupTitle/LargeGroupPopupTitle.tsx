import React, {useMemo} from 'react';

import type {ClassNameProps, TextSize} from '@gravity-ui/page-constructor';
import {Title} from '@gravity-ui/page-constructor';

import {CategoryGroupData} from '../../../../models';

export const LargeGroupPopupTitle = ({
    title,
    url,
    className,
}: CategoryGroupData & ClassNameProps) => {
    const titleProps = useMemo(() => {
        return title
            ? {
                  text: title,
                  textSize: 'xs' as TextSize,
                  url: url,
              }
            : undefined;
    }, [title, url]);

    return <Title title={titleProps} className={className} />;
};
