import React from 'react';
import HouseImage from '../../images/pieces/house.png'
import HotelImage from '../../images/pieces/hotel.png';
import { PieceContainer, BuildingWrapper, NamePieceWrapper } from './game';
import { Property } from '../../game/properties';
import { MAX_HOUSES } from '../../game/constants';
import properties from '../../game/properties';
import { Player } from '../../game/players';
import monopoly from '../../game/monopoly';

const BUILDING_TOP = 10.25;
const BUILDING_BOTTOM = 86.75;
const BUILDING_LEFT = 10.75;
const BUILDING_RIGHT = 87.5;

const BUILDING_LEFT_HORIZONTAL = 13.75;
const BUILDING_HORIZONTAL_SHIFT = 1.75;
const HORIZONTAL_CARD_SHIFT = 8.2;

const BUILDING_BOTTOM_VERTICAL = 83.75;
const BUILDING_VERTICAL_SHIFT = 1.75;
const VERTICAL_CARD_SHIFT = 8.175;

const CENTER_SHIFTS = 1.5;

const PLAYER_TOP = 0;
const PLAYER_BOTTOM = 89.75;
const PLAYER_LEFT = 0;
const PLAYER_RIGHT = 90.5;

const PLAYER_LEFT_HORIZONAL = 13.25;
const PLAYER_SHIFT = 1.75;

const PLAYER_BOTTOM_VERTICAL = 79.25;

const JAIL_SHIFT = 4.25;

function Building(props: {left: number, top: number, rotate: number, image: string}) {
    return (
        <PieceContainer key={`l${props.left}t${props.top}`}>
            <BuildingWrapper src={props.image} alt="house" left={props.left} top={props.top} rotate={props.rotate}/>
        </PieceContainer>
    )
}

function House(props: {left: number, top: number, rotate: number}) {
    return Building({left: props.left, top: props.top, rotate: props.rotate, image: HouseImage})
}

function Hotel(props: {left: number, top: number, rotate: number}) {
    return Building({left: props.left, top: props.top, rotate: props.rotate, image: HotelImage})
}

function PropertyBuildings(props: {property: Property}) {
    const location = props.property.location;
    const buildings = []; 
    if (location < 10) {  // if property is on the bottom
        const leftStart = BUILDING_LEFT_HORIZONTAL + (HORIZONTAL_CARD_SHIFT * (9 - location));
        if (props.property.houses == MAX_HOUSES) {
            buildings.push(Hotel({left: leftStart + (CENTER_SHIFTS * BUILDING_HORIZONTAL_SHIFT), top: BUILDING_BOTTOM, rotate: 0}))
        } else {
            for (let i = 0; i < props.property.houses; i++) {
                buildings.push(House({left: leftStart + (i * BUILDING_HORIZONTAL_SHIFT), top: BUILDING_BOTTOM, rotate: 0}));
            }
        }
    } else if (location < 20) {  // if property is on the left
        const topStart = BUILDING_BOTTOM_VERTICAL - (VERTICAL_CARD_SHIFT * (location - 11));
        if (props.property.houses == MAX_HOUSES) {
            buildings.push(Hotel({left: BUILDING_LEFT, top: topStart - (CENTER_SHIFTS * BUILDING_VERTICAL_SHIFT), rotate: 90}))
        } else {
            for (let i = 0; i < props.property.houses; i++) {
                buildings.push(House({left: BUILDING_LEFT, top: topStart - (i * BUILDING_VERTICAL_SHIFT), rotate: 90}))
            }
        }
    } else if (location < 30) {  // if property is on the top
        const leftStart = BUILDING_LEFT_HORIZONTAL + (HORIZONTAL_CARD_SHIFT * (location - 21));
        if (props.property.houses == MAX_HOUSES) {
            buildings.push(Hotel({left: leftStart + (CENTER_SHIFTS * BUILDING_HORIZONTAL_SHIFT), top: BUILDING_TOP, rotate: 180}))
        } else {
            for (let i = 0; i < props.property.houses; i++) {
                buildings.push(House({left: leftStart + (i * BUILDING_HORIZONTAL_SHIFT), top: BUILDING_TOP, rotate: 180}));
            }
        }
    } else {  // if property is on the right
        const topStart = BUILDING_BOTTOM_VERTICAL - (VERTICAL_CARD_SHIFT * (39 - location));
        if (props.property.houses == MAX_HOUSES) {
            buildings.push(Hotel({left: BUILDING_RIGHT, top: topStart - (CENTER_SHIFTS * BUILDING_VERTICAL_SHIFT), rotate: 270}))
        } else {
            for (let i = 0; i < props.property.houses; i++) {
                buildings.push(House({left: BUILDING_RIGHT, top: topStart - (i * BUILDING_VERTICAL_SHIFT), rotate: 270}));
            }
        }
    }
    return buildings;
}

export function Buildings() {
    let all_buildings: JSX.Element[] = [];
    for (const property of properties) {
        all_buildings.push(...PropertyBuildings({property: property}))
    }
    return (
        <>
        {all_buildings}
        </>
    )
}

function PlayerName(player: Player) {
    const shift = monopoly.players.indexOf(player) * PLAYER_SHIFT;
    let left = 0;
    let top = 0;
    if (player.location == 0) {  // go
        top = PLAYER_BOTTOM + shift;
        left = PLAYER_RIGHT;
    } else if (player.location == 10) {  // jail
        top = PLAYER_LEFT_HORIZONAL + (VERTICAL_CARD_SHIFT * 9) + shift;
        left = PLAYER_LEFT + (player.inJail ? JAIL_SHIFT : 0);
    } else if (player.location == 20) {  // free parking
        top = PLAYER_TOP + shift;
        left = PLAYER_LEFT;
    } else if (player.location < 10) {  // bottom row
        left = PLAYER_BOTTOM_VERTICAL - (player.location - 1) * HORIZONTAL_CARD_SHIFT;
        top = PLAYER_BOTTOM + shift;
    } else if (player.location < 20) {  // left column
        left = PLAYER_LEFT;
        top = PLAYER_LEFT_HORIZONAL + shift + (19 - player.location) * VERTICAL_CARD_SHIFT;
    } else if (player.location < 30) {  // top row
        left = PLAYER_BOTTOM_VERTICAL - (29 - player.location) * HORIZONTAL_CARD_SHIFT;
        top = PLAYER_TOP + shift;
    } else {  // right column
        left = PLAYER_RIGHT;
        top = PLAYER_LEFT_HORIZONAL + shift + (player.location - 31) * VERTICAL_CARD_SHIFT;
    }
    return (
        <PieceContainer key={player.name}>
            <NamePieceWrapper left={left} top={top} color={player.color}>
                {player.name}
            </NamePieceWrapper>
        </PieceContainer>
    )
}

export function Players(props: {players: Player[]}) {
    return (
        <>
        {props.players.map((player) => PlayerName(player))}
        </>
    )
}
