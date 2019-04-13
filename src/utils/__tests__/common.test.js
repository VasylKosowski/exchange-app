import { isSuccess } from '../common';

describe('Component: AppComponent', () => {
    it('should handle isSuccess properly', () => {
        expect(isSuccess({ success: true })).to.eql(true);
        expect(isSuccess({ success: false })).to.eql(false);
    });
});
