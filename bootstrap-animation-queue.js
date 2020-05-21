$(document).ready(() => {
  const parentClass = "animation-queue-parent";
  const effectClass = "animation-queue-effect-";
  const childClass = "animation-queue-child-"

  function animateNextv02(element, animationIndex) {
    let elementsToAnimate;
    // init
    if (animationIndex === -1) {

      elementsToAnimate = $(`.${parentClass}`);

      // turn on anim for parents
      animateAndQueueNextChild(elementsToAnimate,animationIndex);
    }
    else {
      const nextChildClass = `${childClass}${animationIndex}`;

      if (animationIndex > 0) {
        // the the element is the previous child, not the parent
        elementsToAnimate = $(element).siblings(`.${nextChildClass}`);
      }
      else {
        // element is parent
        elementsToAnimate = $(element).children(`.${nextChildClass}`);
      }
    }
    animateAndQueueNextChild(elementsToAnimate,animationIndex);
  }

  function animateNextv02Callback(event, param) {
    animateNextv02(event.target, parseInt($(event.target).attr("data-animation-queue-step")) + 1);
  }

  function animateAndQueueNextChild(currentElements,animationIndex) {
    
      $.each(currentElements, (currentElementIndex, currentElement) => {
        let classArray = [];
        console.log(`nextElement[${currentElementIndex}]`,currentElement);
        currentElement.classList.forEach(className => classArray.push(className));

        $.each(classArray, (index, className) => {
          if (className.indexOf(effectClass) > -1) {
            animationClass = className.substring(effectClass.length, className.length);

            $(currentElement).addClass(animationClass);
            $(currentElement).attr("data-animation-queue-step", animationIndex);
          }
        });

        // queue next child
        $(currentElement).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', animateNextv02Callback);
      });
  }

  animateNextv02(null, -1);

});