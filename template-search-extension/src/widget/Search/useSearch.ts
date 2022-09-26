import axios from 'axios';
import React from 'react';
import { RESULT_STATUS, ExtensionSearchInput, ExtensionSearchOutput } from 'lumapps-sdk-js';

export const useSearch = ({ query, page = 0 }: ExtensionSearchInput): ExtensionSearchOutput => {
    const [data, setData] = React.useState<ExtensionSearchOutput>({
        results: [],
        hasMore: false,
        status: RESULT_STATUS.INITIAL,
        totalCount: 0,
    });

    const [status, setStatus] = React.useState<RESULT_STATUS>(RESULT_STATUS.INITIAL);

    React.useEffect(() => {
        try {
            setStatus(RESULT_STATUS.LOADING);
            axios.get(`https://fake.com`, {
                params: {
                    query,
                    page,
                }
            }).then((response) => {
                const responseData = response?.data || { results: [] };

                // Keep previous results in case of "load more" action
                if (page > 0) {
                    responseData.results = [...data.results, ...responseData.results];
                }

                setData(responseData);
                setStatus(RESULT_STATUS.FETCHED);
            });
        } catch (error) {
            setStatus(RESULT_STATUS.ERROR);
        }
    }, [query, page]);

    return {
        ...data,
        status,
    };
};
