import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.finance.amount(),
  status: sample(['paye', 'non paye']),
  role: sample([
    'Table 1',
    'Table 2',
    'Terrasse',
    'Table 6',
    'Table 7',
    'Table 45',
    'Table 60',
    'Table 70',
    'Table 12',
    'Table 20',
  ]),
}));

export default users;
