import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

function Clubs() {
  const [clubsData, setClubsData] = useState([]);

  const fetchData = useCallback(async () => {
    await axios({
      method: "get",
      url: "/admin/club/getAllClubData",
    })
      .then((result) => {
        if (result.status !== 200) {
          alert("Not able to fetch clubs");
          return;
        } else {
          setClubsData(result.data);
          return;
        }
      })
      .catch((err) => {
        if (err != null) {
          alert("Something is wrong");
          return;
        }
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <ClubsContainer id="clubs">
      <ClubsHeading>Our College Student Chapters !</ClubsHeading>
      <ClubsWrapper>
        {clubsData.map(({ clubName, clubLogo }) => (
          <ClubCard key={clubName} to={`/login?clubName=${clubName}`}>
            <ClubIcon src={`upload/images/view/${clubLogo}`} />
            {clubName}
          </ClubCard>
        ))}
      </ClubsWrapper>
    </ClubsContainer>
  );
}

export default Clubs;

const ClubsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const ClubsHeading = styled.h1`
  font-size: 3rem;
`;

const ClubsWrapper = styled.div`
  background: var(--primaryColor);
  flex-wrap: wrap;
  display: flex;
  margin: 20px 5%;
  width: 75%;
  box-shadow: 1px 4px 8px 2px rgba(0, 0, 0, 0.2);
`;

const ClubCard = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px 20px;
  width: calc(100% / 2);
  font-weight: bold;
  font-size: 1.5rem;
  color: #aaa;
  text-decoration: none;
  transition: 0.2s all ease-in-out;
  box-shadow: 1px 2px 2px 1px rgba(5, 11, 18, 0.3);

  @media only screen and (max-width: 960px) {
    width: 100%;
  }

  :hover {
    box-shadow: 0 4px 10px 6px rgba(5, 11, 18, 0.9);
  }
`;

const ClubIcon = styled.img`
  height: 70px;
  width: 70px;
  object-fit: cover;
  margin-right: 10px;
`;
