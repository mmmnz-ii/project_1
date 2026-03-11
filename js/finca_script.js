let searchButtons = document.querySelectorAll(".top_search > button");
let searchLine = document.querySelector('.top_search > .search_line');

searchButtons.forEach((btn)=>{
    btn.addEventListener('click', function(){ 
        this.classList.toggle('active');
        searchLine.classList.toggle('active');
    });

})






// topNav
let topNav = document.querySelector(".gnb_list");
let navLists = Array.from(topNav.children);

navLists.forEach((nav)=>{

    let navSub = nav.querySelector('.gnb_sub-item');
    if(!navSub) return;

    let subLists = navSub.querySelectorAll('a');
    let navLink = nav.querySelector(':scope > a'); // 부모 카테고리만 선택

    /* PC hover */
    if(window.innerWidth > 1024){

        nav.addEventListener('mouseenter',function(){

            removeActive(navLists);

            this.classList.add('active');
            navSub.classList.add('active');

        });

        nav.addEventListener('mouseleave',function(){

            this.classList.remove('active');
            navSub.classList.remove('active');

        });

    }

    /* 모바일 아코디언 */
    navLink.addEventListener('click',function(e){

        if(window.innerWidth <= 1024){

            e.preventDefault();

            if(navSub.classList.contains("active")){
                navSub.classList.remove("active");
                nav.classList.remove("active");
            }else{
                removeActive(navLists);
                nav.classList.add("active");
                navSub.classList.add("active");
            }

        }

    });

    /* PC 서브메뉴 hover */
    subLists.forEach((subList, index)=>{

        if(index === 0){
            subList.classList.add('active');
        }

        subList.addEventListener('mouseenter',function(){

            subLists.forEach(list=>{
                list.classList.remove('active');
            });

            this.classList.add('active');

        });

    });

});

function removeActive(lists){

    lists.forEach((list)=>{

        list.classList.remove('active');

        let sub = list.querySelector('.gnb_sub-item');

        if(sub){
            sub.classList.remove('active');
        }

    });

}

let likeBtns = document.querySelectorAll('.like_btn');
likeBtns.forEach((btn) => {
    btn.addEventListener('click', function(){
        this.classList.toggle('active');
    });
})





let bestCategory = document.querySelectorAll(".best .boxing a");
bestCategory.forEach((btn)=>{
    btn.addEventListener('click', function(e){ 
        e.preventDefault();

        bestCategory.forEach(el => el.classList.remove("active"));
        this.classList.add('active');
    });

});

document.querySelectorAll(".best_category a").forEach(link => {
    link.addEventListener("click", e => {

        e.preventDefault();

        const index = link.dataset.index;

        swiper_best.autoplay.stop();   // 잠깐 멈춤
        swiper_best.slideToLoop(index);

        setTimeout(()=>{
            swiper_best.autoplay.start();  // 다시 자동재생
        }, 3000);
    });
});



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

const menuBtn = document.querySelector(".menu_btn");
const nav = document.querySelector(".top_nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const menuItems = document.querySelectorAll(".gnb_list > li");

menuItems.forEach(item=>{
    item.addEventListener("click",()=>{
        const sub = item.querySelector(".gnb_sub-item");
        if(sub){
            sub.classList.toggle("active");
        }
    });
});