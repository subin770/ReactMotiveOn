import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/img/motiveon-login.png";
import Button from '../common/Button';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 20px;

  a {
    color: #3A8DFE;
    text-decoration: none;
  }
`;

const Info = styled.p`
  font-size: 12px;
  color: #9CA3AF;
  margin-bottom: 30px;
`;

function PasswordConfirm() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ 서버에서 전달받은 값 (이메일 + 비밀번호)
  const email = location.state?.email || "이메일 주소";
  const pwd = location.state?.pwd;

  const handleConfirm = () => {
    navigate('/login');
  };

  return (
    <Container>
      <img
        src={logo}
        alt="Motive On"
        style={{ width: "160px", marginBottom: "40px" }}
      />
      <Title>비밀번호 확인</Title>
      <Description>
        <strong>{email}</strong> 계정의 비밀번호는 아래와 같습니다:
      </Description>

      {/* ✅ pwd 값이 있으면 표시, 없으면 안내문 */}
      {pwd ? (
        <Title style={{ color: "#3A8DFE", fontSize: "20px" }}>{pwd}</Title>
      ) : (
        <Title style={{ color: "red", fontSize: "16px" }}>
          비밀번호를 불러오지 못했습니다.
        </Title>
      )}

      <Info>
        보안을 위해 로그인 후 반드시 비밀번호를 변경하세요.
      </Info>
      <Button label="확인" variant="primary" onClick={handleConfirm} />
    </Container>
  );
}

export default PasswordConfirm;
