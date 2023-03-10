import { Router } from '@reach/router';
import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';

import style from './style.scss';

import ErrorBoundary from '@/components/ErrorBoundary';
import { Loading, NotFound } from '@/components/Messages';

const LazyLoadedHomeView = React.lazy(
    () =>
        import(
            /* webpackChunkName: "HomeView" */
            /*webpackMode: "lazy" */
            /* webpackPrefetch: true */
            '@/containers/views/Home'
        ),
);

const LazyLoadedFooter = React.lazy(
    () =>
        import(
            /* webpackChunkName: "Footer" */
            /*webpackMode: "lazy" */
            /* webpackPrefetch: true */
            '@/components/Footer'
        ),
);

const LazyLoadedHeader = React.lazy(
    () =>
        import(
            /* webpackChunkName: "Header" */
            /*webpackMode: "lazy" */
            /* webpackPrefetch: true */
            '@/components/Header'
        ),
);

const ViewsContainer = () => (
    <ErrorBoundary>
        <div className={style.mainLayout}>
            <Suspense fallback={<Loading />}>
                <LazyLoadedHeader />
                <main>
                    <Router>
                        <LazyLoadedHomeView path="/" />
                        <NotFound default />
                    </Router>
                </main>
                <LazyLoadedFooter />
            </Suspense>
        </div>
    </ErrorBoundary>
);

export default hot(ViewsContainer);
