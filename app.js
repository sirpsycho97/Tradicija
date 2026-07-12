gsap.registerPlugin(ScrollTrigger);

// 1. REKONSTRUISANA BAZA PODATAKA IZ TVOJIH SLIKA MENIJA
const tradicijaMeni = {
    sac: [
        { name: "Teletina ispod sača", price: "1.980 RSD", detail: "Porcija 250gr — Vrhunska mlada teletina sporo pečena satima pod teškim sačem sa slasnim pekarskim krompirom." },
        { name: "Dimljena butkica u kupusu", price: "1.880 RSD", desc: "1 kg — Bogata domaća dimljena butkica, sporo krčkana unutar kiselog kupusa po receptu naših starih." },
        { name: "Jagnjeće pečenje", price: "1.900 RSD", detail: "1 kg — Premium domaća jagnjetina, sočna i pažljivo pečena da se lepi za prste." },
        { name: "Praseće pečenje", price: "1.400 RSD", detail: "1 kg — Domaće praseće pečenje sa savršeno hrskavom kožicom." }
    ],
    rostilj: [
        { name: "Ćevapi na kajmaku", price: "1.080 RSD", detail: "350gr — Tradicionalni juneći ćevapi servirani preko topljenog, mladog sjeničkog kajmaka." },
        { name: "Gurmanska pljeskavica", price: "1.280 RSD", detail: "350gr — Bogato mleveno meso punjeno seckanim kačkavaljem i dimljenom slaninom." },
        { name: "Mešano meso", price: "1.980 RSD", detail: "650gr — Miks za prave gurmane: ćevapi, kobasica, bela vešalica, svinjski vrat i pileći file." },
        { name: "Punjava bela vešalica", price: "1.340 RSD", detail: "400gr — Svinjski file punjen kajmakom i rolovan u domaćoj slanini." }
    ],
    dorucak: [
        { name: "Doručak 'Tradicija'", price: "670 RSD", detail: "3 jaja na oko, pršuta, domaća kobasica, domaći tvrdi sir, kajmak, paradajz i topla pogača." },
        { name: "Kačamak sa kajmakom", price: "540 RSD", detail: "Starinska palenta kuvana sa slojevima punomasnog sira i zrelog kajmaka." },
        { name: "Popara sa sirom", price: "500 RSD", detail: "Autentično jutarnje jelo spremano na maslacu sa obiljem domaćeg sira." }
    ],
    predjela: [
        { name: "Predjelo 'Tradicija' (Plata)", price: "1.880 RSD", detail: "Selekcija njeguškog pršuta, dalmatinskog suvog vrata, goveđeg pršuta, kajmaka i zrelog sira." },
        { name: "Teleća čorba", price: "430 RSD", detail: "Krepka bela čorba od telećeg mesa legirana pavlakom i svežim začinskim biljem." },
        { name: "Šopska salata", price: "430 RSD", detail: "Svež paradajz, krastavac, crni luk i obilan nanos finog rendanog starog sira." }
    ]
};

// 2. FUNKCIJA DINAMIČKOG ISPISA I ASINKRONE GSAP ANIMACIJE
function prikaziMeni(kategorija) {
    const grid = document.getElementById('dynamic-menu');
    grid.innerHTML = '';

    tradicijaMeni[kategorija].forEach(item => {
        const itemHTML = `
            <div class="menu-item">
                <div class="item-title-row">
                    <h3 class="item-name">${item.name}</h3>
                    <div class="item-dots"></div>
                    <span class="item-price">${item.price}</span>
                </div>
                <p class="item-detail">${item.detail}</p>
            </div>
        `;
        grid.innerHTML += itemHTML;
    });

    // Elegantna Stagger animacija stavki (Avenue Caffe stil)
    gsap.fromTo(".menu-item", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }
    );

    // Glatko širenje linije cena sa leve na desnu stranu
    gsap.fromTo(".item-dots",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, delay: 0.2, ease: "power1.inOut" }
    );
}

// Menjanje kategorija na klik
document.querySelectorAll('.filter-btn').forEach(gumb => {
    gumb.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        prikaziMeni(e.target.getAttribute('data-cat'));
    });
});

// Inicijalno pokretanje
prikaziMeni('sac');

// 3. PREMIUM CUSTOM CURSOR INTERAKCIJA
const cursor = document.querySelector('.custom-cursor');
const dot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3 });
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05 });
});

// Efekat povećanja kurzora na hover linkova
document.querySelectorAll('a, button, .filter-btn').forEach(link => {
    link.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.8)');
    link.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
});

// 4. NAPREDNE SCROLLTRIGGER ANIMACIJE
// Uvodno otkrivanje elemenata u Hero sekciji pri učitavanju
const tlHero = gsap.timeline();
tlHero.to(".hero-reveal-img", { scale: 1, duration: 1.5, ease: "power3.out" })
      .to(".hero-text-side .eyebrow", { opacity: 1, y: 0, duration: 0.5 }, "-=0.8")
      .to(".hero-text-side h1", { opacity: 1, duration: 0.8 }, "-=0.6")
      .to(".hero-sub", { opacity: 1, duration: 0.5 }, "-=0.4")
      .to(".hero-actions", { opacity: 1, duration: 0.5 }, "-=0.3");

// Paralaks efekat na slici "O nama"
gsap.to(".parallax-img", {
    scrollTrigger: {
        trigger: ".trigger-parallax",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: "-15%",
    ease: "none"
});

// HORIZONTALNI SCROLL ZA GALERIJU (Kao na dardaneli.rs)
const slider = document.querySelector('.gallery-slider');
gsap.to(slider, {
    x: () => -(slider.scrollWidth - window.innerWidth + window.innerWidth * 0.4),
    ease: "none",
    scrollTrigger: {
        trigger: ".gallery-section",
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${slider.scrollWidth}`
    }
});

