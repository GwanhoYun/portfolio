const pTag1 = document.querySelector('.first-parallal')
const pTag2 = document.querySelector('.second-parallal')

const textArr1 = '안녕하세요! HELLO! こんにちは! console.log("Hello,world!")'.split(' ')
const textArr2 = '웹디자인 프론트엔드 포트폴리오 WEB_DESIGN FRONT_END PORTFOLIO'.split(' ')
// 공백('')을 split 처리하면 띄어쓰기 기준으로 텍스트가 배열에 추가됨.
// 예시) const textArr1='qwer qwer qwer'의 배열은['qwer', 'qwer', 'qwer'].

function initTexts(element, textArray){
    textArray.push(...textArray)//push로 textArray뒤에 textArray를 병합, 배열이 두배가 됨
    for (let i = 0; i < textArray.length; i++){
        element.innerText += `${textArray[i]}\u00a0\u00a0\u00a0\u00a0`
//innerText에 textArray의 요소를 추가함.
//각 요소 뒤에 `\u00a0`을 삽입해 공백을 추가함.
    }
}
initTexts(pTag1,textArr1)
initTexts(pTag2,textArr2)

let count1 = 0
let count2 = 0

// count- 텍스트가 얼마나 이동했는지를 나타내는 카운터
// element - 애니메이션을 적용할 HTML 요소
// direction - 이동 방향을 정함. 

function marqueeText(count, element, direction){
    if (count > element.scrollWidth / 2){
        element.style.transform = `translateX(0)`
        count = 0
    }

// element.scrollWidth = 주어진 요소의 전체 컨탠츠 넓이 
// 즉 텍스트가 전체 컨텐츠의 절반을 넘어갈 경우.
// count를 0으로 초기화

    element.style.transform = `translateX(${count*direction}px)`
    return count

// element의 스타일 transform 속성을 사용해 텍스트를`count*direction`px만큼 이동시킴.
// `direction`가 1이면 오른쪽->왼쪽. -1이면 왼쪽->오른쪽 으로 이동함.

}

function animate(){
    count1++ //count1을 1 증가시킴으로써 pTag1의 텍스트가 왼쪽으로 이동 
    count2++ //마찬가지

    count1 = marqueeText(count1, pTag1, -1)
    count2 = marqueeText(count2, pTag2, 1)

    window.requestAnimationFrame(animate)
    //animate함수를 requestAnimationFrame로 반복 호출
}
animate()

// 스크롤 시 텍스트 속도
window.addEventListener('scroll', () => {
    count1 += 15
    count2 += 15
})

// ----------------------------------------------------------------

document.querySelectorAll('button[data-target]').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).scrollIntoView({
            behavior:'smooth'
        });
    });
});

//-----------------------------------------------------------------
window.onload = function() {
    const container = document.querySelector('.page1_main_text_container');
    const items = document.querySelectorAll('.page1_main_text_container div');
    const animationContainer = document.querySelector('.page1_animation_container p');
    const itemWidth = items[0].offsetWidth;
    let currentIdx = 0;

    function slideText() {
        currentIdx++;
        if (currentIdx < items.length) {
            container.style.transform = `translateX(-${currentIdx * itemWidth}px)`;
        } else {
            clearInterval(sliderInterval);
            items[currentIdx-1].classList.add('animate-end');
            animationContainer.classList.add('animate-add-text')
        }
    }
    const sliderInterval = setInterval(slideText, 750);
}


