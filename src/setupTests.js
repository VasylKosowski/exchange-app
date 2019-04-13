import Enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

global.expect = expect;
Enzyme.configure({ adapter: new Adapter() });
