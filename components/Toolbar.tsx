import React from 'react';
import styled, { css } from 'styled-components';
import Wrapper from './Wrapper';

const Container = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    min-height: 63px;
    border-bottom: 1px solid #eee;
    color: #202020;
    margin-bottom: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;

    & a {
        text-decoration: none;
        color: var(--primary);
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    & h1 {
        margin: 0;
        font-size: 24px;

        @media only screen and (max-width: 400px) {
            display: none;
        }
    }
`;

const ToolbarWrapper = styled(Wrapper)`
    justify-content: space-between;
    padding: 0 10px;
    flex-direction: row;
    @media only screen and (max-width: 400px) {
        justify-content: center;
    }

`

export default function Toolbar(props: React.PropsWithChildren) {
    return (<Container>
        <ToolbarWrapper>
            {props.children}
        </ToolbarWrapper>
    </Container>);
}