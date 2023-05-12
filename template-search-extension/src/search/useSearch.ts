import React from 'react';
import { RESULT_STATUS, ExtensionSearchInput, ExtensionSearchOutput } from 'lumapps-sdk-js';

import { ExtensionSearchSettings } from '../types';
import { fetchMocks } from './api';
import { mapApiResultsToExtensionOutput } from './api/mapApiResultsToExtensionOutput';

export type UseSearchParams = ExtensionSearchInput & {
    settings?: ExtensionSearchSettings;
};

export const useSearch = (props: UseSearchParams): ExtensionSearchOutput => {
    const extensionToken = ''; // TODO: call the connector API to get the third-party token
    const [data, setData] = React.useState<ExtensionSearchOutput>({
        results: [],
        hasMore: false,
        status: RESULT_STATUS.INITIAL,
        totalCount: 0,
    });

    const [status, setStatus] = React.useState<RESULT_STATUS>(RESULT_STATUS.INITIAL);

    React.useEffect(() => {
        const callApi = async () => {
            try {
                setStatus(RESULT_STATUS.LOADING);

                const apiResult = await fetchMocks(
                    {
                        pageSize: props.pageSize,
                        page: props.page,
                        query: props.query,
                    },
                    extensionToken,
                );

                const shouldMergeResults = props.page && props.page > 0;
                const output = mapApiResultsToExtensionOutput(apiResult);
                setData((prev) => {
                    return {
                        ...output,
                        results: shouldMergeResults ? [...prev.results, ...output.results] : output.results,
                    };
                });
                setStatus(RESULT_STATUS.FETCHED);
            } catch (error) {
                setStatus(RESULT_STATUS.ERROR);
            }
        };

        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.language, props.page, props.pageSize, props.query, extensionToken]);

    return {
        ...data,
        status,
    };
};
