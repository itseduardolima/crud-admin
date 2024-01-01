import { Container, Typography } from '@mui/material';
import UserCrud from '../components/Crud';


const Dashboard: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Painel de Administração
      </Typography>
      <UserCrud />
    </Container>
  );
};

export default Dashboard;
