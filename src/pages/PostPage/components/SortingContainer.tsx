import styles from "./SortingContainer.module.css";

import { ARTICLE_TYPES, type ArticleType } from "../../../types/post.types";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import PublisherDropdownShort from "../../../components/PublisherDropdown/PubliserDropdownShort";
//import SearchBar from "./SearchBar";

//This component was generated using claude.ai

interface SortingContainerProps {
  filterType: ArticleType | undefined;
  setFilterType: (type: ArticleType | undefined) => void;
  filterPublisher: string | undefined;
  setFilterPublisher: (publisher: string | undefined) => void;
  sort: "newest" | "oldest";
  setSort: (sort: "newest" | "oldest") => void;
}

// for search later:
//search: string;
//  setSearch: (type: string) => void;

function SortingContainer({
  setFilterType,
  filterPublisher,
  setFilterPublisher,
  sort,
  setSort,
}: SortingContainerProps) {
  const toggleSort = () => setSort(sort === "newest" ? "oldest" : "newest");

  return (
    <section className={styles.sorting_section}>

      {/*
      <article>
        <SearchBar value={search} onChange={setSearch} />
      </article>*/}

      <article
        className={styles.filterBar}
        role="group"
        aria-label="Filtrer aktiviteter"
      >

        {/* Type filter */}
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            onChange={(e) =>
              setFilterType(
                e.target.value === ""
                  ? undefined
                  : (e.target.value as ArticleType),
              )
            }
            aria-label="Filtrer etter type"
          >
            <option value="">Alle typer</option>
            {ARTICLE_TYPES.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
          <span className={styles.chevron}>
            <ChevronDown />
          </span>
        </div>

        {/* Publisher filter */}
        <PublisherDropdownShort
          value={filterPublisher}
          onChange={setFilterPublisher}
        />

        {/* Sort toggle */}
        <button
          type="button"
          className={styles.sortButton}
          onClick={toggleSort}
          aria-label={
            sort === "newest"
              ? "Sorterer: Nyeste først"
              : "Sorterer: Eldste først"
          }
        >
          <span className={styles.sortIcon}>
            {sort === "newest" ? <ArrowUp /> : <ArrowDown />}
          </span>
          <span className={styles.sortLabel}>
            {sort === "newest" ? "Nyeste" : "Eldste"}
          </span>
        </button>
      </article>
    </section>
  );
}
export default SortingContainer;
