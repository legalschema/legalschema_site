
// const css1 = require.resolve('./src/css/semantic.min.css');
const css2 = require.resolve('./src/css/custom.css');

console.log(css2);

const combinedCss = css2;

module.exports = {
  title: 'Legal Schema',
  tagline: 'Open Legal Schema and Templates for the UK',
  url: 'https://legalschema.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'legalschema_site', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Legal Schema',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/legalschema/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Marukup Guides',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Legal Schema UK.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/legalschema/legalschema_site/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/legalschema/legalschema_site/edit/master/website/blog/',
        },
        theme: {
          customCss: combinedCss,
        },
      },
    ],
  ],
  plugins: ['contracteditor-webpack-plugin']
};
