import { User } from '../../src/api/models/User';
import bcrypt from "bcrypt";
import {UserType,
  UserReturnType,
  UserCreatedReturnType
} from '../../src/api/interface/Interfaces';

const user: User = new User();

describe('User Model', () => {
  const userBase: UserType = {
    firstname: 'luannt19',
    lastname: 'udacity',
    password: 'thispassword',
  };

  const userUpdate: UserType = {
    firstname: 'luannt19New',
    lastname: 'udacityNew',
    password: 'thispasswordNew',
  };

  it('should have a createUser method', () => {
    expect(user.createUser).toBeDefined();
  });

  it('should have a getUsers  method', () => {
    expect(user.getUsers).toBeDefined();
  });

  it('should have a getUserById method', () => {
    expect(user.getUserById).toBeDefined();
  });

  it('should have a updateUser method', () => {
    expect(user.updateUser).toBeDefined();
  });

  it('should have a deleteUser method', () => {
    expect(user.deleteUser).toBeDefined();
  });

  it('should create a user with auth to true using createUser method', async () => {
    const isAuth = true;
    const result: UserCreatedReturnType = await user.createUser(userBase, isAuth);
    expect(result.auth).toEqual(isAuth);
    expect(result.token).toBeDefined();
  });

  it('should return all users using getUsers method', async () => {
    const result: UserReturnType[] = await user.getUsers();
    expect(result).toHaveSize(1);
    expect(result[0].id).toEqual(2);
    expect(result[0].firstname).toEqual(userBase.firstname);
    expect(result[0].lastname).toEqual(userBase.lastname);

    expect(bcrypt.compareSync(userBase.password + process.env.BCRYPT_SALT, result[0].password)).toBeTrue();
  });

  it('should return the correct user using getUserById method', async () => {
    const id = 2;
    const result: UserReturnType = await user.getUserById(id);
    expect(result.id).toEqual(id);
    expect(result.firstname).toEqual(userBase.firstname);
    expect(result.lastname).toEqual(userBase.lastname);

    expect(bcrypt.compareSync(userBase.password + process.env.BCRYPT_SALT, result.password)).toBeTrue();
  });

  it('should update the correct user using updateUser method', async () => {
    await user.updateUser(2, userUpdate);
    const result: UserReturnType = await user.getUserById(2);
    expect(result.firstname).toEqual(userUpdate.firstname);
    expect(result.lastname).toEqual(userUpdate.lastname);

    expect(bcrypt.compareSync(userUpdate.password + process.env.BCRYPT_SALT, result.password)).toBeTrue();
  });

  it('should delete the correct usser using deleteUser method', async () => {
    const result: UserReturnType = await user.deleteUser(2);
    expect(result.firstname).toEqual(userUpdate.firstname);
    expect(result.lastname).toEqual(userUpdate.lastname);

    expect(bcrypt.compareSync(userUpdate.password + process.env.BCRYPT_SALT, result.password)).toBeTrue();
  });
});
