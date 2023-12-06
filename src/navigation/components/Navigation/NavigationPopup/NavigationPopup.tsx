import type {RefObject} from 'react';
import React from 'react';

import {Grid} from '@gravity-ui/page-constructor';
import {FocusTrap} from '@gravity-ui/uikit/build/cjs/components/utils/FocusTrap';
import ReactDOM from 'react-dom';

import {block} from '../../../../utils/cn';

import './NavigationPopup.scss';

const b = block('navigation-popup');

interface NavigationPopupProps {
    withBackground: boolean;
    headerRef?: RefObject<HTMLDivElement>;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const NavigationPopup: React.FC<NavigationPopupProps> = ({
    withBackground,
    headerRef,
    children,
    className,
    id,
}) => {
    return headerRef?.current
        ? ReactDOM.createPortal(
              <FocusTrap enabled>
                  <div className={b({['with-background']: withBackground}, className)} id={id}>
                      <Grid containerClass={b('grid-container')}>{children}</Grid>
                  </div>
              </FocusTrap>,
              headerRef.current,
          )
        : null;
};
