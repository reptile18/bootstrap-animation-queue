$(document).ready(() => {
  const parentClass = "animation-queue-parent";
  const effectClass = "animation-queue-effect-";
  const childClass = "animation-queue-child-"

  function animateNextv02(element, animationIndex) {
    let elementsToAnimate;
    let childElementsToAnimate;
    // init
    if (animationIndex === -1) {
      elementsToAnimate = $(`.${parentClass}`);
    }
    else {
      const nextChildClass = `${childClass}${animationIndex}`;

      if (animationIndex > 0) {
        // the the element is the previous child, not the parent
        elementsToAnimate = $(element).siblings(`.${nextChildClass}`);
        childElementsToAnimate = $(element).children(`.${childClass}0`);
        console.log(`${animationIndex} child elements: ${childClass}0`,childElementsToAnimate);
      }
      else {
        // element is parent
        elementsToAnimate = $(element).children(`.${nextChildClass}`);
      }
    }
    animateAndQueueNextChild(elementsToAnimate,animationIndex);
    if (childElementsToAnimate) animateAndQueueNextChild(childElementsToAnimate,0);
  }

  function animateNextv02Callback(event, param) {
    const step = parseInt($(event.target).attr("data-animation-queue-step")) + 1;
    $(event.target).removeAttr("data-animation-queue-step");
    animateNextv02(event.target, step);
  }

  function animateAndQueueNextChild(currentElements,animationIndex) {
      let found = false;
      $.each(currentElements, (currentElementIndex, currentElement) => {
        let classArray = [];
        console.log(`nextElement[${currentElementIndex}]`,currentElement);
        currentElement.classList.forEach(className => classArray.push(className));

        $.each(classArray, (index, className) => {
          if (className.indexOf(effectClass) > -1) {
            found = true;
            animationClass = className.substring(effectClass.length, className.length);
            $(currentElement).removeClass("invisible");
            $(currentElement).addClass(animationClass);
          }
        });

        // queue next child
        $(currentElement).attr("data-animation-queue-step", animationIndex);
        if (found) {
          $(currentElement).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', animateNextv02Callback);
        }
        else {
          // no animation on this element, start next immediately
          animateNextv02(currentElement,animationIndex+1);
        }
      });
  }

  animateNextv02(null, -1);

});