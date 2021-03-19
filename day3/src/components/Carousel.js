import { useState } from "react";
import Arrow from "./Arrow";
import ImageSlide from "./ImageSlide";
import '../stylesheets/style.css';

const imgUrls = [
    "https://images.unsplash.com/photo-1571768723915-99a5427b13c3?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1602774033599-1a1fe9af740d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1608721587536-d266bea4cf9d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1594100165806-939c3fbb5b6a?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fEd0ckJTY3YxYjVNfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
];

const Carousel = () => {
    const [imgIndex, setImgIndex] = useState(0);

    const previousSlide = () => {
        const lastIndex = imgUrls.length - 1;
        const index = imgIndex === 0 ? lastIndex : imgIndex - 1;
        setImgIndex(index);
    };

    const nextSlide = () => {
        const lastIndex = imgUrls.length - 1;
        const index = imgIndex === lastIndex ? 0 : imgIndex + 1;
        setImgIndex(index);
    };

    return (
        <div className="carousel">
            <Arrow
                direction="prev"
                clickFunction={previousSlide}
                glyph="https://s2.svgbox.net/hero-solid.svg?ic=chevron-double-left&color=16a085"
            />

            <ImageSlide url={imgUrls[imgIndex]} />

            <Arrow
                direction="next"
                clickFunction={nextSlide}
                glyph="https://s2.svgbox.net/hero-solid.svg?ic=chevron-double-right&color=16a085"
            />
        </div>
    );
};

export default Carousel;
