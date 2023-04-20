import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import alpha from "../assets/images/alpha-pfp.jpg"
import beta from "../assets/images/beta-pfp.jpg"
import gamma from "../assets/images/gamma-pfp.jpg"

const FeedbackData = [
  {
    FeedbackText: "The Senior's Club provides excellent mentorship and a supportive peer-to-peer learning environment.",
    FeedbackImage: alpha,
    FeedbackUser: "- Anonymous Alpha (Senior's Club ❤ Member)"
  },
  {
    FeedbackText: "I am grateful for the Senior's Club's commitment to fostering a supportive and inclusive community where students can learn and grow together.",
    FeedbackImage: beta,
    FeedbackUser: "- Anonymous Beta (Senior's Club ❤ Member)"
  },
  {
    FeedbackText: "Being a part of the Senior's Club has allowed me to connect with like-minded peers and receive valuable guidance from senior members. It's a fantastic resource for any student.",
    FeedbackImage: gamma,
    FeedbackUser: "- Anonymous Gamma (Senior's Club ❤ Member)"
  },
]

function Feedback() {
  return (
    <FeedbackContainer>
      <FeedbackHeader>Our Club Members Feedback</FeedbackHeader>
      <FeedbackCarousel
        infiniteLoop
        autoPlay
        showStatus={false}
        showThumbs={false}
      >
        {FeedbackData.map((item, idx) => (
          <FeedbackCard key={idx}>
            <FeedbackImage src={item.FeedbackImage} />
            <FeedbackText>
              {item.FeedbackText}
            </FeedbackText>
            <FeedbackUser>
              {item.FeedbackUser}
            </FeedbackUser>
          </FeedbackCard>
        ))}
      </FeedbackCarousel>
    </FeedbackContainer>
  );
}

export default Feedback;

const FeedbackContainer = styled.section`
  width: 100%;
  margin-top: 60px;
  padding: 0 60px;

  @media only screen and (max-width: 500px) {
    padding: 0 10px;
  }
`;

const FeedbackHeader = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const FeedbackCarousel = styled(Carousel)`
  @media only screen and (max-width: 694px) {
    button {
      display: none;
    }
  }
`;

const FeedbackCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const FeedbackImage = styled.img`
  height: 180px !important;
  width: 180px !important;
  border-radius: 50%;
  object-fit: cover;
`;

const FeedbackText = styled.div`
  color: #cfcfd1;
  min-width: 300px;
  max-width: 500px;
  margin-top: 40px;
  text-align: center;
  font-weight: 600;
`;

const FeedbackUser = styled.h3`
  margin: 50px 0;
`;
