import React from 'react';
import Badlands from '../../images/properties/badlands.png';
import Biscayne from '../../images/properties/biscayne.png';
import Bryce_Canyon from '../../images/properties/bryce-canyon.png';
import Carlsbad_Caverns from '../../images/properties/carlsbad-caverns.png';
import Crater_Lake from '../../images/properties/crater-lake.png';
import Dry_Tortugas from '../../images/properties/dry-tortugas.png';
import Everglades from '../../images/properties/everglades.png';
import Grand_Canyon from '../../images/properties/grand-canyon.png';
import Grand_Teton from '../../images/properties/grand-teton.png';
import Guadalupe_Mountains from '../../images/properties/guadalupe-mountains.png';
import Kings_Canyon from '../../images/properties/kings-canyon.png';
import Lassen_Volcanic from '../../images/properties/lassen-volcanic.png';
import Mount_Rainier from '../../images/properties/mount-rainier.png';
import North_Cascades from '../../images/properties/north-cascades.png';
import Olympic from '../../images/properties/olympic.png';
import Redwood from '../../images/properties/redwood.png';
import Sequoia from '../../images/properties/sequoia.png';
import White_Sands from '../../images/properties/white-sands.png';
import Wind_Cave from '../../images/properties/wind-cave.png';
import Yellowstone from '../../images/properties/yellowstone.png';
import Yosemite from '../../images/properties/yosemite.png';
import Zion from '../../images/properties/zion.png';
import Flashlight from '../../images/supplies/flashlight.png';
import Water from '../../images/supplies/water.png';
import Hiking from '../../images/attractions/hiking.png';
import Caving from '../../images/attractions/caving.png';
import Kayaking from '../../images/attractions/kayaking.png';
import Rafting from '../../images/attractions/rafting.png';
import { CardWrapper, SideInfoCardWrapper } from './game';


function getCard(cardName: string) {
  switch (cardName) {
    case 'Badlands': {
      return Badlands;
    }
    case 'Biscayne': {
      return Biscayne;
    }
    case 'Bryce Canyon': {
      return Bryce_Canyon;
    }
    case 'Carlsbad Caverns': {
      return Carlsbad_Caverns;
    }
    case 'Crater Lake': {
      return Crater_Lake;
    }
    case 'Dry Tortugas': {
      return Dry_Tortugas;
    }
    case 'Everglades': {
      return Everglades;
    }
    case 'Grand Canyon': {
      return Grand_Canyon;
    }
    case 'Grand Teton': {
      return Grand_Teton;
    }
    case 'Guadalupe Mountains': {
      return Guadalupe_Mountains;
    }
    case 'Kings Canyon': {
      return Kings_Canyon;
    }
    case 'Lassen Volcanic': {
      return Lassen_Volcanic;
    }
    case 'Mount Rainier': {
      return Mount_Rainier;
    }
    case 'North Cascades': {
      return North_Cascades;
    }
    case 'Olympic': {
      return Olympic;
    }
    case 'Redwood': {
      return Redwood;
    }
    case 'Sequoia': {
      return Sequoia;
    }
    case 'White Sands': {
      return White_Sands;
    }
    case 'Wind Cave': {
      return Wind_Cave;
    }
    case 'Yellowstone': {
      return Yellowstone;
    }
    case 'Yosemite': {
      return Yosemite;
    }
    case 'Zion': {
      return Zion;
    }
    case 'Flashlight Batteries': {
      return Flashlight;
    }
    case 'Water Filter': {
      return Water;
    }
    case 'Hiking': {
      return Hiking;
    }
    case 'Caving': {
      return Caving;
    }
    case 'Kayaking': {
      return Kayaking;
    }
    case 'Rafting': {
      return Rafting;
    }
    default: {
      return Zion;
    }
  }
}

export function SideInfoCardGetter(cardName: string, maxWidth: number) {
  return <SideInfoCardWrapper src={getCard(cardName)} alt={cardName} maxWidth={maxWidth}/>;
}

export default function CardGetter(cardName: string) {
  return <CardWrapper src={getCard(cardName)} alt={cardName} />;
}
