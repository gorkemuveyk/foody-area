import styled from "styled-components";
import "./App.css";
import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResult/SearchResult";
import Loading from "./components/Loading/Loading";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/random.php/";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const fetchDataList = [];

        for (let i = 0; i < 10; i++) {
          const response = await fetch(BASE_URL);
          const fetchData = await response.json();
          fetchDataList.push(fetchData);
        }
        setData(fetchDataList);
      } catch (error) {
        setError("Unable to fecth data");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <Loading />;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <span>F</span>oody <span>A</span>rea
        </div>
        <div className="search">
          <input type="search" placeholder="Search Food.." />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
      </FilterContainer>

      <SearchResult data={data} />
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
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
`;
