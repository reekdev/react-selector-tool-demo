import React, { useEffect, useRef } from "react";

interface HighlighterProps {
  active: boolean;
}

const Highlighter: React.FC<HighlighterProps> = ({ active }) => {
  const hoveredElementRef = useRef<HTMLElement | null>(null);
  const hoveredBoxRef = useRef<HTMLDivElement | null>(null);

  const selectedElementRef = useRef<HTMLElement | null>(null);
  const selectedBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active) return;

    document.documentElement.style.cursor = "pointer";

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.localName !== "html") {
        hoveredElementRef.current = target;
      }
      updateHighlightBox();
    };

    const handleMouseOut = () => {
      hoveredElementRef.current = null;
      updateHighlightBox();
    };

    const updateHighlightBox = () => {
      if (hoveredBoxRef.current && hoveredElementRef.current) {
        const rect = hoveredElementRef.current.getBoundingClientRect();

        console.log({ rect });

        hoveredBoxRef.current.style.top = `${rect.top + window.scrollY}px`;
        hoveredBoxRef.current.style.left = `${rect.left + window.scrollX}px`;
        hoveredBoxRef.current.style.width = `${rect.width}px`;
        hoveredBoxRef.current.style.height = `${rect.height}px`;
        hoveredBoxRef.current.style.display = "block";
        // highlightBoxRef.current.style.backgroundColor =
        //   "rgba(106, 106, 106, 0.1)";

        console.log({ highlightBoxRef: hoveredBoxRef });
      } else if (hoveredBoxRef.current) {
        hoveredBoxRef.current.style.display = "none";
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      console.log(target);
      if (target.localName !== "html") {
        selectedElementRef.current = target;
      }

      if (selectedElementRef.current && selectedBoxRef.current) {
        const rect = selectedElementRef.current.getBoundingClientRect();
        selectedBoxRef.current.style.top = `${rect.top + window.scrollY}px`;
        selectedBoxRef.current.style.left = `${rect.left + window.scrollX}px`;
        selectedBoxRef.current.style.width = `${rect.width}px`;
        selectedBoxRef.current.style.height = `${rect.height}px`;
        selectedBoxRef.current.style.display = "block";
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    document.addEventListener("click", handleClick);

    return () => {
      document.documentElement.style.cursor = "auto";
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
      if (hoveredBoxRef.current) hoveredBoxRef.current.style.display = "none";
    };
  }, [active]);

  return (
    <>
      <div
        ref={hoveredBoxRef}
        style={{
          position: "absolute",
          border: "0.1rem dashed #aaa",
          pointerEvents: "none",
          zIndex: 999,
          display: "none",
        }}
      />

      <div
        ref={selectedBoxRef}
        style={{
          position: "absolute",
          border: "0.1rem solid #aaa",
          backgroundColor: "rgba(48, 48, 48, 0.1)",
          pointerEvents: "none",
          zIndex: 999,
          display: "none",
        }}
      />
    </>
  );
};
export default Highlighter;
