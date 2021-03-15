const items = document.getElementsByClassName("carousel-image");
const totalItems = items.length;

let slide = 0;
let moving = true;

const setInitialClasses = () => {
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
};

const disableInteraction = () => {
    // Set 'moving' to true for the same duration as our transition.
    // (0.5s = 500ms)
    moving = true;

    // setTimeout runs its function once after the given time
    setTimeout(() => (moving = false), 500);
};

// elephant in the room
const moveCarouselTo = (slideNumber) => {
    if (!moving) {
        disableInteraction();

        let newPrev = slideNumber - 1;
        let newNext = slideNumber + 1;
        let oldPrev = slideNumber - 2;
        let oldNext = slideNumber + 2;

        if ((totalItems) > 3) {
            // Checks and updates if the new slides are out of bounds
            if (newPrev <= 0) {
                oldPrev = totalItems - 1;
            } else if (newNext >= totalItems - 1) {
                oldNext = 0;
            }

            // Checks and updates if slide is at the beginning/end
            if (slideNumber === 0) {
                newPrev = totalItems - 1;
                oldPrev = totalItems - 2;
                oldNext = slideNumber + 1;
            } else if (slideNumber === totalItems - 1) {
                newPrevious = slideNumber - 1;
                newNext = 0;
                oldNext = 1;
            }
            
            // Now we've worked out where we are and where we're going,
            // by adding/removing classes we'll trigger the transitions.      // Reset old next/prev elements to default classes
            items[oldPrev].className = "carousel-image";
            items[oldNext].className = "carousel-image"; // Add new classes
            items[newPrev].className = "carousel-image" + " prev";
            items[slideNumber].className = "carousel-image" + " active";
            items[newNext].className = "carousel-image" + " next";
        }
    }
};

const movePrev = () => {
    if (!moving) {
        // If it's the last slide, reset to 0, else +1
        if (slide === totalItems - 1) {
            slide = 0;
        } else {
            slide++;
        }

        // Move carousel to updated slide
        moveCarouselTo(slide);
    }
};

const moveNext = () => {
    if (!moving) {
        // If it's the first slide, set as the last slide, else -1
        if (slide === 0) {
            slide = totalItems - 1;
        } else {
            slide--;
        }

        // Move carousel to updated slide
        moveCarouselTo(slide);
    }
};

const initCarousel = () => {
    setInitialClasses();
    moving = false;
};

initCarousel();
