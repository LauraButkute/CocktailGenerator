// NAVIGATION
const hamburger = document.getElementById('hamburger');
        const navUL = document.getElementById('nav-ul');

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
});

// CONVERTER FROM OZ --> ML & OZ --> CL
function fluidConverter(valNum) {
    document.getElementById("outputMililitres").innerHTML = (valNum * 29.5735296).toFixed(2);
    document.getElementById("outputCentilitres").innerHTML = (valNum * 2.95735296).toFixed(2);
}

// CONVERTER FROM ML --> OZ & ML --> CL
function fluidConverter1(valNum) {
    document.getElementById("outputOunces1").innerHTML = (valNum / 29.5735296).toFixed(2);
    document.getElementById("outputCentilitres1").innerHTML = valNum / 10;
}

// CONVERTER FROM CL --> ML & CL --> OZ
function fluidConverter2(valNum) {
    document.getElementById("outputMililitres2").innerHTML = valNum * 10;
    document.getElementById("outputOunces2").innerHTML = (valNum / 2.95735296).toFixed(2);
}