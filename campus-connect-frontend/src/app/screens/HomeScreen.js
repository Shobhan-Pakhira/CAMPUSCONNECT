import styled from "styled-components";

import Hero from "../components/Hero";
import Clubs from "../components/Clubs";
// import Gallery from "../components/Gallery";
import ClubDescription from "../components/ClubDescription";
import Feedback from "../components/Feedback";
import EventSchedule from "../components/EventSchedule";
import Footer from "../components/Footer";
import { selectUser } from "../features/authSlice";
import { useSelector } from "react-redux";

function HomeScreen() {
  const user = useSelector(selectUser);
  return (
    <HomeScreenContainer>
      <Hero />
      {!user && <Clubs />}

      {!user && <EventSchedule />}

      {/* {user && <Gallery />} */}

      <ClubDescription />

      <Feedback />

      <Footer />

    </HomeScreenContainer>
  );
}

export default HomeScreen;

const HomeScreenContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: var(--headerColor);
  color: #fff;
`;
