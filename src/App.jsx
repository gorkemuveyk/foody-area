import styled from "styled-components";
import "./App.css";
import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResult/SearchResult";
import Loading from "./components/Loading/Loading";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/random.php/";

let filteredButtons = [
  {
    name: "All",
    type: "all",
  },
];

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const fetchDataList = [];

        for (let i = 0; i < 9; i++) {
          const response = await fetch(BASE_URL);
          const fetchData = await response.json();
          fetchDataList.push(fetchData);
        }
        setData(fetchDataList);

        fetchDataList.map((d) => {
          const area = d.meals[0].strArea;

          if (!filteredButtons.some((button) => button.name === area)) {
            filteredButtons.push({
              name: area,
              type: area.toLowerCase(),
            });
          }
        });
        setFilteredData(fetchDataList);
      } catch (error) {
        setError("Unable to fecth data");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  const changeFilter = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filteredData = data.filter((food) => {
      const area = food.meals[0].strArea.toLowerCase();
      return area === type;
    });

    setFilteredData(filteredData);
    setSelectedBtn(type);
  };

  const searchFood = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Eğer arama terimi boş ise, tüm veriyi göster
    if (lowerCaseSearchTerm === "") {
      setFilteredData(data);
      return;
    }

    // Arama terimine göre filtreleme yap
    const filteredData = data.filter((food) => {
      const fd = food.meals[0].strMeal.toLowerCase();
      return fd.includes(lowerCaseSearchTerm);
    });

    setFilteredData(filteredData);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <Loading />;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <span>F</span>oody <span>A</span>rea
        </div>
        <div className="search">
          <input
            onChange={(e) => searchFood(e.target.value)}
            type="search"
            placeholder="Search Food.."
          />
        </div>
      </TopContainer>

      <FilterContainer>
        {filteredButtons.map((button) => {
          return (
            <Button
              selected={selectedBtn === button.type}
              onClick={() => changeFilter(button.type)}
              key={button.name}
            >
              {button.name}
            </Button>
          );
        })}
      </FilterContainer>

      <SearchResult data={filteredData} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  .logo {
    font-size: 40px;
    span {
      color: red;
      font-weight: bold;
    }
  }

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0px 10px;
    }
    ::placeholder {
      color: #fff;
    }
  }

  @media (0 < width < 768px) {
    flex-direction: column;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 40px;

  @media (0 < width < 321px) {
    justify-content: start;
  }
`;

export const Button = styled.button`
  background-color: ${(props) => (props.selected ? "#e03737" : "#d31d1d")};
  border: 1px solid transparent;
  border-color: ${(props) => (props.selected ? "#fff" : "transparent")};
  border-radius: 5px;
  padding: 6px 12px;
  color: white;
`;
