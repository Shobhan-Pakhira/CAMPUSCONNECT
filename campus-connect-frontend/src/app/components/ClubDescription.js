import React from "react";
import styled from "styled-components";

function ClubDescription() {
  return (
    <DescriptionContainer>
      <DescriptionTitle>Our Clubs Illumination</DescriptionTitle>
      <DescriptionBox>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have you thought that in your college time, we all thought of a senior who may have guided us in our college journey or that bhaiya or didi with whom we can share our problems and can get the best solution for the case. Aiming with a vision of peer-to-peer learning environment and senior-junior driven community. We introduce ourselves, The Senior's Club of DSEU Shakarpur Campus - 1.
      <br/>
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Senior's Club mentors juniors and promotes peer-to-peer learning to create a supportive and nurturing environment. The club aims towards orgainising events and seminar which can help students get the maximum exposure.
      </DescriptionBox>
    </DescriptionContainer>
  );
}

export default ClubDescription;

const DescriptionContainer = styled.section`
  margin-top: 60px;
  width: 100%;
  padding: 50px 80px 73px 80px;
  background: var(--primaryColor);

  @media only screen and (max-width: 500px) {
    padding: 50px 20px;
  }
`;

const DescriptionTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
`;

const DescriptionBox = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;
