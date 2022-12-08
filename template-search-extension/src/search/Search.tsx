/** Should always be exported as Search */
import { SearchExtension, SEARCH_SDK_SUPPORTED_VERSIONS } from 'lumapps-sdk-js';
import { useSearch } from './Search/useSearch';

export const Search: SearchExtension = {
    searchSdkVersion: SEARCH_SDK_SUPPORTED_VERSIONS.V1,
    useSearch,
};
