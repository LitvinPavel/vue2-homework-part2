import users from '../users.json';

const getImageUrl = (name) => {
  const href = new URL(`../assets/images`, import.meta.url).href
  return `${href}/${name}.png`
}

export default {
  getList: async () => {
    const _users = await users;
    return _users.map(user => ({ ...user, imgUrl: getImageUrl(user.imgLink) }))
  }
}