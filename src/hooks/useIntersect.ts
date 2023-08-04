/* eslint-disable no-shadow */
import {useEffect, useRef, useState} from 'react';
import canUseDOM from '../utilities/canUseDOM';

type Intersect = [
    setNode: React.Dispatch<Element>,
    entry: IntersectionObserverEntry
]

type IntersectOptions = {
    root?: null,
    rootMargin?: string,
    threshold?: number | number[]
}

const useIntersect = ({
                          root = null,
                          rootMargin = '0px',
                          threshold = 0,
                      }: IntersectOptions): Intersect => {
    const [entry, updateEntry] = useState<IntersectionObserverEntry>();
    const [node, setNode] = useState(null);

    const observer = useRef(
        canUseDOM
            ? new window.IntersectionObserver(([ent]) => updateEntry(ent), {
                root,
                rootMargin,
                threshold,
            }) : null,
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

export default useIntersect;
