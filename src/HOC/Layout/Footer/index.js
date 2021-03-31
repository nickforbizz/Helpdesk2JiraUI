import React from "react";

export default function Footer(props) {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start mt-5 sticky-bottom">
        <div
          className="text-center p-3 shadow"
        >
          © 2020 Copyright:
          <a className="text-dark pl-5 text-muted" href="#">
              Kemri WellcomeTrust
          </a>
        </div>
      </footer>
    </div>
  );
}
