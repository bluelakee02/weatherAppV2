import { ReactSelector } from 'testcafe-react-selectors';

const Common = () => ({
    navigation: ReactSelector('Navigation'),
    header: ReactSelector('Header'),
    footer: ReactSelector('Footer'),
})

export default Common;