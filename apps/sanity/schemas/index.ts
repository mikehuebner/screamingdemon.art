import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'
import body from './blocks/body'
import collection from './documents/collection'
import colorTheme from './documents/colorTheme'
import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'
import customProductOptionColor from './objects/customProductOption/color'
import customProductOptionSize from './objects/customProductOption/size'
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
   * @screamingdemonart
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
   * @screamingdemonart
   */
]

const singletons = [
  /**
   * @shopify
   */

  home,
  settings,

  /**
   * @screamingdemonart
   */
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
   * @screamingdemonart
   */
]

export const schemaTypes = [...annotations, ...documents, ...singletons, ...objects, ...blocks]
