import Personalize from '@contentstack/personalize-edge-sdk'
import { toWebRequest, setCookie, defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  // get options
  const {
    p13nProjectUid,
    region
  } = useRuntimeConfig().public;

  const edgeApiUrl = region === 'EU' ? 'https://eu-personalize-edge.contentstack.com' : 'https://personalize-edge.contentstack.com';

  // convert H3Event to standard Request
  const request = toWebRequest(event)

  Personalize.setEdgeApiUrl(edgeApiUrl)
  // Initialize Personalize with converted Request
  p13nProjectUid && await Personalize.init(p13nProjectUid, { request });

  // figure out variants
  const variantParam = Personalize.getVariantParam();

  // create variant aliases that the SDK can understand
  const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(",");

  // Save variant aliases in request context for later use
  // See ~/plugins/personalize.ts to learn how `variantAlias` is added to 
  // the context so the client can also read it.
  event.context.p13n = variantAlias

  // create an empty response so Personalize can add cookies to it 
  // so we can remember the user and the Personalize Manifest.
  const response = new Response();
  await Personalize.addStateToResponse(response);

  // Extract the cookies from the fake Request
  const cookies = response.headers.getSetCookie()

  // Loop over the cookies array and parse them
  cookies.forEach(cookie => {
    const [nameValue, ...options] = cookie.split('; ')

    if (nameValue) {
      const [name, value] = nameValue.split('=')

      if (!name || !value) {
        return false
      }

      const cookieOptions: Record<string, string | number | undefined> = {}
      options.forEach(option => {
        const [key, val] = option.split('=')

        if (!key || !val) {
          return false
        }

        cookieOptions[key.toLowerCase()] = key === 'Max-Age' ? parseInt(val) : val
      })

      // do not encodeURIComponent the cookie
      cookieOptions.encode = ((v: string | number) => v) as unknown as string | number;

      // add the extracted cookies to the real Response in Nuxt
      setCookie(event, name, value, cookieOptions)
    }
  })
});
