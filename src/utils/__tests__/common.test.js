import { isSuccess, isEmptyOrZero } from '../common';

describe('utils', () => {
    it('should handle isSuccess properly', () => {
        expect(isSuccess({ success: true })).to.eql(true);
        expect(isSuccess({ success: false })).to.eql(false);
    });

    it('should handle isEmptyOrZero properly', () => {
        expect(isEmptyOrZero('')).to.eql(true);
        expect(isEmptyOrZero(0)).to.eql(true);
        expect(isEmptyOrZero('0')).to.eql(false);
    });
});
