import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Page from "./Page";
import story from "../data/story";

function Book() {
  const [currentPage, setCurrentPage] = useState(0);
  const [flag, setFlag] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const pageRef = useRef(null);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    const savedScroll = localStorage.getItem("scrollPosition");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
    if (savedScroll) {
      const scrollPositions = JSON.parse(savedScroll);
      if (pageRef.current && scrollPositions[savedPage]) {
        pageRef.current.scrollTop = scrollPositions[savedPage];
      }
    }
  }, []);

  const handleNext = () => {
    if (currentPage < story.length - 1) {
      setFlag(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setFlag(true);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleProgressChange = (chapterProgress) => {
    const overallProgress =
      ((currentPage + chapterProgress / 100) / story.length) * 100;
    setOverallProgress(overallProgress);
  };

  useEffect(() => {
    if (flag) {
      localStorage.setItem("currentPage", currentPage);
    }
  }, [currentPage]);

  return (
    <div className="book">
      <Header overallProgress={overallProgress} />
      <Page page={story[currentPage]} onProgressChange={handleProgressChange} />
      <nav>
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === story.length - 1}
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
}

export default Book;
