//Selects the main section, with all info cards
const mainSection = document.querySelector('.MainSection');

const addButton = document.querySelector('.BottomButton');

// accepts the parameters and returns an info card, to be (usually) appended to mainSection, selected abv.
function createInfoCard(title, desc, img, url) {
    const card = document.createElement('div');
    const topPart = document.createElement('div');
    const choiceImage = document.createElement('img');
    const spacer1 = document.createElement('div');
    const spacer2 = document.createElement('div');
    const choiceName = document.createElement('h2');
    const choiceDescription = document.createElement('p');

    card.classList.add('ChoiceCard');
    topPart.classList.add('TopPart');
    choiceImage.classList.add('ChoiceImage');
    spacer1.classList.add('spacer');
    spacer2.classList.add('spacer');
    choiceName.classList.add('ChoiceName');
    choiceDescription.classList.add('ChoiceDescription');

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

    topPart.append(choiceImage);
    topPart.append(spacer1);
    topPart.append(choiceName);
    topPart.append(spacer2);
    card.append(topPart);
    card.append(choiceDescription);
    
    if (url)
        card.addEventListener('click', function () {
            window.open(url);
        });

    return card;
}

addButton.addEventListener('click', function (e) {
    let name = '';
    while (name == '') {
        name = prompt('Enter the card name');
    }
    if(!name)
    {
        name = 'Untitled';
    }
    let desc = '';
    while (desc == '') {
        desc = prompt('Enter the card decription');
    }
    if(!desc)
    {
        desc = 'This card does not have any associated description with it.'
    }
    const img = prompt('Enter the card image url (leave empty if none)');
    const url = prompt('Enter the card url (leave empty if none) ');
    const card = createInfoCard(name, desc, img, url);
    mainSection.append(card);
});


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

const arr = [];
for (item of xmlDoc.querySelectorAll('item')) {
    const card = document.createElement('div');
    const topPart = document.createElement('div');
    const choiceImage = document.createElement('img');
    const spacer1 = document.createElement('div');
    const spacer2 = document.createElement('div');
    const choiceName = document.createElement('h2');
    const choiceDescription = document.createElement('p');
    card.classList.add('ChoiceCard');
    topPart.classList.add('TopPart');
    choiceImage.classList.add('ChoiceImage');
    spacer1.classList.add('spacer');
    spacer2.classList.add('spacer');
    choiceName.classList.add('ChoiceName');
    choiceDescription.classList.add('ChoiceDescription');
    choiceImage.src = item.children[1].innerHTML;

    if (item.children[2].innerHTML.length > 17)
        choiceName.innerHTML = item.children[2].innerHTML.slice(0, 14) + '...';
    else choiceName.innerHTML = item.children[2].innerHTML;

    if (item.children[3].innerHTML.length > 150)
        choiceDescription.innerHTML = item.children[3].innerHTML.slice(0, 147) + '...';
    else choiceDescription.innerHTML = item.children[3].innerHTML;

    topPart.append(choiceImage);
    topPart.append(spacer1);
    topPart.append(choiceName);
    topPart.append(spacer2);
    card.append(topPart);
    card.append(choiceDescription);
    mainSection.append(card);
    arr.push((item.children[0].innerHTML));
}

for (let i = 0; i < mainSection.childElementCount; i++) {
    mainSection.children[i].addEventListener('click', function () {
        window.open(arr[i]);
    });
}