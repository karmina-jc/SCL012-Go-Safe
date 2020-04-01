import React from 'react';
import './button.css'


const Button = ({ primary, className, children }) => {
  const bgColor = primary ? '#3AAA35' : '#0154B9';
  return (
    <button
      className={`add-button ${className}`}
      type='button'
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  );
}
export default Button;

{/*class Mensaje extends Component {
  render () {
    const styles = {
      color: this.props.color,
      
    }
    return (
      <h3 style={styles}>{this.props.contenido}</h3>
    )
  }
}
export default Mensaje */}