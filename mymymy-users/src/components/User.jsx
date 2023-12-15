import styles from '../styles/User.module.css'

const User = ({ user, index, handleVote }) => {
  return (
    <div className={styles.card} style={{ '--_delay': index }}>
      <h5>{user.display_name}</h5>
      <div>{user.given_name}</div>
      <div>{user.family_name}</div>
      <div>{user.email}</div>
      <div>{user.employee_id}</div>
    </div>
  )
}

export default User
