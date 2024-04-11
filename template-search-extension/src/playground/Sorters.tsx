/* istanbul ignore file */
import React from 'react';

import isEqual from 'lodash/isEqual';

import { SearchSort } from 'lumapps-sdk-js';

import { Button, Dropdown, FlexBox, List, ListItem, Orientation, Size, Text } from '@lumx/react';
import { mdiMenuDown } from '@lumx/icons';

export type SortersProps = {
    /** List of available sort items */
    choices: SearchSort[];
    /** Current selected sort item */
    value: SearchSort;
    /** Action when the sort item changes */
    onChange(sort: SearchSort): void;
};

export const Sorters = ({ choices, onChange, value }: SortersProps) => {
    const [isOpen, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen((wasOpen) => !wasOpen);
    const anchorRef = React.useRef(null);

    const handleOnChange = (sort: SearchSort) => {
        if (!isEqual(sort, value)) {
            onChange(sort);
        }
    };

    if (!choices || choices.length === 0) {
        return null;
    }

    return (
        <FlexBox orientation={Orientation.horizontal} hAlign="center">
            <Text as="p" typography="caption" className="lumx-spacing-margin-right-big">
                Sort by
            </Text>
            <Button
                aria-haspopup
                aria-controls="sorts"
                aria-expanded={isOpen}
                ref={anchorRef}
                onClick={toggleOpen}
                size="s"
                rightIcon={mdiMenuDown}
                emphasis="low"
            >
                {value.label.default}
            </Button>
            <Dropdown id="sorts" isOpen={isOpen} onClose={toggleOpen} anchorRef={anchorRef}>
                <List role="menu" aria-label="sorts">
                    {choices.map((option) => (
                        <ListItem
                            key={option.value}
                            role="menuitem"
                            size={Size.tiny}
                            isSelected={value === option}
                            onItemSelected={() => handleOnChange(option)}
                        >
                            {option.label.default}
                        </ListItem>
                    ))}
                </List>
            </Dropdown>
        </FlexBox>
    );
};
