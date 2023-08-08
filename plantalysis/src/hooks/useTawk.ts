import { useEffect } from 'react';

const useTawk = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/64d27ea294cf5d49dc693993/1h7b3taef";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useTawk;
