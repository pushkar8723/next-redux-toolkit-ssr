import axios, { AxiosResponse } from 'axios';
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { BookState, selectBook, setBook } from '../../store/book/bookSlice'
import { wrapper } from '../../store/store';

export default function Book(props: any) {
    const book = useSelector(selectBook);

    return (<>
        <Head>
            <title>{`${props.title} - Books`}</title>
        </Head>
        <div>
            <h3>{book?.volumeInfo.title}</h3>
            <div>{book?.volumeInfo.subtitle}</div>
            <div>
                {book?.volumeInfo.authors.map(author => <span key={author}>{author}</span>)}
            </div>
            <p dangerouslySetInnerHTML={{ __html: book?.volumeInfo.description || 'No Description'}} />
        </div>
    </>)
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            const apiPath = process.env.API_URL;
            if (params?.id) {
                const response: AxiosResponse<BookState> = await axios.get(`${apiPath}/api/book?id=${params.id}`);
                store.dispatch(setBook(response.data));
                return {
                    props: {
                        title: response.data?.volumeInfo.title
                    }
                };
            } else {
                store.dispatch(setBook({}));
                return {
                    props: {
                        title: 'Invalid ID'
                    }
                }
            }
        }
);