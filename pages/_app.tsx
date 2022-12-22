import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { wrapper } from '../store/store';
import styled, { createGlobalStyle } from 'styled-components';
import Toolbar from '../components/Toolbar';
import { Nunito } from '@next/font/google';
import Wrapper from '../components/Wrapper';
import Search from '../components/Search';

const GlobalStyles = createGlobalStyle`
    :root {
        --primary: #1A936F;
    }

    * {
        box-sizing: border-box;
    }

    body {
        padding: 0;
        margin: 0;
        background-color: #ffffff;
        display: block;
        
    }
    
    #__next {
        min-height: 100vh;
        display: flex;
    }

    main {
        max-height: 100vh;
        display: flex;
        flex: 1;
        flex-direction: column;
    }
`;

const Scroller = styled.div`
    display: flex;
    flex: 1;
    overflow: auto;
`;

const nunito = Nunito();

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

    return (<>
        <GlobalStyles />
        <main className={nunito.className}>
            <Toolbar>
                <Link href="/"><h1>Books</h1></Link>
                <Search />
            </Toolbar>
            <Scroller>
                <Wrapper>
                    {loading ? 'Loading...' : <Component {...pageProps} />}
                </Wrapper>
            </Scroller>
        </main>
    </>);
}

export default wrapper.withRedux(App);