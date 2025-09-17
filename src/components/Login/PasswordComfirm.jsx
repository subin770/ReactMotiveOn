import React from 'react';
import logo from "../../assets/img/motiveon-login.png";
import Button from '../common/Button' // 공통 버튼 컴포넌트 import
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

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #0F1B37;
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
  return (
    <Container>
      <img
             src={logo} // 실제 로고 경로 넣어주세요
             alt="Motive On"
             style={{ width: "160px", marginBottom: "40px" }}
           />
      <Title>이메일을 확인해주세요</Title>
      <Description>
        비밀번호 재설정 메일을 귀하의 <a href="mailto:motiveOn@gmail.com">motiveOn@gmail.com</a> 로 보냈습니다.
      </Description>
      <Info>
        혹시 메일을 받지 못하셨나요?<br />
        가입된 이메일이 아니거나, 스팸으로 분류될 경우 메일을 받지 못할 수 있습니다.
      </Info>
      <Button label="확인" variant="primary" />
    </Container>
  );
}

export default PasswordConfirm;