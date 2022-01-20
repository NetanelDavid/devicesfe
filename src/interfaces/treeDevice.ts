import { DeviceModel } from "./device";

export interface TreeDeviceModel {
    key: string | number;
    data: DeviceModel;
    children?: TreeDeviceModel[]
}