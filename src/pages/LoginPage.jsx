import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("https://localhost:7130/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/"); // Başarılı giriş sonrası ana ekrana yönlendirme
    } else {
      alert("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", minHeight: "70vh" }}>
      <Typography variant="h4" gutterBottom>
        Giriş Yap
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Şifre"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Giriş Yap
      </Button>
      <Typography variant="body2" style={{ marginTop: "20px", textAlign: "center" }}>
        Hesabınız yok mu?{" "}
        <Button color="secondary" onClick={() => navigate("/register")}>
          Kaydol
        </Button>
      </Typography>
    </Container>
  );
};

export default LoginPage;