import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Bolim() {
  const { id } = useParams();

  const [teachers, setTeachers] = useState({});

  const fetchData = async () => {
    try {
      const bolimlarResponse = await axios.get(
        `/markazlar-bolimlar/bolim/${id}`
      );

      setTeachers(bolimlarResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(teachers, "teachers");
  return (
    <div>
      {/* {teachers.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() =>
              navigate(`/centers-and-departments/bolim/${item.id}`)
            }
          >
            {item?.[`title_${lang}`]}
          </button>
        );
      })} */}
    </div>
  );
}

export default Bolim;
