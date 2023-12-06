import {useContext} from 'react';

import {DeviceContext} from '../navigation/contexts/device';

export function useIsIPhone() {
    const device = useContext(DeviceContext);

    return device?.model === 'iPhone';
}
