import { View } from 'react-native';
import globalStyles from '../styles/globalStyles';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={globalStyles.cardRectangle}>{children}</View>;
};

export default Card;
