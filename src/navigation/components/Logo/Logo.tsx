import React, {useContext} from 'react';

import {ClassNameProps, Theme} from '@gravity-ui/page-constructor';

import {block} from '../../../utils/cn';
import {MobileContext} from '../../contexts/mobile';
import {LogoData} from '../../models';

import i18n from './i18n';

import './Logo.scss';

const b = block('logo');

export interface LogoProps extends LogoData, ClassNameProps {
    theme?: Theme;
    imageClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
    href = '/',
    src,
    className,
    imageClassName,
    title,
    alt,
    width,
}) => {
    const isMobile = useContext(MobileContext);

    return (
        <a
            href={href}
            className={b({mobile: isMobile}, className)}
            title={title || i18n('link-title')}
            style={width ? {width} : {}}
        >
            {src && (
                <img
                    className={b('img', imageClassName)}
                    alt={alt || i18n('image-alt')}
                    style={{content: `url(${src})`}}
                />
            )}
        </a>
    );
};

export default Logo;
