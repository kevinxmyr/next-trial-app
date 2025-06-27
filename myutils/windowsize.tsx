import React, { useEffect, useState } from 'react'


function useWindowSize() {
  const [windowSize, setWindowSize] = useState(0);

    useEffect(() => {
     if(typeof window !== 'undefined'){
        function handleResize(){
           setWindowSize(window.innerWidth);
        }
        handleResize()
        addEventListener("resize", handleResize);
        return () => removeEventListener("resize", handleResize);
     }
    }, [windowSize]);

    return windowSize;
}

export default useWindowSize