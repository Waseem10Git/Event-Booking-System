import './Input.css';

const Input = ({id, type = "text", label, placeholder, handleChange, ...rest}) => {
    
    return (
        <div className="form-group">
          <label>{label}</label>
          <input type={type} name={id} placeholder={placeholder} onChange={handleChange} {...rest}/>
        </div>
    )
}

export default Input;