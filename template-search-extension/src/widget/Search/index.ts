import { SearchExtensionInput, SearchExtensionOutput, RESULT_STATUS } from 'lumapps-sdk-js';

export const searchFunction = async ({ query, page, pageSize }: SearchExtensionInput): Promise<SearchExtensionOutput> => {
    // Search functionnality ....
    return {
        results: [],
        totalCount: 0,
        hasMore: false,
        status: RESULT_STATUS.FETCHED,
    }
}
