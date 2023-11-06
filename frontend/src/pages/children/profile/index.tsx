import styled from "styled-components";
import background from "@/assets/img/background/background.jpg";
import ChildCard from "@/components/childCard";
import Face from "@/assets/img/smile.png";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileListState, profileState } from "@/states/children/info";
import { useChildrenLogin } from "@/apis/children/profile/Mutations/useChildrenLogin";
import { ChildrenProfileProps } from "@/types/children/profileType";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
`;

const ChildrenProfilePage = () => {
  const profileList = useRecoilValue(profileListState);
  const [profile, setProfile] = useRecoilState(profileState);

  const navigate = useNavigate();

  const usePostChildrenLogin = useChildrenLogin();

  const postLoginHandler = async (profile: ChildrenProfileProps) => {
    try {
      await usePostChildrenLogin.mutateAsync({
        childId: profile.childId,
        profileId: profile.id,
      });
      console.log("프로필데이타:" + profile.name);
      setProfile(profile);
      navigate("/children/main");
    } catch (errer) {
      console.log("api 오류 - postLoginHandler");
    }
  };

  console.log("프로필:" + profile.name);
  return (
    <Background>
      <ContentContainer>
        <CardContainer>
          {profileList.map((profile, index) => (
            <ChildCard
              key={index}
              img={profile.animal.imgUrl}
              backgroundColor="#26C917"
              text={profile.name}
              onClick={() => postLoginHandler(profile)}
            />
          ))}
        </CardContainer>
      </ContentContainer>
    </Background>
  );
};

export default ChildrenProfilePage;
