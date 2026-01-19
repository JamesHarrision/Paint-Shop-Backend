import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') });
import app from './app'

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, HOST,  ()=> {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});