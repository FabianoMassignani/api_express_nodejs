import app from "./server";
import { PORT } from "./config/secrets";

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
