const css2 = require.resolve('./src/css/custom.css');

const combinedCss = css2;

module.exports = {
  title: 'UK Legal Schema',
  tagline: 'Open Legal Schemas and Templates for the UK',
  url: 'https://legalschema.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'legalschema_site', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'UK Legal Schema',
      logo: {
        alt: 'Legal Schema Logo',
        src: 'img/logo.png',
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
    colorMode: {
      defaultMode: 'light',
      disableSwitch:true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/legalschema',
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
  ]
};
