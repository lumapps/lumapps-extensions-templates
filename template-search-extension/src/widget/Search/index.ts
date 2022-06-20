import { SearchExtensionInput, RESULT_STATUS, SearchExtensionOutput } from 'lumapps-sdk-js';

export const searchFunction = ({ query, page, pageSize }: SearchExtensionInput): SearchExtensionOutput => {
    // Search functionnality ....
    return Promise.resolve({
        results: [],
        totalCount: 0,
        hasMore: false,
        status: RESULT_STATUS.FETCHED,
    })
}
