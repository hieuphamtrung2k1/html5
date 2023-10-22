const muiten = document.querySelector('.muiten');
function menu(e) {
    const Element = document.documentElement;
    const position = Element.scrollTop;
    const div_nav = document.getElementById('div_nav');
    const temp_nav = document.querySelector('nav');
    const logo = document.getElementById('logo');
    if (position > 5) {
        temp_nav.style.top = '0';
        temp_nav.style.background = 'white';
        temp_nav.style.boxShadow = '0 5px 10px gray';
        logo.setAttribute('src', 'image/travele-logo1.png');
    } else {
        temp_nav.style.top = '46px';
        temp_nav.style.background = 'none';
        logo.setAttribute('src', 'image/travele-logo.png');
        temp_nav.style.boxShadow = 'none';
    }
    if (position > 100) {
        muiten.style.display = 'block';
    } else {
        muiten.style.display = 'none';
    }
}
document.addEventListener('scroll', menu);

// hearder slider

let active = 0;
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slides = document.querySelectorAll('.slide');
const slide = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');

let creatInterval = setInterval(() => { next.click() }, 4000);

next.onclick = () => {
    if (active === slides.length - 1) {
        slide.style.transition = '1s linear';
        active = 0;
        let imgwidth = slides[0].offsetWidth;
        slide.style.transform = `translateX(-${imgwidth * (slides.length + 1)}px)`;
        dot();
        setTimeout(() => { slide.style.transition = 'none'; autoslide() }, 1000);
        return;
    }
    slide.style.transition = '1s linear';
    active++;
    dot();
    autoslide();
}
prev.onclick = () => {
    if (active === 0) {
        slide.style.transition = '1s linear';
        active = slides.length - 1;
        slide.style.transform = `translateX(0)`;
        dot();
        setTimeout(() => { slide.style.transition = 'none'; autoslide() }, 1000);
        return;
    }
    slide.style.transition = '1s linear';
    active--;
    dot();
    autoslide();
}

function autoslide() {
    const positionX = slides[active].offsetLeft;
    slide.style.transform = `translateX(-${positionX}px)`;
    clearInterval(creatInterval);
    creatInterval = setInterval(() => { next.click() }, 4000);
}

dots.forEach((data, index) => {
    data.addEventListener('click', () => { active = index; autoslide(); dot() });
});

function dot() {
    slide.style.transition = '1s linear';
    const DLdot = document.querySelector('.dots span.active');
    DLdot.classList.remove('active');
    dots[active].classList.add('active');
}


// section 3 play video

const play_button = document.querySelector('.play_button');
const nen_video = document.querySelector('.video_full');
const video = document.getElementById('myvideo');
play_button.onclick = () => {
    nen_video.style.display = 'grid';
    video.play();
}
nen_video.onclick = function (e) {
    if (e.target === this) {
        nen_video.style.display = 'none';
        video.pause();
    }
}

// section 5 countdown clock

const price = document.querySelectorAll('.price>p');
const dongdo = document.getElementById('dongho');
const thongbaotime = document.querySelector('.thongbao_hetgio');
let phut = 2;
let giay = 0;

const interval = setInterval(() => {
    if (giay === 0) {
        giay = 60;
        if (phut !== 0) {
            phut--;
        }
    }
    giay--;
    if (phut === 0 && giay === 0) {
        thongbaotime.innerHTML = 'TIME OUT';
        clearInterval(interval);
        saleoff();
    }
    dongdo.innerHTML = `${phut} : ${giay}`;
}, 1000);
function saleoff() {
    const giamgia = document.querySelectorAll('.giamgia');
    const price = document.querySelectorAll('.price>p');
    const demnguoc = document.querySelector('.demnguoc');
    const bell = document.querySelector('.bell');
    bell.classList.remove('bell1');
    giamgia.forEach((data) => {
        data.style.display = 'none';
    });
    price[0].innerHTML = 'Price: $1500';
    price[1].innerHTML = 'Price: $1300';
    price[2].innerHTML = 'Price: $1800';
    setTimeout(() => { demnguoc.style.display = 'none' }, 3000);
}


// section 7 slider 2
let active2 = 0;
const dots2 = document.querySelectorAll('.dot2');
const slide2 = document.querySelector('.slides2');
dots2.forEach((data, index) => {
    data.addEventListener('click', () => {
        dots2[active2].classList.remove('active2');
        active2 = index;
        dots2[active2].classList.add('active2');
        fslider2();
    });
});

function fslider2() {
    const position2 = (slide2.offsetWidth / dots2.length) * active2;
    slide2.style.transform = `translateX(-${position2}px)`;
}


// section 9 form lien he

const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const submit = document.getElementById('submit');
const textarea = document.getElementById('textarea');
const thongbao = document.querySelectorAll('.thongbao');
const inputs = document.querySelectorAll('.input');
let theodoi = [true, true, true, true, true];
const patternfname = /^[a-zA-Z]{2,7}$/;
const patternlname = /^[a-zA-Z ]{2,25}$/;
const patternphone = /^0[0-9]{9}$/;
const patternemail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

fname.addEventListener('input', () => {
    check(fname.value, patternfname, 0);
});
lname.addEventListener('input', () => {
    check(lname.value, patternlname, 1);
});
phone.addEventListener('change', () => {
    check(phone.value, patternphone, 2)
});
email.addEventListener('change', () => {
    check(email.value, patternemail, 3)
});

function check(value, pattern, index) {
    if (value === '') {
        thongbao[index].innerHTML = '';
        theodoi[index] = true;
    } else if (pattern.test(value)) {
        thongbao[index].style.color = 'blue';
        thongbao[index].innerHTML = 'You entered correctly';
        theodoi[index] = false;
    } else {
        thongbao[index].style.color = 'red';
        thongbao[index].innerHTML = 'You entered wrong!';
        theodoi[index] = true;
    }
}

textarea.addEventListener('change', () => {
    theodoi[4] = textarea.value === '' ? true : false;
});
submit.addEventListener('click', () => {
    let temp = true;
    theodoi.forEach((data, index) => {
        if (data === true) {
            temp = false;
            inputs[index].classList.add('error');
            setTimeout(() => { inputs[index].classList.remove('error') }, 1000);
        }
    });
    if (temp === true) {
        thongbao[4].style.color = 'blue';
        thongbao[4].innerHTML = 'Submitted Successfully';
        inputs.forEach(data => {
            data.value = '';
        });
        for (let i = 0; i < thongbao.length - 1; i++) {
            thongbao[i].innerHTML = '';
        }
        theodoi.forEach(function (data, index) { theodoi[index] = true });
    } else {
        thongbao[4].style.color = 'red';
        thongbao[4].innerHTML = 'Submitted Failed';
    }
    setTimeout(() => { thongbao[4].innerHTML = '' }, 2500);

});


// cuon trang 
const hearder = document.querySelector('header');
const li = document.querySelectorAll('.menu_ul li');

li.forEach(data => {
    data.addEventListener('click', () => {
        const test = data.getAttribute('value');
        const test1 = document.querySelector(test);
        test1.scrollIntoView({ behavior: 'smooth' });
    });
});
muiten.onclick = () => {
    hearder.scrollIntoView({ behavior: 'smooth' });
}




// hiệu ứng số tăng dần từ 0

document.addEventListener('scroll', temp);
function temp() {
    const s3 = document.querySelector('.section3');
    const tops3 = s3.getBoundingClientRect().top;
    const heightwin = window.innerHeight;
    if (tops3 + 500 < heightwin) {
       fs3();
       document.removeEventListener('scroll', temp);
    }
}
let arrays3 = [0, 0, 0, 0];
function fs3() {
    const ontop = document.querySelectorAll('.s3_div1_2_2>div>p:first-child');
    intev(0, 500, 10);
    intev(1, 250, 20);
    intev(2, 15, 300);
    intev(3, 10, 500);
    function intev(index, dieukien, time) {
        const interv1 = setInterval(() => {
            arrays3[index]++;
            if (arrays3[index] === dieukien) { clearInterval(interv1) }
            ontop[index].innerHTML = `${arrays3[index]}K+`;
        }, time);
    }
}

// dùng Geolocation

const li5 = document.querySelector('.menu_topbar>ul:first-child>li:nth-child(4)');
li5.onclick = function () {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const link = `https://www.google.com/maps/@${position.coords.latitude},${position.coords.longitude},14z?hl=vi-VN&entry=ttu`;
            window.open(link, "My Location", "width=1000px,height=500px");
        }, function (err) {
            console.log(err)
        }
    );
}

// dùng mouseover và mouseleave để ẩn hiện thanh tìm kiếm

const btn_timkiem = document.querySelector('.menu_topbar>ul:last-child>li:last-child');
btn_timkiem.addEventListener('mouseover', function () {
    const li = this;
    const div_timkiem = document.querySelector('.div_timkiem');
    div_timkiem.classList.add('div_timkiemover');
    document.addEventListener('click', removeelement);
    function removeelement(e) {
        const input = document.querySelector('.div_timkiem input');
        const img = document.querySelector('.menu_topbar>ul:last-child>li:last-child img');
        if (e.target == input || e.target == img || e.target == next) {
            return;
        } else {
            div_timkiem.classList.remove('div_timkiemover');
            document.removeEventListener('click', removeelement);
        }
    }
});

// test xóa trước khi bảo vệ

const img = document.querySelector('.menu_topbar>ul:last-child>li:last-child img');
img.addEventListener('click', () => {
    const input = document.querySelector('.div_timkiem input');
    const root = document.querySelector('header');
    root.style.background = input.value;
    console.log(input.value)
});



// giftvoucher

function giftbox() {
    const galerry = document.querySelector('.galerry');
    const close = document.querySelector('.close');
    const gift = document.createElement('div');
    const giftvoucher = document.querySelector('.giftvoucher');
    gift.classList.add('gift');
    gift.style.left = Math.random() * window.innerWidth + 'px';
    giftvoucher.appendChild(gift);
    gift.onclick = () => {
        clearInterval(interv2);
        galerry.style.display = 'grid';
        const voucher = document.querySelector('.voucher');
        setTimeout(() => { voucher.classList.toggle('voucher1'); }, 100)
        const dl = document.getElementById('dolla');
        dl.innerText = Math.floor(Math.random() * 900 + 100);
        close.onclick = () => {
            voucher.classList.toggle('voucher1');
            setTimeout(() => { galerry.style.display = 'none'; }, 1000);
            callinterval();
        }
        gift.remove();
    }
    setTimeout(() => { gift.remove() }, 20000);
}
let interv2;
function callinterval() {
    interv2 = setInterval(() => {
        giftbox()
    }, 15000)
}
callinterval();
// giftbox()

// longin form
let active3 = true;
const signin_up = document.querySelector('.text_login');

signin_up.onclick = () => {
    const title = signin_up.querySelector('.text_login>span');
    const contact = document.querySelector('.wrapper9>div:first-child');
    const login = document.querySelector('.login');
    const textinput = document.querySelector('.textinput');
    console.log(title)
    login.classList.toggle('login1');
    contact.classList.toggle('width523');
    contact.classList.toggle('setwidth0');
    textinput.classList.toggle('setwidth0');
    if (active3) {
        title.textContent = 'Contact';
        active3 = false;
    } else {
        title.textContent = 'Sign in / Sign up';
        active3 = true;
    }
}

const o1 = document.querySelector('.o1');
const o2 = document.querySelector('.o2');
const signup = document.querySelector('.text_signin');
const signin = document.querySelector('.text_signup');
const text_signin = document.querySelector('.text_signin');
const text_signup = document.querySelector('.text_signup');
const khung_signin = document.querySelector('.khung_signin');
const khung_signup = document.querySelector('.khung_signup');
const btn_in = document.querySelector('.text_signup>button');
const btn_up = document.querySelector('.text_signin>button')
btn_up.onclick = () => {
    o1.style.transform = 'translateX(100%)';
    o2.style.transform = 'translateX(-100%)';
    text_signin.classList.toggle('transformy');
    text_signup.classList.toggle('transformy');
    khung_signin.classList.toggle('transformy');
    khung_signup.classList.toggle('transformy');
}
btn_in.onclick = () => {
    o1.style.transform = 'translateX(0)';
    o2.style.transform = 'translateX(0)';
    text_signin.classList.toggle('transformy');
    text_signup.classList.toggle('transformy');
    khung_signin.classList.toggle('transformy');
    khung_signup.classList.toggle('transformy');
}



videoElement.addEventListener('click', function() {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  });