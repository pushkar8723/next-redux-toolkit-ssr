import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectList, setList } from '../store/list/listSlice';
import { wrapper } from '../store/store';
import styled from 'styled-components';

const ListItem = styled.div`
    padding: 5px 15px;
    border-bottom: 1px solid #eee;
    width: 100%;

    &:hover {
        background-color: #f2f2f2;
    }
`;

const ImgContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    & img {
        margin-bottom: -69px;
    }
`;

export default function Home(props: any) {
    const list = useSelector(selectList);
    const [userAgent, setUserAgent] = useState('');
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUserAgent(window.navigator.userAgent);
            setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        }
    }, []);
    
    return (
        <>
            <Head>
                <title>{`${props.title} - Book`}</title>
            </Head>
            <div>{userAgent}</div>
            <div>{reducedMotion}</div>
            {list.items.length ? list.items.map(item =>  (
                <Link  key={item.id} href={`/book/${encodeURIComponent(item.id)}`}>
                    <ListItem>
                        <h3>{item.volumeInfo.title}</h3>
                        <p>{item.volumeInfo.subtitle}</p>
                    </ListItem>
                </Link>
            )) : <ImgContainer>
                <img src="https://books-search.netlify.app/images/search_86dd85.gif" alt='Empty Result' /><br/>
                Search a book to begin...
            </ImgContainer>}
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query }) => {
            const apiPath = process.env.API_URL;
            if (query.q) {
                const response = await axios.get(`${apiPath}/api/bookList?q=${query.q}`, {
                    headers: {
                        'Accept-Encoding': 'gzip, compress, deflate'
                    }
                });
                store.dispatch(setList(response.data));
            } else {
                store.dispatch(setList({}));
            }
            // we can set the initial state from here
            // we are setting to false but you can run your custom logic here
            return {
                props: {
                    title: query.q || 'Search'
                }
            };
        }
);
  
