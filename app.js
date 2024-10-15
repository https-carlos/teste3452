const express = require('express');
const axios = require('axios');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/cotacao-frete', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2M4NDIxYjYxNzVkMjEzYjcwNmE1ZjdhOTU1Njk3Yzk4YjBiOTQzNzRmZGYxMDIyYmE1NjY1NzIwNzdmN2QzOTQ2YjNhNDMwNzViM2Y4ZWYiLCJpYXQiOjE3MjkwMTM1NTkuMjQ5MzM4LCJuYmYiOjE3MjkwMTM1NTkuMjQ5MzQsImV4cCI6MTc2MDU0OTU1OS4yMzMzMzIsInN1YiI6IjljOWM1MDc5LWQ1MjAtNDQ3Mi04MjEwLWE1NjVhYzc5MDBkMyIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.jHXkP-G0G18-BKUFmvq6TTSRfskiTmX28nSeGPnOqOXP8lJkE63ZQQa5QCQYN5WB9QlrutARTo85QdzNlqblBGTdss6JKgutcZFmWv5K0FQm7LToRpqIPCUgstvJXSsJRFrBohnstb5Nzy93CA3xfn2mQXjH5ORJCNSpl4MCbibLcbd6glAoSxn2m_tlUMObBjsgOQXxlpyXSd1ePI3ZS8by38XWoG1dEZDDzz35K574rIuVuVbtShYK4FOpjSyrIdXbQ3cya4fH3m1V7qQbIWwKkmDzYHCehNhZNU0Ye_d7QktVhA_-BxwnSIEfjI1bDkPgQjkYjS10FR6aC5wkPaLVCTYGf4u812yB0QXLkWoY0rBTYPYwnyegwsTuJy-Pwm8ybH8kFzjj369QU3m-gpBbGUdolXGQRJRp9te24v60_mMspjgAEYIw4hiTXK8eIN4MPsxZr6RNCIdS_alNokPbI94288rCCrxozR4ck6zuCwNWVfCFrbmUKtIb_fVdUdSM0Q1iY6UCSo4cOGM7X41yVH-tZC2sjvUsrS3SowwUKE6hiiNXqWeYFtpWCyz41GizuLi99gXcDZgtfh_o5YdKAoGy_PIUdqqD09gUmn7jpUB8i-WnM0xd_9_r01wDwn9Q06GcGoriP0jheAgTXXGqpUFI_exl1V0ZTraZQm0',
      'User-Agent': 'Aplicação flipactive@gmail.com'
    },
    data: JSON.stringify({
      from: { postal_code: '01002001' },
      to: { postal_code: '90570020' },
      package: { height: 4, width: 12, length: 17, weight: 0.3 }
    })
  };

  try {
    const response = await axios('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', options);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Erro ao buscar cotação de frete');
  }
});

app.listen(80, () => {
  console.log('Servidor rodando na porta 3000');
});
