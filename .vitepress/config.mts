import { defineConfig } from 'vitepress'
import { getUserConfig } from '../config/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Verb Aspect Database",
  description: "A database of Bosnian, Croatian and Serbian aspect verb pairs",
  base: '/aspect-db/',
  srcExclude: ['**/README.html', 'docs'],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Search', link: '/search' },
      { text: 'About', link: '/about' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/max-ionov/aspect-db' }
    ]
  },
  transformPageData: (pageData) => {
    return getUserConfig()
  }
})

