import React, { useMemo, useState } from 'react';
import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';
import { Slider, Switch, TextField } from '@lumx/react';
import { PredefinedErrorBoundary, useDebounce, useExportProps, useLanguage } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

type WidgetSettings = import('lumapps-sdk-js').SettingsComponent<
    import('./types').SampleAppGlobalParams,
    import('./types').SampleAppParams
>;

const WithIntlSettings: WidgetSettings = ({ properties = {}, exportProp }) => {
    const intl = useIntl();

    const [imageId, setImageId] = useState(properties.imageId);
    const [useGreyScale, setUseGreyScale] = useState<boolean>(properties.useGreyScale || false);
    const [useBlur, setUseBlur] = useState<boolean>(properties.useBlur || false);
    const [blur, setBlur] = useState(properties.blur || 1);

    const debouncedImageId = useDebounce(imageId, 800);

    useExportProps(debouncedImageId, 'imageId', properties, exportProp);
    useExportProps(useGreyScale, 'useGreyScale', properties, exportProp);
    useExportProps(useBlur, 'useBlur', properties, exportProp);
    useExportProps(blur, 'blur', properties, exportProp);

    return (
        <>
            <TextField
                className="mt0 ml lumx-spacing-margin-vertical-big"
                label={(<FormattedMessage id="settings.image_id" />) as any}
                value={imageId}
                onChange={setImageId}
            />
            <Switch className="mt+ ml" isChecked={useGreyScale} onChange={() => setUseGreyScale(!useGreyScale)}>
                {intl.formatMessage({ id: 'settings.grey' })}
            </Switch>

            <Switch
                className="mt+ ml lumx-spacing-margin-vertical-big"
                isChecked={useBlur}
                onChange={() => setUseBlur(!useBlur)}
            >
                {intl.formatMessage({ id: 'settings.blur' })}
            </Switch>

            {useBlur && (
                <Slider
                    label={(<FormattedMessage id="settings.blur_value_title" />) as any}
                    helper={(<FormattedMessage id="settings.blur_value_desc" />) as any}
                    max={10}
                    min={1}
                    value={blur}
                    onChange={setBlur}
                />
            )}
        </>
    );
};

export const WidgetSettings: WidgetSettings = (props) => {
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
            <PredefinedErrorBoundary>
                <WithIntlSettings {...props} />
            </PredefinedErrorBoundary>
        </IntlProvider>
    );
};
