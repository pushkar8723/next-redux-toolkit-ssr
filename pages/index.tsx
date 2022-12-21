import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectList, setList } from '../store/list/listSlice';
import { wrapper } from '../store/store';

export default function Home(props: any) {
    const list = useSelector(selectList);
    return (
        <>
            <Head>
                <title>{`${props.title} - Book`}</title>
            </Head>
            <main>
                {list.items.map(item =>  (
                    <div key={item.id}>
                        <Link href={`/book/${encodeURIComponent(item.id)}`}>
                            <h3>{item.volumeInfo.title}</h3>
                            <p>{item.volumeInfo.subtitle}</p>
                        </Link>
                    </div>
                ))}
            </main>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ query }) => {
            if (query.q) {
                const response = await axios.get('http://localhost:3000/api/bookList');
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
  