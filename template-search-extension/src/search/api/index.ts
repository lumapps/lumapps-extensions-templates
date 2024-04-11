// import axios from 'axios';
import { ExtensionSearchInput } from 'lumapps-sdk-js';

import { results } from './mocks';
import { ApiResult } from '../../types';

export type FetchResultsParams = Pick<ExtensionSearchInput, 'query' | 'page' | 'pageSize'>;

/**
 * Mocked function to let you start with some example
 * @param FetchResultsParams what you need to fetch your api
 * @returns Promise of ApiResult
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchMocks = async (props: FetchResultsParams, token: string): Promise<ApiResult> =>
    new Promise((resolve) =>
        // eslint-disable-next-line no-promise-executor-return
        setTimeout(() => {
            resolve(results);
        }, 500),
    );
