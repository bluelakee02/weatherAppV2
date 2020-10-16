import { act } from 'react-dom/test-utils';

export const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

export const updateWrapper = async (wrapper, amount = 0) => {
    await act(async () => {
        await wait(amount);
        wrapper.update();
    });
}
