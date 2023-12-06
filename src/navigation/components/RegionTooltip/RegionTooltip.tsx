import React, {useCallback, useEffect, useRef, useState} from 'react';

import {NO_REGION_COOKIE} from 'common/constants';
import Cookies from 'js-cookie';

import {I18N} from '@gravity-ui/i18n';
import type {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {NotifyTooltip} from 'components/NotifyTooltip/NotifyTooltip';
import * as metrika from 'counters/metrika';
import {useFeatureFlags} from 'hooks/useFeatureFlags';
import {useGeoData} from 'hooks/useGeoData';
import {useLocale} from 'hooks/useLocale';
import {useRouter} from 'hooks/useRouter';
import type {I18nKFunction} from 'i18n/utils';
import {initI18n, loadKeysets, logger} from 'i18n/utils';

import type {Locale} from '../../../../../common/i18n/locales';

const keysetName = 'region-tooltip';

export default function RegionTooltip({className}: ClassNameProps) {
    const [closed, setClosed] = useState(false);
    const [i18nLoaded, setI18nLoaded] = useState(false);
    const i18nKRef = useRef<I18nKFunction | undefined>();
    const {countryName, geoLocale} = useGeoData();
    const {hostname, as} = useRouter();
    const {locale, localeUtils} = useLocale();
    const featureFlags = useFeatureFlags();
    const showTooltip = featureFlags.regionTooltip && geoLocale && !Cookies.get(NO_REGION_COOKIE);
    const visible = showTooltip && i18nLoaded && !closed;

    const setDismissCookie = useCallback(() => {
        Cookies.set(NO_REGION_COOKIE, String(true), {expires: 365, domain: hostname});
    }, [hostname]);

    const fetchKeyset = useCallback(async (newLocale: Locale) => {
        const keysets = await loadKeysets(newLocale.lang, newLocale.keysetsRegion);
        const i18nKValue = initI18n(
            newLocale.lang,
            {[keysetName]: keysets[keysetName]},
            new I18N({logger}),
        ).bind(null, keysetName);

        i18nKRef.current = i18nKValue;
        setI18nLoaded(true);
    }, []);

    useEffect(() => {
        if (showTooltip && geoLocale.code !== locale.code) {
            fetchKeyset(geoLocale);
        }
    }, [fetchKeyset, locale, geoLocale, showTooltip]);

    useEffect(() => {
        if (visible) {
            metrika.reachGoal('main', metrika.Goal.REGION_POPUP_SHOW);
        }
    }, [visible]);

    const i18nK = i18nKRef.current;

    if (!visible || !geoLocale || !i18nK) {
        return null;
    }

    return (
        <NotifyTooltip
            className={className}
            title={i18nK('title', {country: countryName, currency: geoLocale.currency})}
            content={i18nK('content', {country: countryName, currency: geoLocale.currency})}
            actionButton={{
                text: i18nK('button-yes'),
                onClick: () => {
                    window.location.href = localeUtils.getAbsoluteLocaleUrl(
                        geoLocale,
                        hostname,
                        as,
                    );
                    metrika.reachGoal('main', metrika.Goal.REGION_POPUP_YES);
                },
            }}
            cancelButton={{
                text: i18nK('button-no'),
                onClick: () => {
                    metrika.reachGoal('main', metrika.Goal.REGION_POPUP_NO);
                    setDismissCookie();
                    setClosed(true);
                },
            }}
            onCloseClick={() => {
                metrika.reachGoal('main', metrika.Goal.REGION_POPUP_CLOSE);
                setDismissCookie();
            }}
        />
    );
}
