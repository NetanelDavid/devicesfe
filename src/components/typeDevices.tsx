import { FC, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TypeDevicesModel } from '../interfaces/typeDevices';

const TypeDevices: FC<TypeDevicesModel> = (props) => {

    const { hubs, devices } = props;

    const [products, setProducts] = useState<TypeDevicesModel>(null);

    useEffect(() => {
        setProducts({ devices, hubs });
    }, [hubs, devices]);

    return <>{products?.hubs &&
        <div >
            <div className="row justify-content-center">

                <div className="card">
                    <h3 className='py-2 text-center'>usb hubs</h3>
                    <DataTable value={products.hubs} responsiveLayout="scroll">
                        <Column field="productId" header="product id" ></Column>
                        <Column field="vendorId" header="vendor id"></Column>
                        <Column field="description" header="description"></Column>
                        <Column field="productIdParent" header="parent product id"></Column>
                    </DataTable>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="card">
                    <h3 className='py-2 text-center'>usb devices</h3>
                    <DataTable value={products.devices} responsiveLayout="scroll">
                        <Column field="productId" header="product id" ></Column>
                        <Column field="vendorId" header="vendor id"></Column>
                        <Column field="description" header="description"></Column>
                        <Column field="productIdParent" header="parent product id"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    }</>

}

export default TypeDevices;