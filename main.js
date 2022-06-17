const hexInput = document.querySelector('#hexInput')
const inputColor = document.querySelector('#inputColor')
const alteredColor = document.querySelector('#alteredColor')
const alteredColorText = document.querySelector('#alteredColorText')
const slider = document.querySelector('#slider')
const sliderText = document.querySelector('#sliderText')
const lightenText = document.querySelector('#lightenText')
const darkenText = document.querySelector('#darkenText')
const toggleBtn = document.querySelector('#toggleBtn');
const clipBoard = document.querySelector('#clipboard')

hexInput.addEventListener('keyup', () => {

    if (!isValidHex(hexInput.value)) return;

    const strippedHex = hexInput.value.replace('#', '');
    inputColor.style.backgroundColor = "#" + strippedHex;
    reset();
})

const isValidHex = (hex) => {

    if (!hex) {
        return false;
    } else {
        const strippedHex = hex.replace('#', '');
        return strippedHex.length === 3 || strippedHex.length === 6;
    }
}

const convertHexToRGB = (hex) => {
    if (!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
            + strippedHex[1] + strippedHex[1]
            + strippedHex[2] + strippedHex[2];
    }

    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);

    return {
        r, g, b
    }

}

const convertRGBtoHex = (r, g, b) => {

    const firstPair = ("0" + r.toString(16)).slice(-2)
    const secondPair = ("0" + g.toString(16)).slice(-2)
    const thirdPair = ("0" + b.toString(16)).slice(-2)

    const hex = '#' + firstPair + secondPair + thirdPair;
    return hex;

}

slider.addEventListener('input', () => {

    if (!isValidHex(hexInput.value)) return;

    sliderText.textContent = `${slider.value}%`

    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value

    const alteredHex = alterColor(hexInput.value, valueAddition)

    alteredColor.style.backgroundColor = alteredHex

    alteredColorText.innerText = `Altered Color ${alteredHex}`;

    clipBoard.addEventListener("click", async () => {
        await navigator.clipboard.writeText(alteredHex);
    });
})




const reset = () => {
    slider.value = 0;
    sliderText.innerText = `0%`
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Altered Color ${hexInput.value}`;

}

toggleBtn.addEventListener('click', () => {
    if (toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    } else {
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }
    reset();
})


const alterColor = (hex, percentage) => {
    const { r, g, b } = convertHexToRGB(hex);

    const amount = Math.floor((percentage / 100) * 255)

    const newR = increase0To255(r, amount);
    const newG = increase0To255(g, amount);
    const newB = increase0To255(b, amount);
    console.log({ newR, newG, newB })

    return convertRGBtoHex(newR, newG, newB)
}

const increase0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
}

