import {ReactSelector} from 'testcafe-react-selectors';

const HomePageObjectModel = () => ({
    homeView: ReactSelector('Home'),
    primaryButton: ReactSelector('Button'),
    textField: ReactSelector('input').withProps({name: 'location'}),
    weatherCard: ReactSelector('WeatherCard'),
})

export default HomePageObjectModel;
