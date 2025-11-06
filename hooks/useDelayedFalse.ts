import { useCallback, useEffect, useRef, useState } from 'react';

export default function useDelayedFalse(initial: boolean = false, delayMs = 1000): [boolean, (v: boolean) => void] {
    const [value, setValue] = useState(initial);
    const actualValue = useRef(initial);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const setDelayedValue = useCallback((newValue: boolean) => { 
        actualValue.current = newValue;
        if (newValue) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current); // cancel previous timeout
            }
            setValue(newValue);
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                if (!actualValue.current)
                    setValue(false);
            }, delayMs);
        } else if (timeoutRef.current == null)
            setValue(newValue);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);
        };
    }, [])
    return [value, setDelayedValue];
}
