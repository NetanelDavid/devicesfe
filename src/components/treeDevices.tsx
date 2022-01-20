import { FC, useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeDeviceModel } from '../interfaces/treeDevice';

interface Props {
    deviceMain: TreeDeviceModel;
}

const TreeDevices: FC<Props> = (props) => {

    const { deviceMain } = props;
    const [nodes, setNodes] = useState<TreeDeviceModel[]>([]);

    useEffect(() => {
        setNodes([deviceMain]);
    }, [deviceMain]);

    return <> {
        nodes && nodes[0] &&
        <div className='d-flex justify-content-center'>
            <div className='card'>
                <h3 className='py-2 text-center'>all usb</h3>
                <TreeTable value={nodes}>
                    <Column field="type" header="type" expander></Column>
                    <Column field="productId" header="product id" ></Column>
                    <Column field="vendorId" header="vendor id"></Column>
                    <Column field="description" header="description"></Column>
                    <Column field="productIdParent" header="parent product id"></Column>
                </TreeTable>
            </div>
        </div>
    }</>


}

export default TreeDevices;