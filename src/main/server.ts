import 'module-alias/register';
import 'dotenv/config';
import app from '@/main/config/app';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
