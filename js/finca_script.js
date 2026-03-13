
// header 스크롤시 상단에 고정
const header = document.querySelector("header");

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 80){
        header.classList.add("fixed");
    }else{
        header.classList.remove("fixed");
    }
});

//검색버튼
let searchButtons = document.querySelectorAll(".top_search > button");
let searchLine = document.querySelector('.top_search > .search_line');

searchButtons.forEach((btn)=>{
    btn.addEventListener('click', function(){ 
        this.classList.toggle('active');
        searchLine.classList.toggle('active');
    });

})


// 좋아요버튼
let likeBtns = document.querySelectorAll('.like_btn');
likeBtns.forEach((btn) => {
    btn.addEventListener('click', function(){
        this.classList.toggle('active');
    });
})




// topNav
const topNav = document.querySelector(".gnb_list");
const navLists = Array.from(topNav.children);

const navArea = document.querySelector(".top_nav");

const mediaQuery = window.matchMedia("(min-width:1025px)");


// PC hover 시 active 제거/추가
function removeActive(lists){
    lists.forEach((list)=>{
        list.classList.remove('active');

        const sub = list.querySelector('.gnb_sub-item');
        if(sub) sub.classList.remove('active');

        // PC 서브 메뉴 active 제거
        const subLinks = sub?.querySelectorAll('a');
        if(subLinks){
            subLinks.forEach(link => link.classList.remove('active'));
        }
    });
}


navLists.forEach((nav)=>{

    const navSub = nav.querySelector('.gnb_sub-item');
    if(!navSub) return;

    const subLinks = navSub.querySelectorAll('a');
    const navLink = nav.children[0];


    // 모바일: 링크 클릭 이동 막기
    navLink.addEventListener("click", function(e){
        if(!mediaQuery.matches){
            e.preventDefault();
        }
    });


    // 모바일: li 클릭으로 아코디언 열기/닫기
    nav.addEventListener('click', function(){

        if(mediaQuery.matches) return;

        const sub = nav.querySelector('.gnb_sub-item');

        // 다른 메뉴 닫기
        navLists.forEach(item=>{
            const s = item.querySelector('.gnb_sub-item');
            if(s && s !== sub){
                s.classList.remove("active");
            }
        });

        if(sub){
            sub.classList.toggle("active");
        }

    });


    // PC hover
    nav.addEventListener('mouseenter', function(){

        if(!mediaQuery.matches) return;

        removeActive(navLists);

        nav.classList.add('active');
        navSub.classList.add('active');

        // 서브 메뉴 첫번째 활성화
        subLinks.forEach((link, i)=>{
            if(i === 0){
                link.classList.add('active');
            }else{
                link.classList.remove('active');
            }
        });

    });


    nav.addEventListener('mouseleave', function(){

        if(!mediaQuery.matches) return;

        nav.classList.remove('active');
        navSub.classList.remove('active');

        subLinks.forEach(link=>{
            link.classList.remove('active');
        });

    });


    // PC 서브 메뉴 hover
    subLinks.forEach(link => {

        link.addEventListener('mouseenter', function(){

            if(!mediaQuery.matches) return;

            subLinks.forEach(l=>{
                l.classList.remove('active');
            });

            this.classList.add('active');

        });

    });

});


// 햄버거 메뉴 열기 / 닫기
document.querySelectorAll(".menu_open").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        navArea.classList.toggle("active");
    });
});


// 메뉴 밖 클릭 시 닫기
document.addEventListener("click",(e)=>{

    if(!navArea.contains(e.target) && !e.target.closest(".menu_open")){

        navArea.classList.remove("active");

        document.querySelectorAll(".gnb_sub-item").forEach(sub=>{
            sub.classList.remove("active");
        });

    }

});



//베스트
const bestCategory = document.querySelectorAll(".best_category a");

bestCategory.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        // active 처리
        bestCategory.forEach(el => el.classList.remove("active"));
        this.classList.add("active");

        // 슬라이드 이동
        const index = this.dataset.index;

        swiper_best.autoplay.stop();
        swiper_best.slideToLoop(index);

        setTimeout(()=>{
            swiper_best.autoplay.start();
        },3000);

    });

});




//하단카드
const images = [...document.querySelectorAll(".preference .image div")];
const container = document.querySelector(".preference .image");
const btn = document.querySelector(".recommend_btn a");

function showRandomItems(){

    // 배열 복사
    const shuffled = [...images].sort(()=> Math.random() - 0.5);

    // 3개 선택
    const selected = shuffled.slice(0,3);

    // 화면 초기화
    container.innerHTML = "";

    // 다시 넣기
    selected.forEach(item=>{
        container.appendChild(item);
    });
}

// 처음 로드
showRandomItems();

// 버튼 클릭 시 다시 랜덤
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    showRandomItems();
});




//모바일 하단 NAV
const mobileNav = document.querySelector(".mobile_nav");
let lastScroll = window.scrollY || 0;

function isMobile() {
    return window.innerWidth <= 1024;
}

window.addEventListener("scroll", () => {
    if(!isMobile()) return; // 모바일만 적용

    const currentScroll = window.scrollY;

    if(currentScroll > lastScroll) {
        // 스크롤 내림 → 바 숨김
        mobileNav.style.transform = "translateY(100%)";
        mobileNav.style.transition = "transform 0.3s ease";
    } else {
        // 스크롤 올림 → 바 보임
        mobileNav.style.transform = "translateY(0)";
        mobileNav.style.transition = "transform 0.3s ease";
    }

    lastScroll = currentScroll;
});