// Provera postojanja ScrollTrigger-a u višestraničnom okruženju
if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// BAZA PODATAKA REKONSTRUISANA DIREKTNO SA SLIKA KOJE SI POSLAO
const bazaMenija = {
    sac: [
        { name: "Teletina ispod sača (porcija)", price: "1.980 RSD", desc: "250 gr — Izuzetno mekana mlada teletina, sporo pečena satima pod gvozdenim sačem sa pekarskim krompirom." },
        { name: "Dimljena butkica u kupusu", price: "1.880 RSD", desc: "1 kg — Domaća dimljena butkica, kuvana i zapečena u podvarku od kiselog kupusa sa začinima." },
        { name: "Jagnjeće pečenje", price: "1.900 RSD", desc: "1 kg — Birano mlado jagnjeće pečenje, pečeno po tradicionalnom receptu." },
        { name: "Praseće pečenje", price: "1.400 RSD", desc: "1 kg — Sočno domaće praseće pečenje sa hrskavom kožicom." },
        { name: "Teletina ispod sača (porcija - stari meni)", price: "850 RSD", desc: "250 gr — Istorijska porcija teletine iz prve edicije našeg menija." }
    ],
    rostilj: [
        { name: "Ćevapi na kajmaku", price: "1.080 RSD", desc: "350 gr — Čisti juneći ćevapi servirani na posteljici od sveže topljenog zrelog kajmaka." },
        { name: "Gurmanska pljeskavica", price: "1.280 RSD", desc: "350 gr — Tradicionalno začinjeno mleveno meso sa kockicama kačkavalja i pršute." },
        { name: "Karađorđeva šnicla", price: "1.280 RSD", desc: "400 gr — Svinjski file rolovan sa zrelim kajmakom, pohovan do zlatne hrskavosti." },
        { name: "Pileća Karađorđeva šnicla", price: "1.280 RSD", desc: "400 gr — Laganija varijanta od pilećeg filea sa bogatim punjenjem od kajmaka." },
        { name: "Pljeskavica sa kajmakom", price: "690 RSD", desc: "400 gr — Klasik sa roštilja, prelivena izdašnim slojem domaćeg kajmaka." },
        { name: "Bela vešalica", price: "640 RSD", desc: "300 gr — Najmekši deo svinjskog karea, pečen na ćumuru bukovog drveta." },
        { name: "Mešano meso", price: "1.980 RSD", desc: "650 gr — Domaća kobasica, dimljeni vrat, pileći file, ćevapi i bela vešalica." }
    ],
    gotova: [
        { name: "Leskovačka mućkalica", price: "1.100 RSD", desc: "300 gr — Pikantni miks dinstanog mesa, paprike, paradajza i luka u sopstvenom saftu." },
        { name: "Juneći gulaš sa pireom", price: "930 RSD", desc: "450 gr — Dugo krčkan juneći but u bogatom sosu od crvenog vina sa krem pire krompirom." },
        { name: "Čorbast pasulj sa rebrima", price: "750 RSD", desc: "450 gr — Tradicionalni pasulj tetovac kuvan sa suvim svinjskim rebrima." },
        { name: "Sarmice od zelja sa krompirom", price: "870 RSD", desc: "300 gr — Sezonske sarmice u listu zelja, služene uz zapečeni krompir." },
        { name: "Teleća čorba", price: "430 RSD", desc: "Krepka bela čorba sa komadićima teletine i legirom od kisele pavlake." },
        { name: "Jagnjeća čorba", price: "430 RSD", desc: "Tradicionalna planinska čorba sa komadima jagnjetine i svežim začinskim biljem." }
    ],
    dorucak: [
        { name: "Doručak 'Tradicija'", price: "670 RSD", desc: "3 jaja na oko, njeguški pršut, domaća kobasica, tvrdi kravlji sir, paradajz i vruća pogača." },
        { name: "Kompletan doručak", price: "670 RSD", desc: "3 jaja na oko, kobasica punjena kačkavaljem, stari kravlji sir, paradajz." },
        { name: "Kačamak sa kajmakom i sirom", price: "540 RSD", desc: "Domaće kukuruzno brašno kuvano sa starim sirom i preliveno mladim kajmakom." },
        { name: "Popara sa sirom", price: "500 RSD", desc: "Tradicionalno jutarnje jelo spremano na maslacu sa zrelim punomasnim sirom." },
        { name: "Prženice 'Tradicija'", price: "570 RSD", desc: "Zlatni i vazdušasti komadi hleba pohovani na maslacu, služeni uz kajmak." }
    ],
    hladna: [
        { name: "Hladno Predjelo 'Tradicija'", price: "1.880 RSD", desc: "Dalmatinski/njeguški pršut, dalmatinski suvi vrat, goveđi pršut, kajmak, domaći sir i masline." },
        { name: "Šopska salata", price: "430 RSD", desc: "Svež paradajz, krastavac, crni luk i obilan nanos finog rendanog starog sira." },
        { name: "Pečene paprike sa belim lukom", price: "400 RSD", desc: "Pečene slatke paprike na maslinovom ulju, začinjene sitno seckanim belim lukom." },
        { name: "Urnebes kugla", price: "140 RSD", desc: "50 g — Pikantna salata od izgnječenog starog sira, ljute tucane paprike i belog luka." }
    ],
    poslastice: [
        { name: "Tri Leće ('Three milks' cake)", price: "410 RSD", desc: "Ultra-sočni domaći biskvit natopljen u tri različite vrste mleka sa karamelom." },
        { name: "Baklava / Urmašice", price: "410 RSD", desc: "Tradicionalni orijentalni slatkiši bogati orasima i preliveni šećernim sirupom." },
        { name: "Temet Tri Morave Belo", price: "3.100 RSD", desc: "0.75 l — Vrhunsko domaće belo vino sa izraženim cvetnim i mineralnim karakterom." },
        { name: "Manastir Kovilj Šljiva", price: "320 RSD", desc: "0.03 l — Premium rakija iz manastirskih podruma, odležala u hrastovini." }
    ]
};

// Funkcija za renderovanje stavki menija na meni.html stranici
function renderujKategoriju(kat) {
    const renderer = document.getElementById('menu-renderer');
    if (!renderer) return; // Zaštita ako skripta radi na index.html stranici

    renderer.innerHTML = '';
    bazaMenija[kat].forEach(item => {
        renderer.innerHTML += `
            <div class="menu-item">
                <div class="item-row">
                    <h3 class="item-title">${item.name}</h3>
                    <div class="item-dots"></div>
                    <span class="item-price">${item.price}</span>
                </div>
                <p class="item-desc">${item.desc}</p>
            </div>
        `;
    });

    // GSAP Kinetička animacija (Avenue Caffe stil)
    gsap.fromTo(".menu-item", 
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
    gsap.fromTo(".item-dots",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, delay: 0.1, ease: "power1.inOut" }
    );
}

// Event Listeneri za prebacivanje tabova na meni.html
document.querySelectorAll('.tab-btn').forEach(gumb => {
    gumb.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderujKategoriju(e.target.getAttribute('data-target'));
    });
});

// Inicijalizacija menija prilikom učitavanja stranice
if (document.getElementById('menu-renderer')) {
    renderujKategoriju('sac');
}

// GLOBALNI UKRASNI KURZOR
const cursor = document.querySelector('.custom-cursor');
const dot = document.querySelector('.custom-cursor-dot');

if (cursor && dot) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.25 });
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05 });
    });

    document.querySelectorAll('a, button, .tab-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.6)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });
}

// SCROLLTRIGGER ANIMACIJE ZA POČETNU I GALERIJU
if (typeof ScrollTrigger !== 'undefined') {
    
    // Parallaks efekat na naslovnoj slici
    if (document.querySelector('.parallax-hero')) {
        gsap.to(".parallax-hero", {
            scrollTrigger: {
                trigger: ".hero-split",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: "20%",
            ease: "none"
        });
    }

    // Parallaks na "O nama" slici
    if (document.querySelector('.scroll-parallax-img')) {
        gsap.to(".scroll-parallax-img", {
            scrollTrigger: {
                trigger: ".editorial-about",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: "-15%",
            ease: "none"
        });
    }

    // HORIZONTALNI SCROLL ZA GALERIJU (Kao na dardaneli.rs)
    const track = document.querySelector('.gallery-track');
    if (track) {
        gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.4),
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-gallery-container",
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${track.scrollWidth}`
            }
        });
    }
}
