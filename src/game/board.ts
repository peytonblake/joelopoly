

// transportation -> cost, location, rent owning 1, rent owning 2, rent owning 3, rent owning 4, mortgage price, tile group #, who owns tile

// utility -> location, cost, mortgage, rent multiplies owning 1, rent multiplier owning 2, tile group #, who owns tile

// taxes -> location, cost

// properties (all with no comment) -> cost, house cost, rent owning 0 house, rent owning 1 house, rent owning 2 house, rent owning 3 house, 
// rent owning 4 house, rent owning hotel, mortgage, tile group #, location, who owns tile


export let board: number[][] = [
    [0], // Go
    [60,50,2,10,30,90,160,250,30,0,1,-1],
    [2], // community chest
    [60,50,4,20,60,180,320,450,30,0,3,-1],
    [4,200], // taxes
    [200,5,25,50,100,200,100,8,-1], // transportation
    [100,50,6,30,90,270,400,550,50,1,6,-1],
    [7], // chance
    [100,50,6,30,90,270,400,550,50,1,8,-1],
    [120,50,8,40,100,300,450,600,60,1,9,-1],
    [10], // just visiting
    [140,100,10,50,150,450,625,750,70,2,11,-1],
    [12,150,75,4,10,9,-1], // utility
    [140,100,10,50,150,450,625,750,70,2,13,-1],
    [160,100,12,60,180,500,700,900,80,2,14,-1],
    [200,15,25,50,100,200,100,8,-1], // transportation
    [180,100,14,70,200,550,750,950,90,3,16,-1],
    [17], // community chest
    [180,100,14,70,200,550,750,950,90,3,18.-1],
    [200,100,16,80,220,600,800,1000,100,3,19,-1],
    [20], // free parking
    [220,150,18,90,250,700,875,1050,110,4,21,-1],
    [22], // chance
    [220,150,18,90,250,700,875,1050,110,4,23,-1],
    [240,150,20,100,300,750,925,1100,120,4,24,-1],
    [200,25,25,50,100,200,100,8,-1], // transportation
    [260,150,22,110,330,800,975,1150,130,5,26,-1],
    [260,150,22,110,330,800,975,1150,130,5,27,-1],
    [28,150,75,4,10,9,-1], // utility
    [280,150,24,120,360,850,1025,1200,140,5,29,-1],
    [30], // go to jail
    [300,200,26,130,390,900,1100,1275,150,6,31,-1],
    [300,200,26,130,390,900,1100,1275,150,6,32,-1],
    [33], // community chest
    [320,200,28,150,450,1000,1200,1400,160,6,34,-1],
    [200,35,25,50,100,200,100,8,-1], // transportation
    [36], // chance
    [350,200,35,175,500,1100,1300,1500,175,7,37,-1],
    [38,100], // taxes
    [400,200,50,200,600,1400,1700,2000,200,7,39,-1]
];

export let tileNames: string[] = [
    'Go',
    'Yellowstone',
    'Community Chest',
    'Grand Teton',
    'Littering Tax',
    'Hiking',
    'Olympic',
    'Chance',
    'Mount Rainer',
    'North Cascades',
    'Just Visiting',
    'Yosemite',
    'Flashlight Batteries',
    'Kings Canyon',
    'Sequoia',
    'Rafting',
    'Crator Lake',
    'Community Chest',
    'Redwood',
    'Lassen Volcanic',
    'Free Parking',
    'Grand Canyon',
    'Chance',
    'Bryce Canyon',
    'Zion',
    'Caving',
    'White Sands',
    'Carlsbad Caverns',
    'Water Filter',
    'Guadalupe Mountains',
    'Go To Jail',
    'Dry Tortugas',
    'Everglades',
    'Community Chest',
    'Biscayne',
    'Kayaking',
    'Chance',
    'Badlands',
    'Carbon Emissions Tax',
    'Wind Cave'
];