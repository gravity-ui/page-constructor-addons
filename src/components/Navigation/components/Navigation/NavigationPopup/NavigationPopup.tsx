import type {RefObject} from 'react';
import React from 'react';

import {Grid} from '@gravity-ui/page-constructor';
import ReactDOM from 'react-dom';

import {FocusTrap} from '../../../../../utils/FocusTrap';
import {block} from '../../../../../utils/cn';

import './NavigationPopup.scss';

const b = block('navigation-popup');

interface NavigationPopupProps {
    withBackground: boolean;
    headerRef?: RefObject<HTMLDivElement>;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const NavigationPopup = ({
    withBackground,
    headerRef,
    children,
    className,
    id,
}: NavigationPopupProps) => {
    return headerRef?.current
        ? ReactDOM.createPortal(
              <FocusTrap enabled>
                  <div
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                      tabIndex={0}
                      className={b({['with-background']: withBackground}, className)}
                      id={id}
                  >
                      <Grid containerClass={b('grid-container')}>{children}</Grid>
                  </div>
              </FocusTrap>,
              headerRef.current,
          )
        : null;
};
