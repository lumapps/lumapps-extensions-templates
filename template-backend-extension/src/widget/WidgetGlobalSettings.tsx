import React, { useMemo } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';

import { Link } from '@lumx/react';
import { NotificationsProvider, PredefinedErrorBoundary, useLanguage } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

type WidgetGlobalSettings = import('lumapps-sdk-js').GlobalSettingsComponent<any>;

/**
 * Render the widget Picsum settings form.
 *
 * @param {Object} props The settings component properties.
 */
const IntlWidgetGlobalSettings: WidgetGlobalSettings = ({ properties = {}, exportProp }) => {
    const contactMail = '';
    const subjectMail = '';

    return (
        <div>
            <p className="lumx-typography-body2"><FormattedMessage id="GLOBAL_SETTINGS.CONTACT"/>: <Link target="_blank" href="mailto:contact@mail.com">mailto:contact@mail.com</Link></p>
        </div>
    );
};

export const WidgetGlobalSettings: WidgetGlobalSettings = (props) => {
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
                    <IntlWidgetGlobalSettings {...props} />
                </PredefinedErrorBoundary>
            </NotificationsProvider>
        </IntlProvider>
    );
};

