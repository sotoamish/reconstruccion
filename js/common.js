//this code is from https://gist.github.com/mpetroff/4666657beeb85754611f */
//toggle menu without jquery
let collapseElements;
document.addEventListener("DOMContentLoaded", function() {

    //set collapse functions on all collapsible menu
    setTimeout(()=>{
        collapseElements = Array.prototype.slice.call(
            // document.getElementsByClassName("navbar")
            document.querySelectorAll('[data-toggle="collapse"]')
        );

        collapseElements.forEach((el) => {
            el.addEventListener('click', handleCollapseElementClick);
        });
    }, 500);

});

const CLASS_SHOW = 'show';
const CLASS_COLLAPSE = 'collapse';
const CLASS_COLLAPSING = 'collapsing';
const CLASS_COLLAPSED = 'collapsed';
const ANIMATION_TIME = 350; // 0.35s

function handleCollapseElementClick(e) {
    let el = e.currentTarget;
    let collapseTargetId = el.dataset.target || el.href || null;
    if (collapseTargetId) {
        let targetEl = document.querySelector(collapseTargetId);
        let isShown = targetEl.classList.contains(CLASS_SHOW) || targetEl.classList.contains(CLASS_COLLAPSING);
        if(!isShown) {
            targetEl.classList.remove(CLASS_COLLAPSE);
            targetEl.classList.add(CLASS_COLLAPSING);
            targetEl.style.height = 0;
            targetEl.classList.remove(CLASS_COLLAPSED);
            setTimeout(() => {
                targetEl.classList.remove(CLASS_COLLAPSING);
                targetEl.classList.add(CLASS_COLLAPSE, CLASS_SHOW);
                targetEl.style.height = '';
            }, ANIMATION_TIME);
            targetEl.style.height = `${targetEl.scrollHeight}px`;
        } else {
            targetEl.style.height = `${targetEl.getBoundingClientRect().height}px`;
            targetEl.offsetHeight; // force reflow
            targetEl.classList.add(CLASS_COLLAPSING);
            targetEl.classList.remove(CLASS_COLLAPSE, CLASS_SHOW);
            targetEl.style.height = '';
            setTimeout(() => {
                targetEl.classList.remove(CLASS_COLLAPSING);
                targetEl.classList.add(CLASS_COLLAPSE);
            }, ANIMATION_TIME);
        }
    }
}




