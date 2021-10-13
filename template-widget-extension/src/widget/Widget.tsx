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

import { NotificationsProvider, PredefinedErrorBoundary, useLanguage, useNotifications } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

import defaultGlobalSettings from './defaultGlobalSettings';

type Widget = import('lumapps-sdk-js').ContentComponent<
    import('./types').SampleAppGlobalParams,
    import('./types').SampleAppParams
>;

const Widget: Widget = ({ value = {}, globalValue = {}, theme = Theme.light }) => {
    const [url, setUrl] = useState<string | undefined>();
    const [error, setError] = useState<string>();

    const { imageId, useGreyScale, useBlur, blur }: any = value;
    const { baseUrl = defaultGlobalSettings.baseUrl }: any = globalValue;

    useEffect(() => {
        const size = 1200;
        let link = baseUrl;
        link = imageId && imageId !== '' ? `${link}id/${imageId}/${size}` : `${link}${size}`;
        link = useGreyScale ? `${link}?grayscale` : link;
        // eslint-disable-next-line no-nested-ternary
        link = useBlur && useGreyScale ? `${link}&blur` : useBlur ? `${link}?blur` : link;
        link = useBlur && blur !== '' && blur !== undefined ? `${link}=${blur}` : link;

        setUrl(link);
    }, [blur, imageId, useBlur, useGreyScale, url, baseUrl]);

    const { notifySuccess } = useNotifications();

    useEffect(() => {
        notifySuccess(
            'Notification from a widget !!',
            'Click me',
            () => alert("I'm a notification action callback"),
            10000,
        );
    }, []);
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
                    <Widget {...props} />
                </PredefinedErrorBoundary>
            </NotificationsProvider>
        </IntlProvider>
    );
};

export { NotificationAwareWidget as Widget };
