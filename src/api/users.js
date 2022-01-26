import users from '../users.json';

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}.png`, import.meta.url).href
}

export default {
  getList: async () => {
    const _users = await users;
    return _users.map(user => ({ ...user, imgUrl: getImageUrl(user.imgLink) }))
  }
}