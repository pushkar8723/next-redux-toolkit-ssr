import { KeyboardEventHandler, ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const SearchContainer = styled.div`
    padding: 0 16px;
    height: 40px;
    border-radius: 20px;
    width: 300px;
    background-color: #f9f9f9;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.1); 
    border: 1px solid #eee;
    display: flex;
    align-items: center;

    & input {
        outline: none;
        background: transparent;
        flex: 1;
        border: none;
        margin-left: 5px;
    }

    &:focus-within {
        border: 2px solid var(--primary); 
    }
`;

export default function Search() {
    const [value, setValue] = useState('');
    const router = useRouter();
    const keyUpHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            router.push(`/?q=${encodeURIComponent(value)}`);
            setValue('');
        }
    }
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    } 

    return (<>
        <SearchContainer>
            <span className="material-symbols-outlined">search</span>
            <input type='search' value={value} onKeyUp={keyUpHandler} onChange={onChangeHandler} />
        </SearchContainer>
    </>);
};