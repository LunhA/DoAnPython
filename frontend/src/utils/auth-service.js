import { STORAGE_KEY } from '@/consts/commons';
import { loginApi, registerApi } from './api-service';
import { commonStorage } from './storage-service';

export const authService = {
  getSession() {
    const session = commonStorage.getItem(STORAGE_KEY.SESSIONS);

    return session;
  },
  getUser(username) {
    const users = commonStorage.getItem(STORAGE_KEY.USERS);

    if (!users) {
      return null;
    }

    const user = users.find((user) => user.username === username);

    return user;
  },
  async register({ username, password }) {
    if (!username || !password) {
      return { ok: false };
    }

    try {
      await registerApi({ username, password });

      const newUser = { username, password, createdAt: new Date().getTime() };
      return {
        ok: true,
        user: {
          username: newUser.username,
          createdAt: newUser.createdAt,
        },
      };
    } catch (err) {
      return {
        ok: false,
      };
    }

    // let users = commonStorage.getItem(STORAGE_KEY.USERS);

    // const newUser = { username, password, createdAt: new Date().getTime() };

    // if (users) {
    //   users.push(newUser);
    // } else {
    //   users = [newUser];
    // }

    // commonStorage.setItem(STORAGE_KEY.USERS, users);

    // return {
    //   ok: true,
    //   user: {
    //     username: newUser.username,
    //     createdAt: newUser.createdAt,
    //   },
    // };
  },
  async login({ username, password }) {
    if (!username || !password) {
      return { ok: false };
    }
    try {
      const response = await loginApi({ username, password });

      if (response.status_code === 401) {
        return { ok: false };
      } else {
        commonStorage.setItem(STORAGE_KEY.SESSIONS, {
          username: username,
          access_token: response.access_token,
          loggedAt: new Date().getTime(),
        });

        return {
          ok: true,
          user: {
            username: username,
          },
        };
      }
    } catch (err) {
      return { ok: false };
    }
    // const user = this.getUser(username);

    // if (!user) {
    //   return { ok: false };
    // }

    // if (user.password !== password) {
    //   return { ok: false };
    // }

    // commonStorage.setItem(STORAGE_KEY.SESSIONS, {
    //   username: username,
    //   loggedAt: new Date().getTime(),
    // });
  },
  logout() {
    commonStorage.setItem(STORAGE_KEY.SESSIONS, null);
  },
};
