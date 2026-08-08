import { useState, useRef, useEffect } from "react";
import styles from "./PublisherDropdown.module.css";
import { useFetchPublishers } from "../../hooks/useFetchPublishers";

interface PublisherDropdownProps {
  value?: string | undefined;
  onChange?: (publisherId: string | undefined) => void;
}

const media = [
  {
    id: "9dc010ca-f245-4251-921a-64730bba110b",
    title: "VG",
    logo: "https://www.vg.no/vgc/cdn/vgno/assets/production/favicon.png",
  },
  {
    id: "a3706fa6-675e-473a-ba7d-d0cf6281e172",
    title: "Dagbladet",
    logo: "https://www.dagbladet.no/view-resources/public/dagbladet/assets/favicon/favicon-72.png",
  },
  {
    id: "509581fb-873f-4b37-840d-1eb148a4b374",
    title: "Aftenposten",
    logo: "https://www.aftenposten.no/cnp-assets/favicon-6c399f1f/apple-touch-icon-76x76.png",
  },
  {
    id: "6315479c-f4ad-4b7b-b2f0-08e948e80526",
    title: "Østlandets Blad",
    logo: "https://lh3.googleusercontent.com/_dG1INDueaFyd7FLQWKKvRcTYLkhtG4ReHBHvx10ut8jQU-a7j06hQAaQO6WXcDY7A=w300-rw",
  },
  {
    id: "bcd738c3-a9ec-45d2-a8ea-f4eb4448b0a8",
    title: "NRK",
    logo: "https://static.nrk.no/nrkno/serum/2.0.528/common/img/apple-touch-icon-72x72.png",
  },
];

export default function PublisherDropdownShort({
  value,
  onChange,
}: PublisherDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = media.find((p) => p.id === value) ?? null;

  const handleSelect = (id: string | undefined) => {
    onChange?.(id);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.triggerContent}>
          {selected ? (
            <>
              <span className={styles.logoSlotSelected}>
                <img src={selected.logo} alt="" className={styles.logo} />
              </span>

              <span>{selected.title}</span>
            </>
          ) : (
            <span>Alle utgivere</span>
          )}
        </span>


        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {/* "All publishers" option */}
          <li
            className={`${styles.option} ${!selected ? styles.optionSelected : ""}`}
            role="option"
            aria-selected={!selected}
            onClick={() => handleSelect("")}
          >
            <span className={styles.logoSlot}>
              <span className={styles.allIcon} />
            </span>
            <span className={styles.optionLabel}>Alle utgivere</span>
          </li>

          {media.map((pub) => (
            <li
              key={pub.id}
              className={`${styles.option} ${selected?.id === pub.id ? styles.optionSelected : ""}`}
              role="option"
              aria-selected={selected?.id === pub.id}
              onClick={() => handleSelect(pub.id)}
            >
              <span className={styles.logoSlot}>
                <img
                  src={pub.logo}
                  alt={pub.title}
                  className={styles.logo}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </span>
              <span className={styles.optionLabel}>{pub.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
