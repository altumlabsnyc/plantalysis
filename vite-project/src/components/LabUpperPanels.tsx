import { useState } from "react";
import OrderRequestPanel from "./OrderRequestsPanel";
import RequestDetailPanel from "./RequestDetailPanel";
import UploadPanel from "./UploadPanel";


export default function LabUpperPanels() {
    const [activeLabOrderId, setActiveLabOrderId] = useState<string|null>('default val')
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '30px',
            height: '100%',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'stretch'
            }}>
                <OrderRequestPanel setActiveLabOrderId={setActiveLabOrderId} />
                <UploadPanel />
            </div>
            <RequestDetailPanel activeLabOrderId={activeLabOrderId}/>
        </div>
    )
}
