import styled from "styled-components";
import PropType from "prop-types";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { Button } from "../../App";

const SearchResult = ({ data: foods }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <FoodCardContainer>
      <FoodCards>
        {foods?.map((item, index) => (
          <div key={index}>
            {item?.meals?.map((food) => (
              <FoodCard key={food.idMeal}>
                <div className="food-image">
                  {!imageLoaded && <Loading />}
                  <img src={food.strMealThumb} onLoad={handleImageLoad} />
                </div>
                <div className="food-info">
                  <div className="info">
                    <h3>
                      {food.strMeal.length > 20
                        ? `${food.strMeal.substring(0, 20)}...`
                        : food.strMeal}
                    </h3>
                    <p>
                      {food.strInstructions.length > 50
                        ? `${food.strInstructions.substring(0, 120)}...`
                        : food.strInstructions}
                    </p>
                  </div>
                  <Button>{food.strArea}</Button>
                </div>
              </FoodCard>
            ))}
          </div>
        ))}
      </FoodCards>
    </FoodCardContainer>
  );
};

export default SearchResult;

SearchResult.propTypes = {
  data: PropType.array,
};

const FoodCardContainer = styled.section`
  min-height: calc(100vh - 210px);
  background-image: url("/img/bg.jpg");
  background-size: cover;
  filter: grayscale(55%);
  border-radius: 4px;
`;
const FoodCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
`;

const FoodCard = styled.div`
  width: 300px;
  height: 167px;
  border: 0.66px solid;

  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);

  border-radius: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;

  .food-info {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
    }
    button {
      font-size: 12px;
    }
  }

  .food-image {
    position: relative;
    width: 100px;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
`;
