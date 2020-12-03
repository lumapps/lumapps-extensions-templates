import React, { useEffect, useState } from 'react';
import { Slider, Switch, TextField } from '@lumx/react';

import { Lumapps } from 'lumapps-sdk-js';

import { FormattedMessage, IntlProvider, useIntl } from '@lumapps-extensions-playground/translations';
import { PredefinedErrorBoundary, useDebounce, useExportProps } from '@lumapps-extensions-playground/common';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

interface WithIntlSettingsProps {
    properties?: any;
    exportProp: any;
}

const WithIntlSettings: React.FC<WithIntlSettingsProps> = ({ properties = {}, exportProp }) => {
    const intl = useIntl();

    const [imageId, setImageId] = useState(properties.imageId);
    const [useGreyScale, setUseGreyScale] = useState(properties.useGreyScale);
    const [useBlur, setUseBlur] = useState(properties.useBlur);
    const [blur, setBlur] = useState(properties.blur);

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
            <Switch className="mt+ ml" checked={useGreyScale} onToggle={setUseGreyScale}>
                {intl.formatMessage({ id: 'settings.grey' })}
            </Switch>

            <Switch className="mt+ ml lumx-spacing-margin-vertical-big" checked={useBlur} onToggle={setUseBlur}>
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

const WidgetSettings = ({ properties = {}, exportProp = undefined }) => {
    const messages: any = {
        en: messagesEn,
        fr: messagesFr,
    };

    const [lang, setLang] = useState<string>('en');
    useEffect(() => {
        const getContext = async () => {
            const lumapps = new Lumapps();
            const { userLang: userLangPromise } = lumapps.context;

            const userLang = await userLangPromise;
            if (Object.keys(messages).includes(userLang)) {
                setLang(userLang);
            }
        };
        getContext();
    }, []);

    return (
        <PredefinedErrorBoundary lang={lang}>
            <IntlProvider locale={lang} messages={messages[lang]}>
                <WithIntlSettings properties={properties} exportProp={exportProp} />
            </IntlProvider>
        </PredefinedErrorBoundary>
    );
};

export default WidgetSettings;
