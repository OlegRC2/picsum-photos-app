import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;
const HeaderTitleWrapper = styled.div`
    margin-top: 10px;
`;
const HeaderTitle = styled.h1`
    font-size: 30px;
    color: #fff;
    margin: 0;
`;
const HeaderSubTitle = styled.h2`
    font-size: 17px;
    color: #fff;
    margin: 7px 0 0 0;
`;
const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    /* font-family: 'Cantarell'; */
    li {
        font-family: 'New Tegomin', serif;
        margin-right: 20px;
        font-size: 18px;
        cursor: pointer;
    }
    li:hover {
        font-size: 22px;
    }
`;

const Header = () => {
    return (
        <HeaderBlock>

            <HeaderTitleWrapper>
                <HeaderTitle>Picsum photos app</HeaderTitle>
                <HeaderSubTitle>Get a random image </HeaderSubTitle>
            </HeaderTitleWrapper>

            <HeaderLinks>
                <li>
                    Get image by id 
                </li>
                <li>
                    Set image size 
                </li>
                <li>
                    Many images  
                </li>
            </HeaderLinks>

        </HeaderBlock>
    );
};

export default Header;