import { isSuccess, NotEmptyOrZero, formatAmount } from '../common';

describe('utils', () => {
    it('should handle isSuccess properly', () => {
        expect(isSuccess({ success: true })).to.eql(true);
        expect(isSuccess({ success: false })).to.eql(false);
    });

    // it('should handle NotEmptyOrZero properly', () => {
    //     expect(NotEmptyOrZero('')).to.eql(false);
    //     expect(NotEmptyOrZero(0)).to.eql(false);
    //     expect(NotEmptyOrZero('0')).to.eql(true);
    // });

    it('should handle formatAmount properly', () => {
        expect(formatAmount('12.444')).to.eql('12.44');
        expect(formatAmount(1.1241413123, 3)).to.eql('1.124');
        expect(formatAmount(1.555556666, 4)).to.eql('1.5556');
    });
});
