import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

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
    a {
        color: #fff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: none;
    }
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
    li {
        font-family: 'New Tegomin', serif;
        margin-right: 20px;
        font-size: 18px;
        cursor: pointer;
        a {
        color: #fff;
        text-decoration: none;
    }
        a:hover {
            text-decoration: none;
        }
    }
    li:hover {
        font-size: 22px;
    }
`;

const Header = () => {
    return (
        <HeaderBlock>

            <HeaderTitleWrapper>
                <HeaderTitle>
                    <Link to='/'>Picsum photos app</Link>
                </HeaderTitle>
                <HeaderSubTitle>Get a random image </HeaderSubTitle>
            </HeaderTitleWrapper>

            <HeaderLinks>
                <li>
                    <Link to='/get-img-by-id'>Get image by id </Link>
                </li>
                <li>
                    Set image size 
                </li>
            </HeaderLinks>

        </HeaderBlock>
    );
};

export default Header;