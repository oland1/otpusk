import {SearchToursField, SearchToursProvider, TourSearchResults, useSearchTours} from "@/features/search-tours";
import {Button} from "@/shared/ui";
import "./SearchTours.css"
import * as React from "react";

const FormContent = () => {
  const {executeSearch, isLoading, selectedItem} = useSearchTours();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  return (
    <div className="search-page">
      <div className="container">
        <h4 className="search-page__title">Пошук турів</h4>

        <form className="search-form" onSubmit={onSubmit}>
          <SearchToursField/>
          <Button
            label={isLoading ? "Шукаємо..." : "Знайти"}
            type="submit"
            size="md"
            variant="primary"
            className="search-form__submit"
            disabled={isLoading || !selectedItem} // selectedItem - я не знаю точно чи можна робити пошук без вибраного елемента ??
          />
        </form>

        <TourSearchResults/>
      </div>
    </div>
  );
};

export const SearchTours = () => (
  <SearchToursProvider>
    <FormContent/>
  </SearchToursProvider>
);