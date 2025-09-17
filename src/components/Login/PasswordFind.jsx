import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import logo from "../../assets/img/motiveon-login.png";
import Button from '../common/Button'
import InputField from '../common/InputField'

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // 서버로 비밀번호 찾기 요청 API 호출
    console.log("비밀번호 찾기 요청 이메일:", email);
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
        src={logo} // 실제 로고 경로 넣어주세요
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
    </div>
  );
};

export default PasswordReset;