import NavStyles from '../../common/Styles/NavStyles';
import { NavigationScreenConfig } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';


export type NavigationOptions = NavigationScreenConfig<NavigationStackOptions, any>;


const defaultStackScreenNavigationOptions: NavigationScreenConfig<NavigationStackOptions, any> = {
  headerTitleStyle: NavStyles.modalHeaderTitleText,

  headerTitleContainerStyle: {
    // Prefer left-aligned title text
    justifyContent: 'flex-start',
  },

  headerRightContainerStyle: {
    paddingRight: 16,
  },
};


export default defaultStackScreenNavigationOptions;
