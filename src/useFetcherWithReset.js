import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

export default function useFetcherWithReset({ key }) {
    const fetcher = useFetcher({ key: key });
    const [data, setData] = useState(fetcher.data);

    useEffect(() => {
        if (fetcher.state === "idle") {
            setData(fetcher.data);
        }
    }, [fetcher.state, fetcher.data]);

    return {
        ...fetcher,
        data: data,
        reset: () => setData(undefined)
    };
}