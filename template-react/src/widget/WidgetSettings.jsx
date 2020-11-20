// react and react-dom are not part of the package.json
// dependencies because of a conflict with LumX versions
// (imho, LumX should put react and react-dom in peer dependencies)
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useEffect, useState } from "react";
import { Slider, Switch, TextField } from "@lumx/react";

import { Lumapps } from 'lumapps-sdk-js';

import {
  FormattedMessage,
  IntlProvider,
  useIntl,
} from "@lumapps-extensions-playground/translations";
import {
  PredefinedErrorBoundary,
  ErrorModalSize,
  useDebounce,
  useExportProps,
} from "@lumapps-extensions-playground/common";

import messagesEn from "../translations/en.json";
import messagesFr from "../translations/fr.json";

/**
 * Render the widget Picsum setttings form.
 *
 * @param {Object} props The settings component properties.
 */
const WithIntlSettings = ({ properties = {}, exportProp }) => {
  const intl = useIntl();

  const [imageId, setImageId] = useState(properties.imageId);
  const [useGreyScale, setUseGreyScale] = useState(properties.useGreyScale);
  const [useBlur, setUseBlur] = useState(properties.useBlur);
  const [blur, setBlur] = useState(properties.blur);

  const debouncedImageId = useDebounce(imageId, 800);

  useExportProps(debouncedImageId, "imageId", properties, exportProp);
  useExportProps(useGreyScale, "useGreyScale", properties, exportProp);
  useExportProps(useBlur, "useBlur", properties, exportProp);
  useExportProps(blur, "blur", properties, exportProp);

  return (
    <>
      <TextField
        className="mt0 ml lumx-spacing-margin-vertical-big"
        label={<FormattedMessage id="settings.image_id" />}
        value={imageId}
        onChange={setImageId}
      />
      <Switch
        className="mt+ ml"
        checked={useGreyScale}
        onToggle={setUseGreyScale}
      >
        {intl.formatMessage({ id: "settings.grey" })}
      </Switch>

      <Switch
        className="mt+ ml lumx-spacing-margin-vertical-big"
        checked={useBlur}
        onToggle={setUseBlur}
      >
        {intl.formatMessage({ id: "settings.blur" })}
      </Switch>

      {useBlur && (
        <Slider
          label={<FormattedMessage id="settings.blur_value_title" />}
          helper={<FormattedMessage id="settings.blur_value_desc" />}
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
  const messages = {
    en: messagesEn,
    fr: messagesFr,
  };

  const [lang, setLang] = useState('en');
  useEffect(() => {
    const getContext = async () => {
      const lumapps = new Lumapps();
      const {
        userLang: userLangPromise,
      } = lumapps.context;

      const userLang = await userLangPromise;
      if (Object.keys(messages).includes(userLang)) {
        setLang(userLang);
      }
    };
    getContext();
  }, []);

  return (
    <PredefinedErrorBoundary size={ErrorModalSize.small} lang={lang}>
      <IntlProvider locale={lang} messages={messages[lang]}>
        <WithIntlSettings properties={properties} exportProp={exportProp} />
      </IntlProvider>
    </PredefinedErrorBoundary>
  );
};

export default WidgetSettings;
