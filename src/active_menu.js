//구현계획

//1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
//2. IntersectionObserver를 사용해서 모든 섹션들을 관찰해야한다.
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
// 보여지는 섹션 : 
//- 다수의 섹션이 동시에 보여진다면, 가장 첫번째 섹션을 선택
//- 마지막 contact 섹션이 보여진다면, 그러면 가장 마지막 섹션을 선택.

//섹션 id를 가진 iteme들을 배열로 만듦.
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];

//sectionIds 배열을 가지고 section요소를 가지고 옴.
//sectionIds 배열을 mapping 해주고 
//각각 문자열 id를 이용해서 querySelector()반환해줌. 
const sections = sectionIds.map(id => document.querySelector(id));

//menu item들을 가져오기 a태그 href인 요소.
const navItems = sectionIds.map(id => document.querySelector(`[href="${id}"]`));

//현재 섹션들이 보여지고 있는지 아닌지 간직할 수 있는 배열을 만들기
//기본적으로 보여지고 있지않는 것으로 false를 줌.
const visibleSections = sectionIds.map(() => false);

const options = {};
const observer = new IntersectionObserver(observerCallback, options);
sections.forEach(section => observer.observe(section));

function observerCallback(entries) {
  let selectLastOne; //flag변수 : true인지 아닌지 
  entries.forEach(entry =>{
    //아이디배열에서 현재 진입한 entry에 관련된 index
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    selectLastOne=    //마지막 contact를 selected 해야할지말지 끝까지 내려갔을때 선택
      index === sectionIds.length - 1 && 
      entry.isIntersectiong && 
      entry.intersectionRatio >= 0.99;
    });
    console.log(visibleSections);
    console.log(selectLastOne);

    const navIndex = selectLastOne 
      ? sectionIds.length -1
      : findFirstIntersecting(visibleSections);
    console.log(sectionIds[navIndex]);
}

function findFirstIntersecting(intersections){
  const index = intersections.indexOf(true);
  return index >= 0 ? index : 0;
}

