import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import {
    Chip,
    ChipGroup,
    ImageBlock,
    ImageBlockCaptionPosition,
    Notification,
    Kind,
    Size,
    Theme,
    AspectRatio,
} from '@lumx/react';

import {
    NotificationsProvider,
    PredefinedErrorBoundary,
    useLanguage,
    useNotifications,
    useProperties,
} from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

import defaultGlobalSettings from './defaultGlobalSettings';
import { SampleAppGlobalParams, SampleAppParams } from './types';

type Widget = import('lumapps-sdk-js').ContentComponent<SampleAppGlobalParams, SampleAppParams>;

const Widget: Widget = ({ theme = Theme.light }) => {
    const [url, setUrl] = useState<string | undefined>();
    const [error, setError] = useState<string>();

    const { properties, globalProperties } = useProperties<SampleAppGlobalParams, SampleAppParams>();

    const { imageId, useGreyScale, useBlur, blur } = properties;

    useEffect(() => {
        const size = 1200;
        let link = globalProperties?.baseUrl ?? defaultGlobalSettings.baseUrl;
        link = imageId && imageId !== '' ? `${link}id/${imageId}/${size}` : `${link}${size}`;
        link = useGreyScale ? `${link}?grayscale` : link;
        // eslint-disable-next-line no-nested-ternary
        link = useBlur && useGreyScale ? `${link}&blur` : useBlur ? `${link}?blur` : link;
        link = useBlur && blur !== undefined ? `${link}=${blur}` : link;

        setUrl(link);
    }, [blur, imageId, useBlur, useGreyScale, url, globalProperties?.baseUrl]);

    const { notifySuccess } = useNotifications();

    useEffect(() => {
        notifySuccess(
            'Notification from a widget !!',
            'Click me',
            () => alert("I'm a notification action callback"),
            10000,
        );
    }, [notifySuccess]);

    return (
        <div className="widget-picsum">
            {error && (
                <Notification
                    theme={theme}
                    type={Kind.error}
                    content={<FormattedMessage id="errors.retrieve_user" />}
                    isOpen
                    actionLabel="Dismiss"
                    onActionClick={() => setError(undefined)}
                />
            )}
            <ImageBlock
                alt=""
                captionPosition={ImageBlockCaptionPosition.over}
                description={(<FormattedMessage id="description" />) as any}
                tags={
                    <ChipGroup>
                        <Chip size={Size.s} theme={theme}>
                            Marketplace
                        </Chip>
                        <Chip size={Size.s} theme={theme}>
                            Widgets
                        </Chip>
                        <Chip size={Size.s} theme={theme}>
                            LumApps
                        </Chip>
                    </ChipGroup>
                }
                theme={theme}
                title={(<FormattedMessage id="sub_title" />) as any}
                image={url as string}
                thumbnailProps={{
                    aspectRatio: AspectRatio.horizontal,
                }}
            />
        </div>
    );
};

const NotificationAwareWidget: Widget = (props) => {
    const { displayLanguage } = useLanguage();

    const messages = useMemo(
        () => ({
            en: messagesEn,
            fr: messagesFr,
        }),
        [],
    );

    const lang = useMemo(() => (Object.keys(messages).includes(displayLanguage) ? displayLanguage : 'en'), [
        displayLanguage,
        messages,
    ]);

    return (
        <IntlProvider locale={lang} messages={messages[lang as keyof typeof messages]}>
            <NotificationsProvider>
                <PredefinedErrorBoundary>
                    <Widget {...props} />
                </PredefinedErrorBoundary>
            </NotificationsProvider>
        </IntlProvider>
    );
};

export { NotificationAwareWidget as Widget };
