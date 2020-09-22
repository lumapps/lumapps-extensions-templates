// react and react-dom are not part of the package.json
// dependencies because of a conflict with LumX versions
// (imho, LumX should put react and react-dom in peer dependencies)
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useEffect, useState } from 'react'
import { Lumapps } from 'lumapps-sdk-js'
import {
	AspectRatio,
	Button,
	Chip,
	ChipGroup,
	Divider,
	ImageBlock,
	ImageBlockCaptionPosition,
	Notification,
	NotificationType,
	Size,
	Theme,
	Toolbar,
	UserBlock
} from '@lumx/react'

import { FormattedMessage, IntlProvider } from "@lumapps-extensions-playground/translations";
import {
	PredefinedErrorBoundary,
	useNotifications,
	withLumappsContext,
	NotificationsProvider
} from '@lumapps-extensions-playground/common'



import messagesEn from '../translations/en.json'
import messagesFr from '../translations/fr.json'

import defaultGlobalSettings from './defaultGlobalSettings'

/**
 * Display random image from the Picsum API.
 *
 * @param {Object} value The different settings to apply to the displayed image.
 */

const theme = Theme.light

const Widget = ({ value = {}, globalValue = {} }) => {
	   const [url, setUrl] = useState();
	   const [user, setUser] = useState();
	   const [error, setError] = useState();

	   const { imageId, useGreyScale, useBlur, blur } = value;
	   const { baseUrl = defaultGlobalSettings.baseUrl } = globalValue;

	   useEffect(() => {
	     const fetch = async () => {
	       try {
	         const lumapps = new Lumapps();
	         const res = await lumapps.getConnectedUser();
	         setUser(res);
	       } catch (exception) {
	         console.error(exception);
	         setError(exception);
	       }
	     };

	     fetch();
	   }, []);

	   useEffect(() => {
	     const size = 1200;
	     let link = baseUrl;
	     link =
	       imageId && imageId !== ""
	         ? `${link}id/${imageId}/${size}`
	         : `${link}${size}`;
	     link = useGreyScale ? `${link}?grayscale` : link;
	     // eslint-disable-next-line no-nested-ternary
	     link =
	       useBlur && useGreyScale
	         ? `${link}&blur`
	         : useBlur
	         ? `${link}?blur`
	         : link;
	     link =
	       useBlur && blur !== "" && blur !== undefined ? `${link}=${blur}` : link;

	     setUrl(link);
	   }, [blur, imageId, useBlur, useGreyScale, url, baseUrl]);

	   const getProfilePicture = (apiProfile) => {
	     if (
	       apiProfile.thumbnail &&
	       apiProfile.thumbnail.mimeType &&
	       apiProfile.thumbnail.photoData
	     ) {
	       return `data:${
	         apiProfile.thumbnail.mimeType
	       };base64,${apiProfile.thumbnail.photoData
	         .replace(/_/g, "/")
	         .replace(/-/g, "+")}`;
	     }

	     return apiProfile.profilePicture;
	   };

	const { notifySuccess } = useNotifications()

	useEffect(() => {
		notifySuccess('Notification from a widget !!')
	}, [])

	return (
		<PredefinedErrorBoundary>
		<>
	         <div className="widget-picsum">
		       {!error && user && (
		         <>
		           <Toolbar
		             label={
		               <span>
		                 <FormattedMessage id="title" />
		               </span>
		             }
		             after={
		               <UserBlock
		                 theme={theme}
		                 name={user.fullName}
		                 fields={[user.email]}
		                 avatar={getProfilePicture(user.apiProfile)}
		                 size={Size.m}
		               />
		             }
		           />
		           <Divider />
		         </>
		       )}
		       {error && (
		         <Notification
		           type={NotificationType.error}
		           content={<FormattedMessage id="errors.retrieve_user" />}
		           isOpen
		           actionLabel="Dismiss"
		           actionCallback={setError}
		         />
		       )}
		       <ImageBlock
		         aspectRatio={AspectRatio.horizontal}
		         captionPosition={ImageBlockCaptionPosition.over}
		         description={<FormattedMessage id="description" />}
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
		         title={<FormattedMessage id="sub_title" />}
		         image={url}
		       />
		     </div>
		</>
		</PredefinedErrorBoundary>
	)
}

const NotificationAwareWidget = (props) => {
	const messages = {
		en: messagesEn,
		fr: messagesFr
	}
	const {
		LUMAPPS_WIDGETS_SETTINGS: {
		  userLang,
		},
	  } = window;
	  const lang = Object.keys(messages).includes(userLang) ? userLang : 'en';
	
	return (
		<IntlProvider messages={messages[lang]} lang={lang}>
			<NotificationsProvider>
				<Widget {...props} />
			</NotificationsProvider>
		</IntlProvider>
	)
}

export default withLumappsContext(NotificationAwareWidget)
