import React, { useEffect, useState } from "react";
import styles from "./wheater.module.css";

export const Wheater = React.memo(() => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://weather-api138.p.rapidapi.com/weather?city_name=Tashkent`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "083310e32dmsh44fc2c0f9936546p1d7799jsnb3e6524c3288",
      "x-rapidapi-host": "weather-api138.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(
            `API xatosi: ${response.status} - ${response.statusText}`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetching();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;

  return (
    <div className={styles.div}>
      {data?.weather?.[0]?.icon ? (
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt="ob-havo"
        />
      ) : (
        <p>Ob-havo ma'lumotlari mavjud emas</p>
      )}

      {data?.main?.temp ? (
        <span>{Math.ceil(data.main.temp - 273.15)} °C</span>
      ) : (
        <span>Ma'lumot mavjud emas</span>
      )}

      <p>Tashkent</p>
    </div>
  );
});

Wheater.displayName = "wheater";
