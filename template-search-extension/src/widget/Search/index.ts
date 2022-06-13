import { SearchExtensionInput, SearchExtensionOutput, LOADING_STATUS } from 'lumapps-sdk-js';

export const searchFunction = async ({ query, page, pageSize }: SearchExtensionInput): Promise<SearchExtensionOutput> => {
    // Search functionnality ....
    return {
        results: [],
        totalCount: 0,
        hasMore: false,
        status: LOADING_STATUS.FETCHED,
    }
}
