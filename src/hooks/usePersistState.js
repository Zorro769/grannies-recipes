import { useEffect, useMemo, useState } from "react"

const usePersistState = (key, value) => {
    const _value = useMemo(() => {
        const session_storage_value_str = sessionStorage.getItem('state:' + key);
        if (session_storage_value_str) {
            return JSON.parse(session_storage_value_str);
        }
        return value;
    }, []);

    const [state, setState] = useState(_value);

    useEffect(() => {
        const state_str = JSON.stringify(state);
        sessionStorage.setItem('state:' + key, state_str);

    }, [state]);

    return [state, setState];
}

export default usePersistState;