import {configure as configureDOM} from '@testing-library/dom';
import {configure as configureReact} from '@testing-library/react';

import {Lang, configure as libConfigure} from '../src/utils/configure';

libConfigure({
    lang: Lang.En,
});

configureDOM({testIdAttribute: 'data-qa'});
configureReact({testIdAttribute: 'data-qa'});
