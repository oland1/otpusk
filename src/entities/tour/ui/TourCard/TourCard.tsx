import './TourCard.css';
import type {FullTourData} from "@/entities/tour";

export const TourCard = ({tour}: { tour: FullTourData }) => {
  return (
    <article className="tour-card">
      <div className="tour-card__image-container">
        <img src={tour.hotelImage} alt={tour.hotelName} className="tour-card__image"/>
      </div>

      <div className="tour-card__body">
        <h3 className="tour-card__name">{tour.hotelName}</h3>

        {/*А тут немає прапору країни в даних, тому я пропустила цей пункт*/}
        <div className="tour-card__location">📍{tour.hotelRegion}</div>

        <div className="tour-card__details">
          <div className="tour-card__label">Дата туру</div>
          {/*Отут я не зрозуміла чи формат дати має бути іншим, тому просто вивела як є*/}
          <div className="tour-card__date">{tour.dateStart} - {tour.dateEnd}</div>
        </div>

        <div className="tour-card__footer">
          <div className="tour-card__price-wrapper">
            <span className="tour-card__price-value">
              {tour.amount}
            </span>
            <span className="tour-card__price-currency">{tour.currency}</span>
          </div>
          <div className="tour-card__book-details">Більше деталей</div>
        </div>
      </div>
    </article>
  );
};