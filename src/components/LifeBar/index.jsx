import styled from 'styled-components';

const LifeElt = styled.div`
   font-weight: 500;
   text-align: center;
   color: black;
   border: solid 1px black;
   border-radius: 10px;
   width: 90%;
   height: 20px;
   background-image: linear-gradient(
      90deg,
      rgba(102, 255, 87, 1) ${({ stop }) => stop}%,
      rgba(255, 0, 83, 1) ${({ stop }) => stop}%,
      rgba(255, 0, 83, 1) 100%
   );
`;

export default function Life(life) {
   const lifeInfo = life.life;
   const stop = Math.round((lifeInfo.now / lifeInfo.maxLife) * 100);
   return (
      <LifeElt stop={stop}>
         {lifeInfo.now}/{lifeInfo.maxLife}
      </LifeElt>
   );
}