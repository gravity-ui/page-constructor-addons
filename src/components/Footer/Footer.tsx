import React, {useMemo} from 'react';

import {Col, Grid, Row} from '@gravity-ui/page-constructor';
import {useMobile} from '@gravity-ui/uikit';

import {LangSwitch} from '../../navigation/components/LangSwitch/LangSwitch';
import {block} from '../../utils/cn';
import {EnrichedLink} from '../EnrichedLink/EnrichedLink';

import GroupLinks from './GroupLinks/GroupLinks';
import type {GroupLinkColumn} from './GroupLinks/GroupLinks';
import {FooterProps} from './models';

import './Footer.scss';

const b = block('footer');

const columnSize = {
    all: 6,
    sm: 3,
    md: 2,
};

export const Footer: React.FC<FooterProps> = (props) => {
    const {type = 'default', underline, columns, media, customItems} = props;
    const [isMobile] = useMobile();

    const mediaContent = useMemo(() => {
        if (!media) {
            return null;
        }

        return <Col sizes={{all: 12, md: media.md || 6}}>{media.item}</Col>;
    }, [media]);

    const groupLinks = useMemo(() => {
        if (!columns?.length) {
            return null;
        }

        return (
            <React.Fragment>
                {columns.map((groups: GroupLinkColumn[], index: number) => (
                    <Col key={index} className={b('column')} sizes={columnSize}>
                        {groups.map((group: GroupLinkColumn, groupIndex: number) => (
                            <GroupLinks
                                key={groupIndex}
                                columnGroup={group}
                                className={b('group-wrapper')}
                            />
                        ))}
                    </Col>
                ))}
            </React.Fragment>
        );
    }, [columns]);

    const isSimple = type === 'simple';

    const underlineBlock = useMemo(() => {
        if (!underline) {
            return null;
        }
        const itemClass = b('item', {underline: true});

        return (
            <div className={b('underline')}>
                <div className={b('underline-links')}>
                    {underline.langSwitch && (
                        <LangSwitch
                            {...underline.langSwitch}
                            className={b('item', {underline: true, 'lang-switch': true})}
                            direction={['top-start', 'top', 'top-end']}
                            size="m"
                            iconSize={16}
                            isMobile={isMobile}
                        />
                    )}
                    {!isSimple &&
                        underline.leftItems?.map((item) => (
                            <EnrichedLink key={item.title} className={itemClass} {...item} />
                        ))}
                </div>
                <div className={b('underline-links')}>
                    {underline.rightItems?.map((item) => (
                        <EnrichedLink key={item.title} className={itemClass} {...item} />
                    ))}
                    {underline.copyright && (
                        <div className={b('copyright')}>{underline.copyright}</div>
                    )}
                </div>
            </div>
        );
    }, [underline, isSimple, isMobile]);
    const isRightMedia = media?.position === 'right';

    return (
        <footer className={b({type})}>
            {isSimple ? (
                underlineBlock
            ) : (
                <Grid containerClass={b('container-fluid')}>
                    <Row className={b('wrapper')}>
                        {!isRightMedia && mediaContent}
                        {groupLinks}
                        {isRightMedia && mediaContent}
                        {customItems}
                        <Col className={b('column', {underline: true})} sizes={{all: 12}}>
                            {underlineBlock}
                        </Col>
                    </Row>
                </Grid>
            )}
        </footer>
    );
};
