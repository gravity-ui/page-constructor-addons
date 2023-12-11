import React from 'react';

import type {ClassNameProps} from '@gravity-ui/page-constructor';
import type {IconData, LinkProps} from '@gravity-ui/uikit';
import {Icon, Link} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';

import './EnrichedLink.scss';

const b = block('enriched-link');

const ICON_SIZE = 16;
const SOCIAL_ICON_SIZE = 24;

export interface EnrichedLinkProps extends ClassNameProps {
    title: string;
    url: string;
    onClick?: () => void;
    // default | icon
    type?: EnrichedLinkType;
    icon?: IconData;
    // Should open link in new tab
    blank?: boolean;
    // noreferrer param in link
    noreferrer?: boolean;
}

export enum EnrichedLinkType {
    Default = 'default',
    OnlyIcon = 'icon',
}

const getLinkProps = (props: EnrichedLinkProps) => {
    const {url, blank, noreferrer, onClick} = props;

    const res: LinkProps = {
        href: url,
        target: blank ? '_blank' : undefined,
        onClick,
    };

    if (noreferrer || blank) {
        res.rel = 'noopener noreferrer';
    }

    return res;
};

export const EnrichedLink: React.FC<EnrichedLinkProps> = (props) => {
    const {type, title, icon, className} = props;

    if (type === EnrichedLinkType.OnlyIcon) {
        return (
            <Link
                {...getLinkProps(props)}
                className={b({type}, className)}
                title={title}
                data-router="off"
            >
                {icon && <Icon data={icon} size={SOCIAL_ICON_SIZE} />}
            </Link>
        );
    }

    return (
        <Link
            {...getLinkProps(props)}
            className={b({type, ['left-icon']: Boolean(icon)}, className)}
        >
            {icon && <Icon data={icon} size={ICON_SIZE} className={b('icon')} />}
            <div className={b('content')}>
                <div className={b('title')}>{title}</div>
            </div>
        </Link>
    );
};
