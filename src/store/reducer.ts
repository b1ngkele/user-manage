import { IUser } from '../interface';

type IAction = {
  type: 'add' | 'delete' | 'edit',
  payload: any;
}

const initialState: IUser[] = [
  {
    name: '十足',
    age: 24,
    address: '杭州',
    status: 1
  }
];

const userReducer = (state = initialState, action: IAction): IUser[] => {
  const { type, payload } = action;
  switch (type) {
    case 'add':
      return [...state, { ...payload, status: 1 } as IUser];
    case 'delete':
      return state.filter(user => user.name !== payload);
    case 'edit':
      return state.map(user => user.name === (payload as IUser).name ? { ...payload } : user);
    default:
      return state;
  }
};

export { userReducer };
