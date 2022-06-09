import { ExtensionInput, ExtensionOutput, LOADING_STATUS } from '../../types';

export const searchFunction = async ({ query, page, pageSize }: ExtensionInput): Promise<ExtensionOutput> => {
    // Search functionnality ....
    return {
        results: [],
        totalCount: 0,
        hasMore: false,
        status: LOADING_STATUS.FETCHED,
    }
}
