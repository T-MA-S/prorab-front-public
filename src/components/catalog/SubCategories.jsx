import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../styles/sliders.sass";
import Sorter from "./Sorter";
import "./catalog.sass";

const settings = {
    infinite: false,
    slidesToShow: 3,
    rows: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1.4,
                slidesToScroll: 1,
                rows: 1,
                arrows: false,
            },
        },
    ],
};

const SubCategories = (props) => {
    const { selectedBubles, onBublesChange, subCategories } = props;

    const handleCatalogClick = (item) => {
        if (selectedBubles.includes(item)) {
            onBublesChange(selectedBubles.filter(({ id }) => id !== item.id));
        } else {
            onBublesChange([...selectedBubles, item]);
        }
    };
    return (
        <div className="page_nav">
            <div className="container">
                {subCategories.length > 0 && (
                    <Slider {...settings}>
                        {subCategories.map((item) => (
                            <li key={item.id}>
                                <div
                                    className={`categorySub link ${selectedBubles.includes(item) ? "active" : ""}`}
                                    onClick={() => handleCatalogClick(item)}>
                                    {item.title}
                                </div>
                            </li>
                        ))}
                    </Slider>
                )}
                <div className="container">
                    <div className="mobile_box">
                        <button className="open_filter" onClick={props.onClick}>
                            <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.26919 0C2.68341 0 3.01919 0.335786 3.01919 0.75V1.99947C3.85789 2.12896 4.5 2.85394 4.5 3.72889V6.22889C4.5 7.10385 3.85789 7.82883 3.01919 7.95832V15.2535C3.01919 15.6677 2.68341 16.0035 2.26919 16.0035C1.85498 16.0035 1.51919 15.6677 1.51919 15.2535V7.96381C0.661783 7.85084 0 7.11715 0 6.22889V3.72889C0 2.84064 0.661783 2.10695 1.51919 1.99398V0.75C1.51919 0.335786 1.85498 0 2.26919 0ZM13.7692 0C14.1834 0 14.5192 0.335786 14.5192 0.75V1.99947C15.3579 2.12896 16 2.85394 16 3.72889V6.22889C16 7.10385 15.3579 7.82883 14.5192 7.95832V15.2535C14.5192 15.6677 14.1834 16.0035 13.7692 16.0035C13.355 16.0035 13.0192 15.6677 13.0192 15.2535V7.96381C12.1618 7.85084 11.5 7.11715 11.5 6.22889V3.72889C11.5 2.84064 12.1618 2.10695 13.0192 1.99398V0.75C13.0192 0.335786 13.355 0 13.7692 0ZM7.97121 1.19209e-07C8.38542 5.96046e-08 8.72121 0.335786 8.72121 0.75L8.72121 8.03969C9.57862 8.15265 10.2404 8.88634 10.2404 9.7746L10.2404 12.2746C10.2404 13.1629 9.57862 13.8965 8.72121 14.0095V15.2535C8.72121 15.6677 8.38542 16.0035 7.97121 16.0035C7.557 16.0035 7.22121 15.6677 7.22121 15.2535V14.004C6.38251 13.8745 5.7404 13.1496 5.7404 12.2746V9.7746C5.7404 8.89964 6.38251 8.17466 7.22121 8.04518L7.22121 0.75C7.22121 0.335787 7.557 1.78814e-07 7.97121 1.19209e-07ZM1.75 3.47889C1.61193 3.47889 1.5 3.59082 1.5 3.72889V6.22889C1.5 6.36697 1.61193 6.47889 1.75 6.47889H2.75C2.88807 6.47889 3 6.36697 3 6.22889V3.72889C3 3.59082 2.88807 3.47889 2.75 3.47889H1.75ZM13.25 3.47889C13.1119 3.47889 13 3.59082 13 3.72889V6.22889C13 6.36697 13.1119 6.47889 13.25 6.47889H14.25C14.3881 6.47889 14.5 6.36697 14.5 6.22889V3.72889C14.5 3.59082 14.3881 3.47889 14.25 3.47889H13.25ZM7.4904 9.5246C7.35233 9.5246 7.2404 9.63653 7.2404 9.7746V12.2746C7.2404 12.4127 7.35233 12.5246 7.4904 12.5246H8.4904C8.62847 12.5246 8.7404 12.4127 8.7404 12.2746L8.7404 9.7746C8.7404 9.63653 8.62848 9.5246 8.4904 9.5246H7.4904Z"
                                    fill="#546EDB"
                                />
                            </svg>
                        </button>

                        <Sorter className={"links"} selected={props.sortType} setSelected={props.onSortChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCategories;
