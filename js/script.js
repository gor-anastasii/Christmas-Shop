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

document.querySelectorAll('.explore-button').forEach((btn) => {
    btn.addEventListener('click', () => {
        window.location.href = 'gifts.html'
    })
})

//slider
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slider > *')
const slideWidth = slides[0].offsetWidth;
const sliderWidth = slider.scrollWidth;
const visibleArea = document.querySelector('.slider-wrapper').clientWidth;

let currentIndex = 0;

function getClicks() {
    const width = window.innerWidth
    if (width >= 768) return 3
    if (width >= 380) return 6
    return 6
}

function getDistancePerClick() {
    const clicks = getClicks()
    return (sliderWidth - visibleArea) / clicks
}

function updateSliderPosition() {
    const distancePerClick = getDistancePerClick()
    const offset = -currentIndex * distancePerClick
    slider.style.transform = `translateX(${offset}px)`
    updateButtonStates()
}

function updateButtonStates() {
    const clicks = getClicks()
    const maxIndex = slides.length - clicks

    const leftButton = document.querySelector('.slider-btn-left')
    const rightButton = document.querySelector('.slider-btn-right')

    if (currentIndex === 0) {
        leftButton.disabled = true
        leftButton.classList.remove('active-slider-btn')
    } else {
        leftButton.disabled = false
        leftButton.classList.add('active-slider-btn')
    }

    if (currentIndex >= maxIndex) {
        rightButton.disabled = true
        rightButton.classList.remove('active-slider-btn')
    } else {
        rightButton.disabled = false
        rightButton.classList.add('active-slider-btn')
    }
}

document.querySelector('.slider-btn-right').addEventListener('click', () => {
    const clicks = getClicks()
    if (currentIndex < slides.length - clicks) {
        currentIndex++
        updateSliderPosition()
    }
})

document.querySelector('.slider-btn-left').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--
        updateSliderPosition()
    }
})

// timer
const days = document.querySelector('.days p')
const hours = document.querySelector('.hours p')
const minutes = document.querySelector('.minutes p')
const seconds = document.querySelector('.seconds p')

setInterval(() => {
    const now = new Date()
    const newYearDate = new Date(`January 1, ${now.getFullYear() + 1} 00:00:00`)
    const difference = newYearDate - now

    if (difference < 0) {
        days.innerHTML = hours.innerHTML = minutes.innerHTML = seconds.innerHTML = 0
        return;
    }

    days.innerHTML = Math.floor(difference / (1000 * 60 * 60 * 24))
    hours.innerHTML = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.innerHTML = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    seconds.innerHTML = Math.floor((difference % (1000 * 60)) / 1000)
}, 1000)


//render gifts

const giftTypes = {
    "For Work" : {
        "color":"#4361FF",
        "image":"images/gift-for-work.png"
    },
    "For Health" : {
        "color":"#06A44F",
        "image":"images/gift-for-health.png"
    },
    "For Harmony" : {
        "color":"#FF43F7",
        "image":"images/gift-for-harmony.png"
    }
}

async function renderGift() {
    try {
        const response = await fetch('./gifts.json');
        const gifts = await response.json();

        const giftsContainer = document.querySelector('.gifts-container');
        giftsContainer.innerHTML = '';

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

        gifts.slice(0, 4).forEach(gift => {
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
        });
    } catch (e) {
        console.error('Ошибка загрузки данных:', e);
    }
}

renderGift();

renderGift()
