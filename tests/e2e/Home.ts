
import { waitForReact } from 'testcafe-react-selectors';
import HomePageObjectModel from './poms/Home.pom';
import Common from './poms/Common.pom';


fixture`Home page tests`
    .page('http://localhost:3000')
    .beforeEach(async () => {
        await waitForReact();
    });

test('All basic elements render', async t => {
    const HomePage = HomePageObjectModel();
    const CommonPage = Common();

    await t
        .expect(HomePage.homeView.visible).ok()
        .expect(HomePage.homeView.exists).ok()
        .expect(CommonPage.header.visible).ok()
        .expect(CommonPage.header.exists).ok()
        .expect(CommonPage.footer.exists).ok()
        .expect(CommonPage.footer.visible).ok()
});

test('Search location works', async t => {
    const HomePage = HomePageObjectModel();

    await t
        .typeText(HomePage.textField, 'prague')
        .click(HomePage.primaryButton)
        .expect(HomePage.weatherCard.exists).ok()
        .expect(HomePage.weatherCard.visible).ok()
        .expect(HomePage.weatherCard.count).eql(6)
});
