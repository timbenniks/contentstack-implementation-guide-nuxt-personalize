import contentstack, { Region } from "@contentstack/delivery-sdk"
import ContentstackLivePreview, { type IStackSdk } from "@contentstack/live-preview-utils";
import Personalize from '@contentstack/personalize-edge-sdk';

export default defineNuxtPlugin((nuxtApp) => {
  const {
    apiKey,
    deliveryToken,
    previewToken,
    region,
    environment,
    preview,
    p13nProjectUid
  } = nuxtApp.$config.public;

  // Set up stack for content delivery
  const stack = contentstack.stack({
    apiKey,
    deliveryToken,
    environment,
    region: region === 'EU' ? Region.EU : Region.US,
    live_preview: {
      enable: preview ? true : false,
      preview_token: previewToken,
      host: region === 'EU' ? "eu-rest-preview.contentstack.com" : "rest-preview.contentstack.com",
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
        host: region === "EU" ? "eu-app.contentstack.com" : "app.contentstack.com",
      },
      editButton: {
        enable: true,
      }
    });
  }

  // Set up personalization
  const projectUid = p13nProjectUid;
  const edgeApiUrl = region === 'EU' ? 'https://eu-personalize-edge.contentstack.com' : 'https://personalize-edge.contentstack.com';

  Personalize.setEdgeApiUrl(edgeApiUrl);
  Personalize.init(projectUid);

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
      Personalize,
      variantAlias
    },
  };
});