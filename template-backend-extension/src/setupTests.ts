import { configure as configureEnzyme } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configureEnzyme({ adapter: new Adapter() });
