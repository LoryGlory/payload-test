/* eslint-disable no-shadow */
import {useEffect, useRef, useState} from 'react';
import canUseDOM from '../utilities/canUseDOM';

type Resize = [
    setNode: React.Dispatch<Element>,
    entry: ResizeObserverEntry
]

const useResize = (): Resize => {
    const [entry, updateEntry] = useState<ResizeObserverEntry>();
    const [node, setNode] = useState(null);

    const observer = useRef(
        canUseDOM
            ? new window.ResizeObserver(([ent]) => updateEntry(ent)) : null,
    );

    useEffect(
        () => {
            const {current: currentObserver} = observer;
            // @ts-ignore
            currentObserver.disconnect();
            // @ts-ignore
            if (node) currentObserver.observe(node);
            // @ts-ignore
            return () => currentObserver.disconnect();
        },
        [node],
    );
    // @ts-ignore
    return [setNode, entry];
};

export default useResize;
