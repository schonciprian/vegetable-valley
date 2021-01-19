import aubergine from '../../image/eggplant.png';
import beetroot from '../../image/beetroot.png';
import brussels_sprouts from '../../image/brussels_sprouts.png';
import cabbage from '../../image/cabbage.png';
import purple_cabbage from '../../image/purple_cabbage.png';
import carrot from '../../image/carrot.png';
import celeriac from '../../image/celeriac.png';
import courgette from '../../image/courgette.png';
import cucumber from '../../image/cucumber.png';
import dill from '../../image/dill.png';
import garlic from '../../image/garlic.png';
import kale from '../../image/kale.png';
import green_kohlrabi from '../../image/green_kohlrabi.png';
import purple_kohlrabi from '../../image/purple_kohlrabi.png';
import leek from '../../image/leek.png';
import lettuce from '../../image/lettuce.png';
import onion from '../../image/onion.png';
import red_onion from '../../image/red_onion.png';
import parsley from '../../image/parsley.png';
import peas from '../../image/peas.png';

import tomato from '../../image/tomato.png';
import pear_tomato from '../../image/pear_tomato.png';
import paprika from '../../image/paprika.png';
import radish from '../../image/radish.png';
import beans from '../../image/beans.png';
import potato from '../../image/potato.png';
import sweet_potato from '../../image/sweet_potato.png';
import squash from '../../image/squash.png';



export const Vegetables = {
    aubergine: {
        id : 'aubergine',
        name: 'Aubergine',
        pictureURL: aubergine,
        sow_depth: '2 cm',
        spacing_between_rows: '60 cm',
        spacing_along_row: '60 cm',
        basic_information: 'Aubergine (Solanum melongena) is a plant from the tropics so is best grown under glass ' +
            'but it can be grown in a sheltered spot too.',
        how_to_grow: 'Place seeds in 9 cm pots and keep them in a heated greenhouse or on a south facing window sill ' +
            'in your house. When the root ball fills the pot transplant into a 23cm pot and grow in a green house, ' +
            'if the plants are to be grown outside then leave 60cm between plants. When the plants reach 30cm tall ' +
            'pinch out the centre tip to make the plant bush out.',
        how_to_harvest: '',
        sow_indoors: {
            sow_indoors: [0,1,1,1,0,0,0,0,0,0,0,0],
            plant_out: [0,0,0,0,1,1,1,0,0,0,0,0],
            harvest: [0,0,0,0,0,0,1,1,1,0,0,0],
        }
    },
    beetroot: {
        id : 'beetroot',
        name: 'Beetroot',
        pictureURL: beetroot,
        sow_depth: '1 cm',
        spacing_between_rows: '30 cm',
        spacing_along_row: '10 cm',
        basic_information: 'Beetroot (Beta vulgaris) are generally grown for their swollen tap root, but the green ' +
            'tops it produces can also be used as a salad crop or as \'greens\'. Beetroot are famous for the deep red ' +
            'color, but many varieties are available that do not have that deep staining red color.',
        how_to_grow: 'Beetroot are generally grown from seed, sown direct in the ground in drills 1-2 cm deep and ' +
            '15-20 cm apart. They can be sown indoors to get them off to a good start, but sow into modules to ' +
            'limit root disturbance, which they hate. If sown direct in the ground; thin seedlings to 5-10 cm apart ' +
            '(depending on how big you like your beets). All they need from then on is the occasional water and to be ' +
            'kept weed free.',
        how_to_harvest: 'Lift the beetroots when they are the required size. Be careful when lifting and handling as ' +
            'damage to the swollen tap-root will severely limit the time they can be stored. Beetroot are best stored ' +
            'in clamps, or in jars as picked beetroot but will keep for a couple of weeks in the fridge if undamaged.',
        sow_direct: {
            sow_direct: [0,0,1,1,1,1,1,0,0,0,0,0],
            harvest: [0,0,0,0,0,0,1,1,1,1,1,0],
        },
        sow_indoors: {
            sow_indoors: [1,1,1,1,1,1,1,0,0,0,0,0],
            plant_out: [0,0,1,1,1,1,1,1,1,0,0,0],
            harvest: [0,0,0,0,1,1,1,1,1,1,1,0],
        }
    },
    brussels_sprouts: {
        id : 'brussels_sprouts',
        name: 'Brussels sprouts',
        pictureURL: brussels_sprouts,
        sow_depth: '1 cm',
        spacing_between_rows: '75 cm',
        spacing_along_row: '60 cm',
        basic_information: 'Brussels sprout is a member of the Gemmifera Group of cabbages (Brassica oleracea), ' +
            'the edible buds look like miniature cabbages. They taste much better when harvested from the plot after ' +
            'a frost than when bought in a shop.',
        how_to_grow: 'Sow seeds in drills 1 cm deep and 15 cm apart in a seedbed. When the young plants are 10-15 cm ' +
            'high and have seven true leaves, transplant to their growing positions in a sheltered, sunny site in an ' +
            'area protected from strong winds. The day before planting, thoroughly water plants and water well again ' +
            'after transplanting. The plants need to be well firmed in, so press down around each plant. Water every ' +
            '10-14 days in periods of dry weather. Nitrogen levels in the soil start to drop around August/September ' +
            'so plants benefit from a top-dressing of high nitrogen fertiliser such as dried poultry manure pellets. ' +
            'Mound soil around the base in September to support the plants. To protect the plants from pests, cover ' +
            'them with a fine netting after transplanting.',
        how_to_harvest: 'Pick the sprouts off the stem starting from the bottom, when they reach 2cm wide by firmly ' +
            'snapping the bud downwards. Remove any yellowing leaves as they appear, as they may act as a source of ' +
            'infection.',
        sow_indoors: {
            sow_indoors: [1,0,0,0,0,0,0,0,0,0,0,0],
            plant_out: [0,0,1,0,0,0,0,0,0,0,0,0],
            harvest: [0,0,0,0,0,0,0,0,0,0,1,1],
        }
    },
    cabbage: {
        id : 'cabbage',
        name: 'Cabbage',
        pictureURL: cabbage,
        sow_depth: '1 cm',
        spacing_between_rows: '45 cm',
        spacing_along_row: '45 cm',
        basic_information: 'Cabbage is one of the hardiest and they are a good choice for poor soils.',
        how_to_grow: 'Can be sown indoors and transplanted outside in May & June. Sow 1 cm deep in rows 20 cm apart, ' +
            'when the plants are large enough to handle (3 pairs of leaves) dig up with as much of the root ball as ' +
            'possible and plant 45 cm apart and 45 cm between rows. Water frequently, do not let the soil dry out.',
        how_to_harvest: 'The most successful technique for how to harvest cabbage is cutting. Cut at the lowest point ' +
            'possible, leaving the loose outer leaves attached to the stalk. This will allow for a later cabbage ' +
            'harvest of sprouts which will grow on the stem after the cabbage head is removed. Knowing when to pick ' +
            'cabbage is particularly important if rain is expected. Mature heads may be split by excessive rainfall ' +
            'or over watering, making them inedible. Harvesting cabbage should happen before the rainfall has a chance ' +
            'to damage the cabbage heads.',
        sow_direct: {
            sow_direct: [0,0,1,1,0,0,0,0,0,0,0,0],
            harvest: [1,1,1,1,0,0,0,0,0,0,1,1],
        },
        sow_indoors: {
            sow_indoors: [0,1,1,1,0,0,0,0,0,0,0,0],
            plant_out: [0,0,1,1,1,0,0,0,0,0,0,0],
            harvest: [1,1,1,1,0,0,0,0,0,1,1,1],
        }
    },
    purple_cabbage: {
        id : 'purple_cabbage',
        name: 'Cabbage - Purple',
        pictureURL: purple_cabbage,
        sow_depth: '1 cm',
        spacing_between_rows: '45 cm',
        spacing_along_row: '45 cm',
        basic_information: 'Cabbage is one of the hardiest and they are a good choice for poor soils.',
        how_to_grow: 'Can be sown indoors and transplanted outside in May & June. Sow 1 cm deep in rows 20 cm apart, ' +
            'when the plants are large enough to handle (3 pairs of leaves) dig up with as much of the root ball as ' +
            'possible and plant 45 cm apart and 45 cm between rows. Water frequently, do not let the soil dry out.',
        how_to_harvest: 'The most successful technique for how to harvest cabbage is cutting. Cut at the lowest point ' +
            'possible, leaving the loose outer leaves attached to the stalk. This will allow for a later cabbage ' +
            'harvest of sprouts which will grow on the stem after the cabbage head is removed. Knowing when to pick ' +
            'cabbage is particularly important if rain is expected. Mature heads may be split by excessive rainfall ' +
            'or over watering, making them inedible. Harvesting cabbage should happen before the rainfall has a chance ' +
            'to damage the cabbage heads.',
    },
    carrot: {
        id : 'carrot',
        name: 'Carrot',
        pictureURL: carrot,
        sow_depth: '1 cm',
        spacing_between_rows: '25 cm',
        spacing_along_row: '6 cm',
        basic_information: 'Carrots are an easy crop to grow and will taste much better than carrots purchased from a ' +
            'supermarket',
        how_to_grow: 'Carrots need a well dug soil, if there are a lot of stones in the soil, the carrots may grow in ' +
            'strange shapes. They can be grown in containers or window boxes. Carrot root fly can be a significant ' +
            'problem, making the roots inedible. To stop carrot root fly use a very fine mesh netting about 40cm ' +
            'tall to surround the carrot bed.',
        how_to_harvest: 'Pull up the carrots as soon as they\'re big enough to eat. It\'s best to harvest them in ' +
            'the evening to avoid attracting carrot fly.',
    },
    celeriac: {
        id : 'celeriac',
        name: 'Celeriac',
        pictureURL: celeriac,
        sow_depth: '1 cm',
        spacing_between_rows: '35 cm',
        spacing_along_row: '35 cm',
        basic_information: 'Celeriac is a large root producing a celery flavoured white flesh. The chances are your ' +
            'nursery will not stock young plants for transplanting, so you will have to start from seed. It requires ' +
            'a long growing season (4 months) and can take two to three weeks to germinate.',
        how_to_grow: 'For best results sow indoors 10 weeks before planting out in May or June. Sprinkle seeds over a ' +
            'fine compost, do not cover seed as they need sunlight to germinate (2-3 weeks). When the plants are large ' +
            'enough to handle transplant into small pots, 1 plant per pot. Continue to keep the seedlings in a warm ' +
            'sunny place. When the plants are about 10 cm tall they should be hardened off in a cold frame before ' +
            'planting out 35 cm apart and 35 cm between rows. As the plants grow, remove any leaves that fall over ' +
            'and start to die.',
        how_to_harvest: 'Celeriac root can be harvested at most any time, but as mentioned is easier to manage when ' +
            'the root is on the smaller side. Celeriac has maximum flavor after the first frost in the fall and can ' +
            'be allowed to languish in the garden to harvest as needed.',
    },
    courgette: {
        id : 'courgette',
        name: 'Courgette',
        pictureURL: courgette,
        sow_depth: '2 cm',
        spacing_between_rows: '90 cm',
        spacing_along_row: '90 cm',
        basic_information: 'Courgettes, like marrows, squashes and pumpkins all belong to the gourd family.',
        how_to_grow: 'Dig a 30 cm deep hole, sow three seeds at about 2.5 cms apart at the centre of each hole. ' +
            'When the first true leaves have appeared, thin out to leave the strongest seedling. Make sure to water ' +
            'well and protect against slugs.',
        how_to_harvest: 'Continual cropping is essential to prolong fruiting. Cut the stalk of the fruit you want to ' +
            'harvest.',
    },
    cucumber: {
        id : 'cucumber',
        name: 'Cucumber',
        pictureURL: cucumber,
        sow_depth: '3 cm',
        spacing_between_rows: '90 cm',
        spacing_along_row: '90 cm',
        basic_information: 'Cucumber is a widely cultivated plant in the gourd family, cucurbitaceae.',
        how_to_grow: 'Dig a 30 cm deep hole, sow 3 seeds 5 to 6 cm apart at the centre of each pocket. Cover with a ' +
            'large cloche to help germination. When the first leaves have appeared, thin out to leave the strongest ' +
            'seedling.',
        how_to_harvest: 'The fruits should be cut before they reach maximum size, as this will encourage further ' +
            'fruiting. Most types will be 15-20 cm long. Use a sharp knife - don\'t tug the fruits from the stem.',
    },
    dill: {
        id : 'dill',
        name: 'Dill',
        pictureURL: dill,
        sow_depth: '1 cm',
        spacing_between_rows: '30 cm',
        spacing_along_row: '25 cm',
        basic_information: 'Dill is a tall herb with fine, feathery foliage. Foliage color can range from dark green ' +
            'to a blue-green. In mid-summer, dill will produce large, flat topped yellow flower clusters with seeds ' +
            'that can be harvested for culinary use.',
        how_to_grow: 'Dill performs best in a full sun location in moist, well-drained soil. Dill does best when it is ' +
            'directly sown in the garden, because the tap root system makes it difficult to transplant successfully. ' +
            'Sow the seeds in the spring one to two weeks before the last frost. Because dill reseeds readily, plants ' +
            'left in the garden in the fall will drop seeds that will germinate in the spring. To ensure a fresh supply ' +
            'of dill leaves, make successive sowing of dill every two weeks through the growing season as plants ' +
            'decline soon after they start to flower (bolt).',
        how_to_harvest: 'To harvest the seeds, cut the stems when the flower-heads have turned brown. Tie a paper bag ' +
            'over each flower-head and hang the stems upside-down in bunches.',
    },
    garlic: {
        id: 'garlic',
        name: 'Garlic',
        pictureURL: garlic,
        sow_depth: '1 cm',
        spacing_between_rows: '30 cm',
        spacing_along_row: '15 cm',
        basic_information: 'Garlic is a perennial and is part of the onion family. ' +
            'Garlic grows best in a full sun location in soils that are well-drained and high in organic matter. ' +
            'Garlic is often mentioned as a superfood. ' +
            'Some studies show that it may be effective against high blood pressure, cardiovascular disease, cholesterol, colds and some cancers. ' +
            'Although these studies point to possible health benefits, you would have to consume a lot to get the desired effects. ' +
            'That should not stop you growing and eating it. ' +
            'Even without those benefits it adds an lovely strong flavour, which can replace salt in many dishes. ' +
            'Even if the actual health effects are minimal Garlic is a great vegetable to add to your garden and diet.',
        how_to_grow: 'Garlic grows best in a sunny fertile spot. Separate a head/bulb of garlic into individual cloves. ' +
            'It is best to get garlic bulbs from a supplier that sells them for growing. ' +
            'It is possible to use the regular garlic cloves that you buy in the shop, but there is a greater risk of disease. ' +
            'Once separated plant the individual cloves about 5 cm deep (pointy end up) every 15 cm in rows 30 cm apart. ' +
            'Avoid pushing the clove into the soil, instead make a hole with finger (or stick) and drop the clove in. ' +
            'Keep the area free from weeds as yields will suffer if they are competing for light. ' +
            'Also remove any flowering heads as they appear. ' +
            'Garlic needs little watering, but yields will improve if watered during very dry periods. ' +
            'Don\'t water formed bulbs as that can encourage rot.',
        how_to_harvest: 'Once the leaves turn yellow in the summer, lift the bulbs and allow to dry under cover.',
    },
    kale: {
        id : 'kale',
        name: 'Kale',
        pictureURL: kale,
        sow_depth: '1 cm',
        spacing_between_rows: '45 cm',
        spacing_along_row: '45 cm',
        basic_information: 'Kale is a member of the Brassicas family and can tolerate cold weather well.',
        how_to_grow: 'Can be grown indoors from January onwards and transplanted from March. Can be grown outside in ' +
            'rows 15 cm apart, sow thinly, when plants have 6 leaves plant out 45 cm apart and in rows 45 cm apart. ' +
            'Firm the soil around each plant and water well.',
        how_to_harvest: 'Pick leaves that are 10 to 15 cm long and still young.',
    },
    green_kohlrabi: {
        id : 'green_kohlrabi',
        name: 'Green kohlrabi',
        pictureURL: green_kohlrabi,
        sow_depth: '1 cm',
        spacing_between_rows: '30 cm',
        spacing_along_row: '20 cm',
        basic_information: 'Kohlrabi is a member of the Brassicas family, it produces a fattened stem that is often ' +
            'used in Japanese cooking.',
        how_to_grow: 'Sow thinly outdoors from February to August in rows 1cm deep and 30 cm apart. Thin out or ' +
            'transplant when the plants have their first true leaves so that they are 15 cm apart. Water well after ' +
            'planting and in dry weather. Cover with fleece or netting to protect from pigeons, fleece will also ' +
            'stop cabbage root fly damage.',
        how_to_harvest: 'In addition to knowing when to pick kohlrabi, you need to know how to harvest kohlrabi plants. ' +
            'When harvesting kohlrabi, it’s vital to keep an eye on the swelling base. Once the stem reaches 3 inches ' +
            'in diameter, cut the bulb form the root with a sharp knife. Position your knife at soil level, just under ' +
            'the bulb. Pull the leaves off of the upper stems and wash the leaves before cooking. You can use the ' +
            'leaves as you would cabbage leaves. Peel off the outer skin from the bulb using a paring knife and eat ' +
            'the bulb raw or cook as you do a turnip.',
    },
    purple_kohlrabi: {
        id : 'purple_kohlrabi',
        name: 'Purple kohlrabi',
        pictureURL: purple_kohlrabi,
        sow_depth: '1 cm',
        spacing_between_rows: '30 cm',
        spacing_along_row: '20 cm',
        basic_information: 'Kohlrabi is a member of the Brassicas family, it produces a fattened stem that is often ' +
            'used in Japanese cooking.',
        how_to_grow: 'Sow thinly outdoors from February to August in rows 1cm deep and 30 cm apart. Thin out or ' +
            'transplant when the plants have their first true leaves so that they are 15 cm apart. Water well after ' +
            'planting and in dry weather. Cover with fleece or netting to protect from pigeons, fleece will also ' +
            'stop cabbage root fly damage.',
        how_to_harvest: 'In addition to knowing when to pick kohlrabi, you need to know how to harvest kohlrabi plants. ' +
            'When harvesting kohlrabi, it’s vital to keep an eye on the swelling base. Once the stem reaches 3 inches ' +
            'in diameter, cut the bulb form the root with a sharp knife. Position your knife at soil level, just under ' +
            'the bulb. Pull the leaves off of the upper stems and wash the leaves before cooking. You can use the ' +
            'leaves as you would cabbage leaves. Peel off the outer skin from the bulb using a paring knife and eat ' +
            'the bulb raw or cook as you do a turnip.',
    },
    leek: {
        id: 'leek',
        name: 'Leek',
        pictureURL: leek,
        sow_depth: '1 cm',
        spacing_between_rows: '20 cm',
        spacing_along_row: '15 cm',
        basic_information: 'Leeks are a member of the onion family that over winter very well and can be harvested ' +
            'from early autumn to spring the following year.',
        how_to_grow: 'Sow seeds indoors in seed trays covering the seeds with 1 cm of compost or outdoors in drills ' +
            '1 cm deep. When the young leeks are 15 - 20 cm tall or the thickness of a pencil, dig up a handful of ' +
            'plants and place them in a bucket half filled with water then tease the plants apart. Prepare a bed and ' +
            'mark off rows 30 cm apart, use a stick to make a hole 15 cm deep and 15 cm between plants. Do not fill ' +
            'the holes with soil, but water in each plant.',
        how_to_harvest: 'Start harvesting the leeks when the body of the plant is about 25 cm thick. Use a fork to ' +
            'gently loosen the roots and pull the leek out of the soil. Cut off the top of the foliage and trim the ' +
            'roots off, strip the external leaves from the stem to sound leaves.',
    },
    lettuce: {
        id : 'lettuce',
        name: 'Lettuce',
        pictureURL: lettuce,
        sow_depth: '1 cm',
        spacing_between_rows: '1 cm',
        spacing_along_row: '1 cm',
        basic_information: 'A lettuce that produces a dense centre.',
        how_to_grow: 'Can be sown indoors or outside. For indoors start sowing in January and plant out from April, ' +
            'cover the young plants if frosts are likely. Outdoors sowing from February under cover, make a drill 1 cm ' +
            'deep sprinkle the seeds thinly and cover with soil. As the seedlings grow thin out to 30 cm apart, use ' +
            'the thinning to transplant elsewhere. Water well after transplanting. Sow a little and often to keep ' +
            'the crop coming all season.',
        how_to_harvest: 'Harvesting heads of lettuce is done by cutting them away from the stalk when the head is ' +
            'still firm. Use a sharp knife and simply make a clean cut below the head through the stem. The outer leaves ' +
            'may be removed if needed. Morning is the best time for the harvest as heads will be at their freshest',
    },
    onion: {
        id: 'onion',
        name: 'Onion - Brown',
        pictureURL: onion,
        sow_depth: '1 cm',
        spacing_between_rows: '30 cm',
        spacing_along_row: '15 cm',
        basic_information: 'Onions are one of the most useful vegetables a gardener can grow. ' +
            'Brown & white onions tend to be stronger in flavour than red onions.',
        how_to_grow: 'Can be grown from seeds or onion sets. ' +
            'If growing from seed sow from February through to April in drills 1cm deep and 20cm between rows, sow the seed very thinly. ' +
            'Thin the plants to 5cm apart and later increase to 10cm apart (make sure your hoe can go between rows ' +
            'with plenty of room for the bulbs to grow), you can use the thinning to fill additional rows, water well after transplanting. ' +
            'If growing from sets plant out in March 10cm apart in rows 20cm apart. ' +
            'Push the sets into the soil so that the tip of the set is visible. Weed regularly between rows to control weeds.',
        how_to_harvest: 'When the onion leaves start to turn yellow and fall over, leave for a couple of weeks. ' +
            'Now lift with a fork cleaning off soil from the roots and leave them to dry. ' +
            'The remaining foliage and roots will will die back, if the weather is wet the drying process can be done in a greenhouse or shed.',
    },
    red_onion: {
        id: 'red_onion',
        name: 'Onion - Red',
        pictureURL: red_onion,
        sow_depth: '1 cm',
        spacing_between_rows: '30 cm',
        spacing_along_row: '15 cm',
        basic_information: 'Onions are one of the most useful vegetables a gardener can grow. ' +
            'Red onions tend to be milder in flavour than white onions.',
        how_to_grow: 'Can be grown from seeds or onion sets. ' +
            'If growing from seed sow from February through to April in drills 1cm deep and 20cm between rows, sow the seed very thinly. ' +
            'Thin the plants to 5cm apart and later increase to 10cm apart (make sure your hoe can go between rows ' +
            'with plenty of room for the bulbs to grow), you can use the thinning to fill additional rows, water well after transplanting. ' +
            'If growing from sets plant out in March 10cm apart in rows 20cm apart. ' +
            'Push the sets into the soil so that the tip of the set is visible. Weed regularly between rows to control weeds.',
        how_to_harvest: 'When the onion leaves start to turn yellow and fall over, leave for a couple of weeks. ' +
            'Now lift with a fork cleaning off soil from the roots and leave them to dry. ' +
            'The remaining foliage and roots will will die back, if the weather is wet the drying process can be done in a greenhouse or shed.',
    },
    parsley: {
        id : 'parsley',
        name: 'Parsley',
        pictureURL: parsley,
        sow_depth: '1 cm',
        spacing_between_rows: '30 cm',
        spacing_along_row: '15 cm',
        basic_information: 'There are several varieties, but the main ones are the curly-leaved ones which are the most ' +
            'decorative but the plain-leaved ones have the most flavour. Used in fines herbes, it\'s also often used ' +
            'as a garnish. Like any vegetables, fruits and herbs, parsley is good for you and full of Vitamin C!',
        how_to_grow: 'Sow seeds in 1.2 cm in April for a summer and autumn crop. Thin out to 22 cm apart - germination ' +
            'is slow (about a couple of months).',
        how_to_harvest: 'Pick leaves as you need them.',
    },
    peas: {
        id : 'peas',
        name: 'Peas',
        pictureURL: peas,
        sow_depth: '4 cm',
        spacing_between_rows: '45 cm',
        spacing_along_row: '5 cm',
        basic_information: 'Garden peas, petit-pois, mangetout - the list is endless. Peas are part of the leguminosae ' +
            'family.',
        how_to_grow: 'Make sure you have a well-drained, humus-rich soil. Sow seeds outdoors 4 to 6 weeks before last ' +
            'spring frost and plant 2.5 cm deep and 5 cm apart.',
        how_to_harvest: 'A pod is ready for harvest when it\'s well filled, although pick mangetout when they are ' +
            'about 7 cm long and the peas inside are just starting to develop.',
    },
    potato: {
        id : 'potato',
        name: 'Potato',
        pictureURL: potato,
        sow_depth: '',
        spacing_between_rows: '',
        spacing_along_row: '',
        basic_information: '',
        how_to_grow: '',
        how_to_harvest: '',
    },
    tomato: {
        id : 'tomato',
        name: 'Tomato',
        pictureURL: tomato,
        sow_depth: '',
        spacing_between_rows: '',
        spacing_along_row: '',
        basic_information: '',
        how_to_grow: '',
        how_to_harvest: '',
    },
    pear_tomato: {
        id : 'pear_tomato',
        name: 'Pear tomato',
        pictureURL: pear_tomato,
        sow_depth: '',
        spacing_between_rows: '',
        spacing_along_row: '',
        basic_information: '',
        how_to_grow: '',
        how_to_harvest: '',
    },
    paprika: {
        id : 'paprika',
        name: 'Paprika',
        pictureURL: paprika,
        sow_depth: '',
        spacing_between_rows: '',
        spacing_along_row: '',
        basic_information: '',
        how_to_grow: '',
        how_to_harvest: '',
    },
    radish: {
        id : 'radish',
        name: 'Radish',
        pictureURL: radish,
        sow_depth: '',
        spacing_between_rows: '',
        spacing_along_row: '',
        basic_information: '',
        how_to_grow: '',
        how_to_harvest: '',
    },


    beans: {
        id : 'beans',
        name: 'Beans',
        pictureURL: beans,
        sow_depth: '',
        spacing_between_rows: '',
        spacing_along_row: '',
        basic_information: '',
        how_to_grow: '',
        how_to_harvest: '',
    },
    squash: {
        id : 'squash',
        name: 'Squash',
        pictureURL: squash,
        sow_depth: '',
        spacing_between_rows: '',
        spacing_along_row: '',
        basic_information: '',
        how_to_grow: '',
        how_to_harvest: '',
    },



    sweet_potato: {
        id : 'sweet_potato',
        name: 'Sweet potato',
        pictureURL: sweet_potato,
        sow_depth: '',
        spacing_between_rows: '',
        spacing_along_row: '',
        basic_information: '',
        how_to_grow: '',
        how_to_harvest: '',
    },
}