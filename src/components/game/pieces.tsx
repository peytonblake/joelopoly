import React from 'react';
import HouseImage from '../../images/pieces/house.png'
import { HouseContainer, HouseWrapper } from './game';

export function House(props: {location: number, houseNum: number}) {
    return (
        <HouseContainer><HouseWrapper src={HouseImage} alt="house"/></HouseContainer>
    )
}