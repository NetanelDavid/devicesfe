import { useEffect, useState } from 'react';
import { DeviceModel } from './interfaces/device';
import { SelectButton } from 'primereact/selectbutton';
import TreeDevices from './components/treeDevices';
import TypeDevices from './components/typeDevices';
import { TreeDeviceModel } from './interfaces/treeDevice';
import { TypeDevicesModel } from './interfaces/typeDevices';
import './App.css';

enum SelectButtonValue {
  tree = "tree",
  type = "type"
}

const App = () => {

  const [treeDeviceMain, setTreeDeviceMain] = useState<TreeDeviceModel>(null);
  const [{ hubs, devices }, setTypeDevices] = useState<TypeDevicesModel>({ devices: [], hubs: [] });
  const [selectButtonValue, setSelectButton] = useState<SelectButtonValue>(null);

  const getTreeDeviceMain = (devices: DeviceModel[]) => {

    const devicesTree: TreeDeviceModel[] = devices.map(d => {
      return { data: { ...d }, key: d.productId }
    });

    const setChildToParent = (device: TreeDeviceModel) => {

      if (!device.data.productIdParent) {
        return;
      }

      const parent = devicesTree.find(d => d.data.productId === device.data.productIdParent);
      parent.children = parent.children || [];
      parent.children.push(device);
    }

    const sortChildrn = (device: TreeDeviceModel) => {
      if (!device.children) {
        return;
      }
      device.children.sort((a, b) => a.data.type === 'device' ? -1 : 1);
      device.children.forEach(d => sortChildrn(d));
    }

    for (let device of devicesTree) {
      device.key = device.data.productId;
      setChildToParent(device);
    }

    const desktop = devicesTree.find(d => d.data.description === "desktop");
    sortChildrn(desktop);
    return desktop;
  }

  const getTypeDevices = (allDevices: DeviceModel[]) => {
    const hubs = allDevices.filter(d => d.type === 'hub');
    const devices = allDevices.filter(d => d.type === 'device');
    hubs.sort(h => h.description === "desktop" ? -1 : 0);
    return { hubs, devices };
  }

  useEffect(() => {
    setSelectButton(SelectButtonValue.tree);

    const eventSource = new EventSource('http://localhost:5050/devices');

    eventSource.onmessage = e => {
      const allDevices = JSON.parse(e.data) as DeviceModel[];
      const treeDeviceMain = getTreeDeviceMain(allDevices);
      const { hubs, devices } = getTypeDevices(allDevices);
      setTreeDeviceMain(treeDeviceMain);
      setTypeDevices({ hubs, devices });
    }
  }, []);

  return <>
    <h1 className='header text-center mt-3'>usb devices</h1>
    <div className="select-button">
      <SelectButton
        value={selectButtonValue}
        options={Object.values(SelectButtonValue)}
        onChange={e => setSelectButton(e.value)}
      />
    </div>

    <div className="mt-5">
      {selectButtonValue === SelectButtonValue.tree ?
        <TreeDevices deviceMain={treeDeviceMain} /> :
        <TypeDevices hubs={hubs} devices={devices} />
      }
    </div>
  </>
}
export default App;