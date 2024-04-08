import { RESULT_STATUS, ExtensionSearchResult, ExtensionSearchOutput } from 'lumapps-sdk-js';
import { mdiBrain, mdiWeatherSunny } from '@lumx/icons';

import { ApiResult, ApiResultItem } from '../../types';

/**
 * Map individual search item to a LumApps item.
 * @param  Api results
 * @returns LumApps formatted results
 */
const mapApiResultItemsToSearchItems = (results: ApiResultItem[]): ExtensionSearchResult[] =>
    results.map(({ id, title, url, description, metadata, image }, index) => ({
        extensionSearchResultKey: id,
        id,
        title,
        url,
        snippet: description,
        icon: mdiBrain,
        thumbnail: image,
        source: '<your source>',
        customMetadata: metadata ? [metadata.type, metadata.lastUpdatedDate, `${metadata.likes} likes`] : [],
        flag:
            index === 0
                ? {
                      color: 'yellow',
                      label: 'Lightning',
                      icon: mdiWeatherSunny,
                  }
                : undefined,
    }));

/**
 * Map the entire Api response to fit to search extension output
 * @param apiResult Response from the api
 * @returns Mpped response with mapped results
 */
export const mapApiResultsToExtensionOutput = (apiResult: ApiResult): ExtensionSearchOutput => {
    const mappedResults = mapApiResultItemsToSearchItems(apiResult.results);

    return {
        hasMore: apiResult.hasMore,
        results: mappedResults,
        totalCount: apiResult.resultCount,
        status: RESULT_STATUS.FETCHED,
        defaultSortValue: 'relevance',
        sortOrders: [{ label: { default: 'Relevance' }, value: 'relevance' }],
        facets: [
            {
                choices: [
                    {
                        label: { en: 'A' },
                        value: 'a',
                        count: 20,
                    },
                    {
                        label: { en: 'B' },
                        value: 'b',
                        count: 10,
                    },
                ],
                field: 'key',
                id: 'key',
                label: { en: 'Key' },
                shouldDisplayAllValues: true,
            },
        ],
    };
};
