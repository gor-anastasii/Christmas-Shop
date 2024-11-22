//burger-menu
const burgerBtn = document.getElementsByClassName('header-nav-burger')[0]
const burgerIcon = document.querySelector('.header-nav-burger img')
const nav = document.getElementsByClassName('header-nav')[0]
const lists = document.querySelectorAll('.header-nav a')

burgerBtn.addEventListener('click', burgerMenu)
lists.forEach((list) => {
    list.addEventListener('click', burgerMenu)
})

function burgerMenu() {
    const isBurger = burgerIcon.src.includes('burger.svg')
    burgerIcon.src = isBurger ? 'images/cross.svg' : 'images/burger.svg'
    nav.classList.toggle('header-nav-active')
}


//popup
const popup = document.querySelector('.popup')
const closeBtn = document.querySelector('.exit')
const giftsCards = document.querySelectorAll('.gift-item')

const popupImg = document.querySelector('.popup-item-image img')
const popupCategory = document.querySelector('.popup-info-text span')
const popupTitle = document.querySelector('.popup-info-text h3')
const popupDesc = document.querySelector('.popup-info-text p')
const popupPowers = {
    live : {
        span: document.querySelector('.live-power-val span'),
        img: document.querySelectorAll('.live-power-val .line img')
    },
    create : {
        span: document.querySelector('.create-power-val span'),
        img: document.querySelectorAll('.create-power-val .line img')
    },
    love : {
        span: document.querySelector('.love-power-val span'),
        img: document.querySelectorAll('.love-power-val .line img')
    },
    dream : {
        span: document.querySelector('.dream-power-val span'),
        img: document.querySelectorAll('.dream-power-val .line img')
    }
}


closeBtn.addEventListener('click', () => {
    popup.style.display = 'none'
})

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none'
    }
})


//filter
const filterBtns = [
    { element: document.querySelector('#filter-all'), category: 'all' },
    { element: document.querySelector('#filter-work'), category: 'work' },
    { element: document.querySelector('#filter-health'), category: 'health' },
    { element: document.querySelector('#filter-harmony'), category: 'harmony' }
]

filterBtns.forEach(({ element, category }) => {
    element.addEventListener('click', () => {
        filterBtns.forEach(({ element: btn }) => {
            btn.classList.remove('filter-active')
        })
        element.classList.add('filter-active')
        renderGift(category)
    })
})

//render gifts
const giftTypes = {
    "For Work" : {
        "color":"#4361FF",
        "image":"./images/gift-for-work.png",
        "type": "work"
    },
    "For Health" : {
        "color":"#06A44F",
        "image":"./images/gift-for-health.png",
        "type":'health'
    },
    "For Harmony" : {
        "color":"#FF43F7",
        "image":"./images/gift-for-harmony.png",
        "type": "harmony"
    }
}

async function renderGift(category) {
    try {
        const response = await fetch('./gifts.json');
        const gifts = await response.json();

        const giftsContainer = document.querySelector('.gifts-container');
        giftsContainer.innerHTML = '';

        const filteredGifts = gifts.filter(gift => category === 'all' || giftTypes[gift.category].type === category);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1
        });

        filteredGifts.forEach(gift => {
            const giftItem = document.createElement('div');
            giftItem.classList.add('gift-item');
            giftItem.innerHTML = `
                <div class="gift-item-image">
                    <img src="${giftTypes[gift.category].image}" alt="Best Gift">
                </div>
                <div class="gift-item-info">
                    <span style="color:${giftTypes[gift.category].color}">${gift.category}</span>
                    <h3 class="gift-title">${gift.name}</h3>
                </div>
            `;
            giftsContainer.appendChild(giftItem);
            observer.observe(giftItem);

            giftItem.addEventListener('click', () => {
                popup.style.display = 'flex'
                popupImg.src = giftTypes[gift.category].image
                popupCategory.innerHTML = gift.category
                popupCategory.style.color = giftTypes[gift.category].color
                popupDesc.innerHTML = gift.description
                popupTitle.innerHTML = gift.name

                popupPowers.live.span.innerHTML = `+${gift.superpowers.live}00`
                popupPowers.live.img.forEach((snow, index) => {
                    if (index < gift.superpowers.live) {
                        snow.src = 'images/snow1.png'; 
                    } else {
                        snow.src = 'images/snow2.png';
                    }
                })

                popupPowers.love.span.innerHTML = `+${gift.superpowers.love}00`
                popupPowers.love.img.forEach((snow, index) => {
                    if (index < gift.superpowers.love) {
                        snow.src = 'images/snow1.png'; 
                    } else {
                        snow.src = 'images/snow2.png';
                    }
                })

                popupPowers.create.span.innerHTML = `+${gift.superpowers.create}00`
                popupPowers.create.img.forEach((snow, index) => {
                    if (index < gift.superpowers.create) {
                        snow.src = 'images/snow1.png'; 
                    } else {
                        snow.src = 'images/snow2.png';
                    }
                })

                popupPowers.dream.span.innerHTML = `+${gift.superpowers.dream}00`
                popupPowers.dream.img.forEach((snow, index) => {
                    if (index < gift.superpowers.dream) {
                        snow.src = 'images/snow1.png'; 
                    } else {
                        snow.src = 'images/snow2.png';
                    }
                })
            })
        });
    } catch (e) {
        console.error('Ошибка загрузки данных:', e);
    }
}

renderGift('all');


