import styles from '../styles/Users.module.css'
import User from './User'
const UserGroup = ({ users }) => {
  return (
    <div className={styles.cards}>
      {users &&
        users.map((user, index) => {
          return <User key={user.id} user={user} index={index}></User>
        })}
    </div>
  )
}

export default UserGroup
