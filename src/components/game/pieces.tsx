import React from 'react';
import HouseImage from '../../images/pieces/house.png'
import { HouseContainer, HouseWrapper } from './game';
import { Property } from '../../game/properties';

export function House(props: {left: number, bottom: number}) {
    return (
        <HouseContainer left={props.left} bottom={props.bottom}><HouseWrapper src={HouseImage} alt="house"/></HouseContainer>
    )
}

export function PropertyHouses(props: {property: Property}) {
    
}


