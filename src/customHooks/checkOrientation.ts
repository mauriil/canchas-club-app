import { useState, useEffect } from "react";

const useCheckOrientation = () => {
    const isLandscape = () => window.matchMedia('(orientation:landscape)').matches
    const [orientation, setOrientation] = useState(isLandscape() ? 'landscape' : 'portrait')
    const onWindowResize = () => {
        setOrientation(isLandscape() ? 'landscape' : 'portrait')
    }

    useEffect(() => {
        window.addEventListener("resize", onWindowResize);
        return () => {
          window.removeEventListener("resize", onWindowResize);
        };
      }, []);

    return orientation;
}



export default useCheckOrientation;


