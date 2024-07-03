/**
 * 스크롤 기능을 막고, 스크롤 시 한 페이지씩 이동하는 스크립트.
 * @param {HTMLElement} page1, page2, page3 - 스크롤 시 이동하는 페이지
 * @param {number} totalPages - 총 페이지 수
 * @param {number} scrollNev - 스크롤 방향에 따라 페이지 이동 방향을 결정함.
 * @param {boolean} eventBlock - 스크롤 중복 입력을 방지하기 위한 상수.
 * @param {boolean} scrollLock - 스크롤 기능을 막는 상수.
 */
const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
const totalPages = 3;
let scrollNev = 0;  // 현재 페이지 인덱스를 나타내는 변수
let eventBlock = false;  // 페이지 2에서 이벤트 중복 실행을 방지하기 위한 플래그
let scrollLock = false;  // 스크롤 잠금을 위한 플래그

function handleWheel(event) {
    event.preventDefault(); // 스크롤 기본 동작을 막음

    if (scrollLock) return; // 스크롤이 잠겨 있으면 함수 종료

    if (event.deltaY > 0) {
        scrollNev++; // 스크롤 다운 시 페이지 인덱스 증가
        // console.log('scrollNev ++ ');
    } else {
        scrollNev--; // 스크롤 업 시 페이지 인덱스 감소
        // console.log('scrollNev -- ');
    }

    scrollNev = Math.max(0, Math.min(scrollNev, totalPages - 1)); // 페이지 인덱스를 0과 총 페이지 수 사이로 제한

    if (scrollNev === 0) {
        page1.scrollIntoView({
            behavior: 'smooth' // 페이지 1로 부드럽게 스크롤
        });
    } else if (scrollNev === 1) {
        page2.scrollIntoView({
            behavior: 'smooth' // 페이지 2로 부드럽게 스크롤
        });
        if (!eventBlock) { // 이벤트가 아직 실행되지 않았다면
            setTimeout(page2ScreenEvent, 750); // 750ms 후 page2ScreenEvent 함수 실행
            eventBlock = true; // 이벤트 실행 플래그 설정
        }
    } else {
        page3.scrollIntoView({
            behavior: 'smooth' // 페이지 3로 부드럽게 스크롤
        });
    }
    scrollLock = true; // 스크롤 잠금 설정
    setTimeout(() => {
        scrollLock = false; // 500ms 후 스크롤 잠금 해제
    }, 500);
}

function page2ScreenEvent() {
    // fullScreen(); // 전체 화면으로 전환하는 함수 호출
    fullScreen_2(); // 페이지 2의 최소화 관련 함수 호출
}

window.addEventListener('wheel', handleWheel, { passive: false }); // wheel 이벤트 리스너 추가, 기본 동작을 막기 위해 passive: false 옵션 설정

/**
 * `textArray`의 내용을 자기 자신에게 추가하여 배열의 크기를 두 배로 만듦.
 * `textArray`의 각 요소를 `element.innerText`에 추가.
 * 각 요소 뒤에 `\u00a0` (공백 문자)를 삽입.
 * 
 * @param {HTMLElement} pTag1, pTag2 - 애니메이션에 들어갈 텍스트를 입력하는 요소.
 * 
 * @param {HTMLElement} element - innerText가 업데이트될 HTML 요소.(pTag1, pTag2)
 * 
 * @param {string[]} textArray - 두 배로 늘리고 각 요소가 추가될 배열.
 */
const pTag1 = document.querySelector('.first-parallal');
const pTag2 = document.querySelector('.second-parallal');

const textArr1 = '반가워요! HELLO! こんにちは! console.log("Hello_world!") 찾아주셔셔_감사합니다! HELLO! こんにちは! console.log("Hello,world!")'.split(' ');
const textArr2 = '웹디자인 웹퍼블리싱 포트폴리오 WEB_DESIGN Publisher PORTFOLIO'.split(' ');

function initTexts(element, textArray) {
    textArray.push(...textArray)
    for (let i = 0; i < textArray.length; i++) {
        element.innerText += `${textArray[i]}\u00a0\u00a0\u00a0\u00a0`
    };
};

initTexts(pTag1, textArr1);
initTexts(pTag2, textArr2);

let count1 = 0
let count2 = 0
/**
 * 텍스트가 애니메이션으로 이동하는 기능.
 * 
 * @param {number} count - 텍스트가 얼마나 이동했는지를 나타내는 카운터, 
 *                         텍스트가 전체 컨텐츠(element.scrollWidth)의 절반(/ 2)을 넘어갈 경우. count를 0으로 초기화 함.
 * 
 * @param {HTMLElement} element - 애니메이션을 적용할 HTML 요소. 
 *                               element의 스타일 transform 속성을 사용해 텍스트를`count*direction`px만큼 이동시킴.
 * 
 * @param {number} direction - 이동 방향을 나타내는 정수. (1 또는 -1), 
 *                            1이면 오른쪽->왼쪽, -1이면 왼쪽->오른쪽으로 이동함.
 * 
 * @return {number} 업데이트된 count 값.
 */
function marqueeText(count, element, direction) {
    if (count > element.scrollWidth / 2) {
        element.style.transform = `translateX(0)`
        count = 0
    };
    element.style.transform = `translateX(${count * direction}px)`
    return count
};
/**
 * 텍스트 애니메이션을 수행하는 함수.
 * 
 * pTag1과 pTag2 요소의 텍스트를 각각 왼쪽(-1)과 오른쪽(1)으로 이동시킴.
 * `requestAnimationFrame`을 사용하여 애니메이션(animate())을 반복 호출.
 */
function animate() {
    count1++
    count2++

    count1 = marqueeText(count1, pTag1, -1);
    count2 = marqueeText(count2, pTag2, 1);

    window.requestAnimationFrame(animate);
};
animate()
/**
 * addEventListener('scroll')로 스크롤시 이벤트를 추가함.
 * 스크롤할 때마다 count1과 count2를 각각 15씩 증가시켜 텍스트 이동 속도를 높임.
 */
window.addEventListener('scroll', () => {
    count1 += 15
    count2 += 15
});


window.onload = function () {
    const items = document.querySelectorAll('.page1_main_text_container div p');
    let currentIdx = 0;

    function showText() {
        if (currentIdx > 0) {
            items[currentIdx - 1].classList.remove('show'); // 이전 텍스트 숨김처리.
        }

        if (currentIdx < items.length) {
            items[currentIdx].classList.add('show'); // 현재 텍스트 보이기.
            currentIdx++;
        } else {
            items[items.length - 1].classList.add('show');
            clearInterval(sliderInterval); // 모든 텍스트를 보여주면 인터벌 종료.
            items[currentIdx - 1].classList.add('animate-end');//마지막 텍스트 애니메이션을 위한 클래스추가 
        }
    }
    const sliderInterval = setInterval(showText, 750);
};
const info = document.querySelector('.introduction-container');
let clickOnOff = 1;
function infoBtn() {
    if (clickOnOff === 0) {
        clickOnOff = 1;
        info.style.animation = "offInfo 1s forwards normal";
    } else {
        clickOnOff = 0;
        info.style.animation = "onInfo 1.2s forwards normal";
    }
}

const actionClickIcon = document.querySelector('.content_1');

let minimizationAction = "on",
    fullScreenAction = "off";



function minimization() {
    if (minimizationAction === "on") { //최소화 실행
        minimizationAction = "off";

        if (fullScreenAction === "off") { //근데 풀스크린이 아닐경우
            actionClickIcon.style.animation = "action_minimization_off_1 1s forwards normal";

        } else if (fullScreenAction === "on") { //풀 스크린 일 경우
            fullScreenAction = "off";
            actionClickIcon.style.animation = "action_minimization_off_2 1s forwards normal";

        }

    } else {
        minimizationAction = "on";

        if (fullScreenAction === "off") {
            actionClickIcon.style.animation = "action_minimization_on_1 1.2s forwards normal";
        } else {
            fullScreenAction = "off"
            actionClickIcon.style.animation = "action_minimization_on_2 1.2s forwards normal";
        }

    }
};
function fullScreen() {
    if (fullScreenAction === "on") {

        fullScreenAction = "off";

        if (minimizationAction === "off") {
            minimizationAction = "off";
            actionClickIcon.style.animation = "action_fullScreen_off_1 1s forwards normal";
        } else {
            minimizationAction = "off";
            actionClickIcon.style.animation = "action_fullScreen_off_2 1s forwards normal";
        }

    } else {
        fullScreenAction = "on";
        if (minimizationAction === "off") {
            actionClickIcon.style.animation = "action_fullScreen_on_1 1.2s forwards normal";
        } else {
            minimizationAction = "off";
            actionClickIcon.style.animation = "action_fullScreen_on_2 1.2s forwards normal";
        }

    }
}
const actionClickIcon_2 = document.querySelector('.content_2');

let minimizationAction_2 = "on",
    fullScreenAction_2 = "off";

function minimization_2() {
    if (minimizationAction_2 === "on") { //최소화 실행
        minimizationAction_2 = "off";

        if (fullScreenAction === "off") { //근데 풀스크린이 아닐경우
            actionClickIcon_2.style.animation = "action_minimization2_off_1 1s forwards normal";

        } else if (fullScreenAction === "on") { //풀 스크린 일 경우
            fullScreenAction_2 = "off";
            actionClickIcon_2.style.animation = "action_minimization2_off_2 1s forwards normal";

        }

    } else {
        minimizationAction_2 = "on";

        if (fullScreenAction_2 === "off") {
            actionClickIcon_2.style.animation = "action_minimization2_on_1 1.2s forwards normal";
        } else {
            fullScreenAction_2 = "off"
            actionClickIcon_2.style.animation = "action_minimization2_on_2 1.2s forwards normal";
        }

    }
};
function fullScreen_2() {
    if (fullScreenAction_2 === "on") {

        fullScreenAction_2 = "off";

        if (minimizationAction_2 === "off") {
            minimizationAction_2 = "off";
            actionClickIcon_2.style.animation = "action_fullScreen2_off_1 1s forwards normal";
        } else {
            minimizationAction_2 = "off";
            actionClickIcon_2.style.animation = "action_fullScreen2_off_2 1s forwards normal";
        }

    } else {
        fullScreenAction_2 = "on";
        if (minimizationAction_2 === "off") {
            actionClickIcon_2.style.animation = "action_fullScreen2_on_1 1.2s forwards normal";
        } else {
            minimizationAction_2 = "off";
            actionClickIcon_2.style.animation = "action_fullScreen2_on_2 1.2s forwards normal";
        }

    }
}

let onOffFlag = 1;
const onOffView = document.querySelector(".content_2");

function on_file() {
    onOffFlag = 1;
    onOffTrigger();
}
function off_file() {
    onOffFlag = 0;
    onOffTrigger();
}
function onOffTrigger() {
    if (onOffFlag === 0) {
        onOffView.style.display = "none";
        minimization_2()
        document.getElementById("content_2_close").onclick = null;
        document.getElementById("content_2_open").onclick = on_file;
    } else {
        onOffView.style.display = "block";
        fullScreen_2()
        document.getElementById("content_2_close").onclick = off_file;
        document.getElementById("content_2_open").onclick = null;
    }
}

let onOffFlag_2 = 0;
let fullScreenControl = 0;
const onOffView_2 = document.querySelector(".content_1");
function on_file2() {
    onOffFlag_2 = 1;
    onOffTrigger_2();
}
function off_file2() {
    onOffFlag_2 = 0;
    onOffTrigger_2();
}
function onOffTrigger_2() {
    if (onOffFlag_2 === 0) {
        onOffView_2.style.display = "none";
    } else {
        if (fullScreenControl === 0) {
            onOffView_2.style.display = "block";
            fullScreen();
            fullScreenControl = 1;
        } else {
            onOffView_2.style.display = "block";
        }
    }
} onOffTrigger_2()

const portfolioClickEvent = [
    document.getElementById('show_portfolio_1'),
    document.getElementById('show_portfolio_2'),
    document.getElementById('show_portfolio_3'),
    document.getElementById('show_portfolio_4')
];

function clickEventControl() {

    portfolioClickEvent.forEach((portfolio, index) => {
        portfolio.onclick = function () {
            showPortfolio(index); // 클릭된 포트폴리오 버튼을 보여줌
            enableClickEvents(index); // 다른 포트폴리오 버튼의 클릭 이벤트 활성화
            portfolioLink(index);
        };
    });
}

function showPortfolio(activeIndex) {
    const viewPortfolio = [
        document.querySelectorAll('.portfolio_page1'),
        document.querySelectorAll('.portfolio_page2'),
        document.querySelectorAll('.portfolio_page3'),
        document.querySelectorAll('.portfolio_page4')
    ];

    viewPortfolio.forEach((page, pageIndex) => {
        page.forEach(pageItem => {
            pageItem.style.display = 'none';
        });
        if (pageIndex === activeIndex) {
            page.forEach(pageItem => {
                pageItem.style.display = 'block';
            });
        }
    });
}

function portfolioLink(linkActiveIndex) {
    const portfoliolinks = [
        document.querySelectorAll('.page1_link'),
        document.querySelectorAll('.page2_link'),
        document.querySelectorAll('.page3_link'),
        document.querySelectorAll('.page4_link')
    ];

    portfoliolinks.forEach((links, linkIndex) => {
        links.forEach(link => {
            link.style.display = 'none';
        });
        if (linkIndex === linkActiveIndex) {
            links.forEach(link => {
                link.style.display = 'flex';
                link.style.gap = '20px';
                link.style.justifyContent = 'center';
            });
        }
    });
}


function enableClickEvents(activeIndex) {
    portfolioClickEvent.forEach((portfolio, index) => {
        if (index !== activeIndex) {
            portfolio.onclick = function () {
                showPortfolio(index); // 다른 포트폴리오 버튼 클릭 시 해당 페이지를 보여줌
                enableClickEvents(index); // 다른 포트폴리오 버튼의 클릭 이벤트 활성화
                portfolioLink(index);
            };
        }
    });
}

// 초기 상태 설정
clickEventControl();
