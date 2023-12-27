import React from 'react';

import {block} from '../../../../../../utils/cn';
import {CategoryData} from '../../../../models';

import './LargePopupCategory.scss';

const b = block('cloud-large-popup-category');

interface ExtraPopupCategoryProps {
    data: CategoryData;
    onClick: (category: CategoryData) => void;
    isActive: boolean;
}

export const LargePopupCategory: React.FC<ExtraPopupCategoryProps> = ({
    data,
    onClick,
    isActive,
}) => {
    const {title} = data;

    return (
        <li className={b()} key={title} aria-current={isActive || undefined}>
            <button className={b('button', {active: isActive})} onClick={() => onClick(data)}>
                {title}
            </button>
        </li>
    );
};
