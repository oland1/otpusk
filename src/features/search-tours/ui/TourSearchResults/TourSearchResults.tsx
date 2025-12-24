import {TourCard} from "@/entities/tour";
import {useSearchTours} from "@/features/search-tours";
import './TourSearchResults.css';


export const TourSearchResults = () => {
  const {tours, isLoading, error, hasSearched} = useSearchTours();
  if (!hasSearched) return null;

  if (isLoading) {
    return (
      <div className="search-status search-status--loading">
        <div className="spinner"/>
        <h4>Шукаємо найкращі пропозиції...</h4>
      </div>
    );
  }

  if (error) {
    return <div className="search-status search-status--error">{error}</div>;
  }

  if (hasSearched && tours.length === 0) {
    return (
      <div className="search-status search-status--empty">
        <h4>За вашим запитом турів не знайдено.</h4>
      </div>
    );
  }

  return (
    <div className="tours-grid">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour}/>
      ))}
    </div>
  );
};