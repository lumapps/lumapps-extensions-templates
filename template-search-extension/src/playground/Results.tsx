import React from 'react';
import { mdiFileDocument } from '@lumx/icons';
import { Divider, FlexBox, GenericBlock, Heading, Icon, Text, Link, Thumbnail } from '@lumx/react';

import { ExtensionSearchResult } from 'lumapps-sdk-js';

export interface ResultsProps {
    items: ExtensionSearchResult[];
}

export const Results = ({ items }: ResultsProps) => {
    return (
        <FlexBox>
            {items.map((item, index) => (
                <React.Fragment key={item.id}>
                    <GenericBlock
                        key={item.id}
                        as="article"
                        orientation="horizontal"
                        className="lumx-spacing-padding-big"
                    >
                        <GenericBlock.Figure>
                            {item.thumbnail ? (
                                <Thumbnail
                                    image={item.thumbnail}
                                    alt=""
                                    badge={item.icon ? <Icon icon={item.icon} size="s" hasShape /> : undefined}
                                    aspectRatio="square"
                                    size="l"
                                />
                            ) : (
                                <Icon icon={item.icon || mdiFileDocument} size="l" hasShape />
                            )}
                        </GenericBlock.Figure>
                        <GenericBlock.Content>
                            <Heading as="h2" typography="subtitle2">
                                <Link href={item.url} target="_blank">
                                    {item.title}
                                </Link>
                            </Heading>
                            {item.source ? (
                                <Text as="span" typography="body1" color="dark" colorVariant="L2">
                                    {item.source}
                                </Text>
                            ) : null}
                            <Text
                                as="p"
                                typography="body1"
                                color="dark"
                                colorVariant="L2"
                                dangerouslySetInnerHTML={{ __html: item.snippet }}
                            />
                        </GenericBlock.Content>
                    </GenericBlock>
                    {index !== items.length - 1 && (
                        <Divider className="lumx-spacing-margin-vertical-big lumx-spacing-margin-horizontal-huge" />
                    )}
                </React.Fragment>
            ))}
        </FlexBox>
    );
};
