import contentstack from "@contentstack/delivery-sdk"
import ContentstackLivePreview, { type IStackSdk } from "@contentstack/live-preview-utils";
import Personalize from '@contentstack/personalize-edge-sdk';
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

export default defineNuxtPlugin(async (nuxtApp) => {
  const {
    apiKey,
    deliveryToken,
    previewToken,
    region,
    environment,
    preview,
    p13nProjectUid
  } = nuxtApp.$config.public;

  const regionAsEnum = getRegionForString(region);
  const endpoints = getContentstackEndpoints(regionAsEnum, true)

  // Set up stack for content delivery
  const stack = contentstack.stack({
    apiKey,
    deliveryToken,
    environment,
    region: regionAsEnum,
    live_preview: {
      enable: preview ? true : false,
      preview_token: previewToken,
      host: endpoints.preview,
    }
  });

  // Set up live preview
  if (preview && import.meta.client) {
    ContentstackLivePreview.init({
      ssr: false,
      mode: "builder",
      enable: preview ? true : false,
      stackSdk: stack.config as IStackSdk,
      stackDetails: {
        apiKey: apiKey,
        environment: environment,
      },
      clientUrlParams: {
        host: endpoints.application
      },
      editButton: {
        enable: true,
        exclude: ["outsideLivePreviewPortal"]
      },
    });
  }

  // Set up personalization
  const edgeApiUrl = `https://${endpoints.personalizeEdge as string}`;
  Personalize.setEdgeApiUrl(edgeApiUrl);

  const personalizeSdk = await Personalize.init(p13nProjectUid);
  const variantAlias = useState('variantAlias', () => '');

  // only on server provide the p13n information from the request context
  if (import.meta.server) {
    const event = useRequestEvent();
    variantAlias.value = event?.context.p13n;
  }

  return {
    provide: {
      stack,
      preview,
      ContentstackLivePreview,
      Personalize: personalizeSdk,
      variantAlias
    },
  };
});