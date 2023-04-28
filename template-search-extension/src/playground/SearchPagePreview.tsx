import React from 'react';
import { ContentComponentProps, RESULT_STATUS, useDebounce, SearchSort } from 'lumapps-sdk-js';
import { mdiMagnify, mdiTrophyBroken } from '@lumx/icons';
import { FlexBox, Icon, Text, TextField, Button, Orientation, Divider } from '@lumx/react';

import { UseSearchParams, useSearch } from '../search/useSearch';
import { ExtensionSearchSettings } from '../types';
import { Results } from './Results';
import { Sorters } from './Sorters';

/**
 *
 * @param props
 * @returns
 */
export const SearchPagePreview = (props: ContentComponentProps<unknown, ExtensionSearchSettings>) => {
    const [query, setQuery] = React.useState('formage');
    const [page, setPage] = React.useState(0);
    const debouncedQuery = useDebounce(query, 500);
    const [sort, setSort] = React.useState<SearchSort | undefined>();

    const { properties, extensionId } = props;

    const input: UseSearchParams = React.useMemo(
        () => ({
            query: debouncedQuery,
            pageSize: 10,
            language: 'en',
            extensionId,
            connectorId: 'connector',
            page,
            sort: sort?.value,
            settings: properties,
        }),
        [page, debouncedQuery, sort, properties, extensionId],
    );

    const { results, hasMore, status, totalCount, sortOrders = [] } = useSearch(input);

    const onSortChange = (newSort: SearchSort) => {
        setSort(newSort);
        setPage(0);
    };

    const loadMoreResults = () => {
        setPage(page + 1);
    };

    const currentSort = React.useMemo(() => {
        if (sort) {
            return sort;
        }
        if (sortOrders.length > 0) {
            return sortOrders[0];
        }

        return undefined;
    }, [sortOrders, sort]);

    return (
        <div className="lumx-spacing-padding-horizontal-huge">
            <TextField value={query} onChange={setQuery} icon={mdiMagnify} />

            {status === RESULT_STATUS.ERROR ? (
                <FlexBox
                    orientation="vertical"
                    hAlign="center"
                    vAlign="center"
                    className="lumx-spacing-padding-horizontal-huge"
                >
                    <Icon icon={mdiTrophyBroken} size="xl" hasShape />
                    <Text as="p" typography="title">
                        Oups, an error occured{' '}
                        <span role="img" aria-label="shrug">
                            🤷‍♂️
                        </span>
                    </Text>
                    <Text as="p" typography="body1">
                        Check the browser console
                    </Text>
                </FlexBox>
            ) : (
                <FlexBox orientation={Orientation.horizontal} className="lumx-spacing-margin-top-big" gap="big">
                    <FlexBox orientation={Orientation.vertical}>
                        <FlexBox orientation={Orientation.horizontal} hAlign="center" vAlign="space-between">
                            <Text as="p" typography="caption">
                                Found {totalCount} results for &quot;{debouncedQuery}&quot;
                            </Text>

                            {currentSort ? (
                                <Sorters choices={sortOrders} value={currentSort} onChange={onSortChange} />
                            ) : null}
                        </FlexBox>
                        <Results items={results} />
                        {hasMore && (
                            <Button
                                fullWidth
                                onClick={loadMoreResults}
                                className="lumx-spacing-margin-vertical-big"
                                emphasis="medium"
                                type="button"
                            >
                                Display more results
                            </Button>
                        )}
                    </FlexBox>
                </FlexBox>
            )}

            <Divider />
            <FlexBox className="lumx-spacing-margin-vertical-huge lumx-spacing-margin-horizontal-huge">
                <Text as="p" color="grey" typography="body2">
                    Debug info
                </Text>
                <p>Status: {status}</p>
                <p>Total count: {totalCount}</p>
                <p>hasMore: {`${hasMore}`}</p>
            </FlexBox>
        </div>
    );
};
