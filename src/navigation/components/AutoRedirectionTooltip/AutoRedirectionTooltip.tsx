import React, {useCallback, useEffect, useMemo, useState} from 'react';

import type {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {
    AutoRedirectsCookieValue,
    DO_NOT_REDIRECT_COOKIE,
    FORCED_REDIRECT_COOKIE,
    WAS_REDIRECTED_COOKIE,
} from 'common/auto-redirects';
import {NO_REGION_COOKIE} from 'common/constants';
import {formatURL} from 'common/utils/url';
import {NotifyTooltip} from 'components/NotifyTooltip/NotifyTooltip';
import {useGeoData} from 'hooks/useGeoData';
import {useRouter} from 'hooks/useRouter';
import {useTranslation} from 'hooks/useTranslation';
import Cookies from 'js-cookie';

const AUTO_REDIRECTS_COOKIE_EXPIRES = 30;

const setCookie = (value: AutoRedirectsCookieValue) => {
    Cookies.set(DO_NOT_REDIRECT_COOKIE, value, {
        expires: AUTO_REDIRECTS_COOKIE_EXPIRES,
    });
};

export default function AutoRedirectionTooltip({className}: ClassNameProps) {
    const [closed, setClosed] = useState(false);
    const {i18nK} = useTranslation('autoredirection-tooltip');
    const {countryName: country} = useGeoData();
    const {hostname, pathname} = useRouter();
    const wasRedirected = useMemo(() => Cookies.get(WAS_REDIRECTED_COOKIE), []);
    const showTooltip =
        Cookies.get(DO_NOT_REDIRECT_COOKIE) !== AutoRedirectsCookieValue.Stay &&
        wasRedirected &&
        !closed;

    useEffect(() => {
        if (Cookies.get(WAS_REDIRECTED_COOKIE)) {
            Cookies.remove(WAS_REDIRECTED_COOKIE);
        }
    }, []);

    const onActionClick = useCallback(() => {
        setCookie(AutoRedirectsCookieValue.GoBack);
        Cookies.set(FORCED_REDIRECT_COOKIE, '1');
        Cookies.set(NO_REGION_COOKIE, String(true));
        window.location.href = formatURL({
            pathname,
            hostname,
        });
    }, [pathname, hostname]);

    const onCancelClick = useCallback(() => {
        setCookie(AutoRedirectsCookieValue.Stay);
        setClosed(true);
    }, []);

    const onCloseClick = useCallback(() => setClosed(true), []);

    if (!showTooltip || !country) {
        return null;
    }

    return (
        <NotifyTooltip
            className={className}
            title={i18nK('title', {country})}
            content={i18nK('content', {country})}
            actionButton={{
                text: i18nK('button-action'),
                onClick: onActionClick,
            }}
            cancelButton={{
                text: i18nK('button-cancel'),
                onClick: onCancelClick,
            }}
            onCloseClick={onCloseClick}
        />
    );
}
