import React, { useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import {
    Alignment,
    Button,
    Emphasis,
    FlexBox,
    LinkPreview,
    Orientation,
    Size,
    TextField,
    Theme,
    Thumbnail,
    ThumbnailVariant,
    Toolbar,
    UserBlock,
} from '@lumx/react';
import { NotificationsProvider, PredefinedErrorBoundary, useLanguage } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

interface ShareProps {
    link: string;
    onClose(): void;
    title: string;
    uid: string;
}

const Share: import('lumapps-sdk-js').ContentComponent<undefined, ShareProps> = ({
    value = {},
    theme = Theme.light,
}) => {
    const { link = 'https://google.com', onClose, title = 'Google application', uid } = value;

    const [message, setMessage] = useState<string>();

    return (
        <div>
            <FlexBox orientation={Orientation.vertical}>
                <FlexBox
                    orientation={Orientation.horizontal}
                    vAlign={Alignment.center}
                    hAlign={Alignment.center}
                    style={{ backgroundColor: '#ffcf1e', padding: 12 }}
                >
                    <Thumbnail
                        alt="External service"
                        className="lumx-spacing-margin-right-regular"
                        variant={ThumbnailVariant.squared}
                        image="https://www.logolynx.com/images/logolynx/56/56f9957253c5718361c93a52c1ab950d.png"
                        size={Size.xs}
                    />
                    <FlexBox style={{ height: 'fit-content' }}>External service</FlexBox>
                </FlexBox>

                <FlexBox style={{ backgroundColor: 'white', padding: 12 }}>
                    <div>
                        <UserBlock
                            theme={theme}
                            name="Randy Bishop"
                            fields={['Share with external service']}
                            avatarProps={{ image: 'https://randomuser.me/api/portraits/men/86.jpg', alt: 'Avatar' }}
                            size={Size.m}
                        />

                        <div style={{ margin: '8px 0' }}>
                            <TextField
                                multiline
                                value={message}
                                onChange={setMessage}
                                label="Your message"
                                maxLength={5000}
                            />
                        </div>

                        <LinkPreview
                            title={title}
                            description="Description"
                            link={link}
                            theme={theme}
                            thumbnailProps={{
                                image:
                                    'https://images.unsplash.com/photo-1549492423-400259a2e574?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=554&q=80',
                                alt: 'Landscape',
                            }}
                        />
                    </div>
                </FlexBox>

                <Toolbar
                    style={{ paddingRight: 0 }}
                    after={
                        <FlexBox orientation={Orientation.horizontal}>
                            <Button
                                onClick={onClose}
                                emphasis={Emphasis.medium}
                                className="lumx-spacing-margin-right-regular"
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={() => {
                                    alert(`Share content ${uid}`);
                                }}
                                emphasis={Emphasis.high}
                                disabled={!message || message.length === 0}
                            >
                                Share
                            </Button>
                        </FlexBox>
                    }
                />
            </FlexBox>
        </div>
    );
};

const NotificationAwareContent: typeof Share = (props) => {
    const { displayLanguage } = useLanguage();
    const messages: Record<string, Record<string, string>> = {
        en: messagesEn,
        fr: messagesFr,
    };
    const lang = useMemo(() => (Object.keys(messages).includes(displayLanguage) ? displayLanguage : 'en'), [
        displayLanguage,
        messages,
    ]);

    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <NotificationsProvider>
                <PredefinedErrorBoundary>
                    <Share {...props} />
                </PredefinedErrorBoundary>
            </NotificationsProvider>
        </IntlProvider>
    );
};

export { NotificationAwareContent as Share };
