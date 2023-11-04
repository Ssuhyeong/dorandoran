import LoadingPage from "@/pages/common/loading";
import axios from "axios";

const KakaoRedirect = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");

  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/oauth/kakao?code=${code}`)
    .then((res) => {
      localStorage.setItem("accessToken", res.headers.accesstoken);
      console.log(res);
      window.location.href = "/parent/main";
    });

  return (
    <>
      <LoadingPage />
    </>
  );
};

export default KakaoRedirect;
