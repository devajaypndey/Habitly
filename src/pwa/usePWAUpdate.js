import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export default function usePWAUpdate() {

    const [show, setShow] = useState(false);

    const { 
        needRefresh, updateServiceWorker 
    } = useRegisterSW({
        onNeedRefresh(){
            setShow(true);
        },
        onOfflineReady(){
            console.log("App ready to work offline");
        },
    });

    useEffect(() => {
        if(!needRefresh){
            setShow(false);
        }
    }, [needRefresh]);

    return {
        needRefresh, 
        updateServiceWorker
    };
}