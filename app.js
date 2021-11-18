//Selects the main section, with all info cards
const mainSection = document.querySelector('.MainSection');

//Selects the form for api query
const queryForm = document.querySelector('.wikiQueryForm');

//regex for converting to sentence case
const rg = /(^\w{1}|\.\s*\w{1})/gi;

queryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = queryForm.elements.query.value;
    queryForm.elements.query.value = '';
    await insertWikiCard(query);
});

// accepts the parameters and returns an info card, to be (usually) appended to mainSection, selected abv.
function createInfoCard(title, desc, img, url) {

    desc = desc.replace(rg, function (toReplace) {
        return toReplace.toUpperCase();
    });

    const card = document.createElement('div');
    const topPart = document.createElement('div');
    const choiceImage = document.createElement('img');
    const spacer1 = document.createElement('div');
    const spacer2 = document.createElement('div');
    const choiceName = document.createElement('h2');
    const choiceDescription = document.createElement('p');
    const closeText = document.createElement('p');

    card.classList.add('ChoiceCard');
    topPart.classList.add('TopPart');
    choiceImage.classList.add('ChoiceImage');
    spacer1.classList.add('spacer');
    spacer2.classList.add('spacer');
    choiceName.classList.add('ChoiceName');
    choiceDescription.classList.add('ChoiceDescription');
    closeText.classList.add('CloseText');

    if (img)
        choiceImage.src = img;
    else
        choiceImage.src = 'https://cdn.pixabay.com/photo/2020/12/18/12/47/forest-vector-5841970_960_720.jpg';

    if (title.length > 17)
        choiceName.innerHTML = title.slice(0, 14) + '...';
    else choiceName.innerHTML = title;

    if (desc.length > 150)
        choiceDescription.innerHTML = desc.slice(0, 147) + '...';
    else choiceDescription.innerHTML = desc;
    closeText.innerHTML = 'close';

    topPart.append(choiceImage);
    topPart.append(spacer1);
    topPart.append(choiceName);
    topPart.append(spacer2);
    card.append(topPart);
    card.append(choiceDescription);
    card.append(closeText);
    closeText.addEventListener('click', (e) => {
        e.stopPropagation();
        e.path[1].remove();
    });

    if (url)
        card.addEventListener('click', function () {
            window.open(url);
        });

    return card;
}

//function to get the data from API, returns an object with title, desc, img, url
async function getData(query) {
    //https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=pageimages%7Cpageterms&titles=India&format=json&piprop=thumbnail&pithumbsize=600
    // const baseUrl = 'https://en.wikipedia.org/w/api.php';
    // const config = {
    //     params: {
    //         action: 'query', 
    //         formatversion: '2',
    //         prop: 'pageimages%7Cpageterms',
    //         titles: encodeURIComponent(query),
    //         format: 'json',
    //         piprop: 'thumbnail',
    //         pithumbsize: '600',
    //         origin: '*'
    //     }
    // };
    // return await axios.get(baseUrl, config);
    try {
        const res = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=pageimages%7Cpageterms&titles=${encodeURIComponent(query)}&format=json&piprop=thumbnail&pithumbsize=600&origin=*`);
        return {
            title: res.data.query.pages[0].title,
            desc: res.data.query.pages[0].terms.description[0],
            img: res.data.query.pages[0].thumbnail.source,
            url: `https://en.wikipedia.org/?curid=${res.data.query.pages[0].pageid}`
        };
    }
    catch (e) {
        console.log(e);
        return {
            title: 'Error',
            desc: 'Some error occurred. Please refine the search, then try again.',
            img: 'https://straightvisions.com/wp-content/uploads/2019/08/shutterstock_1135176134-scaled.jpg',
            url: ''
        }
    }
}

async function insertWikiCard(query) {
    const data = await getData(query);
    const card = createInfoCard(data.title, data.desc, data.img, data.url);
    mainSection.append(card);
}

// Adds click event listener and card creator to add button
const addButton = document.querySelector('.BottomButton');
addButton.addEventListener('click', function (e) {
    let name = '';
    while (name == '') {
        name = prompt('Enter the card name');
    }
    if (!name) {
        name = 'Untitled';
    }
    let desc = '';
    while (desc == '') {
        desc = prompt('Enter the card decription');
    }
    if (!desc) {
        desc = 'This card does not have any associated description with it.'
    }
    const img = prompt('Enter the card image url (leave empty if none)');
    const url = prompt('Enter the card url (leave empty if none) ');
    const card = createInfoCard(name, desc, img, url);
    mainSection.append(card);
});

//generates default cards
function createDefaultCards() {
    // XML stuff - to be removed later
    const data = `<?xml version="1.0" encoding="UTF-8"?>
<items>
    <item>
        <url>https://en.wikipedia.org/wiki/Western_gull</url>
        <image>https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg</image>
        <name>Western Gull</name>
        <desc>The western gull (Larus occidentalis) is a large white-headed gull that lives on the west coast of North
            America. It was previously...</desc>
    </item>
    <item>
        <url>https://en.wikipedia.org/wiki/Global_Positioning_System</url>
        <image>https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Magellan_GPS_Blazer12.jpg/1280px-Magellan_GPS_Blazer12.jpg</image>
        <name>GPS</name>
        <desc>The Global Positioning System (GPS), originally Navstar GPS,[2] is a satellite-based radionavigation system owned by the United States government and operated by the United States Space Force.[3] It is one of the global navigation satellite systems (GNSS) that provides geolocation and time information to a GPS receiver anywhere on or near the Earth where there is an unobstructed line of sight to four or more GPS satellites.</desc>
    </item>
    <item>
        <url>https://en.wikipedia.org/wiki/Dog</url>
        <image>https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/1280px-Huskiesatrest.jpg</image>
        <name>Dogs</name>
        <desc>The dog or domestic dog, (Canis familiaris[4][5] or Canis lupus familiaris[5]) is a domesticated descendant of the wolf which is characterized by an upturning tail. The dog derived from an ancient, extinct wolf,[6][7] and the modern grey wolf is the dog's nearest living relative.[8] The dog was the first species to be domesticated,[9][8] by hunter–gatherers over 15,000 years ago,[7] before the development of agriculture.</desc>
    </item>
    <item>
        <url>https://en.wikipedia.org/wiki/Arctic</url>
        <image>https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Political_Map_of_the_Arctic.pdf/page1-495px-Political_Map_of_the_Arctic.pdf.jpg</image>
        <name>Arctic</name>
        <desc>The Arctic is a polar region located at the northernmost part of Earth. The Arctic consists of the Arctic Ocean, adjacent seas, and parts of Alaska (United States), Canada, Finland, Greenland (Denmark), Iceland, Norway, Russia, and Sweden. Land within the Arctic region has seasonally varying snow and ice cover, with predominantly treeless permafrost (permanently frozen underground ice) containing tundra. Arctic seas contain seasonal sea ice in many places.</desc>
    </item>
    <item>
        <url>https://en.wikipedia.org/wiki/Muskox</url>
        <image>https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Ovibos_moschatus_qtl3.jpg/330px-Ovibos_moschatus_qtl3.jpg</image>
        <name>Muskox</name>
        <desc>The muskox, also spelled musk ox and musk-ox, is a hoofed mammal of the family Bovidae.[7] Native to the Arctic, it is noted for its thick coat and for the strong odor emitted by males during the seasonal rut, from which its name derives. This musky odor has the effect of attracting females during mating season. Its Inuktitut name "umingmak" translates to "the bearded one".[8] Its Woods Cree names "mâthi-môs" and "mâthi-mostos" translate to "ugly moose" and "ugly bison", respectively.[9] Muskoxen primarily live in Greenland and the Canadian Ar</desc>
    </item>
</items>`;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');

    for (item of xmlDoc.querySelectorAll('item')) {
        const card = createInfoCard(item.children[2].innerHTML, item.children[3].innerHTML, item.children[1].innerHTML, item.children[0].innerHTML);
        mainSection.append(card);
    }
}
createDefaultCards();