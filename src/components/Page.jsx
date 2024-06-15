import React, { useEffect, useRef, useState } from "react";

function Page({ page, onProgressChange }) {
  const pageRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const formatContent = (content) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleScroll = () => {
    if (pageRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = pageRef.current;
      const currentScrollProgress =
        (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(currentScrollProgress);
      onProgressChange(currentScrollProgress);

      // Guardar la posición de desplazamiento en localStorage
      const savedScrollPositions =
        JSON.parse(localStorage.getItem("scrollPositions")) || {};
      savedScrollPositions[page.title] = scrollTop;
      localStorage.setItem(
        "scrollPositions",
        JSON.stringify(savedScrollPositions)
      );
    }
  };

  useEffect(() => {
    // Reset scroll position when the page changes
    if (pageRef.current) {
      const savedScrollPositions =
        JSON.parse(localStorage.getItem("scrollPositions")) || {};
      const savedScroll = savedScrollPositions[page.title] || 0;
      pageRef.current.scrollTop = savedScroll;
    }
  }, [page]);

  return (
    <div
      ref={pageRef}
      className="page"
      style={{ height: "500px", overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <h2>{page.title}</h2>
      <p>{formatContent(page.content)}</p>
    </div>
  );
}

export default Page;
