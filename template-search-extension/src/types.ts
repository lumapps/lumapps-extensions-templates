export enum LOADING_STATUS {
    /**
     * Initial state.
     * This is the default state of the component.
     * This state should be use to trigger any action to do on mount for example.
     */
    INITIAL = 'initial',
    /**
     * Loading State
     * This state means that the component is currently loading.
     */
    LOADING = 'loading',
    /**
     * Fetched State.
     * This state means that nothing is happening but
     * something *has* happened previously and the component has now returned to
     * a neutral state.
     */
    FETCHED = 'fetched',
    /**
     * Error State.
     * This state means that something went wrong and an error should be displayed.
     */
    ERROR = 'error',
}

export type ExtensionResult = {
    id: string;
    title: string;
    url: string;
    /** Decoration image */
    thumbnail?: string;
    /** Short extract of the result */
    snippet: string;
    /** Used for analytics purpose (used in data-id attributes) */
    source: string;
};

export type ExtensionInput = {
    extensionId: string;
    /** connector id to use */
    connectorId?: string;
    /** user query */
    query: string;
    /** user lang */
    language: string;
    /** Current page. Starting at 0 */
    page: number;
    /** Number of results to return */
    pageSize: number;
};

export type ExtensionOutput = {
    results: ExtensionResult[];
    totalCount: number;
    hasMore: boolean;
    status: LOADING_STATUS;
    error?: any;
};

