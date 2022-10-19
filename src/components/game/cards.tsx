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
import { CardWrapper } from './game';

export default function CardGetter(cardName: string) {
  switch (cardName) {
    case 'Badlands': {
      return <CardWrapper src={Badlands} alt={cardName} />;
    }
    case 'Biscayne': {
      return <CardWrapper src={Biscayne} alt={cardName} />;
    }
    case 'Bryce Canyon': {
      return <CardWrapper src={Bryce_Canyon} alt={cardName} />;
    }
    case 'Carlsbad Caverns': {
      return <CardWrapper src={Carlsbad_Caverns} alt={cardName} />;
    }
    case 'Crater Lake': {
      return <CardWrapper src={Crater_Lake} alt={cardName} />;
    }
    case 'Dry Tortugas': {
      return <CardWrapper src={Dry_Tortugas} alt={cardName} />;
    }
    case 'Everglades': {
      return <CardWrapper src={Everglades} alt={cardName} />;
    }
    case 'Grand Canyon': {
      return <CardWrapper src={Grand_Canyon} alt={cardName} />;
    }
    case 'Grand Teton': {
      return <CardWrapper src={Grand_Teton} alt={cardName} />;
    }
    case 'Guadalupe Mountains': {
      return <CardWrapper src={Guadalupe_Mountains} alt={cardName} />;
    }
    case 'Kings Canyon': {
      return <CardWrapper src={Kings_Canyon} alt={cardName} />;
    }
    case 'Lassen Volcanic': {
      return <CardWrapper src={Lassen_Volcanic} alt={cardName} />;
    }
    case 'Mount Rainier': {
      return <CardWrapper src={Mount_Rainier} alt={cardName} />;
    }
    case 'North Cascades': {
      return <CardWrapper src={North_Cascades} alt={cardName} />;
    }
    case 'Olympic': {
      return <CardWrapper src={Olympic} alt={cardName} />;
    }
    case 'Redwood': {
      return <CardWrapper src={Redwood} alt={cardName} />;
    }
    case 'Sequoia': {
      return <CardWrapper src={Sequoia} alt={cardName} />;
    }
    case 'White Sands': {
      return <CardWrapper src={White_Sands} alt={cardName} />;
    }
    case 'Wind Cave': {
      return <CardWrapper src={Wind_Cave} alt={cardName} />;
    }
    case 'Yellowstone': {
      return <CardWrapper src={Yellowstone} alt={cardName} />;
    }
    case 'Yosemite': {
      return <CardWrapper src={Yosemite} alt={cardName} />;
    }
    case 'Zion': {
      return <CardWrapper src={Zion} alt={cardName} />;
    }
    case 'Flashlight': {
      return <CardWrapper src={Flashlight} alt={cardName} />;
    }
    case 'Water': {
      return <CardWrapper src={Water} alt={cardName} />;
    }
    default: {
      return <CardWrapper src={Zion} alt={cardName} />;
    }
  }
}
