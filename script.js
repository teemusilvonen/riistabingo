document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const bingoGrid = document.getElementById('bingoGrid');
    const downloadContainer = document.getElementById('downloadContainer');

    const gameAnimals = [
        { path: 'kuvat/pyy.png', name: 'Pyy' },
        { path: 'kuvat/riekko.png', name: 'Riekko' },
        { path: 'kuvat/minkki.png', name: 'Minkki' },
        { path: 'kuvat/orava.png', name: 'Orava' },
        { path: 'kuvat/lehtokurppa.png', name: 'Lehtokurppa' },
        { path: 'kuvat/tavi.png', name: 'Tavi' },
        { path: 'kuvat/sepelkyyhky.png', name: 'Sepelkyyhky' },
        { path: 'kuvat/fasaani.png', name: 'Fasaani' },
        { path: 'kuvat/heinasorsa.png', name: 'Heinäsorsa' },
        { path: 'kuvat/kettu.png', name: 'Kettu' },
        { path: 'kuvat/metsajanis.png', name: 'Metsäjänis' },
        { path: 'kuvat/rusakko.png', name: 'Rusakko' },
        { path: 'kuvat/telkka.png', name: 'Telkkä' },
        { path: 'kuvat/teeri.png', name: 'Teeri' },
        { path: 'kuvat/metso.png', name: 'Metso' },
        { path: 'kuvat/metsahanhi-merihanhi-kanadanhanhi.png', name: 'Hanhi' },
        { path: 'kuvat/naata.png', name: 'Näätä' },
        { path: 'kuvat/supikoira.png', name: 'Supikoira' },
        { path: 'kuvat/mayra.png', name: 'Mäyrä' },
        { path: 'kuvat/euroopanmajava-kanadanmajava.png', name: 'Majava' },
        { path: 'kuvat/metsakauris.png', name: 'Metsäkauris' },
        { path: 'kuvat/itamerennorppa-harmaahylje.png', name: 'Hylje tai Norppa' },
        { path: 'kuvat/villisika.png', name: 'Villisika' },
        { path: 'kuvat/valkohantapeura.png', name: 'Valkohäntäpeura' },
        { path: 'kuvat/hirvi.png', name: 'Hirvi' }
    ];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const createBingoGrid = (animals) => {
        bingoGrid.innerHTML = '';
        let imagesLoaded = 0;
        const totalImages = animals.length;

        const imageLoadCallback = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                // Kun kaikki kuvat ovat latautuneet, luo ladattava kuva
                createDownloadImage();
            }
        };

        animals.forEach(animal => {
            const cell = document.createElement('div');
            cell.classList.add('bingo-cell');

            const img = new Image();
            img.src = animal.path;
            img.alt = animal.name;
            img.onload = imageLoadCallback;
            img.onerror = () => {
                console.error(`Kuvan lataus epäonnistui: ${animal.path}`);
                imageLoadCallback(); // Käsittele myös epäonnistunut lataus, jotta prosessi jatkuu
            };
            
            const name = document.createElement('p');
            name.textContent = animal.name;
            name.classList.add('animal-name');

            cell.appendChild(img);
            cell.appendChild(name);
            bingoGrid.appendChild(cell);
        });
    };


const createDownloadImage = () => {
    downloadContainer.innerHTML = '';
    
    // Hae nykyinen ruudukon tyyli
    const originalGridStyle = bingoGrid.style.cssText;
    
    // Aseta ruudukon koko 3000x3000 pikseliin
    bingoGrid.style.width = '3000px';
    bingoGrid.style.height = '3000px';
    
    const options = {
        quality: 1.0, // Käytä parasta mahdollista laatua
        width: 3000,
        height: 3000,
        style: {
            'background-color': '#ffffff'
        }
    };

    domtoimage.toJpeg(bingoGrid, options)
        .then(function (dataUrl) {
            // Palauta ruudukon alkuperäinen koko
            bingoGrid.style.cssText = originalGridStyle;
            
            const link = document.createElement('a');
            link.download = 'riistabingo.jpeg';
            link.href = dataUrl;
            link.classList.add('download-link');
            link.textContent = 'Lataa bingokortti (3000x3000px)';
            downloadContainer.appendChild(link);
        })
        .catch(function (error) {
            // Palauta ruudukon alkuperäinen koko myös virhetilanteessa
            bingoGrid.style.cssText = originalGridStyle;
            console.error('Kuvan luonti epäonnistui!', error);
        });
};


    startButton.addEventListener('click', () => {
        shuffleArray(gameAnimals);
        createBingoGrid(gameAnimals);
    });

    // Luo alkuperäinen ruudukko sivun latautuessa
    shuffleArray(gameAnimals);
    createBingoGrid(gameAnimals);

});










