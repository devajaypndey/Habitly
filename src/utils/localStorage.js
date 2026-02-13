import { toast } from "react-toastify";

export const loadState = () => {
    try{
        const serializedState = localStorage.getItem("app_state")
        if(!serializedState) return undefined
        return JSON.parse(serializedState)
        
    }catch(err){
        console.error("Could not load state", err);
        toast.error("failed to load saved data")
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("app_state", serializedState)
        toast.success("Data saved Successfully!")

    } catch (err) {
        console.error("could not save state", err);
        toast.error("Failed to save data");
    }
};