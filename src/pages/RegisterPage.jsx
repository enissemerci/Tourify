import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch("https://localhost:7130/api/Auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      navigate("/login"); // Başarılı kayıt sonrası giriş ekranına yönlendirme
    } else {
      alert("Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", minHeight: "70vh" }}>
      <Typography variant="h4" gutterBottom>
        Kaydol
      </Typography>
      <TextField
        label="Kullanıcı Adı"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
        onClick={handleRegister}
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Kaydol
      </Button>
      <Typography variant="body2" style={{ marginTop: "20px", textAlign: "center" }}>
        Zaten hesabınız var mı?{" "}
        <Button color="secondary" onClick={() => navigate("/login")}>
          Giriş Yap
        </Button>
      </Typography>
    </Container>
  );
};

export default RegisterPage;