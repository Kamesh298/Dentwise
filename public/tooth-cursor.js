// Custom Tooth Cursor

if (typeof window !== "undefined") {
  function initToothCursor() {
    // Create custom cursor element with tooth image
    const cursorElement = document.createElement("div");
    cursorElement.id = "tooth-cursor";
    cursorElement.style.cssText = `
      position: fixed;
      width: 45px;
      height: 45px;
      pointer-events: none;
      z-index: 999999;
      display: block;
      background-image: url('/tooth.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;

      left: 0;
      top: 0;
    `;
    document.body.appendChild(cursorElement);

    // Track mouse movement  
    const handleMouseMove = (e) => {
      cursorElement.style.left = (e.clientX - 22.5) + "px";
      cursorElement.style.top = (e.clientY - 22.5) + "px";
    };

    document.addEventListener("mousemove", handleMouseMove);
    console.log("Tooth cursor initialized with tooth.png");
  }

  // Initialize right away
  initToothCursor();
}







