import React from "react";

export type BookInfo = {
  id: string;
  volumeInfo: VolumeInfo;
};

type VolumeInfo = {
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail: string;
  };
  infoLink: string;
};

const Book: React.FC<BookInfo> = React.memo(({ volumeInfo }) => {
  const { title, authors, imageLinks, infoLink } = volumeInfo;
  return (
    <React.Fragment>
      <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 d-flex align-items-stretch">
        <div className="card w-100 h-70 mb-3">
          <a href={infoLink} target="_blank" rel="noopener noreferrer">
            {imageLinks?.thumbnail ? (
              <img className="card-img-top" src={imageLinks.thumbnail} alt={title} />
            ) : (
              <svg
                className="bd-placeholder-img card-img-top"
                width="100%"
                height="170"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
                aria-label="Placeholder: Image cap"
              >
                <title>Placeholder</title>
                <rect fill="#868e96" width="100%" height="100%" />
                <text fill="#dee2e6" dy=".3em" x="50%" y="50%" textAnchor="middle">
                  Not Found
                </text>
              </svg>
            )}
          </a>
          <div className="card-body d-flex flex-column">
            <h4 className="card-title mt-auto w-100">
              <a href={infoLink} className="link-secondary" target="_blank" rel="noopener noreferrer">
                {title.length > 20 ? title.slice(0, 20) + "..." : title}
              </a>
            </h4>
            <p className="card-text ">{authors && authors[0]}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Book;
