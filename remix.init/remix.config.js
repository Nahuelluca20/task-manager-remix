import { config } from '@netlify/remix-edge-adapter'

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...config,
  tailwind: true,
  postcss: true,
  // This works out of the box with the Netlify adapter, but you can
  // add your own custom config here if you want to.
  //
  // See https://remix.run/file-conventions/remix-config
}
