import {ReactSelector} from 'testcafe-react-selectors';

import { PomType } from './Common.pom';

const HomePageObjectModel: PomType = () => ({
    homeView: ReactSelector('views_Home'),
    primaryButton: ReactSelector('components_Button'),
    textField: ReactSelector('input').withProps({name: 'location'}),
    weatherCard: ReactSelector('components_WeatherCard'),
})

export default HomePageObjectModel;
