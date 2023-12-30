import '../styles/SpringButton.css'

const SpringButton = ({ children, childClassName='', parentChildName='', handleClick }) => {
  return (
    <button className={`spring-button ${parentChildName}`} onClick={handleClick}>
        <span className={`spring-button-text ${childClassName}`}>
            {children}
        </span>
    </button>
  )
}

export default SpringButton