import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { wrapper } from '../store/store';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    useEffect(() => {
        router.events.on('routeChangeStart', startLoading);
        router.events.on('routeChangeComplete', stopLoading);

        return () => {
            router.events.off('routeChangeStart', startLoading);
            router.events.off('routeChangeComplete', stopLoading);
        }
    }, [router.events]);

    return loading ? 'Loading...' : <Component {...pageProps} />
}

export default wrapper.withRedux(App);