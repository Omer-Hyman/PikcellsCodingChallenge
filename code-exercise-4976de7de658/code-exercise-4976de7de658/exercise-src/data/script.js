let loadedJson;

async function loadData() {
    try {
        const response = await fetch('https://lab.pikcells.com/code-exercise/data.json');
        const results = response.json();
        results.then(
            data => {
                loadedJson = data;
                initialiseButtons();
            });
    } catch (error) {
        console.log(error);
    }

}

function initialiseButtons() {
    const layers = loadedJson.layers.sort((a, b) => a.order - b.order);
    const elementNames = ['layerOne', 'layerTwo', 'layerThree'];
    for (let x = 0; x < layers.length; x++) {
        const items = layers[x].items.sort((a, b) => a.order - b.order);
        const htmlContainer = document.getElementById(elementNames[x]);
        for (const item of items) {
            const element = document.createElement('li');
            element.textContent = item.name;
            element.setAttribute('data-img', item.imgSrc);
            element.setAttribute('data-layer', x);
            element.addEventListener('click', () => getImage(element.getAttribute('data-img'), element.getAttribute('data-layer'), element));
            htmlContainer.appendChild(element);
        }
    }
    setDefaultConfig();
}

function getImage(image, layer, button) {
    const elementNames = ['One', 'Two', 'Three'];
    resetColors(elementNames[layer]);
    button.style.backgroundColor = 'blue';
    drawImage('https://lab.pikcells.com/code-exercise/images/' + image);
}

function drawImage(src) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = src;
    image.onload = () => {
        context.drawImage(image, 0, 0);
    }
}

function resetColors(layer) {
    const listItems = document.querySelectorAll('#layer'+ layer + ' li');
    for (let item of listItems) {
        item.style.backgroundColor = 'cadetblue';           
    }
}

function setDefaultConfig() {
    var elements = document.getElementById('layerOne').children;
    elements.item(loadedJson.default_configuration[0]).click();

    elements = document.getElementById('layerTwo').children;
    elements.item(loadedJson.default_configuration[1]).click();

    elements = document.getElementById('layerThree').children;
    elements.item(loadedJson.default_configuration[2]).click();
}

function saveImage() {
    console.log('saving image');
    
    const canvas = document.getElementById('canvas');
    const canvasUrl = canvas.toDataURL("image/jpeg");
    
    const element = document.createElement('a');

    element.href = canvasUrl;

    element.download = "idk";
    element.click();
}

loadData();