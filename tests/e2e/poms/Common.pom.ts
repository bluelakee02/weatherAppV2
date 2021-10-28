import { ReactSelector } from 'testcafe-react-selectors';

export type PomType = () => Record<string, Selector>;

const Common: PomType = () => ({
    header: ReactSelector('header'),
    footer: ReactSelector('footer'),
});

export default Common;
