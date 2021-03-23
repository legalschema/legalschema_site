import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import LegalEditor from './legaleditor';

const features = [
  {
    title: 'Schemas',
    imageUrl: 'img/schemas.png',
    description: (
      <>
        <a href="https://schemas.legalschema.org">Schemas (data models) for UK Legal concepts.</a>
      </>
    ),
  },
  {
    title: 'Templates',
    imageUrl: 'img/templates.png',
    description: (
      <>
        <a href="https://templates.legalschema.org">Contract and Clause templates for the UK Legal industry.</a>
      </>
    ),
  },
  {
    title: 'Contract Editor',
    imageUrl: 'img/templates.png',
    description: (
      <>
        <a href="https://create.legalschema.org">Edit rich-text structured contracts on the web.</a>
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {features.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      </main>
    </Layout>
  );
}

export default Home;
