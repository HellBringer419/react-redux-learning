const Main = (props) => {
    return (
        <section className="body">
            <h4 className="heading"> Your Image Carousel </h4>

            <div className="carousel-wrapper">
                <div className="carousel">
                    <span className="carousel-btn-prev" onClick={() => {}}>
                        <img
                            src="https://s2.svgbox.net/hero-solid.svg?ic=chevron-double-left&color=16a085"
                            width="32"
                            height="32"
                            alt="Previous Button"
                        />
                    </span>

                    <img
                        src="https://images.unsplash.com/photo-1571768723915-99a5427b13c3?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="image carousel-image initial"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1602774033599-1a1fe9af740d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="image carousel-image"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1608721587536-d266bea4cf9d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="image carousel-image"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1594100165806-939c3fbb5b6a?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fEd0ckJTY3YxYjVNfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="image carousel-image"
                    />

                    <span className="carousel-btn-next" onClick={() => {}}>
                        <img
                            src="https://s2.svgbox.net/hero-solid.svg?ic=chevron-double-right&color=16a085"
                            width="32"
                            height="32"
                            alt="Next Button"
                        />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Main;
