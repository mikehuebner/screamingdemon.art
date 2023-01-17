import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'
import body from './blocks/body'
import artists from './documents/artists'
import collection from './documents/collection'
import colorTheme from './documents/colorTheme'
import eventType from './documents/eventType'
import events from './documents/events'
import featuredArtists from './documents/featuredArtists'
import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'
import customProductOptionColor from './objects/customProductOption/color'
import customProductOptionSize from './objects/customProductOption/size'
import event from './objects/event'
import heroCollection from './objects/hero/collection'
import heroHome from './objects/hero/home'
import heroPage from './objects/hero/page'
import imageWithProductHotspots from './objects/imageWithProductHotspots'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import moduleAccordion from './objects/module/accordion'
import moduleCallToAction from './objects/module/callToAction'
import moduleCallout from './objects/module/callout'
import moduleCollection from './objects/module/collection'
import moduleGrid from './objects/module/grid'
import moduleImage from './objects/module/image'
import moduleImages from './objects/module/images'
import moduleInstagram from './objects/module/instagram'
import moduleProduct from './objects/module/product'
import moduleProducts from './objects/module/products'
import placeholderString from './objects/placeholderString'
import productHotspots from './objects/productHotspots'
import productOption from './objects/productOption'
import productWithVariant from './objects/productWithVariant'
import proxyString from './objects/proxyString'
import seoHome from './objects/seo/home'
import seoPage from './objects/seo/page'
import seoShopify from './objects/seo/shopify'
import shopifyCollection from './objects/shopifyCollection'
import shopifyCollectionRule from './objects/shopifyCollectionRule'
import shopifyProduct from './objects/shopifyProduct'
import shopifyProductVariant from './objects/shopifyProductVariant'
import socialEtsy from './objects/social/etsy'
import socialFacebook from './objects/social/facebook'
import socialInstagram from './objects/social/instagram'
import socialPinterest from './objects/social/pinterest'
import socialShopify from './objects/social/shopify'
import socialSoundcloud from './objects/social/soundcloud'
import socialSpotify from './objects/social/spotify'
import socialTiktok from './objects/social/tiktok'
import socialTwitter from './objects/social/twitter'
import socialYouTube from './objects/social/youtube'
import home from './singletons/home'
import settings from './singletons/settings'

const annotations = [
  /**
   * @shopify
   */

  annotationLinkEmail,
  annotationLinkExternal,
  annotationLinkInternal,
  annotationProduct,

  /**
   * @screamingdemon
   */
]

const documents = [
  /**
   * @shopify
   */

  collection,
  colorTheme,
  page,
  product,
  productVariant,

  /**
   * @screamingdemon
   */

  artists,
  featuredArtists,
  events,
  eventType,
]

const singletons = [
  /**
   * @shopify
   */

  settings,

  /**
   * @screamingdemon
   */

  home,
]

const blocks = [body]

const objects = [
  /**
   * @shopify
   */

  customProductOptionColor,
  customProductOptionSize,
  imageWithProductHotspots,
  linkExternal,
  linkInternal,
  heroCollection,
  heroHome,
  heroPage,
  moduleAccordion,
  moduleCallout,
  moduleCallToAction,
  moduleCollection,
  moduleGrid,
  moduleImage,
  moduleImages,
  moduleInstagram,
  moduleProduct,
  moduleProducts,
  placeholderString,
  productHotspots,
  productOption,
  productWithVariant,
  proxyString,
  seoHome,
  seoPage,
  seoShopify,
  shopifyCollection,
  shopifyCollectionRule,
  shopifyProduct,
  shopifyProductVariant,

  /**
   * @screamingdemon
   */

  socialEtsy,
  socialFacebook,
  socialInstagram,
  socialPinterest,
  socialShopify,
  socialSoundcloud,
  socialSpotify,
  socialTiktok,
  socialTwitter,
  socialYouTube,

  event,
]

export const schemaTypes = [...annotations, ...documents, ...singletons, ...objects, ...blocks]
