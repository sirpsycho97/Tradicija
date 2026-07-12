// Registracija ScrollTrigger-a
gsap.registerPlugin(ScrollTrigger);

// Strukturirani podaci izvučeni i rekonstruisani iz tvojih slika menija
const menuData = {
    sac: [
        { title: "Teletina ispod sača", price: "1,980 RSD", desc: "Porcija 250gr — Izuzetno mekana teletina, sporo pečena satima pod tradicionalnim sačem sa pekarskim krompirom." },
        { title: "Jagnjeće pečenje", price: "1,900 RSD", desc: "1 kg — Vrhunsko domaće jagnjeće pečenje, birano i pripremano po starom porodičnom receptu." },
        { title: "Praseće pečenje", price: "1,400 RSD", desc: "1 kg — Sočno praseće pečenje sa hrskavom kožicom, pravo sa ražnja." },
        { title: "Dimljena butkica u kupusu", price: "1,880 RSD", desc: "1 kg — Bogat i aromatičan ukus sporo kuvane dimljene butkice položene u domaći kiseli kupus sa začinima." }
    ],
    rostilj: [
        { title: "Gurmanska pljeskavica", price: "1,280 RSD", desc: "350gr — Tradicionalno mleveno meso punjeno kockicama kačkavalja i slaninice, blago pikantno." },
        { title: "Ćevapi na kajmaku", price: "1,080 RSD", desc: "350gr — Domaći ćevapi od stopostotnog junećeg mesa, servirani preko svežeg, topljenog mladog kajmaka." },
        { title: "Mešano meso", price: "1,980 RSD", desc: "650gr — Bogata plata za prave gurmane: dimljena kobasica, dimljeni vrat, pileći file, ćevapi i bela vešalica." },
        { title: "Uštipci 'Tradicija'", price: "1,280 RSD", desc: "350gr — Vazdušasti, pikantni uštipci od mesa sa kačkavaljem i dimljenom slaninom." },
        { title: "Punjava bela vešalica", price: "1,340 RSD", desc: "400gr — Svinjski file punjen kajmakom, rolovan u domaćoj dimljenoj slanini." }
    ],
    dorucak: [
        { title: "Doručak 'Tradicija'", price: "670 RSD", desc: "3 jaja na oko, pršuta, domaća kobasica, tvrdi kravlji sir, svež paradajz i vruć domaći hleb." },
        { title: "Kompletan doručak", price: "6700 RSD", desc: "3 jaja na oko, kobasica punjena kačkavaljem, tvrdi kravlji sir, paradajz." },
        { title: "Kačamak sa kajmakom i sirom", price: "540 RSD", desc: "Tradicionalna palenta kuvana sa bogatim slojem starog sira i mladog clotted cream kajmaka." },
        { title: "Popara sa sirom", price: "500 RSD", desc: "Starinsko jelo spremano na maslacu sa obiljem domaćeg punomasnog kravljeg sira." },
        { title: "Prženice 'Tradicija'", price: "570 RSD", desc: "Zlatni French Toast na balkanski način, služen uz zreo sir i kajmak." }
    ],
    predjela: [
        { title: "Predjelo 'Tradicija'", price: "1,880 RSD", desc: "Dalmatinski ili njeguški pršut 75g, dalmatinski suvi vrat 50g, goveđi pršut 75g, kajmak 100g, domaći sir 150g, masline." },
        { title: "Piktije", price: "550 RSD", desc: "Tradicionalno zimsko predjelo od sporo kuvanog mesa sa belim lukom, servirano hladno." },
        { title: "Mladi kajmak kugla", price: "1700 RSD", desc: "50g — Autentični srpski clotted cream, kremast i blago slan." },
        { title: "Sjenički sir", price: "450 RSD", desc: "170g — Čuveni slani sir sa Pešterske visoravni, sazrevao u salamuri." },
        { title: "Teleća čorba", price: "430 RSD", desc: "Gusta, krepka bela čorba sa komadićima telećeg mesa, legirana pavlakom." },
        { title: "Salata sa vrelim paprikama", price: "400 RSD", desc: "Pečene slatke paprike na ulju i belom luku, idealan pratilac pečenja." }
    ],
    pica: [
        { title: "Temet Tri Morave Belo", price: "3,100 RSD", desc: "0.75l — Autohtona kupaža iz lokalne vinarije, osvežavajućih cvetnih nota." },
        { title: "Radovanović Cabernet Sauvignon", price: "3,000 RSD", desc: "0.75l — Punokrvno crveno vino sa izraženim tonovima šumskog voća." },
        { title: "Manastir Kovilj Šljiva", price: "320 RSD", desc: "0.03l — Premium rakija od šljive, odležala u hrastovim buradima, vrhunski digestiv." },
        { title: "Bojkovčanka Šljiva 10 god.", price: "430 RSD", desc: "0.03l — Arhivska rakija impresivne kompleksnosti, stara čitavu deceniju." }
    ]
};

// Funkcija za renderovanje stavki
function renderMenu(category) {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    menuData[category].forEach(item => {
        const itemHTML = `
            <div class="menu-item">
                <div class="item-main-row">
                    <h3 class="item-title">${item.title}</h3>
                    <div class="item-leader"></div>
                    <span class="item-price">${item.price}</span>
                </div>
                <p class="item-description">${item.desc}</p>
            </div>
        `;
        container.innerHTML += itemHTML;
    });

    // Pokretanje GSAP Stagger Animacije za nove stavke
    gsap.fromTo(".menu-item", 
        { opacity: 0, translateY: 30 },
        { opacity: 1, translateY: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
    );

    // Animacija iscrtavanja tačkastih linija (Leader-a)
    gsap.fromTo(".item-leader",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, delay: 0.2, ease: "power1.inOut" }
    );
}

// Rukovanje klikovima na kategorije
document.querySelectorAll('.cat-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const cat = e.target.getAttribute('data-category');
        renderMenu(cat);
    });
});

// Inicijalno renderovanje prve kategorije
renderMenu('sac');

// Advanced GSAP ScrollTrigger: Fluidni Smoke Reveal za Hero Naslov
gsap.to("#smoke-displacement", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom center",
        scrub: true
    },
    attr: { scale: 50 }, // Izobličuje tekst u dim kako skroluješ na dole
    ease: "none"
});

// Suptilno pojavljivanje sekcija
gsap.from(".section-title-wrap", {
    scrollTrigger: {
        trigger: ".menu-section",
        start: "top 80%"
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out"
});

