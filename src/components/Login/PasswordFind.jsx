import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/img/motiveon-login.png";
import Button from '../common/Button';
import InputField from '../common/InputField';
import PasswordError from '../Login/PasswordError';

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      // ✅ check-email 대신 find-pwd 호출
      const response = await fetch('/api/commons/find-pwd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // 404 또는 서버 오류 처리
        setIsErrorOpen(true);
        return;
      }

      const data = await response.json();

      if (data.exists) {
        // ✅ 이메일 + 비밀번호 같이 전달
        navigate('/login/passwordConfirm', { state: { email: data.email, pwd: data.pwd } });
      } else {
        setIsErrorOpen(true);
      }
    } catch (error) {
      console.error("비밀번호 찾기 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* 로고 */}
      <img
        src={logo}
        alt="Motive On"
        style={{ width: "160px", marginBottom: "40px" }}
      />

      {/* 제목 */}
      <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#374151" }}>
        비밀번호 찾기
      </h2>

      {/* 설명 */}
      <p style={{ fontSize: "14px", color: "#6B7280", margin: "8px 0 20px" }}>
        가입된 이메일 주소를 입력해주세요.
      </p>

      {/* 폼 */}
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "320px", textAlign: "center" }}
      >
        <InputField
          type="email"
          placeholder="motiveOn@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button label="확인" variant="primary" type="submit" />
      </form>

      {/* 모달 */}
      <PasswordError isOpen={isErrorOpen} onClose={() => setIsErrorOpen(false)} />
    </div>
  );
};

export default PasswordReset;
