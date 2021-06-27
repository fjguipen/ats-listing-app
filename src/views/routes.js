import { DeviceDetail } from './DeviceDetail';
import { Devices } from './Devices';

export const routes = [
  {
    id: 'devices',
    path: '/devices',
    component: Devices,
    metaTags: {
      title: 'metas.devices.title'
    }
  },
  {
    id: 'device-detail',
    path: '/devices/:deviceId',
    component: DeviceDetail,
    metaTags: {
      title: 'metas.device.title'
    }
  }
];
