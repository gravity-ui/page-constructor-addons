import React, {useContext} from 'react';

import {ClassNameProps, Theme} from '@gravity-ui/page-constructor';

import {block} from '../../../utils/cn';
import {MobileContext} from '../../contexts/mobile';

import i18n from './i18n';

import './Logo.scss';

const b = block('logo');

export interface LogoProps extends ClassNameProps {
    href?: string;
    src?: string;
    height?: number;
    theme?: Theme;
    imageClassName?: string;
}

const Logo: React.FC<LogoProps> = ({href = '/', src, className, imageClassName}) => {
    const isMobile = useContext(MobileContext);

    return (
        <a
            href={href}
            className={b('link', {mobile: isMobile}, className)}
            title={i18n('link-title')}
        >
            {src && (
                <img
                    className={b('img', imageClassName)}
                    alt={i18n('image-alt')}
                    style={{content: `url(${src})`}}
                />
            )}
        </a>
    );
};

export default Logo;
