import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";

// Veri öğesi tipini belirledim
interface IDataItem {
  id: number;
  title: string;
  image: string;
  protein: number;
  calories: number;
  fat: number;
  carbs: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([]);
  const [count, setCount] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByNutrients', {
          params: {
            apiKey: 'b410ee97731e44c7bac444445a553f44',
            minCarbs: 10,
            maxCarbs: 50,
          },
        });

        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('API response does not contain an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // data state'i güncellendiğinde çalışacak
    setCount(data.map(() => 0));
  }, [data]);

  const handleIncrement = (index: number) => {
    // Belirli bir öğenin sayaç değerini artır
    const newCount = [...count];
    newCount[index] += 1;
    setCount(newCount);
  };

  const handleDecrement = (index: number) => {
    // Belirli bir öğenin sayaç değerini azalt
    const newCount = [...count];
    if (newCount[index] > 0) {
      newCount[index] -= 1;
      setCount(newCount);
    }
  };

  return (
    <div className="mx-5 tablet:mx-20 my-10">
      <div className="flex justify-end text-[40px] text-red-500">
       <NavLink to='/'> <MdExitToApp/></NavLink>
      </div>
      <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-20 mt-4">
        {data.map((item, index) => (
          <div className="shadow-lg h-[520px]" key={item.id}>
            <p className="mt-5 text-center font-semibold text-[18px] mx-4 line-clamp-1">
              {item.title}
            </p>
            <img
              className="mx-auto mt-4 h-[200px] w-[200px] rounded-full object-cover hover:scale-110"
              src={item.image}
              alt={item.title}
            ></img>
            <div className="mt-10 text-center">
              <p>Protein: {item.protein}</p>
              <p>Kalori: {item.calories}</p>
              <p>Yağ: {item.fat}</p>
              <p>Karbonhidratlar: {item.carbs}</p>
            </div>
            <div className="flex mt-10 mx-10 gap-4">
              <p
                onClick={() => handleDecrement(index)}
                className='p-2 w-10 rounded-full bg-red-500 text-white text-center cursor-pointer'
              >
                -
              </p>
              <p className='mt-2'>{count[index]}</p>
              <p
                onClick={() => handleIncrement(index)}
                className='p-2 w-10 rounded-full bg-green-500 text-white text-center cursor-pointer'
              >
                +
              </p>
              <div className="flex-grow"></div>
              <button className="bg-blue-500 px-2 text-white rounded-lg cursor-pointer">
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
