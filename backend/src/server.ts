import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });
import app from './app'

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
  console.log(`Server is running on http://localhost:${PORT}`);
});