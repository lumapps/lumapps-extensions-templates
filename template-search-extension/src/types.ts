export type ApiResultItem = {
    id: string;
    url: string;
    title: string;
    description: string;
    image?: string;
    metadata?: {
        likes: number;
        type: string;
        lastUpdatedDate: string;
    };
};

export type ApiResult = {
    page: number;
    hasMore: boolean;
    resultCount: number;
    results: ApiResultItem[];
};

export type ExtensionGlobalSearchSettings = {};

export type ExtensionSearchSettings = {
    searchId: string;
};
