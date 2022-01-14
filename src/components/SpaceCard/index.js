import React from "react";
import "./space-card.css";

function SpaceCard({ space, onSubscribe }) {
  return (
    <div className="card-container">
      <div className="card-top">
        <div className="schedule-time">
          {new Date(space.scheduled_start).toLocaleString()}
        </div>
        <div className="tag">#web3</div>
      </div>
      <div className="title">{space.title}</div>
      <div className="card-footer">
        <a
          href={`https://twitter.com/i/spaces/${space.id}/peek`}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <span>Peek Space</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="external-link-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </a>
        <div
          className={`subscribe-button ${space.is_subscribed && "subscribed"}`}
          onClick={(e) => onSubscribe(space)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="heart-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SpaceCard;
